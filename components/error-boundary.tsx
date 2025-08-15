'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    // Log memory usage if available
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory
      console.warn('Memory usage at error time:', {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`
      })
    }

    this.setState({
      error,
      errorInfo
    })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} retry={this.handleRetry} />
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground">
                {this.state.error?.message?.includes('Array buffer allocation') || 
                 this.state.error?.message?.includes('memory') ? (
                  <div className="space-y-2">
                    <p>The application ran out of memory while processing the dataset.</p>
                    <p className="text-sm">This usually happens with very large CSV files. Try:</p>
                    <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                      <li>Refreshing the page</li>
                      <li>Closing other browser tabs</li>
                      <li>Using a smaller dataset</li>
                    </ul>
                  </div>
                ) : (
                  <p>Something went wrong. Please try refreshing the page.</p>
                )}
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-muted-foreground">Error Details</summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-2">
                <Button onClick={this.handleRetry} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Memory monitoring hook
export function useMemoryMonitor() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkMemory = () => {
      if ('memory' in performance && (performance as any).memory) {
        const memory = (performance as any).memory
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024)
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        const usagePercent = (usedMB / limitMB) * 100

        if (usagePercent > 80) {
          console.warn(`High memory usage: ${usedMB}MB/${limitMB}MB (${usagePercent.toFixed(1)}%)`)
        }

        if (usagePercent > 90) {
          console.error(`Critical memory usage: ${usedMB}MB/${limitMB}MB (${usagePercent.toFixed(1)}%)`)
        }
      }
    }

    // Check memory every 10 seconds
    const interval = setInterval(checkMemory, 10000)
    return () => clearInterval(interval)
  }, [])
}