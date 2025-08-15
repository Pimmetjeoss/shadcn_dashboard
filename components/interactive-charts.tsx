'use client'

import { useState, useMemo } from 'react'
import { BillionaireRecord } from '@/types/billionaire'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'
import { Download, Settings } from 'lucide-react'
import { parseNetWorth } from '@/data/billionaire-data'
import { saveAs } from 'file-saver'

interface InteractiveChartsProps {
  data: BillionaireRecord[]
  title: string
  type: 'geographic' | 'demographics' | 'wealth' | 'trends'
}

// Color palette for charts - Warm orange/terracotta theme (all warm colors)
const COLORS = [
  'hsl(var(--chart-1))', // Warm orange (primary)
  'hsl(25 60% 55%)',     // Rich terracotta (instead of purple)
  'hsl(var(--chart-3))', // Warm yellow
  'hsl(35 50% 50%)',     // Deep amber (instead of light purple)
  'hsl(var(--chart-5))', // Deep orange
  'hsl(15 45% 65%)',     // Light terracotta
  'hsl(25 55% 70%)',     // Peach
  'hsl(35 65% 60%)',     // Warm amber
  'hsl(5 50% 55%)',      // Rust red
  'hsl(45 50% 75%)'      // Warm cream
]

export function InteractiveCharts({ data, title, type }: InteractiveChartsProps) {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'area'>('bar')
  const [topN, setTopN] = useState(10)
  const [sortBy, setSortBy] = useState<'count' | 'value'>('count')

  // Process data based on chart type
  const chartData = useMemo(() => {
    switch (type) {
      case 'geographic':
        return processGeographicData()
      case 'demographics':
        return processDemographicsData()
      case 'wealth':
        return processWealthData()
      case 'trends':
        return processTrendsData()
      default:
        return []
    }
  }, [data, type, topN, sortBy])

  function processGeographicData() {
    const countryStats = data.reduce((acc, record) => {
      const country = record.country
      if (!acc[country]) {
        acc[country] = {
          count: 0,
          totalWealth: 0,
          avgAge: 0,
          ages: []
        }
      }
      acc[country].count++
      acc[country].totalWealth += parseNetWorth(record.netWorth)
      acc[country].ages.push(record.age)
      return acc
    }, {} as Record<string, any>)

    const processedData = Object.entries(countryStats)
      .map(([country, stats]) => ({
        name: country,
        billionaires: stats.count,
        totalWealth: Math.round(stats.totalWealth / 1000), // In billions
        avgWealth: Math.round(stats.totalWealth / stats.count / 1000), // In billions
        avgAge: Math.round(stats.ages.reduce((sum: number, age: number) => sum + age, 0) / stats.ages.length)
      }))
      .sort((a, b) => sortBy === 'count' ? b.billionaires - a.billionaires : b.totalWealth - a.totalWealth)
      .slice(0, topN)

    return processedData
  }

  function processDemographicsData() {
    const ageRanges = [
      { min: 20, max: 30, label: '20-30' },
      { min: 31, max: 40, label: '31-40' },
      { min: 41, max: 50, label: '41-50' },
      { min: 51, max: 60, label: '51-60' },
      { min: 61, max: 70, label: '61-70' },
      { min: 71, max: 80, label: '71-80' },
      { min: 81, max: 90, label: '81-90' },
      { min: 91, max: 101, label: '90+' }
    ]

    const ageData = ageRanges.map(range => {
      const inRange = data.filter(record => 
        record.age >= range.min && record.age <= range.max
      )
      
      return {
        name: range.label,
        count: inRange.length,
        avgWealth: inRange.length > 0 
          ? Math.round(inRange.reduce((sum, r) => sum + parseNetWorth(r.netWorth), 0) / inRange.length / 1000)
          : 0,
        percentage: Math.round((inRange.length / data.length) * 100)
      }
    }).filter(item => item.count > 0)

    return ageData
  }

  function processWealthData() {
    const wealthRanges = [
      { min: 1000, max: 2000, label: '$1-2B' },
      { min: 2000, max: 5000, label: '$2-5B' },
      { min: 5000, max: 10000, label: '$5-10B' },
      { min: 10000, max: 20000, label: '$10-20B' },
      { min: 20000, max: 50000, label: '$20-50B' },
      { min: 50000, max: 100000, label: '$50-100B' },
      { min: 100000, max: 500000, label: '$100B+' }
    ]

    const wealthData = wealthRanges.map(range => {
      const inRange = data.filter(record => {
        const netWorth = parseNetWorth(record.netWorth)
        return netWorth >= range.min && netWorth < range.max
      })
      
      return {
        name: range.label,
        count: inRange.length,
        totalWealth: Math.round(inRange.reduce((sum, r) => sum + parseNetWorth(r.netWorth), 0) / 1000),
        avgAge: inRange.length > 0 
          ? Math.round(inRange.reduce((sum, r) => sum + r.age, 0) / inRange.length)
          : 0,
        percentage: Math.round((inRange.length / data.length) * 100)
      }
    }).filter(item => item.count > 0)

    return wealthData
  }

  function processTrendsData() {
    // Simulate wealth changes over time (this would typically come from historical data)
    const industryData = data.reduce((acc, record) => {
      // Extract industry from source (simplified)
      let industry = record.source
      if (record.source.length > 20) {
        industry = record.source.split(',')[0] || record.source.substring(0, 20)
      }
      
      if (!acc[industry]) {
        acc[industry] = {
          count: 0,
          totalWealth: 0,
          avgChange: 0,
          changes: []
        }
      }
      acc[industry].count++
      acc[industry].totalWealth += parseNetWorth(record.netWorth)
      
      // Parse change percentage
      const changeStr = record.percentageChange.replace('%', '')
      const change = parseFloat(changeStr) || 0
      acc[industry].changes.push(change)
      
      return acc
    }, {} as Record<string, any>)

    const trendData = Object.entries(industryData)
      .map(([industry, stats]) => ({
        name: industry,
        billionaires: stats.count,
        totalWealth: Math.round(stats.totalWealth / 1000),
        avgChange: Math.round((stats.changes.reduce((sum: number, change: number) => sum + change, 0) / stats.changes.length) * 100) / 100,
        growth: stats.changes.filter((c: number) => c > 0).length,
        decline: stats.changes.filter((c: number) => c < 0).length
      }))
      .sort((a, b) => b.billionaires - a.billionaires)
      .slice(0, topN)

    return trendData
  }

  const exportChart = async (format: 'png' | 'svg' | 'csv') => {
    if (format === 'csv') {
      // Export data as CSV
      const csvData = chartData.map(item => {
        return Object.fromEntries(
          Object.entries(item).map(([key, value]) => [
            key.charAt(0).toUpperCase() + key.slice(1),
            value
          ])
        )
      })
      
      const csv = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      saveAs(blob, `${title.replace(/\s+/g, '_')}_data.csv`)
    } else {
      // For PNG/SVG, we would typically use a library like html2canvas
      // For now, we'll show an alert
      alert(`${format.toUpperCase()} export would be implemented with html2canvas or similar library`)
    }
  }

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {type === 'geographic' && (
                <>
                  <Bar dataKey="billionaires" fill={COLORS[0]} name="Billionaires" />
                  <Bar dataKey="totalWealth" fill={COLORS[1]} name="Total Wealth ($B)" />
                </>
              )}
              {type === 'demographics' && (
                <Bar dataKey="count" fill={COLORS[0]} name="Count" />
              )}
              {type === 'wealth' && (
                <Bar dataKey="count" fill={COLORS[0]} name="Count" />
              )}
              {type === 'trends' && (
                <>
                  <Bar dataKey="billionaires" fill={COLORS[0]} name="Billionaires" />
                  <Bar dataKey="avgChange" fill={COLORS[2]} name="Avg Change %" />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={type === 'geographic' ? 'billionaires' : 'count'}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {type === 'trends' && (
                <Line 
                  type="monotone" 
                  dataKey="avgChange" 
                  stroke={COLORS[0]} 
                  strokeWidth={2}
                  name="Avg Change %"
                />
              )}
              {type !== 'trends' && (
                <Line 
                  type="monotone" 
                  dataKey={type === 'geographic' ? 'billionaires' : 'count'} 
                  stroke={COLORS[0]} 
                  strokeWidth={2}
                  name="Count"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={type === 'geographic' ? 'billionaires' : 'count'} 
                stroke={COLORS[0]} 
                fill={COLORS[0]}
                fillOpacity={0.6}
                name="Count"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex items-center gap-2">
            <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={topN.toString()} onValueChange={(value) => setTopN(parseInt(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Top 5</SelectItem>
                <SelectItem value="10">Top 10</SelectItem>
                <SelectItem value="15">Top 15</SelectItem>
                <SelectItem value="20">Top 20</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => exportChart('csv')}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
        
        {/* Chart Controls */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportChart('png')}
            >
              Export PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportChart('svg')}
            >
              Export SVG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportChart('csv')}
            >
              Export Data
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {chartData.length} of {data.length} total records
          </div>
        </div>
      </CardContent>
    </Card>
  )
}