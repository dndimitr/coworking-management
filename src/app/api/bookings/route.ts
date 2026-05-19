import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { formatDateTime } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const userId = searchParams.get("userId")
    const spaceId = searchParams.get("spaceId")

    // Build where clause
    const where: any = {}

    if (date) {
      const startOfDay = new Date(date)
      const endOfDay = new Date(date)
      endOfDay.setDate(endOfDay.getDate() + 1)

      where.startTime = {
        gte: startOfDay,
        lt: endOfDay,
      }
    }

    if (userId) {
      where.userId = userId
    }

    if (spaceId) {
      where.spaceId = spaceId
    }

    // Fetch bookings with related data
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        space: {
          select: {
            id: true,
            name: true,
            type: true,
            capacity: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    })

    // Transform data for frontend
    const transformedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      title: `${booking.user.name} - ${booking.space.name}`,
      start: booking.startTime,
      end: booking.endTime,
      user: booking.user,
      space: booking.space,
      status: booking.status,
      purpose: booking.purpose,
      attendees: booking.attendees,
      checkInAt: booking.checkInAt,
      checkOutAt: booking.checkOutAt,
      createdAt: booking.createdAt,
      formattedDate: formatDateTime(booking.startTime),
    }))

    return NextResponse.json({
      success: true,
      data: transformedBookings,
      count: transformedBookings.length,
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
    const {
      userId,
      spaceId,
      startTime,
      endTime,
      purpose,
      attendees = 1,
    } = body

    // Validate required fields
    if (!userId || !spaceId || !startTime || !endTime) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      )
    }

    // Check if space is available
    const conflictingBookings = await prisma.booking.count({
      where: {
        spaceId,
        status: {
          in: ["PENDING", "CONFIRMED", "CHECKED_IN"],
        },
        OR: [
          {
            startTime: {
              gte: new Date(startTime),
              lt: new Date(endTime),
            },
          },
          {
            endTime: {
              gt: new Date(startTime),
              lte: new Date(endTime),
            },
          },
        ],
      },
    })

    if (conflictingBookings > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Space is not available for the selected time",
        },
        { status: 409 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        spaceId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        purpose,
        attendees,
        status: "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        space: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: booking,
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