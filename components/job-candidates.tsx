import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Clock } from "lucide-react"

// サンプルデータ
const candidates = [
  {
    id: "1",
    name: "伊藤 恵",
    jobCategory: "事務",
    availableDate: "2023年4月5日",
    nearestStation: "秋葉原駅",
    workSchedule: "シフト制",
    matchScore: 85,
  },
  {
    id: "2",
    name: "山田 隆",
    jobCategory: "インバウンド",
    availableDate: "2023年3月25日",
    nearestStation: "横浜駅",
    workSchedule: "平日2日",
    matchScore: 72,
  },
  {
    id: "3",
    name: "鈴木 太郎",
    jobCategory: "アウトバウンド",
    availableDate: "2023年4月10日",
    nearestStation: "新宿駅",
    workSchedule: "シフト制",
    matchScore: 68,
  },
]

export function JobCandidates() {
  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{candidate.name}</div>
                  <div className="flex items-center gap-2 mt-1">
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
                    <div className="text-xs text-muted-foreground">マッチ度: {candidate.matchScore}%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:flex md:items-center md:gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{candidate.nearestStation}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{candidate.availableDate}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{candidate.workSchedule}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <Button size="sm" variant="outline">
                  詳細
                </Button>
                <Button size="sm">マッチング</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

