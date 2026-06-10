import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Metric {
  metric: string
  gemini: number
  alibaba: number
}

export function CategoryTable({ data }: { data: Metric[] }) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Gemini</TableHead>
            <TableHead>Alibaba</TableHead>
            <TableHead>Winner</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.metric}>
              <TableCell>{row.metric}</TableCell>

              <TableCell>{row.gemini}</TableCell>

              <TableCell>{row.alibaba}</TableCell>

              <TableCell>
                {row.gemini > row.alibaba ? "Gemini" : "Alibaba"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
