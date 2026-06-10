"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type SettingsStore = {
  modelA: string
  modelB: string

  geminiApiKey: string
  alibabaApiKey: string

  judgeModel: string

  datasetSize: number

  temperature: number

  setModelA: (value: string) => void
  setModelB: (value: string) => void

  setGeminiApiKey: (value: string) => void
  setAlibabaApiKey: (value: string) => void

  setJudgeModel: (value: string) => void

  setDatasetSize: (value: number) => void

  setTemperature: (value: number) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      modelA: "Gemini 2.5 Pro",
      modelB: "Qwen 3 Max",

      geminiApiKey: "",
      alibabaApiKey: "",

      judgeModel: "GPT-5",

      datasetSize: 100,

      temperature: 0.7,

      setModelA: (modelA) => set({ modelA }),

      setModelB: (modelB) => set({ modelB }),

      setGeminiApiKey: (geminiApiKey) => set({ geminiApiKey }),

      setAlibabaApiKey: (alibabaApiKey) => set({ alibabaApiKey }),

      setJudgeModel: (judgeModel) => set({ judgeModel }),

      setDatasetSize: (datasetSize) => set({ datasetSize }),

      setTemperature: (temperature) => set({ temperature }),
    }),
    {
      name: "ai-benchmark-settings",
    }
  )
)
