import { CandidatesTable } from "@/components/candidates-table"
import { CandidatesFilter } from "@/components/candidates-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">求職者</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規求職者
        </Button>
      </div>
      <CandidatesFilter />
      <CandidatesTable />
    </div>
  )
}

