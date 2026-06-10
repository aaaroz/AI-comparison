import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  title: string
  score: number
  response: string
  responseTimeMs?: number
}

export function ModelResponse({ title, score, response, responseTimeMs }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {typeof responseTimeMs === "number" && (
              <p className="text-xs text-muted-foreground">Response time: {responseTimeMs} ms</p>
            )}
          </div>

          <div className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium">
            {score}/100
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
          {response}
        </pre>
      </CardContent>
    </Card>
  )
}
