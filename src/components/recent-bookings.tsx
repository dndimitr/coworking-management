import { formatTime, getStatusColor, getStatusText } from "@/lib/utils"

interface Booking {
  id: string
  user: string
  space: string
  startTime: Date
  endTime: Date
  status: string
}

// Mock data for demo
const mockBookings: Booking[] = [
  {
    id: "1",
    user: "John Doe",
    space: "Desk 15",
    startTime: new Date(2024, 4, 19, 9, 0),
    endTime: new Date(2024, 4, 19, 17, 0),
    status: "checked_in",
  },
  {
    id: "2",
    user: "Jane Smith",
    space: "Meeting Room B",
    startTime: new Date(2024, 4, 19, 10, 0),
    endTime: new Date(2024, 4, 19, 11, 30),
    status: "confirmed",
  },
  {
    id: "3",
    user: "Mike Johnson",
    space: "Phone Booth 2",
    startTime: new Date(2024, 4, 19, 14, 0),
    endTime: new Date(2024, 4, 19, 14, 30),
    status: "confirmed",
  },
  {
    id: "4",
    user: "Sarah Williams",
    space: "Private Office 1",
    startTime: new Date(2024, 4, 19, 9, 0),
    endTime: new Date(2024, 4, 19, 18, 0),
    status: "pending",
  },
]

export function RecentBookings() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
        <a href="/bookings" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>

      <div className="space-y-3">
        {mockBookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{booking.user}</p>
              <p className="text-sm text-gray-600">{booking.space}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Today</span>
          <span className="font-semibold text-gray-900">12 bookings</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">Checked In</span>
          <span className="font-semibold text-green-600">8</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">Upcoming</span>
          <span className="font-semibold text-blue-600">4</span>
        </div>
      </div>
    </div>
  )
}