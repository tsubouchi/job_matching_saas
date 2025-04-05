"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function InterviewsFilter() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="面談を検索..." className="w-full pl-8" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="面談カテゴリ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="hiring">採用面談</SelectItem>
            <SelectItem value="counseling">初回カウンセリング</SelectItem>
            <SelectItem value="monthly">月1面談</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">フィルター</span>
        </Button>
      </div>
    </div>
  )
}

