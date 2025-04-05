"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Eye, Calendar } from "lucide-react"

// サンプルデータ
const candidates = [
  {
    id: "1",
    name: "伊藤 恵",
    workSchedule: "シフト制",
    jobCategory: "事務",
    availableDate: "2023年4月5日",
    nearestStation: "秋葉原駅",
    matchingStatus: "マッチング",
    matchedJobs: ["金融系事務（新宿）", "メール&受電OP（江戸川橋）"],
  },
  {
    id: "2",
    name: "山田 隆",
    workSchedule: "平日2日",
    jobCategory: "インバウンド",
    availableDate: "2023年3月25日",
    nearestStation: "横浜駅",
    matchingStatus: "マッチング",
    matchedJobs: ["メール&受電OP（江戸川橋）", "金融系事務（新宿）"],
  },
  {
    id: "3",
    name: "鈴木 太郎",
    workSchedule: "シフト制",
    jobCategory: "アウトバウンド",
    availableDate: "2023年4月10日",
    nearestStation: "新宿駅",
    matchingStatus: "マッチング",
    matchedJobs: ["金融系事務（新宿）", "メール&受電OP（江戸川橋）"],
  },
  {
    id: "4",
    name: "田中 花子",
    workSchedule: "土日祝",
    jobCategory: "接客業",
    availableDate: "2023年4月1日",
    nearestStation: "池袋駅",
    matchingStatus: "マッチング",
    matchedJobs: ["金融系事務（新宿）", "メール&受電OP（江戸川橋）"],
  },
  {
    id: "5",
    name: "佐藤 一郎",
    workSchedule: "土日",
    jobCategory: "店舗販売",
    availableDate: "2023年4月15日",
    nearestStation: "渋谷駅",
    matchingStatus: "マッチング",
    matchedJobs: ["金融系事務（新宿）", "メール&受電OP（江戸川橋）"],
  },
  {
    id: "6",
    name: "田中 健太",
    workSchedule: "土日祝",
    jobCategory: "モバイル",
    availableDate: "2024年7月1日",
    nearestStation: "新宿駅",
    matchingStatus: "マッチング",
    matchedJobs: ["金融系事務（新宿）", "メール&受電OP（江戸川橋）"],
  },
]

export function CandidatesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>氏名</TableHead>
            <TableHead>希望勤務日</TableHead>
            <TableHead>希望職種</TableHead>
            <TableHead>就業開始可能日</TableHead>
            <TableHead>最寄り駅</TableHead>
            <TableHead>マッチング</TableHead>
            <TableHead>マッチング求人</TableHead>
            <TableHead className="text-right">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">{candidate.name}</TableCell>
              <TableCell>{candidate.workSchedule}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                    ${candidate.jobCategory === "事務" ? "bg-amber-50 text-amber-700" : ""}
                    ${candidate.jobCategory === "インバウンド" ? "bg-pink-50 text-pink-700" : ""}
                    ${candidate.jobCategory === "アウトバウンド" ? "bg-green-50 text-green-700" : ""}
                    ${candidate.jobCategory === "接客業" ? "bg-purple-50 text-purple-700" : ""}
                    ${candidate.jobCategory === "店舗販売" ? "bg-blue-50 text-blue-700" : ""}
                    ${candidate.jobCategory === "モバイル" ? "bg-indigo-50 text-indigo-700" : ""}
                    hover:bg-opacity-100
                  `}
                >
                  {candidate.jobCategory}
                </Badge>
              </TableCell>
              <TableCell>{candidate.availableDate}</TableCell>
              <TableCell>{candidate.nearestStation}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  {candidate.matchingStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {candidate.matchedJobs.map((job, index) => (
                    <div key={index} className="text-xs">
                      {job}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">メニューを開く</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>アクション</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>詳細を見る</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>編集する</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>面談を予約</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>削除する</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

