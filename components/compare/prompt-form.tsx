"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface PromptFormProps {
  onSubmit: (prompt: string) => void
  isLoading?: boolean
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="space-y-4">
      <Textarea
        rows={6}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Plan a 5-day trip to Bali under $1000..."
      />

      <div className="flex justify-end">
        <Button
          disabled={!prompt || isLoading}
          onClick={() => onSubmit(prompt)}
        >
          {isLoading ? "Generating..." : "Compare Models"}
        </Button>
      </div>
    </div>
  )
}
