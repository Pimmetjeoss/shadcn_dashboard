'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  IoHomeOutline,
  IoGridOutline, 
  IoStatsChartOutline,
  IoSearchOutline,
  IoDownloadOutline,
  IoHelpCircleOutline,
  IoCashOutline
} from 'react-icons/io5'

interface AppSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  isOpen?: boolean
}

const navigationItems = [
  {
    title: "Overview",
    id: "overview",
    icon: IoHomeOutline,
    description: "Dataset overview and key metrics"
  },
  {
    title: "Data Table", 
    id: "data-table",
    icon: IoGridOutline,
    description: "Browse and filter billionaire records"
  },
  {
    title: "Visualizations",
    id: "visualizations", 
    icon: IoStatsChartOutline,
    description: "Charts and data visualizations"
  },
  {
    title: "Data Quality",
    id: "data-quality",
    icon: IoSearchOutline, 
    description: "Data quality assessment and issues"
  },
  {
    title: "Export",
    id: "export",
    icon: IoDownloadOutline,
    description: "Export data in various formats"
  },
  {
    title: "Help",
    id: "help",
    icon: IoHelpCircleOutline,
    description: "Documentation and support"
  }
]

export function AppSidebar({ currentView, onViewChange, isOpen = true }: AppSidebarProps) {
  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-background transition-all duration-300",
      isOpen ? "w-64" : "w-0 overflow-hidden"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IoCashOutline className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Forbes Dataset</span>
            <span className="text-xs text-muted-foreground">v1.0</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
              currentView === item.id 
                ? "bg-accent font-medium text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <div className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">Forbes Billionaires 2024</p>
          <p>1,556 records • 68 countries</p>
        </div>
      </div>
    </div>
  )
}