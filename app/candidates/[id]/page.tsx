import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, MapPin, Briefcase, Phone, Mail, Home, GraduationCap, FileText } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CandidateJobs } from "@/components/candidate-jobs"
import { CandidateInterviews } from "@/components/candidate-interviews"

// サンプルデータ
const candidateDetail = {
  id: "1",
  name: "伊藤 恵",
  jobCategory: "事務",
  availableDate: "2023年4月5日",
  nearestStation: "秋葉原駅",
  workSchedule: "シフト制",
  address: "東京都千代田区神田須田町1-1-1",
  phone: "090-1234-5678",
  email: "megumi.ito@example.com",
  education: "〇〇大学 経済学部 2022年卒業",
  skills: ["Excel", "Word", "PowerPoint", "英語（日常会話レベル）"],
  experience: [
    {
      company: "株式会社〇〇商事",
      period: "2022年4月〜2023年3月",
      position: "一般事務",
      description: "請求書発行、データ入力、電話対応などの一般事務業務を担当。",
    },
  ],
  notes: "前職では事務職として1年間勤務。丁寧な仕事ぶりで評価されていた。PCスキルは基本操作問題なし。",
  preferredSalary: "時給1,300円〜",
  preferredLocation: "東京都内（千代田区、中央区、港区希望）",
  createdAt: "2023年3月15日",
}

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/candidates">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">戻る</span>
          </Link>
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarFallback>{candidateDetail.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{candidateDetail.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-amber-50 text-amber-700">
              {candidateDetail.jobCategory}
            </Badge>
            <span className="text-sm text-muted-foreground">{candidateDetail.nearestStation}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">職歴</h3>
                {candidateDetail.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <p className="font-medium">
                      {exp.company} - {exp.position}
                    </p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">スキル</h3>
                <div className="flex flex-wrap gap-2">
                  {candidateDetail.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">備考</h3>
                <p>{candidateDetail.notes}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="jobs">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jobs">マッチング求人</TabsTrigger>
              <TabsTrigger value="interviews">面談履歴</TabsTrigger>
            </TabsList>
            <TabsContent value="jobs" className="mt-4">
              <CandidateJobs />
            </TabsContent>
            <TabsContent value="interviews" className="mt-4">
              <CandidateInterviews />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">電話番号</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">メールアドレス</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">住所</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">学歴</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.education}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>希望条件</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">職種</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.jobCategory}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">勤務地</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.preferredLocation}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">勤務開始可能日</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.availableDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">希望勤務日</p>
                  <p className="text-sm text-muted-foreground">{candidateDetail.workSchedule}</p>
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
                <Briefcase className="mr-2 h-4 w-4" />
                求人を提案
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                面談を予約
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                履歴書を見る
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

