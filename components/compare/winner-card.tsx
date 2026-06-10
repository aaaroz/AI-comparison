import { Card, CardContent } from "../ui/card"

interface WinnerCardProps {
  winner: string
}

export function WinnerCard({ winner }: WinnerCardProps) {
  return (
    <Card className="border-primary">
      <CardContent className="p-6">
        <h3 className="font-semibold">Winner</h3>

        <p className="mt-2 text-2xl font-bold">🏆 {winner}</p>
      </CardContent>
    </Card>
  )
}
