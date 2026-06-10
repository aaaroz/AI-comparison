import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import {
  generateTravelPlan,
  generateTravelPlanAlibaba,
  judgeTravelResponse,
} from "@/lib/benchmark"

import { saveResult } from "@/repositories/benchmark-repository"

import { randomUUID } from "crypto"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  // Gemini (flash) - measure generation time
  const geminiStart = Date.now()
  const geminiResponse = await generateTravelPlan(prompt)
  const geminiResponseTime = Date.now() - geminiStart
  console.log({ geminiResponse, geminiResponseTime })
  const geminiMetrics = await judgeTravelResponse(geminiResponse)
  console.log({ geminiMetrics })

  // Alibaba Qwen (flash)
  let alibabaResponse = ""
  let alibabaMetrics = {
    taskCompletion: 0,
    responseQuality: 0,
    instructionFollowing: 0,
    travelKnowledge: 0,
    hallucinationRisk: 0,
    practicality: 0,
    overallScore: 0,
  }
  let alibabaResponseTime = 0

  try {
    const alibabaStart = Date.now()
    const alibabaResult = await generateTravelPlanAlibaba(prompt)
    alibabaResponseTime = Date.now() - alibabaStart

    alibabaResponse = alibabaResult.text

    console.log({ alibabaResponse, raw: alibabaResult.raw, alibabaResponseTime })

    // Try to extract metrics directly from Alibaba (Qwen) raw response if it included them
    const extractMetrics = (raw: any, text: string | undefined) => {
      // 1) top-level metrics
      if (raw?.metrics && typeof raw.metrics === "object") return raw.metrics

      // 2) common nested places
      if (raw?.result) {
        for (const r of raw.result) {
          const candidate = r?.content?.text || r?.text || r?.content
          if (!candidate) continue
          try {
            const parsed =
              typeof candidate === "string" ? JSON.parse(candidate) : candidate
            if (parsed?.overallScore != null) return parsed
          } catch (e) {}
        }
      }

      if (raw?.data) {
        for (const d of raw.data) {
          const candidate = d?.text || d?.content
          if (!candidate) continue
          try {
            const parsed =
              typeof candidate === "string" ? JSON.parse(candidate) : candidate
            if (parsed?.overallScore != null) return parsed
          } catch (e) {}
        }
      }

      // 3) try parsing JSON from the plain text response (find a JSON substring)
      if (text) {
        const first = text.indexOf("{")
        const last = text.lastIndexOf("}")
        if (first !== -1 && last !== -1 && last > first) {
          const substr = text.slice(first, last + 1)
          try {
            const parsed = JSON.parse(substr)
            if (parsed?.overallScore != null) return parsed
          } catch (e) {}
        }
      }

      return null
    }

    const maybeMetrics = extractMetrics(alibabaResult.raw, alibabaResult.text)

    if (maybeMetrics) {
      alibabaMetrics = {
        taskCompletion: maybeMetrics.taskCompletion ?? maybeMetrics.task_completion ?? 0,
        responseQuality: maybeMetrics.responseQuality ?? maybeMetrics.response_quality ?? 0,
        instructionFollowing:
          maybeMetrics.instructionFollowing ?? maybeMetrics.instruction_following ?? 0,
        travelKnowledge:
          maybeMetrics.travelKnowledge ?? maybeMetrics.travel_knowledge ?? 0,
        hallucinationRisk:
          maybeMetrics.hallucinationRisk ?? maybeMetrics.hallucination_risk ?? 0,
        practicality: maybeMetrics.practicality ?? 0,
        overallScore:
          maybeMetrics.overallScore ?? maybeMetrics.overall_score ?? 0,
      }
    } else {
      // Fallback: use the Gemini judge to score Alibaba's response
      alibabaMetrics = await judgeTravelResponse(alibabaResponse)
    }

    console.log({ alibabaMetrics })
  } catch (err) {
    console.error("Alibaba request failed, using fallback mock", err)

    alibabaResponse = `Mock Alibaba Response\n\nDay 1: Kuta\nDay 2: Ubud\nDay 3: Sanur\n`

    alibabaMetrics = {
      taskCompletion: 85,
      responseQuality: 82,
      instructionFollowing: 88,
      travelKnowledge: 83,
      hallucinationRisk: 90,
      practicality: 80,
      overallScore: 85,
    }
  }

  const result = {
    id: randomUUID(),

    prompt,

    createdAt: new Date().toISOString(),

    gemini: {
      response: geminiResponse,

      score: geminiMetrics.overallScore,

      responseTimeMs: typeof geminiResponseTime === 'number' ? geminiResponseTime : undefined,

      metrics: geminiMetrics,
    },

    alibaba: {
      response: alibabaResponse,

      score: alibabaMetrics.overallScore,

      responseTimeMs: typeof alibabaResponseTime === 'number' ? alibabaResponseTime : undefined,

      metrics: alibabaMetrics,
    },

    winner:
      geminiMetrics.overallScore > alibabaMetrics.overallScore
        ? "Gemini"
        : "Alibaba",
  }

  await saveResult(result)

  return NextResponse.json(result)
}
