import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  prompts: number
  evaluator: string
  metrics: string[]
}

export function MethodologyCard({ prompts, evaluator, metrics }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation Methodology</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>
          <strong>Dataset:</strong> {prompts} travel prompts
        </p>

        <p>
          <strong>Judge:</strong> {evaluator}
        </p>

        <div>
          <strong>Metrics:</strong>

          <ul className="mt-2 list-disc pl-4">
            {metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
