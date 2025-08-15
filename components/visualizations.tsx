'use client'

import { useMemo } from 'react'
import { BillionaireRecord } from '@/types/billionaire'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveCharts } from '@/components/interactive-charts'

interface VisualizationsProps {
  data: BillionaireRecord[]
  onExportClick?: () => void
}

export function Visualizations({ data, onExportClick }: VisualizationsProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Visualizations</h1>
        <p className="text-muted-foreground">
          Interactive charts and graphs showing wealth distribution patterns
        </p>
      </div>

      <Tabs defaultValue="geographic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="wealth">Wealth</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geographic" className="space-y-4">
          <InteractiveCharts 
            data={data}
            title="Geographic Distribution of Billionaires"
            type="geographic"
          />
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-4">
          <InteractiveCharts 
            data={data}
            title="Age Demographics Analysis"
            type="demographics"
          />
        </TabsContent>
        
        <TabsContent value="wealth" className="space-y-4">
          <InteractiveCharts 
            data={data}
            title="Wealth Distribution Analysis"
            type="wealth"
          />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <InteractiveCharts 
            data={data}
            title="Industry Trends and Performance"
            type="trends"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}