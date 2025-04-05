import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// サンプルデータ
const recruiters = [
  {
    id: "1",
    name: "佐藤 一郎",
    hires: 12,
    target: 15,
    progress: 80,
  },
  {
    id: "2",
    name: "田中 花子",
    hires: 10,
    target: 15,
    progress: 67,
  },
  {
    id: "3",
    name: "鈴木 太郎",
    hires: 8,
    target: 15,
    progress: 53,
  },
  {
    id: "4",
    name: "山田 隆",
    hires: 7,
    target: 15,
    progress: 47,
  },
]

export function TopRecruiters() {
  return (
    <div className="space-y-4">
      {recruiters.map((recruiter) => (
        <div key={recruiter.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{recruiter.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{recruiter.name}</p>
              <p className="text-sm text-muted-foreground">
                {recruiter.hires}/{recruiter.target}
              </p>
            </div>
            <Progress value={recruiter.progress} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

