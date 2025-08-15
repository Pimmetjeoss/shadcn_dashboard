'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { AppLauncher } from '@/components/app-launcher'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  IoLinkOutline,
  IoSearchOutline,
  IoGlobeOutline,
  IoSpeedometerOutline,
  IoShieldCheckmarkOutline,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoAnalyticsOutline,
  IoDownloadOutline
} from 'react-icons/io5'

interface AnalysisResult {
  url: string
  status: 'analyzing' | 'completed' | 'error'
  loadTime: number
  statusCode: number
  security: {
    https: boolean
    certificate: 'valid' | 'invalid' | 'expired'
    security_headers: number
  }
  performance: {
    size: string
    speed: 'fast' | 'medium' | 'slow'
    score: number
  }
  seo: {
    title: string
    description: string
    keywords: number
    score: number
  }
  technologies: string[]
}

export default function URLAnalyzerPage() {
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!url) return

    setAnalyzing(true)
    setProgress(0)
    setResults(null)

    try {
      // Simulate analysis progress
      const steps = [
        { name: 'Connecting to URL...', progress: 20 },
        { name: 'Analyzing security...', progress: 40 },
        { name: 'Testing performance...', progress: 60 },
        { name: 'Checking SEO...', progress: 80 },
        { name: 'Finalizing results...', progress: 100 }
      ]

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setProgress(step.progress)
      }

      // Mock analysis results
      const mockResult: AnalysisResult = {
        url,
        status: 'completed',
        loadTime: Math.floor(Math.random() * 3000) + 500,
        statusCode: 200,
        security: {
          https: url.startsWith('https://'),
          certificate: 'valid',
          security_headers: Math.floor(Math.random() * 8) + 2
        },
        performance: {
          size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
          speed: ['fast', 'medium', 'slow'][Math.floor(Math.random() * 3)] as 'fast' | 'medium' | 'slow',
          score: Math.floor(Math.random() * 40) + 60
        },
        seo: {
          title: 'Sample Page Title',
          description: 'This is a sample meta description for the analyzed page.',
          keywords: Math.floor(Math.random() * 20) + 5,
          score: Math.floor(Math.random() * 30) + 70
        },
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'].slice(0, Math.floor(Math.random() * 4) + 1)
      }

      setResults(mockResult)
    } catch (error) {
      console.error('Analysis failed:', error)
      setResults({
        url,
        status: 'error',
        loadTime: 0,
        statusCode: 0,
        security: { https: false, certificate: 'invalid', security_headers: 0 },
        performance: { size: '0 MB', speed: 'slow', score: 0 },
        seo: { title: '', description: '', keywords: 0, score: 0 },
        technologies: []
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'fast': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'slow': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <AppLauncher currentApp="url-analyzer" className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Application Suite
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>URL Analyzer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">URL Analyzer</h1>
            <p className="text-muted-foreground">
              Analyze website performance, security, and SEO
            </p>
          </div>
        </div>

        {/* URL Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IoLinkOutline className="h-5 w-5" />
              Website Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-input">Enter URL to analyze</Label>
              <div className="flex gap-2">
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={analyzing}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={!url || analyzing}
                >
                  <IoSearchOutline className="h-4 w-4 mr-2" />
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
            </div>

            {analyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing website...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {results && results.status === 'completed' && (
          <>
            {/* Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Load Time</CardTitle>
                  <IoTimeOutline className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{results.loadTime}ms</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status Code</CardTitle>
                  <IoGlobeOutline className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{results.statusCode}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <IoSpeedometerOutline className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(results.performance.score)}`}>
                    {results.performance.score}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
                  <IoAnalyticsOutline className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(results.seo.score)}`}>
                    {results.seo.score}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IoShieldCheckmarkOutline className="h-5 w-5" />
                    Security Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>HTTPS Enabled</span>
                    {results.security.https ? (
                      <Badge className="bg-green-100 text-green-800">
                        <IoCheckmarkCircleOutline className="h-3 w-3 mr-1" />
                        Yes
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <IoWarningOutline className="h-3 w-3 mr-1" />
                        No
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800">
                      {results.security.certificate}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security Headers</span>
                    <Badge variant="outline">
                      {results.security.security_headers}/10
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IoSpeedometerOutline className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Page Size</span>
                    <span className="font-medium">{results.performance.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loading Speed</span>
                    <span className={`font-medium capitalize ${getSpeedColor(results.performance.speed)}`}>
                      {results.performance.speed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance Score</span>
                    <span className={`font-medium ${getScoreColor(results.performance.score)}`}>
                      {results.performance.score}/100
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IoAnalyticsOutline className="h-5 w-5" />
                    SEO Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Page Title</span>
                    <p className="font-medium">{results.seo.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Meta Description</span>
                    <p className="text-sm">{results.seo.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Keywords Found</span>
                    <Badge variant="outline">{results.seo.keywords}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IoGlobeOutline className="h-5 w-5" />
                    Technologies Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                    {results.technologies.length === 0 && (
                      <span className="text-sm text-muted-foreground">No technologies detected</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Analysis Complete</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyzed: {results.url}
                    </p>
                  </div>
                  <Button variant="outline">
                    <IoDownloadOutline className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {results && results.status === 'error' && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <IoWarningOutline className="h-12 w-12 text-red-600 mx-auto" />
                <h3 className="font-medium text-red-600">Analysis Failed</h3>
                <p className="text-sm text-muted-foreground">
                  Unable to analyze the provided URL. Please check the URL and try again.
                </p>
                <Button variant="outline" onClick={() => setResults(null)}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}