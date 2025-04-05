"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  },
  {
    id: "2",
    name: "山田 隆",
    jobCategory: "インバウンド",
    availableDate: "2023年3月25日",
    nearestStation: "横浜駅",
    workSchedule: "平日2日",
  },
  {
    id: "3",
    name: "鈴木 太郎",
    jobCategory: "アウトバウンド",
    availableDate: "2023年4月10日",
    nearestStation: "新宿駅",
    workSchedule: "シフト制",
  },
]

const jobs = [
  {
    id: "1",
    title: "モバイルプランナー（一都三県）",
    location: "東京都新宿区",
    category: "モバイル",
    workSchedule: "シフト制（希望）",
  },
  {
    id: "2",
    title: "RSヘルプ（目黒）",
    location: "東京都目黒区",
    category: "モバイル",
    workSchedule: "シフト制（希望）",
  },
  {
    id: "3",
    title: "メール&受電OP（江戸川橋）",
    location: "東京都文京区",
    category: "インバウンド",
    workSchedule: "週休2日（土日祝）",
  },
  {
    id: "4",
    title: "金融系事務（新宿）",
    location: "東京都新宿区",
    category: "事務",
    workSchedule: "シフト制（土日）",
  },
]

export function MatchingBoard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>求職者</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="flex flex-col gap-3 rounded-lg border p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <Badge
                      variant="outline"
                      className={`
                        mt-1 text-xs
                        ${candidate.jobCategory === "事務" ? "bg-amber-50 text-amber-700" : ""}
                        ${candidate.jobCategory === "インバウンド" ? "bg-pink-50 text-pink-700" : ""}
                        ${candidate.jobCategory === "アウトバウンド" ? "bg-green-50 text-green-700" : ""}
                        hover:bg-opacity-100
                      `}
                    >
                      {candidate.jobCategory}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
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
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    詳細
                  </Button>
                  <Button size="sm">マッチング</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>求人</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-3 rounded-lg border p-4 shadow-sm">
                <div>
                  <div className="font-medium">{job.title}</div>
                  <Badge
                    className={`
                      mt-1 text-xs
                      ${job.category === "事務" ? "bg-amber-100 text-amber-800" : ""}
                      ${job.category === "インバウンド" ? "bg-pink-100 text-pink-800" : ""}
                      ${job.category === "モバイル" ? "bg-indigo-100 text-indigo-800" : ""}
                    `}
                  >
                    {job.category}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{job.workSchedule}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    詳細
                  </Button>
                  <Button size="sm">候補者を探す</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

