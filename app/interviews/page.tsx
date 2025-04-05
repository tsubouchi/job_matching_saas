import { InterviewsTable } from "@/components/interviews-table"
import { InterviewsFilter } from "@/components/interviews-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function InterviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">面談DB</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規面談
        </Button>
      </div>
      <InterviewsFilter />
      <InterviewsTable />
    </div>
  )
}

