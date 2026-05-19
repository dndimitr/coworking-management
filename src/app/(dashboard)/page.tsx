import { StatsCard } from "@/components/stats-card"
import { BookingCalendar } from "@/components/booking-calendar"
import { DeviceStatus } from "@/components/device-status"
import { RecentBookings } from "@/components/recent-bookings"
import { Calendar, Users, CreditCard, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Bookings"
          value="12"
          change="+2"
          changeType="positive"
          icon={Calendar}
        />
        <StatsCard
          title="Active Members"
          value="48"
          change="+5"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Today's Revenue"
          value="12,450"
          change="-3%"
          changeType="negative"
          icon={CreditCard}
          prefix="лв"
        />
        <StatsCard
          title="Occupancy Rate"
          value="78%"
          change="+12%"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
            <BookingCalendar />
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <DeviceStatus />
          <RecentBookings />
        </div>
      </div>
    </div>
  )
}