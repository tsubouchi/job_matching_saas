"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function JobsFilter() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="求人を検索..." className="w-full pl-8" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="カテゴリ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="mobile">モバイル</SelectItem>
            <SelectItem value="inbound">インバウンド</SelectItem>
            <SelectItem value="office">事務</SelectItem>
            <SelectItem value="sales">店舗販売</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="not-started">未着手</SelectItem>
            <SelectItem value="in-progress">進行中</SelectItem>
            <SelectItem value="completed">完了</SelectItem>
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

