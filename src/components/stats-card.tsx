import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  prefix?: string
}

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  prefix = "",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {prefix && <span className="text-gray-500 text-lg mr-1">{prefix}</span>}
            {value}
          </p>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4">
        <span
          className={cn(
            "text-sm font-medium",
            changeType === "positive" && "text-green-600",
            changeType === "negative" && "text-red-600",
            changeType === "neutral" && "text-gray-600"
          )}
        >
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last week</span>
      </div>
    </div>
  )
}
