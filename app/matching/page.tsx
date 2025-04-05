import { MatchingBoard } from "@/components/matching-board"
import { MatchingFilter } from "@/components/matching-filter"

export default function MatchingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">マッチング</h1>
      <MatchingFilter />
      <MatchingBoard />
    </div>
  )
}

