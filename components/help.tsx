'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Download, 
  Filter, 
  Table, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  Key,
  HelpCircle,
  ExternalLink,
  Lightbulb
} from 'lucide-react'
import { 
  IoHomeOutline,
  IoGridOutline,
  IoStatsChartOutline,
  IoSearchOutline,
  IoDownloadOutline,
  IoHelpCircleOutline,
  IoDocumentTextOutline,
  IoDocumentOutline,
  IoLockClosedOutline,
  IoFlashOutline,
  IoBrushOutline
} from 'react-icons/io5'

export function Help() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Documentation</h1>
          <p className="text-muted-foreground">
            Complete guide to using the Forbes Billionaire Dataset Viewer
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <Badge className="mt-1">1</Badge>
                <div>
                  <p className="font-medium">Explore the Overview</p>
                  <p className="text-sm text-muted-foreground">Start with key metrics, top countries, and data quality status</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="mt-1">2</Badge>
                <div>
                  <p className="font-medium">Search & Filter Data</p>
                  <p className="text-sm text-muted-foreground">Use the search bar or advanced filters to find specific billionaires</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="mt-1">3</Badge>
                <div>
                  <p className="font-medium">Browse Data Table</p>
                  <p className="text-sm text-muted-foreground">Click on any record to view detailed information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="mt-1">4</Badge>
                <div>
                  <p className="font-medium">Export Your Findings</p>
                  <p className="text-sm text-muted-foreground">Export filtered data in CSV, JSON, or Excel formats</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Navigation & Views
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 dark:bg-blue-900">
                    <IoHomeOutline className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Overview</p>
                    <p className="text-xs text-muted-foreground">Key metrics and search</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-green-100 dark:bg-green-900">
                    <IoGridOutline className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Data Table</p>
                    <p className="text-xs text-muted-foreground">Browse and filter records</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-100 dark:bg-purple-900">
                    <IoStatsChartOutline className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Visualizations</p>
                    <p className="text-xs text-muted-foreground">Charts and graphs</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-yellow-100 dark:bg-yellow-900">
                    <IoSearchOutline className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Data Quality</p>
                    <p className="text-xs text-muted-foreground">Assessment and issues</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-red-100 dark:bg-red-900">
                    <IoDownloadOutline className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Export</p>
                    <p className="text-xs text-muted-foreground">Download data</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 dark:bg-gray-900">
                    <IoHelpCircleOutline className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Help</p>
                    <p className="text-xs text-muted-foreground">This page</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filtering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Quick Search (Overview Page)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Search billionaire names, companies, or countries. Click suggestions or press Enter to view results.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Advanced Filtering (Data Table)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li><strong>Text Search:</strong> Find by name, source, or country</li>
                  <li><strong>Country Filter:</strong> Select multiple countries</li>
                  <li><strong>Source/Industry:</strong> Filter by wealth source</li>
                  <li><strong>Age Range:</strong> Use sliders to set age limits</li>
                  <li><strong>Net Worth Range:</strong> Filter by wealth levels</li>
                  <li><strong>Data Quality:</strong> Show only valid/error records</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Filter Presets</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">Tech Billionaires</Badge>
                  <Badge variant="outline">Young Entrepreneurs</Badge>
                  <Badge variant="outline">US Billionaires</Badge>
                  <Badge variant="outline">Top 100</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use presets for common searches, or save your own custom filters
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Data Table Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Sorting</h4>
                <p className="text-sm text-muted-foreground">
                  Click column headers to sort by rank, name, net worth, age, or country.
                </p>
                
                <h4 className="font-medium">Pagination</h4>
                <p className="text-sm text-muted-foreground">
                  Navigate through records with page controls. Shows 50 records per page.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Record Details</h4>
                <p className="text-sm text-muted-foreground">
                  Click any row to open detailed information in a modal with navigation.
                </p>
                
                <h4 className="font-medium">Data Quality Icons</h4>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Valid</span>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Warning</span>
                  <span className="text-red-500 flex items-center gap-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Error
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-100 dark:bg-blue-900">
                    <IoDocumentTextOutline className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="font-medium">CSV Format</h4>
                <p className="text-xs text-muted-foreground">
                  Best for Excel, Google Sheets, or data analysis tools
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-green-100 dark:bg-green-900">
                    <IoDocumentOutline className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="font-medium">JSON Format</h4>
                <p className="text-xs text-muted-foreground">
                  Perfect for developers and API integration
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-purple-100 dark:bg-purple-900">
                    <IoGridOutline className="h-8 w-8" />
                  </div>
                </div>
                <h4 className="font-medium">Excel Format</h4>
                <p className="text-xs text-muted-foreground">
                  Direct compatibility with Microsoft Excel
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Export Options</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Choose specific columns to include</li>
                <li>Include or exclude data quality flags</li>
                <li>Filter out records with errors</li>
                <li>Add validation status columns</li>
                <li>Export filtered data or complete dataset</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Search</span>
                  <Badge variant="outline" className="text-xs">Ctrl + /</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Export Data</span>
                  <Badge variant="outline" className="text-xs">Ctrl + E</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Next Record</span>
                  <Badge variant="outline" className="text-xs">→</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Previous Record</span>
                  <Badge variant="outline" className="text-xs">←</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Close Modal</span>
                  <Badge variant="outline" className="text-xs">Esc</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Help</span>
                  <Badge variant="outline" className="text-xs">F1</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">App Loading Issues</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>If app fails to load, try refreshing the page</li>
                  <li>Close other browser tabs to free memory</li>
                  <li>Check browser console for error details</li>
                  <li>Use Chrome or Firefox for best compatibility</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Search Not Working</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Make sure you press Enter or click the search button</li>
                  <li>Try searching from the Data Table view</li>
                  <li>Check spelling and try partial matches</li>
                  <li>Clear filters and try again</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Export Problems</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Ensure popup blockers allow file downloads</li>
                  <li>Try exporting smaller datasets first</li>
                  <li>Check your browser's download folder</li>
                  <li>Use CSV format if other formats fail</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Performance Issues</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Clear browser cache and cookies</li>
                  <li>Close unnecessary applications</li>
                  <li>Use filters to work with smaller datasets</li>
                  <li>Consider using a desktop browser instead of mobile</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">How many billionaires are in the dataset?</h4>
                <p className="text-sm text-muted-foreground">
                  The Forbes dataset contains approximately 1,556 billionaire records from around the world.
                </p>
              </div>

              <div>
                <h4 className="font-medium">What data quality issues might I find?</h4>
                <p className="text-sm text-muted-foreground">
                  Common issues include currency format inconsistencies, character encoding problems, 
                  missing values, and special characters in company names.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Can I save my filtered results?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, use the Export feature to save your filtered data in various formats. 
                  You can also save custom filter presets for reuse.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Is this data updated in real-time?</h4>
                <p className="text-sm text-muted-foreground">
                  This is a static dataset snapshot. Net worth values and rankings may have changed 
                  since the data was collected.
                </p>
              </div>

              <div>
                <h4 className="font-medium">What browsers are supported?</h4>
                <p className="text-sm text-muted-foreground">
                  Modern versions of Chrome, Firefox, Safari, and Edge are supported. 
                  Chrome and Firefox offer the best performance for large datasets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Forbes Billionaire Dataset Viewer v1.0
              </p>
              <p className="text-xs text-muted-foreground">
                Built with Next.js, React, and Tailwind CSS
              </p>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><IoLockClosedOutline className="h-3 w-3" />Privacy Focused</span>
                <span className="flex items-center gap-1"><IoFlashOutline className="h-3 w-3" />Performance Optimized</span>
                <span className="flex items-center gap-1"><IoBrushOutline className="h-3 w-3" />Responsive Design</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}