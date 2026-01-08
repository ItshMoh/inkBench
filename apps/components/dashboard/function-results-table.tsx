import { Filter, Download, MoreHorizontal } from "lucide-react"
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

const functionResults = [
  {
    name: "swapExactInput",
    color: "bg-purple-500",
    calls: "1,240",
    minGas: "112,400",
    maxGas: "165,200",
    avgGas: "132,150",
    status: "Passed",
    statusVariant: "success" as const,
  },
  {
    name: "approve",
    color: "bg-blue-500",
    calls: "850",
    minGas: "45,100",
    maxGas: "48,200",
    avgGas: "46,120",
    status: "Passed",
    statusVariant: "success" as const,
  },
  {
    name: "initializePool",
    color: "bg-orange-500",
    calls: "5",
    minGas: "2,100,000",
    maxGas: "2,150,000",
    avgGas: "2,125,000",
    status: "Warning",
    statusVariant: "warning" as const,
  },
  {
    name: "flashLoan",
    color: "bg-red-500",
    calls: "12",
    minGas: "0",
    maxGas: "0",
    avgGas: "0",
    status: "Failed",
    statusVariant: "destructive" as const,
  },
]

export function FunctionResultsTable() {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold">Function Execution Results</h3>
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
              <TableHead className="font-semibold">Function Name</TableHead>
              <TableHead className="font-semibold">Calls</TableHead>
              <TableHead className="text-right font-semibold">Min Gas</TableHead>
              <TableHead className="text-right font-semibold">Max Gas</TableHead>
              <TableHead className="text-right font-semibold">Avg Gas</TableHead>
              <TableHead className="text-center font-semibold">Status</TableHead>
              <TableHead className="text-center font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {functionResults.map((func, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${func.color}`} />
                    {func.name}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{func.calls}</TableCell>
                <TableCell className="text-right text-gray-600 font-mono">
                  {func.minGas}
                </TableCell>
                <TableCell className="text-right text-gray-600 font-mono">
                  {func.maxGas}
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  {func.avgGas}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={func.statusVariant}
                    className={
                      func.statusVariant === "success"
                        ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                        : func.statusVariant === "warning"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
                    }
                  >
                    {func.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="px-6 py-4 border-t flex items-center justify-between text-sm text-gray-600">
          <p>Showing 1-4 of 24 results</p>
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
  )
}
