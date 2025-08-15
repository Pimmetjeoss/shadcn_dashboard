'use client'

import { useEffect, useState } from 'react'
import { BillionaireRecord, DataQualityMetrics } from '@/types/billionaire'
import { loadBillionaireData, calculateDataQualityMetrics } from '@/data/billionaire-data'
import { Dashboard } from '@/components/dashboard'
import { Progress } from '@/components/ui/progress'
import { useMemoryMonitor } from '@/components/error-boundary'

export default function Home() {
  // Enable memory monitoring
  useMemoryMonitor()
  
  const [data, setData] = useState<BillionaireRecord[]>([])
  const [metrics, setMetrics] = useState<DataQualityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState('Initializing...')
  const [memoryWarning, setMemoryWarning] = useState(false)
  const [reducedMode, setReducedMode] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setLoadingMessage('Checking memory and loading data...')
        setLoadingProgress(5)

        // Check memory before loading
        if (typeof window !== 'undefined' && 'memory' in performance) {
          const memory = (performance as any).memory
          const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024)
          const limitMB = Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
          const usagePercent = (usedMB / limitMB) * 100

          if (usagePercent > 70) {
            setMemoryWarning(true)
            setLoadingMessage('High memory usage detected - using reduced mode...')
            setReducedMode(true)
          }
        }

        setLoadingMessage('Loading Forbes Billionaire data...')
        setLoadingProgress(15)

        // Use memory-safe loading approach
        const records = await loadBillionaireData()
        setLoadingProgress(60)
        
        // Check memory after loading data
        if (typeof window !== 'undefined' && 'memory' in performance) {
          const memory = (performance as any).memory
          const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024)
          console.log(`Memory usage after data load: ${usedMB}MB`)
        }

        setLoadingMessage('Processing data quality metrics...')
        setLoadingProgress(80)
        
        const qualityMetrics = calculateDataQualityMetrics(records)
        setLoadingProgress(95)
        setLoadingMessage('Finalizing...')
        
        setData(records)
        setMetrics(qualityMetrics)
        setError(null)
        setLoadingProgress(100)
        
        // Final memory check
        if (memoryWarning) {
          console.warn('Application loaded in reduced mode due to memory constraints')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data'
        
        // Provide specific guidance for memory errors
        if (errorMessage.includes('Array buffer allocation') || errorMessage.includes('memory')) {
          setError(`Memory Error: Dataset too large for current browser memory. Try: 1) Close other tabs, 2) Refresh the page, 3) Use Chrome for better memory handling.`)
        } else {
          setError(`Error: ${errorMessage}. This may be due to a large dataset. Try refreshing the page.`)
        }
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md w-full mx-auto p-6">
          <div className="text-2xl font-semibold">Forbes Billionaire Dataset</div>
          <div className="text-muted-foreground">{loadingMessage}</div>
          <div className="space-y-2">
            <Progress value={loadingProgress} className="w-full" />
            <div className="text-sm text-muted-foreground">{loadingProgress}% complete</div>
          </div>
          {loadingProgress < 100 && (
            <div className="text-xs text-muted-foreground">
              {memoryWarning 
                ? "⚠️ Reduced mode active due to memory constraints"
                : "Loading data in memory-safe chunks to prevent crashes..."
              }
            </div>
          )}
          {memoryWarning && (
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              High memory usage detected - some features may be limited
            </div>
          )}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md w-full mx-auto p-6">
          <div className="text-2xl font-semibold text-red-600">Loading Error</div>
          <div className="text-muted-foreground">{error}</div>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry Loading
            </button>
            <div className="text-xs text-muted-foreground">
              If this error persists, the dataset may be too large for your browser's memory.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <Dashboard data={data} metrics={metrics} reducedMode={reducedMode} />
}