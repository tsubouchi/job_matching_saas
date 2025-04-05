import { JobsTable } from "@/components/jobs-table"
import { JobsFilter } from "@/components/jobs-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">求人データベース</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規求人
        </Button>
      </div>
      <JobsFilter />
      <JobsTable />
    </div>
  )
}

