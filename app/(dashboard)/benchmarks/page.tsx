import { DashboardHeader } from "@/components/dashboard/dashboard-header"

import { LeaderboardCard } from "@/components/benchmark/leaderboard-card"

import { CategoryTable } from "@/components/benchmark/category-table"

import { StrengthCard } from "@/components/benchmark/strength-card"

import { MethodologyCard } from "@/components/benchmark/methodology-card"

import { getBenchmarks } from "@/repositories/benchmark-repository"

export default async function BenchmarksPage() {
  const rows = await getBenchmarks()

  // Leaderboard: average overall scores per model
  const total = rows.length || 1
  const avgGemini = Math.round(
    rows.reduce((acc, r) => acc + (r.geminiOverallScore ?? 0), 0) / total
  )
  const avgAlibaba = Math.round(
    rows.reduce((acc, r) => acc + (r.alibabaOverallScore ?? 0), 0) / total
  )

  const leaderboard = [
    {
      name: "Gemini AI",
      score: avgGemini,
    },
    {
      name: "Alibaba AI",
      score: avgAlibaba,
    },
  ]
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }))

  // Category performance: compute averages for each metric
  const metrics = [
    "Task Completion",
    "Response Quality",
    "Instruction Following",
    "Travel Knowledge",
    "Hallucination Risk",
    "Practicality",
    "Overall Score",
  ]

  const categories = metrics.map((m) => {
    const key = m
      .toLowerCase()
      .replace(/ /g, "")
      .replace(/overallscore/, "overallScore")

    // map metric names to prisma field names
    const geminiField = {
      taskcompletion: "geminiTaskCompletion",
      responsequality: "geminiResponseQuality",
      instructionfollowing: "geminiInstructionFollowing",
      travelknowledge: "geminiTravelKnowledge",
      hallucinationrisk: "geminiHallucinationRisk",
      practicality: "geminiPracticality",
      overallscore: "geminiOverallScore",
    }[key]

    const alibabaField = {
      taskcompletion: "alibabaTaskCompletion",
      responsequality: "alibabaResponseQuality",
      instructionfollowing: "alibabaInstructionFollowing",
      travelknowledge: "alibabaTravelKnowledge",
      hallucinationrisk: "alibabaHallucinationRisk",
      practicality: "alibabaPracticality",
      overallscore: "alibabaOverallScore",
    }[key]

    const geminiAvg = Math.round(
      rows.reduce(
        (acc, r) => acc + (((r as any)[geminiField] as number) ?? 0),
        0
      ) / total
    )
    const alibabaAvg = Math.round(
      rows.reduce(
        (acc, r) => acc + (((r as any)[alibabaField] as number) ?? 0),
        0
      ) / total
    )

    return {
      metric: m,
      gemini: geminiAvg,
      alibaba: alibabaAvg,
    }
  })

  // Strengths: show top 3 metrics where model leads
  const geminiStrengths = categories
    .sort((a, b) => b.gemini - a.gemini)
    .slice(0, 3)
    .map((c) => c.metric)

  const alibabaStrengths = categories
    .sort((a, b) => b.alibaba - a.alibaba)
    .slice(0, 3)
    .map((c) => c.metric)

  const methodology = {
    prompts: rows.length,
    evaluator: "Gemini automated judge",
    metrics,
  }

  return (
    <>
      <DashboardHeader />

      <div className="space-y-8 p-6">
        <section>
          <h1 className="text-3xl font-bold">AI Travel Assistant Benchmarks</h1>

          <p className="text-muted-foreground">
            Comprehensive evaluation across travel planning capabilities.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Leaderboard</h2>

          <div className="grid gap-4">
            {leaderboard.map((item) => (
              <LeaderboardCard key={item.name} {...item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Category Performance</h2>

          <CategoryTable data={categories} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <StrengthCard title="Gemini Strengths" items={geminiStrengths} />

          <StrengthCard title="Alibaba Strengths" items={alibabaStrengths} />
        </section>

        <section>
          <MethodologyCard {...methodology} />
        </section>
      </div>
    </>
  )
}
