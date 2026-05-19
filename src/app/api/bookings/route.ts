import { NextRequest, NextResponse } from "next/server"
import { formatDateTime } from "@/lib/utils"

// Mock data for demo
const mockBookings = [
  {
    id: "1",
    title: "Team Meeting - Meeting Room A",
    start: new Date(),
    end: new Date(Date.now() + 3600000),
    user: { id: "1", name: "John Doe", email: "john@example.com" },
    space: { id: "1", name: "Meeting Room A", type: "MEETING_ROOM", capacity: 8 },
    status: "CONFIRMED",
    purpose: "Weekly team sync",
    attendees: 5,
    checkInAt: null,
    checkOutAt: null,
    createdAt: new Date(),
    formattedDate: formatDateTime(new Date()),
  },
  {
    id: "2",
    title: "Work Session - Desk 12",
    start: new Date(Date.now() + 7200000),
    end: new Date(Date.now() + 25200000),
    user: { id: "2", name: "Jane Smith", email: "jane@example.com" },
    space: { id: "2", name: "Desk 12", type: "DESK", capacity: 1 },
    status: "PENDING",
    purpose: "Focus work",
    attendees: 1,
    checkInAt: null,
    checkOutAt: null,
    createdAt: new Date(),
    formattedDate: formatDateTime(new Date(Date.now() + 7200000)),
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockBookings,
      count: mockBookings.length,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bookings",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    return NextResponse.json({
      success: true,
      data: {
        id: "new-booking-id",
        ...body,
        status: "PENDING",
        createdAt: new Date(),
      },
      message: "Booking created successfully",
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking",
      },
      { status: 500 }
    )
  }
}