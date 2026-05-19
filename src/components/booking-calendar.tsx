"use client"

import { useState } from "react"
import { format, addDays, startOfDay, endOfDay } from "date-fns"
import { Clock, User } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface Booking {
  id: string
  title: string
  start: Date
  end: Date
  space: string
  user: string
  status: string
}

// Mock data for demo
const mockBookings: Booking[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: new Date(2024, 4, 19, 9, 0),
    end: new Date(2024, 4, 19, 10, 30),
    space: "Meeting Room A",
    user: "John Doe",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Client Call",
    start: new Date(2024, 4, 19, 11, 0),
    end: new Date(2024, 4, 19, 12, 0),
    space: "Phone Booth 1",
    user: "Jane Smith",
    status: "confirmed",
  },
  {
    id: "3",
    title: "Work Session",
    start: new Date(2024, 4, 19, 14, 0),
    end: new Date(2024, 4, 19, 18, 0),
    space: "Desk 12",
    user: "Mike Johnson",
    status: "confirmed",
  },
]

export function BookingCalendar() {
  const [selectedDate] = useState(new Date())

  // Generate time slots from 8 AM to 8 PM
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
          <span>Available</span>
          <div className="w-3 h-3 bg-blue-600 rounded-full ml-4"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-13 gap-2">
            {/* Header with time slots */}
            <div className="col-span-1"></div>
            {timeSlots.map((hour) => (
              <div key={hour} className="text-center text-sm font-medium text-gray-600">
                {hour}:00
              </div>
            ))}

            {/* Space rows */}
            {[
              { name: "Meeting Room A", type: "meeting_room" },
              { name: "Phone Booth 1", type: "phone_booth" },
              { name: "Desk 12", type: "desk" },
            ].map((space) => (
              <>
                <div key={`${space.name}-label`} className="py-3 text-sm font-medium text-gray-700">
                  {space.name}
                </div>
                {timeSlots.map((hour) => {
                  const slotStart = new Date(selectedDate)
                  slotStart.setHours(hour, 0, 0, 0)
                  const slotEnd = new Date(selectedDate)
                  slotEnd.setHours(hour + 1, 0, 0, 0)

                  // Check if there's a booking in this slot
                  const booking = mockBookings.find(
                    (b) =>
                      b.space === space.name &&
                      b.start < slotEnd &&
                      b.end > slotStart
                  )

                  return (
                    <div
                      key={`${space.name}-${hour}`}
                      className={`
                        h-12 border border-gray-200 rounded cursor-pointer
                        ${booking ? "bg-blue-600" : "bg-blue-50 hover:bg-blue-100"}
                      `}
                      title={booking ? `${booking.title} - ${booking.user}` : "Available"}
                    >
                      {booking && (
                        <div className="p-1 text-white text-xs truncate">
                          {booking.title}
                        </div>
                      )}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Today's Bookings</h4>
        <div className="space-y-2">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{booking.title}</p>
                  <p className="text-gray-500">{booking.space} • {booking.user}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTime(booking.start)} - {formatTime(booking.end)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}