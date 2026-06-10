"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useSettingsStore } from "@/stores/use-settings-store"

export default function SettingsPage() {
  const {
    modelA,
    modelB,

    geminiApiKey,
    alibabaApiKey,
    setModelA,
    setModelB,

    setGeminiApiKey,
    setAlibabaApiKey,
  } = useSettingsStore()

  return (
    <>
      <DashboardHeader />

      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>

          <p className="text-muted-foreground">
            Configure benchmark models and API credentials.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tested Models</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Model A</Label>

              <Select value={modelA} onValueChange={setModelA}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Gemini 2.5 Flash">
                    Gemini 2.5 Flash
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Model B</Label>

              <Select value={modelB} onValueChange={setModelB}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Qwen 3.6 Flash">Qwen 3.6 Flash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/*
        <Card>
          <CardHeader>
            <CardTitle>API Credentials</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Gemini API Key</Label>

              <Input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
              />
            </div>

            <div>
              <Label>Alibaba API Key</Label>

              <Input
                type="password"
                value={alibabaApiKey}
                onChange={(e) => setAlibabaApiKey(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>*/}

        <Button>Save Settings</Button>
      </div>
    </>
  )
}
