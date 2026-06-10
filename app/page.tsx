import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
          AI Benchmark Platform
        </div>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Gemini AI vs Alibaba AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Compare AI performance, benchmark travel assistant capabilities,
          evaluate strengths, and discover which model delivers the best user
          experience.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>

          <Button variant="outline" size="lg">
            View Benchmark Report
          </Button>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-6 text-left">
            <h3 className="font-semibold">Performance Analysis</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare response quality, latency, and travel planning accuracy.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-left">
            <h3 className="font-semibold">Feature Comparison</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Evaluate itinerary generation, recommendations, and multimodal
              capabilities.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-left">
            <h3 className="font-semibold">Benchmark Dashboard</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Visualize scores, charts, and side-by-side AI comparisons.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
