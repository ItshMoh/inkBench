"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, Plus, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ConfigurationPanel } from "@/components/dashboard/configuration-panel"
import { GasUsageChart } from "@/components/dashboard/gas-usage-chart"
import { FunctionResultsTable } from "@/components/dashboard/function-results-table"
import { HistoricalResults } from "@/components/dashboard/historical-results"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"current" | "historical">("current")

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="InkBench Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("current")}
              className={
                activeTab === "current"
                  ? "bg-white shadow-sm"
                  : "text-gray-600"
              }
            >
              Current Benchmarking
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("historical")}
              className={
                activeTab === "historical"
                  ? "bg-white shadow-sm"
                  : "text-gray-600"
              }
            >
              Historical Results
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50"
            />
          </div>

          <div className="h-6 w-px bg-gray-200 hidden lg:block" />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>

          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="size-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {activeTab === "current" ? (
            <>
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Benchmark Overview</h2>
                  <p className="text-gray-600 mt-1">
                    Analyze smart contract performance, gas usage, and optimization metrics.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-green-500" />
                    Node Status: Active
                  </span>
                  <span className="w-px h-4 bg-gray-200" />
                  <span>Block: #1849201</span>
                </div>
              </div>

              {/* Stats Cards */}
              <StatsCards />

              {/* Configuration and Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ConfigurationPanel />
                <GasUsageChart />
              </div>

              {/* Function Results Table */}
              <FunctionResultsTable />
            </>
          ) : (
            <>
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Historical Results</h2>
                  <p className="text-gray-600 mt-1">
                    View past benchmark runs and performance trends over time.
                  </p>
                </div>
              </div>

              {/* Historical Results Content */}
              <HistoricalResults />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
