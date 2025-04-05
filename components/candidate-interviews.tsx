import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare } from "lucide-react"

// サンプルデータ
const interviews = [
  {
    id: "1",
    date: "2023年3月20日 14:00",
    title: "初回カウンセリング",
    interviewer: "田中 花子",
    category: "初回カウンセリング",
    notes:
      "希望条件のヒアリングを実施。事務職希望で、Excel・Wordのスキルあり。前職での経験を活かせる職場を希望している。",
  },
  {
    id: "2",
    date: "2023年3月25日 11:00",
    title: "求人提案面談",
    interviewer: "佐藤 一郎",
    category: "求人提案",
    notes: "金融系事務（新宿）の求人を提案。勤務条件に満足しており、応募の意思あり。履歴書・職務経歴書の準備を依頼。",
  },
  {
    id: "3",
    date: "2023年4月1日 10:30",
    title: "面接前最終確認",
    interviewer: "佐藤 一郎",
    category: "面接対策",
    notes: "面接に向けての最終確認。自己PRのポイントを整理し、想定質問への回答を練習。",
  },
]

export function CandidateInterviews() {
  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <Card key={interview.id}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{interview.title}</div>
                  <Badge
                    className={`
                      ${interview.category === "初回カウンセリング" ? "bg-purple-100 text-purple-800" : ""}
                      ${interview.category === "求人提案" ? "bg-blue-100 text-blue-800" : ""}
                      ${interview.category === "面接対策" ? "bg-green-100 text-green-800" : ""}
                    `}
                  >
                    {interview.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{interview.date}</span>
                  <span>•</span>
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">{interview.interviewer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{interview.interviewer}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  議事録
                </Button>
              </div>
            </div>

            {interview.notes && (
              <div className="mt-3 rounded-md bg-muted p-3 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">面談メモ</span>
                </div>
                {interview.notes}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

