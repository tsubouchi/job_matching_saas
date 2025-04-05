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
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"

// サンプルデータ
const jobs = [
  {
    id: "1",
    createdAt: "2025年3月28日 12:31",
    title: "モバイルプランナー（一都三県）",
    status: "未着手",
    incentive: "不明",
    transportation: "込",
    workSchedule: "シフト制（希望）",
    category: "モバイル",
  },
  {
    id: "2",
    createdAt: "2025年3月28日 12:31",
    title: "RSヘルプ（目黒）",
    status: "未着手",
    incentive: "不明",
    transportation: "込",
    workSchedule: "シフト制（希望）",
    category: "モバイル",
  },
  {
    id: "3",
    createdAt: "2025年3月26日 13:12",
    title: "メール&受電OP（江戸川橋）",
    status: "未着手",
    incentive: "不明",
    transportation: "込",
    workSchedule: "週休2日（土日祝）",
    category: "インバウンド",
  },
  {
    id: "4",
    createdAt: "2025年3月26日 13:12",
    title: "金融系事務（新宿）",
    status: "未着手",
    incentive: "不明",
    transportation: "込",
    workSchedule: "シフト制（土日）",
    category: "事務",
  },
]

export function JobsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">作成日時</TableHead>
            <TableHead>タイトル</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>インセンティブ</TableHead>
            <TableHead>交通費</TableHead>
            <TableHead>休日</TableHead>
            <TableHead>カテゴリ</TableHead>
            <TableHead className="text-right">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.createdAt}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>{job.incentive}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  {job.transportation}
                </Badge>
              </TableCell>
              <TableCell>{job.workSchedule}</TableCell>
              <TableCell>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{job.category}</Badge>
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

