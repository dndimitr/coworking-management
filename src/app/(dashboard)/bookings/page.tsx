import { BookingCalendar } from "@/components/booking-calendar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bookings</h2>
          <p className="text-gray-600">Manage space bookings and reservations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Calendar</h3>
            <BookingCalendar />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4"
              <div className="flex items-center justify-between"
                <span className="text-gray-600">Total Today</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between"
                <span className="text-gray-600">Checked In</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex items-center justify-between"
                <span className="text-gray-600">Upcoming</span>
                <span className="font-semibold text-blue-600">4</span>
              </div>
              <div className="flex items-center justify-between"
                <span className="text-gray-600">Cancelled</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Space Availability</h3>
            <div className="space-y-3"
              {[
                { name: "Desks", total: 20, occupied: 12 },
                { name: "Meeting Rooms", total: 4, occupied: 2 },
                { name: "Phone Booths", total: 6, occupied: 3 },
                { name: "Private Offices", total: 3, occupied: 1 },
              ].map((space) => (
                <div key={space.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{space.name}</span>
                    <span className="font-medium">{space.total - space.occupied}/{space.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(space.occupied / space.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}