export const benchmarkData = {
  leaderboard: [
    {
      name: "Gemini AI",
      score: 92,
      rank: 1,
    },
    {
      name: "Alibaba AI",
      score: 86,
      rank: 2,
    },
  ],

  categories: [
    {
      metric: "Itinerary Quality",
      gemini: 94,
      alibaba: 87,
    },
    {
      metric: "Travel Knowledge",
      gemini: 95,
      alibaba: 85,
    },
    {
      metric: "Personalization",
      gemini: 96,
      alibaba: 82,
    },
    {
      metric: "Budget Planning",
      gemini: 88,
      alibaba: 91,
    },
  ],

  strengths: {
    gemini: ["Maps Integration", "Travel Knowledge", "Personalization"],

    alibaba: ["Cost Optimization", "Chinese Ecosystem", "Localization"],
  },

  methodology: {
    prompts: 100,
    evaluator: "GPT-5 Judge",
    metrics: [
      "Accuracy",
      "Personalization",
      "Cost Efficiency",
      "Travel Knowledge",
    ],
  },
}
