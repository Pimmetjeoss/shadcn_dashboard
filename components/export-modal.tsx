'use client'

import { useState, useEffect } from 'react'
import { BillionaireRecord } from '@/types/billionaire'
import { CustomModal } from '@/components/ui/custom-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  FileJson,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  data: BillionaireRecord[]
  filteredData?: BillionaireRecord[]
  title?: string
}

interface ExportOptions {
  format: 'csv' | 'json' | 'excel'
  columns: string[]
  includeDataQuality: boolean
  excludeErrorRecords: boolean
  addValidationColumn: boolean
}

const AVAILABLE_COLUMNS = [
  { key: 'rank', label: 'Rank', essential: true },
  { key: 'name', label: 'Name', essential: true },
  { key: 'netWorth', label: 'Net Worth', essential: true },
  { key: 'change', label: 'Change', essential: false },
  { key: 'percentageChange', label: 'Percentage Change', essential: false },
  { key: 'age', label: 'Age', essential: false },
  { key: 'source', label: 'Source', essential: false },
  { key: 'country', label: 'Country/Territory', essential: false },
  { key: 'industry', label: 'Industry', essential: false },
  { key: 'city', label: 'City', essential: false },
  { key: 'selfMade', label: 'Self-made', essential: false },
  { key: 'education', label: 'Education', essential: false },
  { key: 'maritalStatus', label: 'Marital Status', essential: false },
  { key: 'children', label: 'Children', essential: false },
]

export function ExportModal({ 
  isOpen, 
  onClose, 
  data, 
  filteredData,
  title = "Export Data"
}: ExportModalProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    columns: AVAILABLE_COLUMNS.filter(col => col.essential).map(col => col.key),
    includeDataQuality: true,
    excludeErrorRecords: false,
    addValidationColumn: false
  })
  
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStatus, setExportStatus] = useState<'idle' | 'processing' | 'complete' | 'error'>('idle')

  const exportData = filteredData || data
  const recordsToExport = options.excludeErrorRecords 
    ? exportData.filter(record => record.validationStatus !== 'error')
    : exportData

  const errorRecordsCount = exportData.filter(record => record.validationStatus === 'error').length

  useEffect(() => {
    if (exportProgress === 100 && exportStatus === 'processing') {
      setTimeout(() => {
        setExportStatus('complete')
        setExportProgress(0)
        setIsExporting(false)
      }, 500)
    }
  }, [exportProgress, exportStatus])

  const handleColumnToggle = (columnKey: string, checked: boolean) => {
    setOptions(prev => ({
      ...prev,
      columns: checked 
        ? [...prev.columns, columnKey]
        : prev.columns.filter(col => col !== columnKey)
    }))
  }

  const selectAllColumns = () => {
    setOptions(prev => ({
      ...prev,
      columns: AVAILABLE_COLUMNS.map(col => col.key)
    }))
  }

  const selectEssentialColumns = () => {
    setOptions(prev => ({
      ...prev,
      columns: AVAILABLE_COLUMNS.filter(col => col.essential).map(col => col.key)
    }))
  }

  const processExportData = () => {
    let processedData = recordsToExport.map(record => {
      const exportRecord: any = {}
      
      // Include selected columns
      options.columns.forEach(column => {
        if (column in record) {
          exportRecord[column] = (record as any)[column]
        }
      })

      // Add data quality information if requested
      if (options.includeDataQuality) {
        exportRecord.dataQualityFlags = record.issues.map(issue => 
          `${issue.field}:${issue.type}:${issue.severity}`
        ).join(';')
      }

      // Add validation status column if requested
      if (options.addValidationColumn) {
        exportRecord.validationStatus = record.validationStatus
        exportRecord.hasIssues = record.issues.length > 0
        exportRecord.issueCount = record.issues.length
      }

      return exportRecord
    })

    return processedData
  }

  const simulateProgress = () => {
    setExportProgress(0)
    setExportStatus('processing')
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)
  }

  const handleExport = async () => {
    setIsExporting(true)
    simulateProgress()

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate processing time
      
      const processedData = processExportData()
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      
      if (options.format === 'csv') {
        const csv = Papa.unparse(processedData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
        saveAs(blob, `forbes_billionaires_${timestamp}.csv`)
      } else if (options.format === 'json') {
        const json = JSON.stringify({
          exportInfo: {
            title: title,
            exportedAt: new Date().toISOString(),
            totalRecords: processedData.length,
            originalDataset: data.length,
            filters: filteredData ? 'Applied' : 'None',
            options: options
          },
          data: processedData
        }, null, 2)
        const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
        saveAs(blob, `forbes_billionaires_${timestamp}.json`)
      } else if (options.format === 'excel') {
        // For Excel, we'll export as CSV with Excel-friendly formatting
        const csv = Papa.unparse(processedData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
        saveAs(blob, `forbes_billionaires_${timestamp}.xlsx`)
      }
      
    } catch (error) {
      setExportStatus('error')
      console.error('Export failed:', error)
    }
  }

  return (
    <CustomModal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-3xl"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Download className="h-5 w-5" />
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure your export options and download the billionaire dataset
          </p>
        </div>

        <div className="space-y-6">
          {/* Export Format */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Format</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={options.format} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, format: value as any }))}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    CSV (Recommended)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer">
                    <FileJson className="h-4 w-4" />
                    JSON
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center gap-2 cursor-pointer">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel (.xlsx)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Column Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Column Selection
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectEssentialColumns}>
                    Essential Only
                  </Button>
                  <Button variant="outline" size="sm" onClick={selectAllColumns}>
                    Select All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AVAILABLE_COLUMNS.map(column => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={column.key}
                      checked={options.columns.includes(column.key)}
                      onCheckedChange={(checked) => handleColumnToggle(column.key, !!checked)}
                    />
                    <Label 
                      htmlFor={column.key} 
                      className={`text-sm cursor-pointer ${column.essential ? 'font-medium' : ''}`}
                    >
                      {column.label}
                      {column.essential && <span className="text-xs text-muted-foreground ml-1">(Essential)</span>}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Quality Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Quality Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeDataQuality"
                  checked={options.includeDataQuality}
                  onCheckedChange={(checked) => setOptions(prev => ({ 
                    ...prev, 
                    includeDataQuality: !!checked 
                  }))}
                />
                <Label htmlFor="includeDataQuality" className="text-sm cursor-pointer">
                  Include data quality flags in export
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="excludeErrorRecords"
                  checked={options.excludeErrorRecords}
                  onCheckedChange={(checked) => setOptions(prev => ({ 
                    ...prev, 
                    excludeErrorRecords: !!checked 
                  }))}
                />
                <Label htmlFor="excludeErrorRecords" className="text-sm cursor-pointer">
                  Exclude records with parsing errors
                  {errorRecordsCount > 0 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({errorRecordsCount} records)
                    </span>
                  )}
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="addValidationColumn"
                  checked={options.addValidationColumn}
                  onCheckedChange={(checked) => setOptions(prev => ({ 
                    ...prev, 
                    addValidationColumn: !!checked 
                  }))}
                />
                <Label htmlFor="addValidationColumn" className="text-sm cursor-pointer">
                  Add validation status column
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Export Summary */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Export Summary:</strong> {recordsToExport.length.toLocaleString()} records to export
              {filteredData && (
                <span className="text-muted-foreground ml-1">
                  (filtered from {data.length.toLocaleString()} total)
                </span>
              )}
            </AlertDescription>
          </Alert>

          {/* Export Progress */}
          {isExporting && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Export Progress</span>
                    <span>{Math.round(exportProgress)}%</span>
                  </div>
                  <Progress value={exportProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    {exportStatus === 'processing' && 'Processing data...'}
                    {exportStatus === 'complete' && 'Export completed successfully!'}
                    {exportStatus === 'error' && 'Export failed. Please try again.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            disabled={isExporting || options.columns.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}