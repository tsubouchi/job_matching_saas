import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Building } from "lucide-react"

// サンプルデータ
const matchedJobs = [
  {
    id: "1",
    title: "金融系事務（新宿）",
    category: "事務",
    location: "東京都新宿区",
    workSchedule: "シフト制（土日）",
    salary: "時給1,350円〜",
    company: "株式会社ファイナンシャルサービス",
    matchScore: 92,
    status: "提案済み",
  },
  {
    id: "2",
    title: "一般事務（千代田区）",
    category: "事務",
    location: "東京都千代田区",
    workSchedule: "平日9:00-18:00",
    salary: "時給1,400円〜",
    company: "株式会社ビジネスサポート",
    matchScore: 85,
    status: "未提案",
  },
  {
    id: "3",
    title: "データ入力スタッフ（秋葉原）",
    category: "事務",
    location: "東京都千代田区",
    workSchedule: "シフト制",
    salary: "時給1,300円〜",
    company: "株式会社データプロセス",
    matchScore: 78,
    status: "未提案",
  },
]

export function CandidateJobs() {
  return (
    <div className="space-y-4">
      {matchedJobs.map((job) => (
        <Card key={job.id}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{job.title}</div>
                  <Badge
                    className={`
                      ${job.category === "事務" ? "bg-amber-100 text-amber-800" : ""}
                    `}
                  >
                    {job.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-xs text-muted-foreground">マッチ度: {job.matchScore}%</div>
                  <Badge
                    variant="outline"
                    className={`
                      ${job.status === "提案済み" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}
                      hover:bg-opacity-100
                    `}
                  >
                    {job.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:flex md:items-center md:gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{job.workSchedule}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Building className="h-3 w-3" />
                  <span>{job.company}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <Button size="sm" variant="outline">
                  詳細
                </Button>
                <Button size="sm">提案する</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

