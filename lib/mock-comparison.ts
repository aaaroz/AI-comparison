export const comparisonData = {
  prompt: "Plan a 5-day Bali trip under $1000",

  gemini: {
    score: 92,
    response: `
Day 1: Seminyak
Day 2: Ubud
Day 3: Nusa Penida
Day 4: Canggu
Day 5: Tanah Lot
    `,
    metrics: {
      taskCompletion: 95,
      responseQuality: 92,
      instructionFollowing: 90,
      travelKnowledge: 94,
      hallucinationRisk: 98,
      practicality: 91,
      overallScore: 92,
    },
  },

  alibaba: {
    score: 86,
    response: `
Day 1: Kuta
Day 2: Ubud
Day 3: Jimbaran
Day 4: Sanur
Day 5: Seminyak
    `,
    metrics: {
      taskCompletion: 88,
      responseQuality: 86,
      instructionFollowing: 84,
      travelKnowledge: 83,
      hallucinationRisk: 90,
      practicality: 85,
      overallScore: 86,
    },
  },

  winner: "Gemini AI",
}
