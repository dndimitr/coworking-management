"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Users,
  Building,
  Cpu,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Home
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Bookings",
    href: "/bookings",
    icon: Calendar,
  },
  {
    title: "Members",
    href: "/members",
    icon: Users,
  },
  {
    title: "Spaces",
    href: "/spaces",
    icon: Building,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: Cpu,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Coworking Manager</h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
                isActive && "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}