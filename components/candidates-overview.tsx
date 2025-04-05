import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// サンプルデータ
const recentCandidates = [
  {
    id: "1",
    name: "伊藤 恵",
    jobCategory: "事務",
    nearestStation: "秋葉原駅",
  },
  {
    id: "2",
    name: "山田 隆",
    jobCategory: "インバウンド",
    nearestStation: "横浜駅",
  },
  {
    id: "3",
    name: "鈴木 太郎",
    jobCategory: "アウトバウンド",
    nearestStation: "新宿駅",
  },
]

export function CandidatesOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">最近の求職者</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          すべて見る
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCandidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{candidate.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`
                        ${candidate.jobCategory === "事務" ? "bg-amber-50 text-amber-700" : ""}
                        ${candidate.jobCategory === "インバウンド" ? "bg-pink-50 text-pink-700" : ""}
                        ${candidate.jobCategory === "アウトバウンド" ? "bg-green-50 text-green-700" : ""}
                        hover:bg-opacity-100
                      `}
                    >
                      {candidate.jobCategory}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{candidate.nearestStation}</span>
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

