import { Card, CardContent } from "@/components/ui/card"

interface Props {
  title: string
  gemini: number
  alibaba: number
}

export function ScoreCard({ title, gemini, alibaba }: Props) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span>Gemini</span>
            <span>{gemini}</span>
          </div>

          <div className="flex justify-between">
            <span>Alibaba</span>
            <span>{alibaba}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
