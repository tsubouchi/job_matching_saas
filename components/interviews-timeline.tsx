import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const upcomingInterviews = [
  {
    id: "1",
    date: "2025年4月5日 14:00",
    title: "採用面談",
    candidate: "川口 健太",
    interviewer: "佐藤 一郎",
    category: "採用面談",
  },
  {
    id: "2",
    date: "2025年4月6日 11:00",
    title: "初回カウンセリング",
    candidate: "高橋 美咲",
    interviewer: "田中 花子",
    category: "初回カウンセリング",
  },
  {
    id: "3",
    date: "2025年4月7日 15:30",
    title: "フォローアップ面談",
    candidate: "中村 大輔",
    interviewer: "鈴木 太郎",
    category: "月1面談",
  },
  {
    id: "4",
    date: "2025年4月8日 10:00",
    title: "採用面談",
    candidate: "小林 直子",
    interviewer: "佐藤 一郎",
    category: "採用面談",
  },
]

export function InterviewsTimeline() {
  return (
    <div className="space-y-4">
      {upcomingInterviews.map((interview) => (
        <div key={interview.id} className="flex items-start gap-3">
          <div className="min-w-[100px] text-xs text-muted-foreground">
            {interview.date.split(" ")[0]}
            <br />
            {interview.date.split(" ")[1]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">{interview.title}</p>
              <Badge
                className={`
                  ${interview.category === "採用面談" ? "bg-amber-100 text-amber-800" : ""}
                  ${interview.category === "初回カウンセリング" ? "bg-purple-100 text-purple-800" : ""}
                  ${interview.category === "月1面談" ? "bg-blue-100 text-blue-800" : ""}
                `}
              >
                {interview.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px]">{interview.candidate.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{interview.candidate}</span>
              <span>•</span>
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px]">{interview.interviewer.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{interview.interviewer}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

