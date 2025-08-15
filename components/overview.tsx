'use client'

import { useMemo, useState } from 'react'
import { BillionaireRecord, DataQualityMetrics } from '@/types/billionaire'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { getCountries, getAgeRange, getNetWorthRange, parseNetWorth } from '@/data/billionaire-data'
import { 
  IoGridOutline,
  IoEarthOutline,
  IoPeopleOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoDownloadOutline
} from 'react-icons/io5'

interface OverviewProps {
  data: BillionaireRecord[]
  metrics: DataQualityMetrics | null
  onExportClick?: () => void
  onViewChange?: (view: string) => void
  onSearchSubmit?: (searchTerm: string) => void
  onRecordSelect?: (record: BillionaireRecord) => void
}

export function Overview({ data, metrics, onExportClick, onViewChange, onSearchSubmit, onRecordSelect }: OverviewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  // Memoize expensive calculations
  const { countries, ageRange, netWorthRange, topCountries } = useMemo(() => {
    const countries = getCountries(data)
    const [minAge, maxAge] = getAgeRange(data)
    const [minNetWorth, maxNetWorth] = getNetWorthRange(data)
    
    // Calculate top countries
    const countryStats = countries.reduce((acc, country) => {
      acc[country] = data.filter(r => r.country === country).length
      return acc
    }, {} as Record<string, number>)
    
    const topCountries = Object.entries(countryStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
    
    return {
      countries,
      ageRange: [minAge, maxAge] as [number, number],
      netWorthRange: [minNetWorth, maxNetWorth] as [number, number],
      topCountries
    }
  }, [data])

  // Generate search suggestions
  const generateSuggestions = (input: string) => {
    if (!input || input.length < 2) return []
    
    const query = input.toLowerCase()
    const suggestions = new Set<string>()
    
    // Add matching billionaire names, sources, and countries
    data.forEach(record => {
      if (record.name.toLowerCase().includes(query)) {
        suggestions.add(record.name)
      }
      if (record.source.toLowerCase().includes(query)) {
        suggestions.add(record.source)
      }
      if (record.country.toLowerCase().includes(query)) {
        suggestions.add(record.country)
      }
    })
    
    return Array.from(suggestions).slice(0, 6)
  }

  const handleSearchInput = (value: string) => {
    setSearchTerm(value)
    const suggestions = generateSuggestions(value)
    setSearchSuggestions(suggestions)
    setShowSuggestions(suggestions.length > 0)
  }

  // Function to find exact record matches
  const findExactRecord = (searchTerm: string): BillionaireRecord | null => {
    const query = searchTerm.toLowerCase().trim()
    
    // First try exact name match
    const exactNameMatch = data.find(record => 
      record.name.toLowerCase() === query
    )
    if (exactNameMatch) return exactNameMatch

    // Then try partial name match (for cases like "Elon Musk")
    const partialNameMatch = data.find(record => 
      record.name.toLowerCase().includes(query) && query.length > 3
    )
    if (partialNameMatch) return partialNameMatch

    return null
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedSearch = searchTerm.trim()
    if (trimmedSearch) {
      console.log('Overview: Submitting search:', trimmedSearch)
      
      // Try to find exact record match first
      const exactRecord = findExactRecord(trimmedSearch)
      if (exactRecord && onRecordSelect) {
        console.log('Overview: Found exact match, opening modal:', exactRecord.name)
        onRecordSelect(exactRecord)
        setShowSuggestions(false)
        return
      }
      
      // Fallback to data table view for broader searches
      onSearchSubmit?.(trimmedSearch)
      onViewChange?.('data-table')
      setShowSuggestions(false)
    } else {
      console.log('Overview: Empty search term, not submitting')
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    console.log('Overview: Suggestion clicked:', suggestion)
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    
    // Try to find exact record match first
    const exactRecord = findExactRecord(suggestion)
    if (exactRecord && onRecordSelect) {
      console.log('Overview: Found exact match for suggestion, opening modal:', exactRecord.name)
      onRecordSelect(exactRecord)
      return
    }
    
    // Fallback to data table view
    onSearchSubmit?.(suggestion)
    onViewChange?.('data-table')
  }

  const formatNetWorth = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`
    }
    return `$${value.toFixed(1)}M`
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forbes Billionaire Dataset</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of the world's wealthiest individuals
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onViewChange?.('data-table')}>View Full Dataset</Button>
          <Button variant="outline" onClick={onExportClick}>Export Data</Button>
        </div>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            Quick Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search billionaires, companies, or countries..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10"
                />
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg">
                  <div className="py-1">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-2 text-left hover:bg-muted text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  handleSearchSubmit(e as any)
                }}
              >
                <Search className="h-4 w-4" />
                Search & View Results
              </Button>
              {searchTerm && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    console.log('Overview: Clearing search')
                    setSearchTerm('')
                    setShowSuggestions(false)
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <IoGridOutline className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Complete billionaire profiles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <IoEarthOutline className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.length}</div>
            <p className="text-xs text-muted-foreground">
              Global representation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Age Range</CardTitle>
            <IoPeopleOutline className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ageRange[0]} - {ageRange[1]}</div>
            <p className="text-xs text-muted-foreground">
              Years old
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth Range</CardTitle>
            <IoCashOutline className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNetWorth(netWorthRange[0])} - {formatNetWorth(netWorthRange[1])}
            </div>
            <p className="text-xs text-muted-foreground">
              Wealth distribution
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Quality Status */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Data Quality Status
              <Badge variant={metrics.qualityScore >= 95 ? "success" : "warning"}>
                {metrics.qualityScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleOutline className="h-6 w-6 text-green-500" />
                <div>
                  <div className="font-semibold">{metrics.validRecords.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Valid records</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IoWarningOutline className="h-6 w-6 text-yellow-500" />
                <div>
                  <div className="font-semibold">{metrics.recordsWithIssues.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Records with issues</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IoSearchOutline className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold">{Object.keys(metrics.issuesByType).length}</div>
                  <div className="text-sm text-muted-foreground">Issue types</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Countries */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Countries by Billionaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCountries.map(([country, count], index) => (
                <div key={country} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <span>{country}</span>
                  </div>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onViewChange?.('data-table')}
              >
                <IoGridOutline className="mr-2 h-4 w-4" />
                Browse Data Table
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onViewChange?.('visualizations')}
              >
                <IoStatsChartOutline className="mr-2 h-4 w-4" />
                View Visualizations
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onViewChange?.('data-quality')}
              >
                <IoSearchOutline className="mr-2 h-4 w-4" />
                Check Data Quality
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={onExportClick}
              >
                <IoDownloadOutline className="mr-2 h-4 w-4" />
                Export Dataset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}