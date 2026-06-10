import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.ALIBABA_API_KEY, baseURL: process.env.ALIBABA_API_URL })

function extractFromChoices(anyRes: any) {
  if (!anyRes) return null
  // Chat-completion style: choices[0].message.content
  if (Array.isArray(anyRes.choices) && anyRes.choices.length > 0) {
    const first = anyRes.choices[0]
    const message = first.message || first.delta || null
    if (message) {
      if (typeof message === "string") return message
      if (typeof message.content === "string") return message.content
      if (typeof message.content?.text === "string") return message.content.text
      if (Array.isArray(message.content?.parts)) return message.content.parts.join("\n")
    }

    if (typeof first.text === "string") return first.text
  }
  return null
}

function extractFromOutput(anyRes: any) {
  if (!anyRes) return null

  if (typeof anyRes.output_text === "string") return anyRes.output_text

  if (Array.isArray(anyRes.output) && anyRes.output.length > 0) {
    const parts: string[] = []
    for (const o of anyRes.output) {
      if (typeof o === "string") {
        parts.push(o)
        continue
      }
      if (o?.text) {
        parts.push(o.text)
        continue
      }
      if (Array.isArray(o?.content)) {
        for (const c of o.content) {
          if (typeof c === "string") parts.push(c)
          else if (c?.text) parts.push(c.text)
        }
      }
    }
    if (parts.length) return parts.join("\n\n")
  }

  if (Array.isArray(anyRes.data) && anyRes.data.length > 0) {
    if (typeof anyRes.data[0].text === "string") return anyRes.data[0].text
  }

  // Some SDK returns message at top-level
  if (typeof anyRes.message === "string") return anyRes.message
  if (typeof anyRes.message?.content === "string") return anyRes.message.content

  return null
}

export const alibaba = {
  async generateContent({ model, contents, temperature = 0.7 }: { model: string; contents: string; temperature?: number }) {
    if (!process.env.ALIBABA_API_URL || !process.env.ALIBABA_API_KEY) {
      throw new Error("ALIBABA_API_URL or ALIBABA_API_KEY not configured")
    }

    // Use chat.completions.create to stay compatible with Qwen endpoints behind baseURL
    const res = await client.chat.completions.create({
      model,
      max_completion_tokens: 3000,
      messages: [{ role: "user", content: contents }],
      temperature,
    })

    const anyRes: any = res

    // Try extracting in several common shapes
    let text: string | null = null

    text = extractFromChoices(anyRes) ?? extractFromOutput(anyRes)

    // If still empty, try searching common nested fields
    if (!text) {
      const candidates = [
        anyRes?.result?.[0]?.content?.text,
        anyRes?.result?.[0]?.text,
        anyRes?.data?.[0]?.content?.text,
        anyRes?.data?.[0]?.text,
        anyRes?.output_text,
      ]
      for (const c of candidates) {
        if (typeof c === "string" && c.trim()) {
          text = c
          break
        }
      }
    }

    // If the SDK returned a JSON-stringified payload that includes the message content, try to regexp-extract it
    if (!text) {
      try {
        const raw = JSON.stringify(anyRes)
        const m = raw.match(/"message"\s*:\s*\{[\s\S]*?"content"\s*:\s*"([\s\S]*?)"/)
        if (m && m[1]) {
          text = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
        }
      } catch (e) {
        // ignore
      }
    }

    // Last fallback: pretty-print the raw object
    if (!text) {
      try {
        text = JSON.stringify(anyRes)
      } catch (e) {
        text = String(anyRes)
      }
    }

    return { text, raw: anyRes }
  },
}
