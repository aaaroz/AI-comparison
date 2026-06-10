"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "../theme-toggle"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <h1 className="text-lg font-semibold">AI Comparison Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="outline">Export Report</Button>
      </div>
    </header>
  )
}
