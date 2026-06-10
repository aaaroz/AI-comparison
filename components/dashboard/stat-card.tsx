import { Card, CardContent } from "@/components/ui/card"

interface Props {
  title: string
  value: string
}

export function StatCard({ title, value }: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
      </CardContent>
    </Card>
  )
}
