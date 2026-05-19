import { NextRequest, NextResponse } from "next/server"
import { tuyaClient } from "@/lib/tuya/client"

export async function GET(request: NextRequest) {
  try {
    const response = await tuyaClient.getDevices()

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch devices from Tuya",
        },
        { status: 500 }
      )
    }

    // Transform Tuya devices to our format
    const devices = response.result?.devices.map((device) => ({
      id: device.id,
      name: device.name,
      category: device.category,
      status: device.status.reduce((acc, status) => {
        acc[status.code] = status.value
        return acc
      }, {} as Record<string, unknown>),
      isOnline: true, // This would come from Tuya API
      lastSeen: new Date().toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: devices || [],
      count: devices?.length || 0,
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

    if (!deviceId || !commands || !Array.isArray(commands)) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing deviceId or commands",
        },
        { status: 400 }
      )
    }

    const response = await tuyaClient.controlDevice(deviceId, commands)

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to control device",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Device controlled successfully",
      data: response.result,
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