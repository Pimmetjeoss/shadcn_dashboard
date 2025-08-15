import Papa from 'papaparse'
import { BillionaireRecord, DataQualityIssue, DataQualityMetrics } from '@/types/billionaire'

// Optimized version with reduced memory allocation
function simulateDataQualityIssuesOptimized(record: any, index: number): {
  record: BillionaireRecord
  issues: DataQualityIssue[]
} {
  // Reduce simulation frequency to save memory
  const issues: DataQualityIssue[] = []
  let hasParsingIssue = false

  // Convert basic fields
  const rank = parseInt(record.Rank) || 0
  const name = record.Name || ''
  let netWorth = record['Net Worth'] || ''
  const change = record.Change || ''
  const percentageChange = record['Percentage Change'] || ''
  const age = parseInt(record.Age) || 0
  const source = record.Source || ''
  const country = record['Country/Territory'] || ''

  // Simplified validation - only check critical issues to reduce memory usage
  // Reduce simulation rate from 1.5% to 0.5% to save memory
  if (Math.random() < 0.005 && netWorth.includes('$') && netWorth.includes('B')) {
    hasParsingIssue = true
    issues.push({
      field: 'netWorth',
      type: 'parsing',
      severity: 'high',
      description: 'Currency format issue',
      suggestion: 'Review format'
    })
  }

  // Simplified encoding check - reduce from 0.5% to 0.1%
  if (Math.random() < 0.001 && (name.includes('é') || name.includes('ñ'))) {
    hasParsingIssue = true
    issues.push({
      field: 'name',
      type: 'encoding',
      severity: 'medium',
      description: 'Encoding issue',
      suggestion: 'Check character encoding'
    })
  }

  // Determine validation status
  let validationStatus: 'valid' | 'warning' | 'error' = 'valid'
  if (issues.some(issue => issue.severity === 'high')) {
    validationStatus = 'error'
  } else if (issues.length > 0) {
    validationStatus = 'warning'
  }

  const processedRecord: BillionaireRecord = {
    rank,
    name,
    netWorth,
    change,
    percentageChange,
    age,
    source,
    country,
    hasParsingIssue,
    validationStatus,
    issues
  }

  return { record: processedRecord, issues }
}

// Keep original function for backward compatibility
function simulateDataQualityIssues(record: any, index: number): {
  record: BillionaireRecord
  issues: DataQualityIssue[]
} {
  const issues: DataQualityIssue[] = []
  let hasParsingIssue = false

  // Convert basic fields
  const rank = parseInt(record.Rank) || 0
  const name = record.Name || ''
  let netWorth = record['Net Worth'] || ''
  const change = record.Change || ''
  const percentageChange = record['Percentage Change'] || ''
  const age = parseInt(record.Age) || 0
  const source = record.Source || ''
  const country = record['Country/Territory'] || ''

  // Simulate currency parsing issues (about 1.5% of records)
  if (Math.random() < 0.015) {
    if (netWorth.includes('$') && netWorth.includes('B')) {
      // Simulate various currency format issues
      const issueTypes = [
        () => netWorth.replace('$', '').replace('B', 'B$'), // "$219.0 B" -> "219.0B$"
        () => netWorth.replace('$', 'USD ').replace(' B', 'B'), // "$219.0 B" -> "USD 219.0B"
        () => netWorth.replace('$', '').replace('B', ' billion'), // "$219.0 B" -> "219.0 billion"
        () => netWorth.replace('.', ','), // European decimal format
      ]
      const randomIssue = issueTypes[Math.floor(Math.random() * issueTypes.length)]
      netWorth = randomIssue()
      hasParsingIssue = true
      issues.push({
        field: 'netWorth',
        type: 'parsing',
        severity: 'high',
        description: 'Currency format inconsistency detected',
        suggestion: `Convert to standard format: ${record['Net Worth']}`
      })
    }
  }

  // Simulate character encoding issues (about 0.5% of records)
  if (Math.random() < 0.005 && name.length > 0) {
    // Simulate encoding issues with international names
    const encodingIssues = [
      (str: string) => str.replace(/é/g, 'Ã©').replace(/ñ/g, 'Ã±'),
      (str: string) => str.replace(/ü/g, 'Ã¼').replace(/ö/g, 'Ã¶'),
      (str: string) => str.replace(/ç/g, 'Ã§').replace(/á/g, 'Ã¡'),
    ]
    if (name.includes('é') || name.includes('ñ') || name.includes('ü') || name.includes('ö')) {
      const randomEncoding = encodingIssues[Math.floor(Math.random() * encodingIssues.length)]
      const corruptedName = randomEncoding(name)
      hasParsingIssue = true
      issues.push({
        field: 'name',
        type: 'encoding',
        severity: 'medium',
        description: 'Character encoding issue detected',
        suggestion: `Correct encoding: ${name}`
      })
    }
  }

  // Simulate missing data (about 0.3% of records)
  if (Math.random() < 0.003) {
    const fieldsToCorrupt = ['change', 'percentageChange', 'age']
    const fieldToCorrupt = fieldsToCorrupt[Math.floor(Math.random() * fieldsToCorrupt.length)]
    if (fieldToCorrupt === 'age' && age > 0) {
      hasParsingIssue = true
      issues.push({
        field: 'age',
        type: 'missing',
        severity: 'low',
        description: 'Age data missing or invalid',
        suggestion: 'Verify age information from source'
      })
    }
  }

  // Simulate special character issues in source field (about 0.8% of records)
  if (Math.random() < 0.008 && source.includes(',')) {
    hasParsingIssue = true
    issues.push({
      field: 'source',
      type: 'format',
      severity: 'low',
      description: 'Special characters in source field may cause parsing issues',
      suggestion: 'Review field formatting'
    })
  }

  // Determine validation status
  let validationStatus: 'valid' | 'warning' | 'error' = 'valid'
  if (issues.some(issue => issue.severity === 'high')) {
    validationStatus = 'error'
  } else if (issues.length > 0) {
    validationStatus = 'warning'
  }

  const processedRecord: BillionaireRecord = {
    rank,
    name,
    netWorth,
    change,
    percentageChange,
    age,
    source,
    country,
    hasParsingIssue,
    validationStatus,
    issues
  }

  return { record: processedRecord, issues }
}

interface DataLoadProgress {
  loaded: number
  total: number
  percentage: number
}

export async function loadBillionaireDataInChunks(
  chunkSize: number = 500,
  onProgress?: (progress: DataLoadProgress) => void
): Promise<BillionaireRecord[]> {
  try {
    // Read the CSV file
    const response = await fetch('/forbes_dataset.csv')
    const csvText = await response.text()
    
    // Parse CSV headers first
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      preview: 1 // Just get headers and first row
    })

    // Get total row count for progress tracking
    const lines = csvText.split('\n').filter(line => line.trim())
    const totalRows = lines.length - 1 // Subtract header row

    const records: BillionaireRecord[] = []
    let processedRows = 0

    // Process in chunks to avoid memory issues
    for (let offset = 0; offset < totalRows; offset += chunkSize) {
      // Parse chunk
      const chunkData = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim(),
        preview: chunkSize,
        step: (row: any, parser: any) => {
          if (processedRows < offset) {
            processedRows++
            return // Skip until we reach the offset
          }
          
          if (row.data && row.data.Rank) {
            const { record } = simulateDataQualityIssuesOptimized(row.data, processedRows)
            records.push(record)
          }
          processedRows++

          // Report progress
          if (onProgress && processedRows % 100 === 0) {
            onProgress({
              loaded: processedRows,
              total: totalRows,
              percentage: Math.round((processedRows / totalRows) * 100)
            })
          }
        }
      })

      // Allow browser to breathe between chunks
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    console.log(`Loaded ${records.length} billionaire records in chunks`)
    return records
  } catch (error) {
    console.error('Error loading billionaire data:', error)
    return []
  }
}

// Fallback for the original function with smaller initial load
export async function loadBillionaireData(): Promise<BillionaireRecord[]> {
  try {
    // Load only first 1000 records initially to prevent memory issues
    const response = await fetch('/forbes_dataset.csv')
    const csvText = await response.text()
    
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      preview: 1000 // Limit to first 1000 records
    })

    const records: BillionaireRecord[] = []
    
    parsed.data.forEach((row: any, index: number) => {
      if (row && row.Rank) {
        const { record } = simulateDataQualityIssuesOptimized(row, index)
        records.push(record)
      }
    })

    console.log(`Loaded ${records.length} billionaire records (limited for performance)`)
    return records
  } catch (error) {
    console.error('Error loading billionaire data:', error)
    return []
  }
}

export function calculateDataQualityMetrics(records: BillionaireRecord[]): DataQualityMetrics {
  const totalRecords = records.length
  const validRecords = records.filter(r => r.validationStatus === 'valid').length
  const recordsWithIssues = records.filter(r => r.issues.length > 0).length
  
  const qualityScore = Math.round((validRecords / totalRecords) * 100 * 10) / 10
  
  const issuesByType: Record<string, number> = {}
  const issuesBySeverity: Record<string, number> = {}
  
  records.forEach(record => {
    record.issues.forEach(issue => {
      issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1
      issuesBySeverity[issue.severity] = (issuesBySeverity[issue.severity] || 0) + 1
    })
  })
  
  return {
    totalRecords,
    validRecords,
    recordsWithIssues,
    qualityScore,
    issuesByType,
    issuesBySeverity
  }
}

export function getCountries(records: BillionaireRecord[]): string[] {
  const countries = new Set(records.map(r => r.country).filter(Boolean))
  return Array.from(countries).sort()
}

// Industry mapping for better categorization
const INDUSTRY_MAPPING: Record<string, string> = {
  'Tesla, SpaceX': 'Technology',
  'Oracle': 'Technology', 
  'Facebook': 'Technology',
  'Amazon': 'Technology',
  'Google': 'Technology',
  'Microsoft': 'Technology',
  'Semiconductors': 'Technology',
  'Dell Technologies': 'Technology',
  'Bloomberg LP': 'Technology',
  'TikTok': 'Technology',
  'Online games': 'Technology',
  'E-commerce': 'Technology',
  'Cryptocurrency exchange': 'Technology',
  'Smartphones, automobiles': 'Technology',
  'Batteries': 'Technology',
  'LVMH': 'Luxury Goods',
  'Zara': 'Fashion & Retail',
  'Fashion retail': 'Fashion & Retail',
  'Retail': 'Fashion & Retail',
  'Walmart': 'Retail',
  'Aldi, Trader Joe\'s': 'Retail',
  'Berkshire Hathaway': 'Investments',
  'Investments': 'Investments',
  'Trading, investments': 'Investments',
  'Hedge funds': 'Investments',
  'Discount brokerage': 'Investments',
  'Diversified': 'Investments',
  'Koch, Inc.': 'Energy & Chemicals',
  'Steel': 'Manufacturing',
  'Aluminum': 'Manufacturing',
  'Aluminum products': 'Manufacturing',
  'Fasteners': 'Manufacturing',
  'Nutella, chocolates': 'Food & Beverages',
  'Candy, pet food': 'Food & Beverages',
  'Red Bull': 'Food & Beverages',
  'Beverages, pharmaceuticals': 'Food & Beverages',
  'Alcoholic beverages': 'Food & Beverages',
  'Telecom': 'Telecommunications',
  'Telecom, Investments': 'Telecommunications',
  'Shipping': 'Transportation',
  'Airline': 'Transportation',
  'Aircraft leasing': 'Transportation',
  'L\'Oréal': 'Consumer Goods',
  'Apparel': 'Consumer Goods',
  'Infrastructure, commodities': 'Infrastructure',
  'Utilities': 'Infrastructure'
}

export function getSources(records: BillionaireRecord[]): string[] {
  const sources = new Set(records.map(r => r.source).filter(Boolean))
  return Array.from(sources).sort()
}

export function getIndustryCategories(records: BillionaireRecord[]): string[] {
  const industries = new Set<string>()
  
  records.forEach(record => {
    if (record.source) {
      const industry = INDUSTRY_MAPPING[record.source] || 'Other'
      industries.add(industry)
    }
  })
  
  return Array.from(industries).sort()
}

export function getRecordsByIndustry(records: BillionaireRecord[], industry: string): BillionaireRecord[] {
  return records.filter(record => {
    const recordIndustry = INDUSTRY_MAPPING[record.source] || 'Other'
    return recordIndustry === industry
  })
}

export function getAgeRange(records: BillionaireRecord[]): [number, number] {
  const ages = records.map(r => r.age).filter(age => age > 0)
  return [Math.min(...ages), Math.max(...ages)]
}

export function parseNetWorth(netWorth: string): number {
  // Extract numeric value from net worth string like "$219.0 B"
  const match = netWorth.match(/[\d,]+\.?\d*/);
  if (match) {
    const value = parseFloat(match[0].replace(/,/g, ''));
    if (netWorth.includes('B')) {
      return value * 1000; // Convert billions to millions for easier comparison
    }
    return value;
  }
  return 0;
}

export function getNetWorthRange(records: BillionaireRecord[]): [number, number] {
  const netWorths = records.map(r => parseNetWorth(r.netWorth)).filter(nw => nw > 0)
  return [Math.min(...netWorths), Math.max(...netWorths)]
}