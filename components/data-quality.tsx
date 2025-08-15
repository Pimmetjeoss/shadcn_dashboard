'use client'

import { BillionaireRecord, DataQualityMetrics } from '@/types/billionaire'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

interface DataQualityProps {
  data: BillionaireRecord[]
  metrics: DataQualityMetrics | null
  onExportClick?: () => void
}

export function DataQuality({ data, metrics, onExportClick }: DataQualityProps) {
  // Get records with issues
  const recordsWithIssues = data.filter(record => record.issues.length > 0)
  
  const handleFixIssue = (record: BillionaireRecord, issueIndex: number) => {
    // This would typically integrate with a backend API to fix the issue
    alert(`Fixing issue for ${record.name}: ${record.issues[issueIndex].description}`)
    console.log('Fix issue:', record, issueIndex)
  }
  
  const handleIgnoreIssue = (record: BillionaireRecord, issueIndex: number) => {
    // This would typically mark the issue as ignored in the backend
    alert(`Ignoring issue for ${record.name}: ${record.issues[issueIndex].description}`)
    console.log('Ignore issue:', record, issueIndex)
  }
  
  const handleApplyAllFixes = () => {
    const totalIssues = recordsWithIssues.reduce((sum, record) => sum + record.issues.length, 0)
    alert(`This would apply automatic fixes to ${totalIssues} issues across ${recordsWithIssues.length} records. Feature coming soon!`)
    console.log('Apply all fixes requested')
  }
  
  // Group issues by type
  const issuesByType = recordsWithIssues.reduce((acc, record) => {
    record.issues.forEach(issue => {
      if (!acc[issue.type]) {
        acc[issue.type] = []
      }
      acc[issue.type].push({ record, issue })
    })
    return acc
  }, {} as Record<string, Array<{ record: BillionaireRecord; issue: any }>>)

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="error">High</Badge>
      case 'medium':
        return <Badge variant="warning">Medium</Badge>
      case 'low':
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Quality Management</h1>
          <p className="text-muted-foreground">
            Assessment and management of data quality issues
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApplyAllFixes}>Apply All Fixes</Button>
          <Button variant="outline" onClick={onExportClick}>Export Clean Data</Button>
        </div>
      </div>

      {/* Quality Overview */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Overall Quality Score
              <Badge variant={metrics.qualityScore >= 95 ? "success" : "warning"}>
                {metrics.qualityScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{metrics.validRecords}</div>
                <div className="text-sm text-muted-foreground">Valid Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{metrics.recordsWithIssues}</div>
                <div className="text-sm text-muted-foreground">Records with Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Object.keys(metrics.issuesByType).length}</div>
                <div className="text-sm text-muted-foreground">Issue Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{metrics.totalRecords}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues by Type */}
      <div className="grid gap-6">
        {Object.entries(issuesByType).map(([issueType, issues]) => (
          <Card key={issueType}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {issueType.charAt(0).toUpperCase() + issueType.slice(1)} Issues
                <Badge variant="secondary">{issues.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Suggestion</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.slice(0, 5).map(({ record, issue }, index) => {
                    const issueIndex = record.issues.findIndex(i => i === issue)
                    return (
                      <TableRow key={`${record.rank}-${issueIndex}`}>
                        <TableCell className="font-medium">
                          {record.name} (#{record.rank})
                        </TableCell>
                        <TableCell>{issue.field}</TableCell>
                        <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                        <TableCell className="max-w-60 truncate">
                          {issue.description}
                        </TableCell>
                        <TableCell className="max-w-60 truncate text-sm text-muted-foreground">
                          {issue.suggestion || 'No suggestion available'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFixIssue(record, issueIndex)}
                            >
                              Fix
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleIgnoreIssue(record, issueIndex)}
                            >
                              Ignore
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              {issues.length > 5 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    Show {issues.length - 5} more issues
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Issues */}
      {recordsWithIssues.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-lg font-semibold mb-2">Excellent Data Quality!</h3>
            <p className="text-muted-foreground">
              No data quality issues were found in the current dataset. All records have been validated successfully.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}