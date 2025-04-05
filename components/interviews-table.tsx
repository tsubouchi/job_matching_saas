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
import { MoreHorizontal, Edit, Trash, Eye, FileText } from "lucide-react"

// サンプルデータ
const interviews = [
  {
    id: "1",
    date: "2025年3月27日",
    title: "採用面談_2025-03-19-川口さん",
    candidate: "佐藤 一郎",
    category: "採用面談",
  },
  {
    id: "2",
    date: "2025年3月27日",
    title: "2025-03-19-川口さん",
    candidate: "佐藤 一郎",
    category: "採用面談",
  },
  {
    id: "3",
    date: "2025年3月27日",
    title: "2025-03-19-川口さん",
    candidate: "田中 花子",
    category: "初回カウンセリング",
  },
  {
    id: "4",
    date: "2025年3月27日",
    title: "2025-03-19-川口さん",
    candidate: "田中 健太",
    category: "月1面談",
  },
]

export function InterviewsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">実施日</TableHead>
            <TableHead>タイトル</TableHead>
            <TableHead>求職者</TableHead>
            <TableHead>面談カテゴリ</TableHead>
            <TableHead className="text-right">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview) => (
            <TableRow key={interview.id}>
              <TableCell className="font-medium">{interview.date}</TableCell>
              <TableCell>{interview.title}</TableCell>
              <TableCell>{interview.candidate}</TableCell>
              <TableCell>
                <Badge
                  className={`
                    ${interview.category === "採用面談" ? "bg-amber-100 text-amber-800" : ""}
                    ${interview.category === "初回カウンセリング" ? "bg-purple-100 text-purple-800" : ""}
                    ${interview.category === "月1面談" ? "bg-blue-100 text-blue-800" : ""}
                  `}
                >
                  {interview.category}
                </Badge>
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
                      <FileText className="mr-2 h-4 w-4" />
                      <span>議事録を作成</span>
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

