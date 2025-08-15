'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoDownloadOutline
} from 'react-icons/io5'

export default function CSVUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadResult, setUploadResult] = useState<any>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus('idle')
      setUploadResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus('uploading')
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + Math.random() * 10
        })
      }, 200)

      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadStatus('success')
      setUploadResult({
        fileName: file.name,
        size: file.size,
        rows: Math.floor(Math.random() * 1000) + 100,
        columns: Math.floor(Math.random() * 20) + 5,
        processed: true
      })
    } catch (error) {
      setUploadStatus('error')
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <AppLauncher currentApp="csv-upload" className="-ml-1" />
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
              <BreadcrumbPage>Excel/CSV Upload</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Excel/CSV Upload</h1>
            <p className="text-muted-foreground">
              Upload and process your spreadsheet files
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IoCloudUploadOutline className="h-5 w-5" />
                File Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Select CSV or Excel file</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
              </div>

              {file && (
                <div className="p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <IoDocumentTextOutline className="h-4 w-4 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full"
              >
                {uploading ? 'Processing...' : 'Upload and Process'}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {uploadStatus === 'success' && <IoCheckmarkCircleOutline className="h-5 w-5 text-green-600" />}
                {uploadStatus === 'error' && <IoWarningOutline className="h-5 w-5 text-red-600" />}
                Upload Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadStatus === 'idle' && (
                <div className="text-center py-8 text-muted-foreground">
                  Upload a file to see results here
                </div>
              )}

              {uploadStatus === 'success' && uploadResult && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <IoCheckmarkCircleOutline className="h-5 w-5" />
                    <span className="font-medium">Upload Successful!</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">File:</span>
                      <span className="text-sm font-medium">{uploadResult.fileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rows:</span>
                      <span className="text-sm font-medium">{uploadResult.rows.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Columns:</span>
                      <span className="text-sm font-medium">{uploadResult.columns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Size:</span>
                      <span className="text-sm font-medium">{formatFileSize(uploadResult.size)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <IoDocumentTextOutline className="h-4 w-4 mr-2" />
                      View Data
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <IoDownloadOutline className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <IoWarningOutline className="h-5 w-5" />
                    <span className="font-medium">Upload Failed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    There was an error processing your file. Please check the file format and try again.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setUploadStatus('idle')}>
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <IoDocumentTextOutline className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="font-medium">Multiple Formats</div>
                  <div className="text-sm text-muted-foreground">CSV, Excel (.xlsx, .xls)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IoCloudUploadOutline className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-medium">Large Files</div>
                  <div className="text-sm text-muted-foreground">Up to 100MB uploads</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IoCheckmarkCircleOutline className="h-6 w-6 text-purple-600" />
                <div>
                  <div className="font-medium">Data Validation</div>
                  <div className="text-sm text-muted-foreground">Automatic quality checks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}