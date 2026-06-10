export interface CompareResult {
  id: string

  prompt: string

  winner: string

  gemini: {
    response: string
    score: number
    responseTimeMs?: number

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
    responseTimeMs?: number

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
}
