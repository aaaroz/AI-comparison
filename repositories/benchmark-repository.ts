export async function getResults() {
  const { prisma } = await import("@/lib/prisma")

  const rows = await prisma.benchmarkResult.findMany({
    orderBy: { createdAt: "desc" },
  })

  // Map Prisma rows to the JSON shape used by the frontend
  return rows.map((r) => ({
    id: r.id,
    prompt: r.prompt,
    createdAt: r.createdAt.toISOString(),
    gemini: {
      response: r.geminiResponse,
      score: r.geminiOverallScore,
      responseTimeMs: undefined,
      metrics: {
        taskCompletion: r.geminiTaskCompletion,
        responseQuality: r.geminiResponseQuality,
        instructionFollowing: r.geminiInstructionFollowing,
        travelKnowledge: r.geminiTravelKnowledge,
        hallucinationRisk: r.geminiHallucinationRisk,
        practicality: r.geminiPracticality,
        overallScore: r.geminiOverallScore,
      },
    },
    alibaba: {
      response: r.alibabaResponse,
      score: r.alibabaOverallScore,
      responseTimeMs: undefined,
      metrics: {
        taskCompletion: r.alibabaTaskCompletion,
        responseQuality: r.alibabaResponseQuality,
        instructionFollowing: r.alibabaInstructionFollowing,
        travelKnowledge: r.alibabaTravelKnowledge,
        hallucinationRisk: r.alibabaHallucinationRisk,
        practicality: r.alibabaPracticality,
        overallScore: r.alibabaOverallScore,
      },
    },
    winner: r.winner,
  }))
}

export async function saveResult(result: any) {
  const { prisma } = await import("@/lib/prisma")

  const created = await prisma.benchmarkResult.create({
    data: {
      id: crypto.randomUUID(),
      prompt: result.prompt || "",
      winner: result.winner || "",

      geminiResponse: result.gemini?.response || "",
      geminiTaskCompletion: Number(result.gemini?.metrics?.taskCompletion ?? 0),
      geminiResponseQuality: Number(
        result.gemini?.metrics?.responseQuality ?? 0
      ),
      geminiInstructionFollowing: Number(
        result.gemini?.metrics?.instructionFollowing ?? 0
      ),
      geminiTravelKnowledge: Number(
        result.gemini?.metrics?.travelKnowledge ?? 0
      ),
      geminiHallucinationRisk: Number(
        result.gemini?.metrics?.hallucinationRisk ?? 0
      ),
      geminiPracticality: Number(result.gemini?.metrics?.practicality ?? 0),
      geminiOverallScore: Number(
        result.gemini?.metrics?.overallScore ?? result.gemini?.score ?? 0
      ),

      alibabaResponse: result.alibaba?.response || "",
      alibabaTaskCompletion: Number(
        result.alibaba?.metrics?.taskCompletion ?? 0
      ),
      alibabaResponseQuality: Number(
        result.alibaba?.metrics?.responseQuality ?? 0
      ),
      alibabaInstructionFollowing: Number(
        result.alibaba?.metrics?.instructionFollowing ?? 0
      ),
      alibabaTravelKnowledge: Number(
        result.alibaba?.metrics?.travelKnowledge ?? 0
      ),
      alibabaHallucinationRisk: Number(
        result.alibaba?.metrics?.hallucinationRisk ?? 0
      ),
      alibabaPracticality: Number(result.alibaba?.metrics?.practicality ?? 0),
      alibabaOverallScore: Number(
        result.alibaba?.metrics?.overallScore ?? result.alibaba?.score ?? 0
      ),
    },
  })

  return created
}

export async function getBenchmarks() {
  const { prisma } = await import("@/lib/prisma")
  return prisma.benchmarkResult.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}
