'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { BillionaireRecord, FilterCriteria } from '@/types/billionaire'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Building, 
  User, 
  DollarSign,
  Bookmark,
  RotateCcw
} from 'lucide-react'
import { parseNetWorth, getCountries, getSources, getIndustryCategories, getRecordsByIndustry, getAgeRange, getNetWorthRange } from '@/data/billionaire-data'

interface AdvancedSearchProps {
  data: BillionaireRecord[]
  onFiltersChange: (filters: FilterCriteria) => void
  currentFilters: FilterCriteria
}

interface FilterPreset {
  name: string
  filters: FilterCriteria
  description: string
}

const DEFAULT_PRESETS: FilterPreset[] = [
  {
    name: "Tech Billionaires",
    description: "Technology industry leaders",
    filters: {
      search: "tech",
      sources: ["Technology", "Software", "E-commerce"]
    }
  },
  {
    name: "Young Entrepreneurs",
    description: "Under 50 years old",
    filters: {
      ageRange: [20, 50]
    }
  },
  {
    name: "US Billionaires",
    description: "Based in United States",
    filters: {
      countries: ["United States"]
    }
  },
  {
    name: "Top 100",
    description: "Highest ranked billionaires",
    filters: {
      netWorthRange: [50000, 500000] // In millions
    }
  }
]

export function AdvancedSearch({ data, onFiltersChange, currentFilters }: AdvancedSearchProps) {
  const [searchInput, setSearchInput] = useState(currentFilters.search || '')
  const [debouncedSearch, setDebouncedSearch] = useState(currentFilters.search || '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(currentFilters.countries || [])
  const [selectedSources, setSelectedSources] = useState<string[]>(currentFilters.sources || [])
  const [ageRange, setAgeRange] = useState<[number, number]>(() => currentFilters.ageRange || getAgeRange(data))
  const [netWorthRange, setNetWorthRange] = useState<[number, number]>(() => currentFilters.netWorthRange || getNetWorthRange(data))
  const [qualityFilters, setQualityFilters] = useState<string[]>(currentFilters.qualityStatus || [])
  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('billionaire-filter-presets')
      return saved ? JSON.parse(saved) : DEFAULT_PRESETS
    }
    return DEFAULT_PRESETS
  })

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
    }, 300) // 300ms debounce delay

    return () => clearTimeout(timer)
  }, [searchInput])

  // Get available options from data
  const countries = getCountries(data)
  const sources = getSources(data)
  const industries = getIndustryCategories(data)
  const dataAgeRange = getAgeRange(data)
  const dataNetWorthRange = getNetWorthRange(data)

  // Search suggestions based on billionaire names and sources
  const searchSuggestions = useMemo(() => {
    if (!searchInput || searchInput.length < 2) return []
    
    const query = searchInput.toLowerCase()
    const suggestions = new Set<string>()
    
    // Add matching billionaire names
    data.forEach(record => {
      if (record.name.toLowerCase().includes(query)) {
        suggestions.add(record.name)
      }
      // Add matching sources
      if (record.source.toLowerCase().includes(query)) {
        suggestions.add(record.source)
      }
      // Add matching countries
      if (record.country.toLowerCase().includes(query)) {
        suggestions.add(record.country)
      }
    })
    
    return Array.from(suggestions).slice(0, 8)
  }, [searchInput, data])

  // Update filters when any filter changes
  const updateFilters = useCallback(() => {
    const filters: FilterCriteria = {
      search: debouncedSearch || undefined,
      countries: selectedCountries.length > 0 ? selectedCountries : undefined,
      sources: selectedSources.length > 0 ? selectedSources : undefined,
      ageRange: (ageRange[0] !== dataAgeRange[0] || ageRange[1] !== dataAgeRange[1]) ? ageRange : undefined,
      netWorthRange: (netWorthRange[0] !== dataNetWorthRange[0] || netWorthRange[1] !== dataNetWorthRange[1]) ? netWorthRange : undefined,
      qualityStatus: qualityFilters.length > 0 ? qualityFilters as any : undefined
    }
    
    onFiltersChange(filters)
  }, [debouncedSearch, selectedCountries, selectedSources, ageRange, netWorthRange, qualityFilters, dataAgeRange, dataNetWorthRange, onFiltersChange])

  useEffect(() => {
    updateFilters()
  }, [updateFilters])

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchInput(suggestion)
    setShowSuggestions(false)
  }

  const handleCountryToggle = useCallback((country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    )
  }, [])

  const handleSourceToggle = useCallback((source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }, [])

  const handleQualityToggle = (quality: string) => {
    setQualityFilters(prev => 
      prev.includes(quality) 
        ? prev.filter(q => q !== quality)
        : [...prev, quality]
    )
  }

  const clearAllFilters = () => {
    setSearchInput('')
    setSelectedCountries([])
    setSelectedSources([])
    setAgeRange(dataAgeRange)
    setNetWorthRange(dataNetWorthRange)
    setQualityFilters([])
  }

  const saveCurrentAsPreset = () => {
    const presetName = prompt('Enter a name for this filter preset:')
    if (presetName) {
      const newPreset: FilterPreset = {
        name: presetName,
        description: `Custom preset created ${new Date().toLocaleDateString()}`,
        filters: {
          search: searchInput || undefined,
          countries: selectedCountries.length > 0 ? selectedCountries : undefined,
          sources: selectedSources.length > 0 ? selectedSources : undefined,
          ageRange: (ageRange[0] !== dataAgeRange[0] || ageRange[1] !== dataAgeRange[1]) ? ageRange : undefined,
          netWorthRange: (netWorthRange[0] !== dataNetWorthRange[0] || netWorthRange[1] !== dataNetWorthRange[1]) ? netWorthRange : undefined,
          qualityStatus: qualityFilters.length > 0 ? qualityFilters as any : undefined
        }
      }
      
      const updatedPresets = [...savedPresets, newPreset]
      setSavedPresets(updatedPresets)
      localStorage.setItem('billionaire-filter-presets', JSON.stringify(updatedPresets))
    }
  }

  const loadPreset = (preset: FilterPreset) => {
    setSearchInput(preset.filters.search || '')
    setSelectedCountries(preset.filters.countries || [])
    setSelectedSources(preset.filters.sources || [])
    setAgeRange(preset.filters.ageRange || dataAgeRange)
    setNetWorthRange(preset.filters.netWorthRange || dataNetWorthRange)
    setQualityFilters(preset.filters.qualityStatus || [])
  }

  const activeFiltersCount = [
    searchInput,
    selectedCountries.length > 0 ? 'countries' : null,
    selectedSources.length > 0 ? 'sources' : null,
    (ageRange[0] !== dataAgeRange[0] || ageRange[1] !== dataAgeRange[1]) ? 'age' : null,
    (netWorthRange[0] !== dataNetWorthRange[0] || netWorthRange[1] !== dataNetWorthRange[1]) ? 'networth' : null,
    qualityFilters.length > 0 ? 'quality' : null
  ].filter(Boolean).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={saveCurrentAsPreset}>
              <Bookmark className="h-4 w-4 mr-1" />
              Save Preset
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search with Autocomplete */}
        <div className="space-y-2">
          <Label htmlFor="search">
            Search
          </Label>
          <div className="relative">
            <Command className="rounded-lg border">
              <CommandInput
                placeholder="Search billionaires, companies, or countries..."
                value={searchInput}
                onValueChange={setSearchInput}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && searchSuggestions.length > 0 && (
                <CommandList className="border-t">
                  <CommandEmpty>No suggestions found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    {searchSuggestions.map((suggestion, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                        className="cursor-pointer"
                      >
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
          </div>
        </div>

        {/* Filter Presets */}
        <div className="space-y-2">
          <Label>Filter Presets</Label>
          <div className="flex flex-wrap gap-2">
            {savedPresets.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadPreset(preset)}
                className="text-xs"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Countries Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Countries ({selectedCountries.length} selected)
            </Label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {countries.slice(0, 20).map((country, index) => (
                <div key={`country-${country}-${index}`} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={selectedCountries.includes(country)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleCountryToggle(country)
                      } else {
                        handleCountryToggle(country)
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`country-${country}`} 
                    className="text-sm cursor-pointer"
                  >
                    {country.length > 15 ? country.substring(0, 15) + '...' : country}
                  </Label>
                </div>
              ))}
            </div>
            {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedCountries.map(country => (
                  <Badge key={country} variant="secondary" className="text-xs">
                    {country}
                    <button
                      onClick={() => handleCountryToggle(country)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Industries Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Industries ({selectedSources.length} selected)
            </Label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {industries.map((industry, index) => (
                <div key={`industry-${industry}-${index}`} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={selectedSources.includes(industry)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleSourceToggle(industry)
                      } else {
                        handleSourceToggle(industry)
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`industry-${industry}`} 
                    className="text-sm cursor-pointer"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
            {selectedSources.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedSources.map(industry => (
                  <Badge key={industry} variant="secondary" className="text-xs">
                    {industry}
                    <button
                      onClick={() => handleSourceToggle(industry)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Range Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Age Range: {ageRange[0]} - {ageRange[1]} years
            </Label>
            <div className="relative">
              <input
                type="range"
                min={dataAgeRange[0]}
                max={dataAgeRange[1]}
                value={ageRange[0]}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value)
                  setAgeRange([newMin, Math.max(newMin, ageRange[1])])
                }}
                className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 1 }}
              />
              <input
                type="range"
                min={dataAgeRange[0]}
                max={dataAgeRange[1]}
                value={ageRange[1]}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value)
                  setAgeRange([Math.min(ageRange[0], newMax), newMax])
                }}
                className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 2 }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{dataAgeRange[0]} years</span>
              <span>{dataAgeRange[1]} years</span>
            </div>
          </div>

          {/* Net Worth Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Net Worth: ${(netWorthRange[0] / 1000).toFixed(1)}B - ${(netWorthRange[1] / 1000).toFixed(1)}B
            </Label>
            <div className="relative">
              <input
                type="range"
                min={dataNetWorthRange[0]}
                max={dataNetWorthRange[1]}
                value={netWorthRange[0]}
                step={1000}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value)
                  setNetWorthRange([newMin, Math.max(newMin, netWorthRange[1])])
                }}
                className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 1 }}
              />
              <input
                type="range"
                min={dataNetWorthRange[0]}
                max={dataNetWorthRange[1]}
                value={netWorthRange[1]}
                step={1000}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value)
                  setNetWorthRange([Math.min(netWorthRange[0], newMax), newMax])
                }}
                className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 2 }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${(dataNetWorthRange[0] / 1000).toFixed(1)}B</span>
              <span>${(dataNetWorthRange[1] / 1000).toFixed(1)}B</span>
            </div>
          </div>
        </div>

        {/* Data Quality Filters */}
        <div className="space-y-3">
          <Label>Data Quality Status</Label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'valid', label: 'Valid Records', icon: '✅' },
              { value: 'warning', label: 'Records with Warnings', icon: '⚠️' },
              { value: 'error', label: 'Records with Errors', icon: '❌' }
            ].map(quality => (
              <div key={quality.value} className="flex items-center space-x-2">
                <Checkbox
                  id={quality.value}
                  checked={qualityFilters.includes(quality.value)}
                  onCheckedChange={() => handleQualityToggle(quality.value)}
                />
                <Label htmlFor={quality.value} className="text-sm cursor-pointer">
                  {quality.icon} {quality.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2">
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {searchInput && (
                <Badge variant="outline">
                  Search: "{searchInput}"
                  <button onClick={() => setSearchInput('')} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCountries.length > 0 && (
                <Badge variant="outline">
                  {selectedCountries.length} Countries
                  <button onClick={() => setSelectedCountries([])} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedSources.length > 0 && (
                <Badge variant="outline">
                  {selectedSources.length} Sources
                  <button onClick={() => setSelectedSources([])} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(ageRange[0] !== dataAgeRange[0] || ageRange[1] !== dataAgeRange[1]) && (
                <Badge variant="outline">
                  Age: {ageRange[0]}-{ageRange[1]}
                  <button onClick={() => setAgeRange(dataAgeRange)} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(netWorthRange[0] !== dataNetWorthRange[0] || netWorthRange[1] !== dataNetWorthRange[1]) && (
                <Badge variant="outline">
                  Worth: ${(netWorthRange[0] / 1000).toFixed(1)}B-${(netWorthRange[1] / 1000).toFixed(1)}B
                  <button onClick={() => setNetWorthRange(dataNetWorthRange)} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {qualityFilters.length > 0 && (
                <Badge variant="outline">
                  {qualityFilters.length} Quality Filters
                  <button onClick={() => setQualityFilters([])} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}