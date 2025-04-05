"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, RefreshCw } from "lucide-react"

export function MatchingFilter() {
  return (
    <div className="flex flex-wrap gap-4">
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="職種" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="office">事務</SelectItem>
          <SelectItem value="inbound">インバウンド</SelectItem>
          <SelectItem value="outbound">アウトバウンド</SelectItem>
          <SelectItem value="sales">店舗販売</SelectItem>
          <SelectItem value="mobile">モバイル</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="エリア" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="tokyo">東京</SelectItem>
          <SelectItem value="kanagawa">神奈川</SelectItem>
          <SelectItem value="saitama">埼玉</SelectItem>
          <SelectItem value="chiba">千葉</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="勤務形態" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="weekday">平日</SelectItem>
          <SelectItem value="weekend">土日</SelectItem>
          <SelectItem value="shift">シフト制</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-2 ml-auto">
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">フィルター</span>
        </Button>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">更新</span>
        </Button>
      </div>
    </div>
  )
}

