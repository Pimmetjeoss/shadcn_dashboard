'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
  IoDocumentTextOutline,
  IoFolderOutline,
  IoSearchOutline,
  IoAddOutline,
  IoDownloadOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoEyeOutline
} from 'react-icons/io5'

interface Document {
  id: string
  name: string
  type: string
  size: string
  modified: string
  author: string
  category: string
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Financial Report Q4 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    modified: '2 hours ago',
    author: 'John Smith',
    category: 'Reports'
  },
  {
    id: '2',
    name: 'Project Proposal.docx',
    type: 'DOCX',
    size: '890 KB',
    modified: '1 day ago',
    author: 'Sarah Johnson',
    category: 'Proposals'
  },
  {
    id: '3',
    name: 'Data Analysis Guidelines.pdf',
    type: 'PDF',
    size: '1.2 MB',
    modified: '3 days ago',
    author: 'Mike Davis',
    category: 'Guidelines'
  },
  {
    id: '4',
    name: 'Meeting Notes.txt',
    type: 'TXT',
    size: '45 KB',
    modified: '1 week ago',
    author: 'Lisa Chen',
    category: 'Notes'
  },
  {
    id: '5',
    name: 'Budget Spreadsheet.xlsx',
    type: 'XLSX',
    size: '560 KB',
    modified: '2 weeks ago',
    author: 'Tom Wilson',
    category: 'Finance'
  }
]

const categories = ['All', 'Reports', 'Proposals', 'Guidelines', 'Notes', 'Finance']

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [documents] = useState<Document[]>(mockDocuments)

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'bg-red-100 text-red-800'
      case 'docx': return 'bg-blue-100 text-blue-800'
      case 'xlsx': return 'bg-green-100 text-green-800'
      case 'txt': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return <IoDocumentTextOutline className="h-5 w-5" />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <AppLauncher currentApp="documents" className="-ml-1" />
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
              <BreadcrumbPage>Documents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
            <p className="text-muted-foreground">
              Organize, search, and manage your documents
            </p>
          </div>
          <Button>
            <IoAddOutline className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search documents or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <IoDocumentTextOutline className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <IoFolderOutline className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length - 1}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
              <IoTimeOutline className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <IoFolderOutline className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.1 MB</div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{doc.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IoPersonOutline className="h-3 w-3" />
                          {doc.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <IoTimeOutline className="h-3 w-3" />
                          {doc.modified}
                        </span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(doc.type)}>
                      {doc.type}
                    </Badge>
                    <Badge variant="outline">
                      {doc.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <IoEyeOutline className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <IoDownloadOutline className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No documents found matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}