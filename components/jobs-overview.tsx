import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// サンプルデータ
const recentJobs = [
  {
    id: "1",
    title: "モバイルプランナー（一都三県）",
    status: "未着手",
    category: "モバイル",
  },
  {
    id: "2",
    title: "RSヘルプ（目黒）",
    status: "未着手",
    category: "モバイル",
  },
  {
    id: "3",
    title: "メール&受電OP（江戸川橋）",
    status: "未着手",
    category: "インバウンド",
  },
]

export function JobsOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">最近の求人</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          すべて見る
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{job.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                    {job.status}
                  </Badge>
                  <Badge
                    className={`
                      ${job.category === "モバイル" ? "bg-indigo-100 text-indigo-800" : ""}
                      ${job.category === "インバウンド" ? "bg-pink-100 text-pink-800" : ""}
                    `}
                  >
                    {job.category}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                詳細
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

