import { Fuel, Timer, Box, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    icon: Fuel,
    label: "Avg Gas Cost",
    value: "145,200",
    unit: "gwei",
    change: "-5.2%",
    isPositive: true,
  },
  {
    icon: Timer,
    label: "Execution Time",
    value: "240",
    unit: "ms",
    change: "+1.2%",
    isPositive: false,
  },
  {
    icon: Box,
    label: "Block Usage",
    value: "12.5%",
    unit: "cap",
    change: "0.0%",
    isPositive: null,
  },
  {
    icon: Zap,
    label: "Throughput",
    value: "45",
    unit: "tx/s",
    change: "+15%",
    isPositive: true,
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-5 hover:shadow-md transition-shadow group border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:text-black transition-colors">
              <stat.icon className="h-6 w-6" />
            </div>
            <Badge
              variant={
                stat.isPositive === null
                  ? "secondary"
                  : stat.isPositive
                  ? "default"
                  : "destructive"
              }
              className={
                stat.isPositive === null
                  ? "bg-gray-100 text-gray-700"
                  : stat.isPositive
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              }
            >
              {stat.change}
            </Badge>
          </div>
          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          <p className="text-2xl font-bold mt-1">
            {stat.value}{" "}
            <span className="text-sm font-normal text-gray-600">
              {stat.unit}
            </span>
          </p>
        </Card>
      ))}
    </div>
  )
}
