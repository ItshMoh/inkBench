"use client"

import { Calendar, Download, Filter, TrendingDown, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const trendData = [
  { date: "Jan 1", gasAvg: 145000, executionTime: 230 },
  { date: "Jan 2", gasAvg: 150000, executionTime: 245 },
  { date: "Jan 3", gasAvg: 142000, executionTime: 235 },
  { date: "Jan 4", gasAvg: 138000, executionTime: 228 },
  { date: "Jan 5", gasAvg: 145200, executionTime: 240 },
]

const historicalRuns = [
  {
    id: "#BM-2401",
    date: "2024-01-05 14:32",
    contract: "Uniswap V3 Pool",
    compiler: "v0.8.24",
    avgGas: "145,200",
    executionTime: "240ms",
    totalCalls: "2,107",
    status: "Success",
    trend: "down",
    trendValue: "-3.2%",
  },
  {
    id: "#BM-2400",
    date: "2024-01-04 11:15",
    contract: "Uniswap V3 Pool",
    compiler: "v0.8.24",
    avgGas: "138,000",
    executionTime: "228ms",
    totalCalls: "1,983",
    status: "Success",
    trend: "down",
    trendValue: "-2.8%",
  },
  {
    id: "#BM-2399",
    date: "2024-01-03 09:45",
    contract: "ERC-20 Token",
    compiler: "v0.8.20",
    avgGas: "142,000",
    executionTime: "235ms",
    totalCalls: "2,234",
    status: "Success",
    trend: "down",
    trendValue: "-5.3%",
  },
  {
    id: "#BM-2398",
    date: "2024-01-02 16:20",
    contract: "NFT Marketplace",
    compiler: "v0.8.24",
    avgGas: "150,000",
    executionTime: "245ms",
    totalCalls: "1,876",
    status: "Warning",
    trend: "up",
    trendValue: "+3.3%",
  },
  {
    id: "#BM-2397",
    date: "2024-01-01 13:08",
    contract: "Uniswap V3 Pool",
    compiler: "v0.8.24",
    avgGas: "145,000",
    executionTime: "230ms",
    totalCalls: "2,045",
    status: "Success",
    trend: "down",
    trendValue: "-1.2%",
  },
  {
    id: "#BM-2396",
    date: "2023-12-31 10:30",
    contract: "DEX Router",
    compiler: "v0.8.20",
    avgGas: "0",
    executionTime: "0ms",
    totalCalls: "0",
    status: "Failed",
    trend: "down",
    trendValue: "-100%",
  },
]

export function HistoricalResults() {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Runs</p>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold">142</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Avg Gas Trend</p>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold">-4.2%</p>
          <p className="text-xs text-gray-500 mt-1">Compared to last month</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Success Rate</p>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold">96.5%</p>
          <p className="text-xs text-gray-500 mt-1">138 successful runs</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Calls</p>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold">285K</p>
          <p className="text-xs text-gray-500 mt-1">Function executions</p>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="font-semibold">Performance Trends</h3>
            <p className="text-xs text-gray-600">
              Gas cost and execution time over time
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-7 px-3 text-xs gap-2">
              <Calendar className="h-3 w-3" />
              Last 7 Days
            </Button>
          </div>
        </div>

        <div className="p-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-gray-600"
              />
              <YAxis
                yAxisId="left"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-gray-600"
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-gray-600"
                tickFormatter={(value) => `${value}ms`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "0.375rem",
                  color: "white",
                  fontSize: "0.75rem",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px" }}
                iconType="line"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="gasAvg"
                name="Avg Gas"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="executionTime"
                name="Execution Time"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Historical Runs Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold">Benchmark History</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Run ID</TableHead>
                <TableHead className="font-semibold">Date & Time</TableHead>
                <TableHead className="font-semibold">Contract</TableHead>
                <TableHead className="font-semibold">Compiler</TableHead>
                <TableHead className="text-right font-semibold">Avg Gas</TableHead>
                <TableHead className="text-right font-semibold">Exec Time</TableHead>
                <TableHead className="text-right font-semibold">Total Calls</TableHead>
                <TableHead className="text-center font-semibold">Trend</TableHead>
                <TableHead className="text-center font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalRuns.map((run, index) => (
                <TableRow key={index} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="font-medium font-mono text-blue-600">
                    {run.id}
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">
                    {run.date}
                  </TableCell>
                  <TableCell>{run.contract}</TableCell>
                  <TableCell className="text-gray-600">{run.compiler}</TableCell>
                  <TableCell className="text-right font-mono">
                    {run.avgGas}
                  </TableCell>
                  <TableCell className="text-right font-mono text-gray-600">
                    {run.executionTime}
                  </TableCell>
                  <TableCell className="text-right text-gray-600">
                    {run.totalCalls}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {run.trend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          run.trend === "down" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {run.trendValue}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        run.status === "Success"
                          ? "default"
                          : run.status === "Warning"
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        run.status === "Success"
                          ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                          : run.status === "Warning"
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
                      }
                    >
                      {run.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="px-6 py-4 border-t flex items-center justify-between text-sm text-gray-600">
            <p>Showing 1-6 of 142 results</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
