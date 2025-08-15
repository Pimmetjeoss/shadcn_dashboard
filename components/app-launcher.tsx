'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  IoMenuOutline,
  IoStatsChartOutline,
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoLinkOutline
} from 'react-icons/io5'

interface AppOption {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  color: string
}

const appOptions: AppOption[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Forbes Billionaire Analytics',
    icon: IoStatsChartOutline,
    path: '/dashboard',
    color: 'text-blue-600'
  },
  {
    id: 'csv-upload',
    title: 'Excel/CSV',
    description: 'Upload and process spreadsheets',
    icon: IoCloudUploadOutline,
    path: '/csv-upload',
    color: 'text-green-600'
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Document management system',
    icon: IoDocumentTextOutline,
    path: '/documents',
    color: 'text-purple-600'
  },
  {
    id: 'url-analyzer',
    title: 'URL',
    description: 'URL analysis and processing',
    icon: IoLinkOutline,
    path: '/url-analyzer',
    color: 'text-orange-600'
  }
]

interface AppLauncherProps {
  currentApp?: string
  className?: string
}

export function AppLauncher({ currentApp = 'dashboard', className }: AppLauncherProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleAppSelect = (app: AppOption) => {
    setOpen(false)
    router.push(app.path)
  }

  const getCurrentApp = () => {
    return appOptions.find(app => app.id === currentApp) || appOptions[0]
  }

  const currentAppData = getCurrentApp()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`size-7 ${className}`}
          data-app-launcher="trigger"
        >
          <IoMenuOutline className="h-5 w-5" />
          <span className="sr-only">Open Application Launcher</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-80"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Application Launcher</p>
            <p className="text-xs leading-none text-muted-foreground">
              Choose your workspace
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {appOptions.map((app) => (
          <DropdownMenuItem
            key={app.id}
            onClick={() => handleAppSelect(app)}
            className={`flex items-center gap-3 p-3 cursor-pointer ${
              app.id === currentApp ? 'bg-accent' : ''
            }`}
          >
            <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${app.color}`}>
              <app.icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{app.title}</span>
              <span className="text-xs text-muted-foreground">{app.description}</span>
            </div>
            {app.id === currentApp && (
              <div className="ml-auto">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}