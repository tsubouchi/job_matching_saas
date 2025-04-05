import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, CheckCircle, Calendar, TrendingUp, TrendingDown } from "lucide-react"

export function RecruitmentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">求人総数</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <div className="flex items-center pt-1">
            <TrendingUp className="mr-1 h-3 w-3 text-emerald-600" />
            <span className="text-xs text-emerald-600">13.5%</span>
            <span className="text-xs text-muted-foreground ml-1">vs 先月</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">候補者総数</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <div className="flex items-center pt-1">
            <TrendingUp className="mr-1 h-3 w-3 text-emerald-600" />
            <span className="text-xs text-emerald-600">10.3%</span>
            <span className="text-xs text-muted-foreground ml-1">vs 先月</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">採用成立</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <div className="flex items-center pt-1">
            <TrendingUp className="mr-1 h-3 w-3 text-emerald-600" />
            <span className="text-xs text-emerald-600">50%</span>
            <span className="text-xs text-muted-foreground ml-1">vs 先月</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">面談実施数</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">56</div>
          <div className="flex items-center pt-1">
            <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
            <span className="text-xs text-red-600">5.1%</span>
            <span className="text-xs text-muted-foreground ml-1">vs 先月</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

