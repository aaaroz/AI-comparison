import { DashboardHeader } from "@/components/dashboard/dashboard-header"

import { StatCard } from "@/components/dashboard/stat-card"

import { ComparisonCard } from "@/components/dashboard/comparison-card"

import { getDashboardStats } from "@/repositories/dashboard-repository"
import { getBenchmarks } from "@/repositories/benchmark-repository"

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const benchmarks = await getBenchmarks()

  // compute average overall scores for leaderboard comparison
  const avgGemini =
    benchmarks.reduce((acc, b) => acc + (b.geminiOverallScore ?? 0), 0) /
    Math.max(1, benchmarks.length)
  const avgAlibaba =
    benchmarks.reduce((acc, b) => acc + (b.alibabaOverallScore ?? 0), 0) /
    Math.max(1, benchmarks.length)

  return (
    <>
      <DashboardHeader />

      <div className="space-y-6 p-6">
        <section>
          <h2 className="text-3xl font-bold">AI Travel Assistant</h2>

          <p className="mt-1 text-muted-foreground">
            Benchmarking and performance overview
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Travel Accuracy" value={`${stats.travelAccuracy}%`} />

          <StatCard title="Response Time" value="—" />

          <StatCard title="User Satisfaction" value={`${stats.userSatisfaction}/5`} />

          <StatCard title="Trip Completion" value={`${stats.tripCompletion}%`} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ComparisonCard
            title="Gemini AI"
            score={Math.round(avgGemini)}
            strengths={["Maps Integration", "Personalization", "Travel Knowledge"]}
          />

          <ComparisonCard
            title="Alibaba AI"
            score={Math.round(avgAlibaba)}
            strengths={["Cost Optimization", "Localization", "Market Coverage"]}
          />
        </section>
      </div>
    </>
  )
}
