import { NextResponse } from "next/server"

import { getDashboardStats } from "@/repositories/dashboard-repository"

export async function GET() {
  const stats = await getDashboardStats()

  return NextResponse.json(stats)
}
