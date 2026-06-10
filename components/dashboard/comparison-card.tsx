import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  title: string
  score: number
  strengths: string[]
}

export function ComparisonCard({ title, score, strengths }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <p className="text-muted-foreground">Overall Score</p>

          <h2 className="text-4xl font-bold">{score}</h2>
        </div>

        <div className="space-y-2">
          {strengths.map((item) => (
            <div key={item}>• {item}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
