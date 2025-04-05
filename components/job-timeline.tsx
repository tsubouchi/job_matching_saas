import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, UserPlus, Edit, CheckCircle } from "lucide-react"

// サンプルデータ
const timelineEvents = [
  {
    id: "1",
    date: "2025年3月28日 12:31",
    type: "created",
    user: "管理者",
    description: "求人が作成されました",
  },
  {
    id: "2",
    date: "2025年3月28日 14:45",
    type: "edited",
    user: "管理者",
    description: "求人情報が更新されました",
  },
  {
    id: "3",
    date: "2025年3月29日 10:15",
    type: "candidate",
    user: "管理者",
    description: "伊藤 恵さんがマッチング候補に追加されました",
    candidateName: "伊藤 恵",
  },
  {
    id: "4",
    date: "2025年3月30日 11:30",
    type: "note",
    user: "管理者",
    description: "面接日程の調整が必要です",
    note: "伊藤さんと面接日程を調整してください。4月第1週で候補日を出してもらう予定です。",
  },
]

export function JobTimeline() {
  return (
    <div className="space-y-4">
      {timelineEvents.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {event.type === "created" && <UserPlus className="h-4 w-4" />}
                  {event.type === "edited" && <Edit className="h-4 w-4" />}
                  {event.type === "candidate" && <CheckCircle className="h-4 w-4" />}
                  {event.type === "note" && <MessageSquare className="h-4 w-4" />}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{event.description}</p>
                  {event.type === "candidate" && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      候補者
                    </Badge>
                  )}
                </div>
                {event.note && <div className="mt-2 rounded-md bg-muted p-3 text-sm">{event.note}</div>}
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">{event.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{event.user}</span>
                  <span>•</span>
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

