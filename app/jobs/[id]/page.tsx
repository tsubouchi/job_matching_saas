import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, MapPin, Building, Banknote, Train, Users } from "lucide-react"
import Link from "next/link"
import { JobCandidates } from "@/components/job-candidates"
import { JobTimeline } from "@/components/job-timeline"

// サンプルデータ
const jobDetail = {
  id: "1",
  title: "モバイルプランナー（一都三県）",
  status: "未着手",
  category: "モバイル",
  description:
    "大手通信キャリアのモバイルプランナーとして、お客様へのプラン提案や契約手続きを担当していただきます。未経験者歓迎、研修制度あり。",
  requirements: ["高卒以上", "未経験者歓迎", "接客経験あれば尚可", "PCスキル（基本操作）"],
  benefits: ["交通費全額支給", "社会保険完備", "研修制度あり", "昇給あり"],
  location: "東京都新宿区西新宿2-1-1",
  nearestStation: "新宿駅 徒歩5分",
  workHours: "10:00〜19:00（実働8時間）",
  workSchedule: "シフト制（希望シフト制）",
  salary: "時給1,400円〜",
  incentive: "不明",
  transportation: "込",
  startDate: "即日〜",
  company: "株式会社モバイルソリューション",
  createdAt: "2025年3月28日 12:31",
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">戻る</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{jobDetail.title}</h1>
        <Badge
          className={`
            ${jobDetail.category === "モバイル" ? "bg-indigo-100 text-indigo-800" : ""}
          `}
        >
          {jobDetail.category}
        </Badge>
        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
          {jobDetail.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>求人概要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{jobDetail.description}</p>

              <div>
                <h3 className="font-semibold mb-2">応募要件</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {jobDetail.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">福利厚生</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {jobDetail.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="candidates">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="candidates">候補者</TabsTrigger>
              <TabsTrigger value="timeline">タイムライン</TabsTrigger>
            </TabsList>
            <TabsContent value="candidates" className="mt-4">
              <JobCandidates />
            </TabsContent>
            <TabsContent value="timeline" className="mt-4">
              <JobTimeline />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>勤務情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">勤務地</p>
                  <p className="text-sm text-muted-foreground">{jobDetail.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">最寄駅</p>
                  <p className="text-sm text-muted-foreground">{jobDetail.nearestStation}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">勤務時間</p>
                  <p className="text-sm text-muted-foreground">{jobDetail.workHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">勤務日</p>
                  <p className="text-sm text-muted-foreground">{jobDetail.workSchedule}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Banknote className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">給与</p>
                  <p className="text-sm text-muted-foreground">{jobDetail.salary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>企業情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">企業名</p>
                  <p className="text-sm text-muted-foreground">{jobDetail.company}</p>
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
                <Users className="mr-2 h-4 w-4" />
                候補者を探す
              </Button>
              <Button variant="outline" className="w-full">
                編集する
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

