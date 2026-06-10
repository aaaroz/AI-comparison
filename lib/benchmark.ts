import { gemini } from "./gemini"
import { alibaba } from "./alibaba"

export async function generateTravelPlan(prompt: string) {
  const result = await gemini.models.generateContent({
    model: "gemini-2.5-flash",

    contents: `
You are an AI Travel Assistant.

User Request:
${prompt}
`,
  })

  return result.text ?? ""
}

export async function generateTravelPlanAlibaba(prompt: string) {
  const result = await alibaba.generateContent({
    model: "qwen3.6-flash",

    contents: `
You are an AI Travel Assistant.

User Request:
${prompt}
`,
  })

  return { text: result.text ?? "", raw: result.raw }
}

export async function judgeTravelResponse(response: string) {
  const runEvaluation = async (input: string) => {
    const result = await gemini.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
    You are an expert AI evaluator.

    Your task is to evaluate the quality of a travel assistant response.

    Travel Assistant Response:

    ${input}

    Evaluate the response using these metrics:

    1. taskCompletion (0-100)
    - Does the response fully solve the user's travel request?
    - Are all requested aspects covered?

    2. responseQuality (0-100)
    - Clarity
    - Structure
    - Readability
    - Detail level

    3. instructionFollowing (0-100)
    - How accurately did the response follow the user's instructions?
    - Did it obey constraints and preferences?

    4. travelKnowledge (0-100)
    - Quality of travel recommendations
    - Destination knowledge
    - Transportation understanding
    - Local insights

    5. hallucinationRisk (0-100)
    - 100 = highly reliable
    - 0 = likely contains fabricated information

    6. practicality (0-100)
    - Is the itinerary realistic?
    - Are timings reasonable?
    - Is the plan executable?

    Calculate:

    overallScore =
    (
    taskCompletion * 0.25 +
    responseQuality * 0.20 +
    instructionFollowing * 0.15 +
    travelKnowledge * 0.15 +
    hallucinationRisk * 0.15 +
    practicality * 0.10
    )

    IMPORTANT:
    - Return ONLY valid JSON.
    - Every score must be an integer between 0 and 100.
    - No explanations.
    - No markdown.
    - No code blocks.

    Schema:

    {
      "taskCompletion": 0,
      "responseQuality": 0,
      "instructionFollowing": 0,
      "travelKnowledge": 0,
      "hallucinationRisk": 0,
      "practicality": 0,
      "overallScore": 0
    }
    `,
    })

    return result.text ?? ""
  }

  const tryParse = (text: string) => {
    if (!text) return null

    try {
      return JSON.parse(text)
    } catch (e) {
      // try extract a JSON object substring
      const first = text.indexOf("{")
      const last = text.lastIndexOf("}")
      if (first !== -1 && last !== -1 && last > first) {
        const substr = text.slice(first, last + 1)
        try {
          return JSON.parse(substr)
        } catch (e) {}
      }

      // try regex to capture a JSON object
      const m = text.match(/\{[\s\S]*\}/)
      if (m) {
        try {
          return JSON.parse(m[0])
        } catch (e) {}
      }

      return null
    }
  }

  // First attempt
  const text = await runEvaluation(response)
  console.log({ text })
  let parsed = tryParse(text)

  // If parsing failed, ask Gemini to extract/return clean JSON from its previous output
  if (!parsed) {
    const followUpPrompt = `The previous evaluation output may not be valid JSON.\n\nOriginal output:\n${text}\n\nPlease extract and RETURN ONLY a single JSON object with this exact schema:\n{\n  "taskCompletion": 0,\n  "responseQuality": 0,\n  "instructionFollowing": 0,\n  "travelKnowledge": 0,\n  "hallucinationRisk": 0,\n  "practicality": 0,\n  "overallScore": 0\n}`

    const followUpText = await runEvaluation(followUpPrompt)
    parsed = tryParse(followUpText)
  }

  // Final fallback: return zeroed metrics (new schema)
  if (!parsed) {
    return {
      taskCompletion: 0,
      responseQuality: 0,
      instructionFollowing: 0,
      travelKnowledge: 0,
      hallucinationRisk: 0,
      practicality: 0,
      overallScore: 0,
    }
  }

  return parsed
}
