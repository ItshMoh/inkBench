"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const chartData = [
  { name: "swap", value: 45000 },
  { name: "approve", value: 65000 },
  { name: "mint", value: 30000 },
  { name: "burn", value: 85000 },
  { name: "transfer", value: 55000 },
  { name: "balance", value: 25000 },
]

export function GasUsageChart() {
  return (
    <div className="lg:col-span-2">
      <Card className="h-full min-h-[400px]">
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="font-semibold">Gas Usage Distribution</h3>
            <p className="text-xs text-gray-600">
              Historical gas consumption per function call
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="default" className="h-7 px-3 text-xs">
              1H
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-3 text-xs text-gray-600"
            >
              24H
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-3 text-xs text-gray-600"
            >
              7D
            </Button>
          </div>
        </div>

        <div className="p-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-gray-600"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-gray-600"
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "0.375rem",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
                formatter={(value) => [`${value}`, "Gas"]}
              />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
