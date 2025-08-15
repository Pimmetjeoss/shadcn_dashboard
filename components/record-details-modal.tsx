'use client'

import { useState, useCallback } from 'react'
import { BillionaireRecord } from '@/types/billionaire'
import { CustomModal } from '@/components/ui/custom-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Building, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Users, 
  TrendingUp,
  Download,
  Eye,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface RecordDetailsModalProps {
  record: BillionaireRecord | null
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
  allRecords?: BillionaireRecord[]
}

export function RecordDetailsModal({ 
  record, 
  isOpen, 
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  allRecords 
}: RecordDetailsModalProps) {
  // Early returns BEFORE any hooks
  if (!record) return null
  if (!isOpen) return null
  
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getQualityIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const handleExportRecord = useCallback(() => {
    const exportData = {
      ...record,
      exportedAt: new Date().toISOString(),
      exportFormat
    }
    
    if (exportFormat === 'csv') {
      // Simple CSV export for single record
      const headers = Object.keys(exportData).join(',')
      const values = Object.values(exportData).map(v => 
        typeof v === 'string' && v.includes(',') ? `"${v}"` : v
      ).join(',')
      const csvContent = `${headers}\n${values}`
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `billionaire_${record.name.replace(/\s+/g, '_')}.csv`
      a.click()
    } else {
      // JSON export
      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `billionaire_${record.name.replace(/\s+/g, '_')}.json`
      a.click()
    }
  }, [record, exportFormat])

  const findSimilarRecords = useCallback(() => {
    if (!allRecords) return []
    
    return allRecords
      .filter(r => r.rank !== record.rank)
      .filter(r => 
        r.country === record.country || 
        r.source === record.source ||
        Math.abs(r.age - record.age) <= 5
      )
      .slice(0, 3)
  }, [allRecords, record])

  const handleViewSimilar = useCallback(() => {
    // This would typically open a filtered view or another modal
    console.log('View similar records:', findSimilarRecords())
  }, [findSimilarRecords])

  const handleReportIssue = useCallback(() => {
    // This would typically open a form or integrate with an issue tracking system
    alert(`Report issue for ${record.name} - This would open a feedback form`)
  }, [record])

  return (
    <CustomModal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-4xl"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(record.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{record.name}</h2>
                <p className="text-sm text-muted-foreground">Rank #{record.rank}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getQualityIcon(record.validationStatus)}
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                disabled={!hasPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNext}
                disabled={!hasNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Detailed information and data quality assessment
        </p>

        <div className="grid gap-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Net Worth</p>
                    <p className="text-2xl font-bold">{record.netWorth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`h-5 w-5 ${record.change.includes('-') ? 'text-red-500' : 'text-green-500'}`} />
                  <div>
                    <p className="text-sm font-medium">Change</p>
                    <p className="text-2xl font-bold">{record.change}</p>
                    <p className="text-sm text-muted-foreground">{record.percentageChange}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-2xl font-bold">{record.age}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Source:</span>
                  <span className="text-sm">{record.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Country:</span>
                  <span className="text-sm">{record.country}</span>
                </div>
                {record.industry && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Industry:</span>
                    <span className="text-sm">{record.industry}</span>
                  </div>
                )}
                {record.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">City:</span>
                    <span className="text-sm">{record.city}</span>
                  </div>
                )}
                {record.education && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Education:</span>
                    <span className="text-sm">{record.education}</span>
                  </div>
                )}
                {record.maritalStatus && (
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Marital Status:</span>
                    <span className="text-sm">{record.maritalStatus}</span>
                  </div>
                )}
                {record.children !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Children:</span>
                    <span className="text-sm">{record.children}</span>
                  </div>
                )}
                {record.selfMade !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Self-made:</span>
                    <Badge variant={record.selfMade ? "default" : "secondary"}>
                      {record.selfMade ? "Yes" : "No"}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Quality Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getQualityIcon(record.validationStatus)}
                Data Quality Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Status:</span>
                  <Badge variant={
                    record.validationStatus === 'valid' ? 'default' :
                    record.validationStatus === 'warning' ? 'secondary' : 'destructive'
                  }>
                    {record.validationStatus.toUpperCase()}
                  </Badge>
                </div>
                
                {record.issues.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Issues Found:</p>
                    {record.issues.map((issue, index) => (
                      <Alert key={index} variant={issue.severity === 'high' ? 'destructive' : 'default'}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-sm">{issue.field} - {issue.type}</AlertTitle>
                        <AlertDescription className="text-sm">
                          {issue.description}
                          {issue.suggestion && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              Suggestion: {issue.suggestion}
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle className="text-sm">All fields validated</AlertTitle>
                    <AlertDescription className="text-sm">
                      No data quality issues detected for this record.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExportRecord} variant="default">
              <Download className="h-4 w-4 mr-2" />
              Export Record
            </Button>
            <Button onClick={handleViewSimilar} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Similar ({findSimilarRecords().length})
            </Button>
            <Button onClick={handleReportIssue} variant="outline">
              <Flag className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}