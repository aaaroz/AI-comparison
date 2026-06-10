export async function getDashboardStats() {
  const { prisma } = await import("@/lib/prisma")

  const results = await prisma.benchmarkResult.findMany()

  if (!results.length) {
    return {
      travelAccuracy: 0,
      userSatisfaction: 0,
      tripCompletion: 0,
    }
  }

  const avgTravelKnowledge =
    results.reduce((acc, curr) => acc + curr.geminiTravelKnowledge, 0) / results.length

  const avgOverall =
    results.reduce((acc, curr) => acc + curr.geminiOverallScore, 0) / results.length

  return {
    travelAccuracy: Math.round(avgTravelKnowledge),

    userSatisfaction: (avgOverall / 20).toFixed(1),

    tripCompletion: Math.round(avgOverall),
  }
}

