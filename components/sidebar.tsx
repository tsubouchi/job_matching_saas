"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Briefcase, Calendar, FileText, Home, LayoutDashboard, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "ダッシュボード",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "求人データベース",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "求職者",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "マッチング",
    href: "/matching",
    icon: BarChart,
  },
  {
    title: "面談DB",
    href: "/interviews",
    icon: Calendar,
  },
  {
    title: "レポート",
    href: "/reports",
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-6 w-6" />
          <span className="text-lg font-bold">JobMatch</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("justify-start gap-2", pathname === item.href && "bg-secondary")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

