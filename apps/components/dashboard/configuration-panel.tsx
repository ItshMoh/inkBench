"use client"

import { useState } from "react"
import { RefreshCw, CloudUpload, Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function ConfigurationPanel() {
  const [optimizationSteps, setOptimizationSteps] = useState([200])

  return (
    <div className="lg:col-span-1">
      <Card className="flex flex-col h-full">
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold">Configuration</h3>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 flex flex-col gap-5 flex-1">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Target Contract
            </label>
            <Select defaultValue="uniswap">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uniswap">Uniswap V3 Pool</SelectItem>
                <SelectItem value="erc20">ERC-20 Token Standard</SelectItem>
                <SelectItem value="nft">NFT Marketplace Logic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Compiler Version
            </label>
            <Select defaultValue="latest">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">v0.8.24 (latest)</SelectItem>
                <SelectItem value="v0.8.20">v0.8.20</SelectItem>
                <SelectItem value="v0.7.6">v0.7.6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Optimization Steps
              </label>
              <span className="text-xs text-black font-medium">
                {optimizationSteps[0]} runs
              </span>
            </div>
            <Slider
              value={optimizationSteps}
              onValueChange={setOptimizationSteps}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          <div className="mt-2 border-2 border-dashed border-gray-300 hover:border-black/50 hover:bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer">
            <CloudUpload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm font-medium">Click to upload ABI</p>
            <p className="text-xs text-gray-500 mt-1">.json or .sol files</p>
          </div>
        </div>

        <div className="p-6 pt-0">
          <Button className="w-full gap-2" size="lg">
            <Play className="h-4 w-4" />
            Run Benchmark
          </Button>
        </div>
      </Card>
    </div>
  )
}
