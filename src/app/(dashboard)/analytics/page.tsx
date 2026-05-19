"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 28000, bookings: 120 },
  { month: "Feb", revenue: 32000, bookings: 135 },
  { month: "Mar", revenue: 35000, bookings: 150 },
  { month: "Apr", revenue: 42000, bookings: 180 },
  { month: "May", revenue: 48000, bookings: 200 },
  { month: "Jun", revenue: 52000, bookings: 220 },
]

const occupancyData = [
  { day: "Mon", occupancy: 65 },
  { day: "Tue", occupancy: 72 },
  { day: "Wed", occupancy: 78 },
  { day: "Thu", occupancy: 85 },
  { day: "Fri", occupancy: 90 },
  { day: "Sat", occupancy: 45 },
  { day: "Sun", occupancy: 30 },
]

const spaceTypeData = [
  { name: "Desks", value: 45, color: "#3B82F6" },
  { name: "Meeting Rooms", value: 20, color: "#10B981" },
  { name: "Private Offices", value: 15, color: "#F59E0B" },
  { name: "Phone Booths", value: 20, color: "#8B5CF6" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <p className="text-gray-600">Insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">лв 252,000</p>
              <p className="text-sm text-green-600 mt-1">+15% vs last year</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">1,205</p>
              <p className="text-sm text-green-600 mt-1">+12% vs last year</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Occupancy</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <p className="text-sm text-green-600 mt-1">+5% vs last year</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-green-600 mt-1">+8% vs last year</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue & Bookings</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Occupancy</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupancy" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* More Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Space Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Space Type Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spaceTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {spaceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Members */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Members</h3>
          <div className="space-y-4">
            {[
              { name: "John Doe", bookings: 45, revenue: "лв 2,250" },
              { name: "Jane Smith", bookings: 38, revenue: "лв 1,900" },
              { name: "Mike Johnson", bookings: 32, revenue: "лв 1,600" },
              { name: "Sarah Williams", bookings: 28, revenue: "лв 1,400" },
            ].map((member, index) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.bookings} bookings</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{member.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Peak Hours</h3>
          <div className="space-y-3">
            {[
              { time: "9:00 - 11:00", occupancy: 85 },
              { time: "11:00 - 13:00", occupancy: 92 },
              { time: "13:00 - 15:00", occupancy: 78 },
              { time: "15:00 - 17:00", occupancy: 88 },
              { time: "17:00 - 19:00", occupancy: 65 },
            ].map((hour) => (
              <div key={hour.time}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{hour.time}</span>
                  <span className="font-medium">{hour.occupancy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${hour.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}