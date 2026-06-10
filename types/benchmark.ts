export interface BenchmarkResult {
  id: string

  prompt: string

  createdAt: string

  gemini: {
    response: string
    score: number

    metrics: {
      taskCompletion: number
      responseQuality: number
      instructionFollowing: number
      travelKnowledge: number
      hallucinationRisk: number
      practicality: number
      overallScore: number
    }
  }

  alibaba: {
    response: string
    score: number

    metrics: {
      taskCompletion: number
      responseQuality: number
      instructionFollowing: number
      travelKnowledge: number
      hallucinationRisk: number
      practicality: number
      overallScore: number
    }
  }

  winner: "Gemini" | "Alibaba"
}
