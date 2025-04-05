import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, MessageSquare, FileText, Save } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// サンプルデータ
const interviewDetail = {
  id: "1",
  date: "2025年3月27日 14:00",
  title: "採用面談_2025-03-19-川口さん",
  candidate: "佐藤 一郎",
  interviewer: "田中 花子",
  category: "採用面談",
  location: "オンライン（Zoom）",
  duration: "45分",
  status: "完了",
  notes:
    "応募動機や前職での経験について詳しく聞き取りを行った。コミュニケーション能力が高く、チームワークを重視する姿勢が見られた。技術的なスキルも十分であり、採用を前向きに検討したい。",
  questions: [
    {
      question: "前職での具体的な業務内容を教えてください。",
      answer:
        "前職では金融機関での窓口業務を3年間担当していました。主に口座開設や各種手続き、お客様からの問い合わせ対応などを行っていました。また、内部の事務処理や書類管理なども担当していました。",
    },
    {
      question: "志望動機を教えてください。",
      answer:
        "御社は金融業界での実績が豊富であり、私の前職での経験を活かせると考えました。また、チームワークを重視する社風に魅力を感じ、ぜひ一員として貢献したいと思いました。",
    },
    {
      question: "あなたの強みは何ですか？",
      answer:
        "私の強みは正確性とコミュニケーション能力です。前職では複雑な手続きも正確に処理することを心がけ、ミスを最小限に抑えることができました。また、様々なお客様と接する中で、相手の要望を的確に理解し、適切な対応をする能力を身につけました。",
    },
  ],
  nextSteps: "次回は実務テストを実施予定。日程は4月5日で調整中。",
}

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/interviews">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">戻る</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{interviewDetail.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-amber-100 text-amber-800">{interviewDetail.category}</Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              {interviewDetail.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>面談メモ</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[150px]"
                placeholder="面談メモを入力..."
                defaultValue={interviewDetail.notes}
              />
              <Button className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>質問と回答</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {interviewDetail.questions.map((qa, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    {qa.question}
                  </div>
                  <div className="pl-6 text-muted-foreground">{qa.answer}</div>
                  {index < interviewDetail.questions.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>次のステップ</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[100px]"
                placeholder="次のステップを入力..."
                defaultValue={interviewDetail.nextSteps}
              />
              <Button className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>面談情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">日時</p>
                  <p className="text-sm text-muted-foreground">{interviewDetail.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">所要時間</p>
                  <p className="text-sm text-muted-foreground">{interviewDetail.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">場所</p>
                  <p className="text-sm text-muted-foreground">{interviewDetail.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>参加者</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{interviewDetail.candidate.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{interviewDetail.candidate}</p>
                  <p className="text-sm text-muted-foreground">候補者</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{interviewDetail.interviewer.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{interviewDetail.interviewer}</p>
                  <p className="text-sm text-muted-foreground">面接官</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>アクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                議事録を作成
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                次回面談を予約
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

