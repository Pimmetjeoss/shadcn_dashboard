'use client'

import React, { useState, useMemo } from 'react'
import { BillionaireRecord, FilterCriteria, PaginationState, SortConfig } from '@/types/billionaire'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { getCountries, getSources } from '@/data/billionaire-data'
import { AdvancedSearch } from '@/components/advanced-search'
import { Download } from 'lucide-react'

interface DataTableProps {
  data: BillionaireRecord[]
  onRecordSelect?: (record: BillionaireRecord) => void
  onExportClick?: () => void
  onFiltersChange?: (filters: FilterCriteria) => void
  onFilteredDataChange?: (data: BillionaireRecord[]) => void
  pendingSearch?: string
  onSearchApplied?: () => void
}

export function DataTable({ 
  data, 
  onRecordSelect, 
  onExportClick, 
  onFiltersChange, 
  onFilteredDataChange,
  pendingSearch,
  onSearchApplied
}: DataTableProps) {
  const [filters, setFilters] = useState<FilterCriteria>({})
  const [sort, setSort] = useState<SortConfig>({ field: 'rank', direction: 'asc' })
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 50,
    totalPages: 1,
    totalRecords: 0
  })

  const countries = getCountries(data)
  const sources = getSources(data)

  // Handle pending search from overview page
  React.useEffect(() => {
    if (pendingSearch) {
      console.log('DataTable: Applying pending search:', pendingSearch)
      setFilters(prev => ({ ...prev, search: pendingSearch }))
      onSearchApplied?.()
    }
  }, [pendingSearch, onSearchApplied])

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...data]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(searchTerm) ||
        record.source.toLowerCase().includes(searchTerm) ||
        record.country.toLowerCase().includes(searchTerm)
      )
    }

    // Apply country filter
    if (filters.countries?.length) {
      filtered = filtered.filter(record => 
        filters.countries!.includes(record.country)
      )
    }

    // Apply age range filter
    if (filters.ageRange) {
      const [minAge, maxAge] = filters.ageRange
      filtered = filtered.filter(record => 
        record.age >= minAge && record.age <= maxAge
      )
    }

    // Apply quality status filter
    if (filters.qualityStatus?.length) {
      filtered = filtered.filter(record =>
        filters.qualityStatus!.includes(record.validationStatus)
      )
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sort.field]
      let bValue = b[sort.field]

      // Handle special sorting for rank and age (numeric)
      if (sort.field === 'rank' || sort.field === 'age') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (!aValue || !bValue) return 0
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [data, filters, sort])

  // Notify parent components about filter changes
  React.useEffect(() => {
    onFiltersChange?.(filters)
    onFilteredDataChange?.(filteredData)
  }, [filters, filteredData, onFiltersChange, onFilteredDataChange])

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pagination.pageSize)
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const handleSort = (field: keyof BillionaireRecord) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getStatusBadge = (record: BillionaireRecord) => {
    switch (record.validationStatus) {
      case 'valid':
        return <Badge variant="success">✅</Badge>
      case 'warning':
        return <Badge variant="warning">⚠️</Badge>
      case 'error':
        return <Badge variant="error">❌</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Table</h1>
          <p className="text-muted-foreground">
            Browse and filter {data.length.toLocaleString()} billionaire records
          </p>
        </div>
      </div>

      {/* Advanced Search & Filters */}
      <AdvancedSearch 
        data={data}
        onFiltersChange={setFilters}
        currentFilters={filters}
      />

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length.toLocaleString()} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onExportClick}
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.currentPage === 1}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {pagination.currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.currentPage === totalPages}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('rank')}
                >
                  Rank {sort.field === 'rank' && (sort.direction === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name')}
                >
                  Name {sort.field === 'name' && (sort.direction === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('netWorth')}
                >
                  Net Worth {sort.field === 'netWorth' && (sort.direction === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Change</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('age')}
                >
                  Age {sort.field === 'age' && (sort.direction === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('country')}
                >
                  Country {sort.field === 'country' && (sort.direction === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((record) => (
                <TableRow 
                  key={record.rank}
                  className="cursor-pointer"
                  onClick={() => onRecordSelect?.(record)}
                >
                  <TableCell>{getStatusBadge(record)}</TableCell>
                  <TableCell className="font-medium">{record.rank}</TableCell>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.netWorth}</TableCell>
                  <TableCell className={
                    record.change.includes('-') ? 'text-red-600' : 'text-green-600'
                  }>
                    {record.change}
                  </TableCell>
                  <TableCell>{record.age}</TableCell>
                  <TableCell className="max-w-40 truncate">{record.source}</TableCell>
                  <TableCell>{record.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          disabled={pagination.currentPage === 1}
          onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
        >
          First
        </Button>
        <Button
          variant="outline"
          disabled={pagination.currentPage === 1}
          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = pagination.currentPage - 2 + i
            if (pageNum < 1 || pageNum > totalPages) return null
            return (
              <Button
                key={pageNum}
                variant={pageNum === pagination.currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, currentPage: pageNum }))}
              >
                {pageNum}
              </Button>
            )
          })}
        </div>
        <Button
          variant="outline"
          disabled={pagination.currentPage === totalPages}
          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
        >
          Next
        </Button>
        <Button
          variant="outline"
          disabled={pagination.currentPage === totalPages}
          onClick={() => setPagination(prev => ({ ...prev, currentPage: totalPages }))}
        >
          Last
        </Button>
      </div>
    </div>
  )
}