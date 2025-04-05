import { DashboardStats } from "@/components/dashboard-stats"
import { RecentMatches } from "@/components/recent-matches"
import { JobsOverview } from "@/components/jobs-overview"
import { CandidatesOverview } from "@/components/candidates-overview"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <JobsOverview />
        <CandidatesOverview />
      </div>
      <RecentMatches />
    </div>
  )
}

