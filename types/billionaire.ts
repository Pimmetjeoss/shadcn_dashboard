export interface BillionaireRecord {
  rank: number
  name: string
  netWorth: string
  change: string
  percentageChange: string
  age: number
  source: string
  country: string
  // Data quality fields
  hasParsingIssue: boolean
  validationStatus: 'valid' | 'warning' | 'error'
  issues: DataQualityIssue[]
  // Additional fields for detailed view
  industry?: string
  city?: string
  selfMade?: boolean
  citizenship?: string
  education?: string
  maritalStatus?: string
  children?: number
  philanthropyScore?: number
  lastUpdated?: string
}

export interface DataQualityIssue {
  field: keyof BillionaireRecord
  type: 'parsing' | 'format' | 'missing' | 'encoding'
  severity: 'low' | 'medium' | 'high'
  description: string
  suggestion?: string
}

export interface DataQualityMetrics {
  totalRecords: number
  validRecords: number
  recordsWithIssues: number
  qualityScore: number
  issuesByType: Record<string, number>
  issuesBySeverity: Record<string, number>
}

export interface FilterCriteria {
  search?: string
  countries?: string[]
  ageRange?: [number, number]
  netWorthRange?: [number, number]
  sources?: string[]
  qualityStatus?: ('valid' | 'warning' | 'error')[]
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

export interface SortConfig {
  field: keyof BillionaireRecord
  direction: 'asc' | 'desc'
}