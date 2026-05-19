import { NextRequest, NextResponse } from "next/server"

// Mock devices for demo
const mockDevices = [
  {
    id: "1",
    name: "Main Hall Lights",
    category: "dj",
    status: [
      { code: "switch_led", value: true },
      { code: "bright_value", value: 800 },
    ],
    isOnline: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: "2",
    name: "AC Unit 1",
    category: "kt",
    status: [
      { code: "switch", value: true },
      { code: "temp_set", value: 22 },
      { code: "mode", value: "0" },
    ],
    isOnline: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Front Door Lock",
    category: "ms",
    status: [
      { code: "unlock", value: false },
    ],
    isOnline: true,
    lastSeen: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockDevices,
      count: mockDevices.length,
    })
  } catch (error) {
    console.error("Error fetching devices:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch devices",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId, commands } = await request.json()

    return NextResponse.json({
      success: true,
      message: "Device controlled successfully",
      data: {
        deviceId,
        commands,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error controlling device:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to control device",
      },
      { status: 500 }
    )
  }
}