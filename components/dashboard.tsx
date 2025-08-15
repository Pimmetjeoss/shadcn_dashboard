'use client'

import { useState, useCallback } from 'react'
import { BillionaireRecord, DataQualityMetrics, FilterCriteria } from '@/types/billionaire'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppLauncher } from '@/components/app-launcher'
import { Overview } from '@/components/overview'
import { DataTable } from '@/components/data-table'
import { Visualizations } from '@/components/visualizations'
import { DataQuality } from '@/components/data-quality'
import { Help } from '@/components/help'
import { RecordDetailsModal } from '@/components/record-details-modal'
import { ExportModal } from '@/components/export-modal'
import { Separator } from '@/components/ui/separator'
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import { IoWarningOutline } from 'react-icons/io5'

type ViewType = 'overview' | 'data-table' | 'visualizations' | 'export' | 'data-quality' | 'help'

interface DashboardProps {
  data: BillionaireRecord[]
  metrics: DataQualityMetrics | null
  reducedMode?: boolean
}

export function Dashboard({ data, metrics, reducedMode = false }: DashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('overview')
  const [selectedRecord, setSelectedRecord] = useState<BillionaireRecord | null>(null)
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [filteredData, setFilteredData] = useState<BillionaireRecord[]>(data)
  const [currentFilters, setCurrentFilters] = useState<FilterCriteria>({})
  const [pendingSearch, setPendingSearch] = useState<string>('')

  const handleViewChange = (view: string) => {
    // Special handling for export - open modal but stay on current view
    if (view === 'export') {
      handleExportClick()
      return // Don't change view
    }
    setCurrentView(view as ViewType)
  }

  const handleSearchFromOverview = (searchTerm: string) => {
    console.log('Dashboard: Received search from overview:', searchTerm)
    setPendingSearch(searchTerm)
    // The search will be applied when the data-table view loads
  }

  const handleRecordSelect = useCallback((record: BillionaireRecord) => {
    setSelectedRecord(record)
    setIsRecordModalOpen(true)
  }, [])

  const handleExportClick = () => {
    setIsExportModalOpen(true)
  }

  const findRecordIndex = (record: BillionaireRecord) => {
    return filteredData.findIndex(r => r.rank === record.rank)
  }

  const handleNextRecord = () => {
    if (!selectedRecord) return
    const currentIndex = findRecordIndex(selectedRecord)
    if (currentIndex < filteredData.length - 1) {
      setSelectedRecord(filteredData[currentIndex + 1])
    }
  }

  const handlePreviousRecord = () => {
    if (!selectedRecord) return
    const currentIndex = findRecordIndex(selectedRecord)
    if (currentIndex > 0) {
      setSelectedRecord(filteredData[currentIndex - 1])
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <Overview 
            data={data} 
            metrics={metrics} 
            onExportClick={handleExportClick} 
            onViewChange={handleViewChange}
            onSearchSubmit={handleSearchFromOverview}
            onRecordSelect={handleRecordSelect}
          />
        )
      case 'data-table':
        return (
          <DataTable 
            data={data} 
            onRecordSelect={handleRecordSelect}
            onExportClick={handleExportClick}
            onFiltersChange={setCurrentFilters}
            onFilteredDataChange={setFilteredData}
            pendingSearch={pendingSearch}
            onSearchApplied={() => setPendingSearch('')}
          />
        )
      case 'visualizations':
        return (
          <Visualizations 
            data={filteredData.length > 0 ? filteredData : data}
            onExportClick={handleExportClick}
          />
        )
      case 'data-quality':
        return (
          <DataQuality 
            data={data}
            metrics={metrics}
            onExportClick={handleExportClick}
          />
        )
      case 'help':
        return <Help />
      default:
        return <div>View not found</div>
    }
  }

  const getViewTitle = (): string => {
    switch (currentView) {
      case 'overview':
        return 'Dataset Overview'
      case 'data-table':
        return 'Data Table'
      case 'visualizations':
        return 'Visualizations'
      case 'data-quality':
        return 'Data Quality'
      case 'export':
        return 'Export'
      case 'help':
        return 'Help'
      default:
        return 'Dataset Overview'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar currentView={currentView} onViewChange={handleViewChange} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <AppLauncher currentApp="dashboard" className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Forbes Billionaire Dataset
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getViewTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
              {reducedMode && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                      <IoWarningOutline className="h-3 w-3" />
                      Reduced Mode
                    </span>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col">
          {renderCurrentView()}
        </div>
      </SidebarInset>

      {/* Record Details Modal */}
      <RecordDetailsModal
        record={selectedRecord}
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onNext={handleNextRecord}
        onPrevious={handlePreviousRecord}
        hasNext={selectedRecord ? findRecordIndex(selectedRecord) < filteredData.length - 1 : false}
        hasPrevious={selectedRecord ? findRecordIndex(selectedRecord) > 0 : false}
        allRecords={filteredData}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={data}
        filteredData={filteredData}
        title="Export Forbes Billionaire Data"
      />
    </SidebarProvider>
  )
}