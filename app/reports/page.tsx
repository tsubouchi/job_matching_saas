import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecruitmentStats } from "@/components/recruitment-stats"
import { JobCategoryChart } from "@/components/job-category-chart"
import { MonthlyHiringChart } from "@/components/monthly-hiring-chart"
import { TopRecruiters } from "@/components/top-recruiters"
import { InterviewsTimeline } from "@/components/interviews-timeline"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">レポート</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            フィルター
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="jobs">求人分析</TabsTrigger>
          <TabsTrigger value="candidates">候補者分析</TabsTrigger>
          <TabsTrigger value="interviews">面談分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <RecruitmentStats />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>職種別求人数</CardTitle>
                <CardDescription>2025年の職種別求人数の分布</CardDescription>
              </CardHeader>
              <CardContent>
                <JobCategoryChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>月別採用数</CardTitle>
                <CardDescription>2025年の月別採用数の推移</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyHiringChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>トップリクルーター</CardTitle>
                <CardDescription>採用実績の高いリクルーター</CardDescription>
              </CardHeader>
              <CardContent>
                <TopRecruiters />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>面談タイムライン</CardTitle>
                <CardDescription>今後の面談スケジュール</CardDescription>
              </CardHeader>
              <CardContent>
                <InterviewsTimeline />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>求人分析</CardTitle>
              <CardDescription>求人に関する詳細な分析データ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">このタブでは求人に関する詳細な分析データを表示します。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>候補者分析</CardTitle>
              <CardDescription>候補者に関する詳細な分析データ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">このタブでは候補者に関する詳細な分析データを表示します。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>面談分析</CardTitle>
              <CardDescription>面談に関する詳細な分析データ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">このタブでは面談に関する詳細な分析データを表示します。</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

