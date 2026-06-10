"use client"

import { useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"

import { PromptForm } from "@/components/compare/prompt-form"
import { ModelResponse } from "@/components/compare/model-response"
import { ScoreCard } from "@/components/compare/score-card"
import { WinnerCard } from "@/components/compare/winner-card"

import type { CompareResult } from "@/types/compare"

export default function ComparePage() {
  const [result, setResult] = useState<CompareResult | null>(null)

  const [loading, setLoading] = useState(false)

  async function handleCompare(prompt: string) {
    try {
      setLoading(true)

      const response = await fetch("/api/compare", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to compare")
      }

      const data = await response.json()

      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DashboardHeader />

      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Compare AI Models</h1>

          <p className="text-muted-foreground">
            Test Gemini and Alibaba AI side-by-side using prompts.
          </p>
        </div>

        <PromptForm onSubmit={handleCompare} isLoading={loading} />

        {!result && (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            Submit a prompt to start benchmarking.
          </div>
        )}

        {result && (
          <>
            <div className="grid gap-6 lg:grid-cols-2">
              <ModelResponse
                title="Gemini AI"
                score={result.gemini.score}
                response={result.gemini.response}
                responseTimeMs={result.gemini.responseTimeMs}
              />

              <ModelResponse
                title="Alibaba AI"
                score={result.alibaba.score}
                response={result.alibaba.response}
                responseTimeMs={result.alibaba.responseTimeMs}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ScoreCard
                title="Task Completion"
                gemini={result.gemini.metrics.taskCompletion}
                alibaba={result.alibaba.metrics.taskCompletion}
              />

              <ScoreCard
                title="Response Quality"
                gemini={result.gemini.metrics.responseQuality}
                alibaba={result.alibaba.metrics.responseQuality}
              />

              <ScoreCard
                title="Instruction Following"
                gemini={result.gemini.metrics.instructionFollowing}
                alibaba={result.alibaba.metrics.instructionFollowing}
              />

              <ScoreCard
                title="Travel Knowledge"
                gemini={result.gemini.metrics.travelKnowledge}
                alibaba={result.alibaba.metrics.travelKnowledge}
              />

              <ScoreCard
                title="Hallucination Risk"
                gemini={result.gemini.metrics.hallucinationRisk}
                alibaba={result.alibaba.metrics.hallucinationRisk}
              />

              <ScoreCard
                title="Practicality"
                gemini={result.gemini.metrics.practicality}
                alibaba={result.alibaba.metrics.practicality}
              />

              <ScoreCard
                title="Overall Score"
                gemini={result.gemini.metrics.overallScore}
                alibaba={result.alibaba.metrics.overallScore}
              />

              <ScoreCard
                title="Response Time (ms)"
                gemini={Math.round(result.gemini.responseTimeMs ?? 0)}
                alibaba={Math.round(result.alibaba.responseTimeMs ?? 0)}
              />
            </div>

            <WinnerCard winner={result.winner} />
          </>
        )}
      </div>
    </>
  )
}
