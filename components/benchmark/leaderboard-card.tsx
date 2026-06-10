import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { TrophyIcon } from "@phosphor-icons/react/dist/ssr"

interface Props {
  rank: number
  name: string
  score: number
}

export function LeaderboardCard({ rank, name, score }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <TrophyIcon size={24} />

          <div>
            <p className="font-medium">#{rank}</p>

            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
        </div>

        <div className="text-3xl font-bold">{score}</div>
      </CardContent>
    </Card>
  )
}
