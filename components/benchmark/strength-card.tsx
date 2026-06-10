import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  title: string
  items: string[]
}

export function StrengthCard({ title, items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
