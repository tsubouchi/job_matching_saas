import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// サンプルデータ
const recentMatches = [
  {
    id: "1",
    candidate: {
      name: "伊藤 恵",
      jobCategory: "事務",
    },
    job: {
      title: "金融系事務（新宿）",
      category: "事務",
    },
    date: "2025年3月28日",
  },
  {
    id: "2",
    candidate: {
      name: "山田 隆",
      jobCategory: "インバウンド",
    },
    job: {
      title: "メール&受電OP（江戸川橋）",
      category: "インバウンド",
    },
    date: "2025年3月27日",
  },
  {
    id: "3",
    candidate: {
      name: "田中 花子",
      jobCategory: "接客業",
    },
    job: {
      title: "金融系事務（新宿）",
      category: "事務",
    },
    date: "2025年3月26日",
  },
]

export function RecentMatches() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">最近のマッチング</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          すべて見る
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMatches.map((match) => (
            <div key={match.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{match.candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{match.candidate.name}</p>
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium leading-none">{match.job.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`
                        ${match.candidate.jobCategory === "事務" ? "bg-amber-50 text-amber-700" : ""}
                        ${match.candidate.jobCategory === "インバウンド" ? "bg-pink-50 text-pink-700" : ""}
                        ${match.candidate.jobCategory === "接客業" ? "bg-purple-50 text-purple-700" : ""}
                        hover:bg-opacity-100
                      `}
                    >
                      {match.candidate.jobCategory}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{match.date}</span>
                  </div>
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

