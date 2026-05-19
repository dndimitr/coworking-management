"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw, Power, Lightbulb, Thermometer, Lock, Cpu } from "lucide-react"
import { getStatusColor, getStatusText } from "@/lib/utils"

interface Device {
  id: string
  name: string
  type: "light" | "ac" | "lock" | "sensor" | "switch"
  status: string
  isOnline: boolean
  value?: string
  space: string
}

const mockDevices: Device[] = [
  {
    id: "1",
    name: "Main Hall Lights",
    type: "light",
    status: "on",
    isOnline: true,
    value: "80%",
    space: "Main Hall",
  },
  {
    id: "2",
    name: "AC Unit 1",
    type: "ac",
    status: "on",
    isOnline: true,
    value: "22°C",
    space: "Meeting Room A",
  },
  {
    id: "3",
    name: "Front Door Lock",
    type: "lock",
    status: "locked",
    isOnline: true,
    space: "Entrance",
  },
  {
    id: "4",
    name: "Motion Sensor",
    type: "sensor",
    status: "active",
    isOnline: true,
    space: "Corridor",
  },
  {
    id: "5",
    name: "Desk Area Lights",
    type: "light",
    status: "off",
    isOnline: true,
    space: "Desk Area",
  },
  {
    id: "6",
    name: "Smart Switch",
    type: "switch",
    status: "off",
    isOnline: false,
    space: "Kitchen",
  },
]

function getDeviceIcon(type: Device["type"]) {
  switch (type) {
    case "light":
      return Lightbulb
    case "ac":
      return Thermometer
    case "lock":
      return Lock
    case "sensor":
      return Cpu
    case "switch":
      return Power
    default:
      return Cpu
  }
}

export default function DevicesPage() {
  const [devices, setDevices] = useState(mockDevices)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call to refresh device status
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              status: device.status === "on" || device.status === "unlocked" ? "off" : "on",
            }
          : device
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">IoT Devices</h2>
          <p className="text-gray-600">Manage and control TuyaSmart devices</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Total Devices</p>
          <p className="text-2xl font-bold text-gray-900">{devices.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Online</p>
          <p className="text-2xl font-bold text-green-600">{devices.filter((d) => d.isOnline).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-blue-600">{devices.filter((d) => d.status === "on" || d.status === "unlocked").length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600">Offline</p>
          <p className="text-2xl font-bold text-red-600">{devices.filter((d) => !d.isOnline).length}</p>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
        {devices.map((device) => {
          const Icon = getDeviceIcon(device.type)
          const isActive = device.status === "on" || device.status === "unlocked"

          return (
            <div
              key={device.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-500">{device.space}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                        getStatusColor(device.isOnline ? "online" : "offline")
                      }`}
                    >
                      {getStatusText(device.isOnline ? "online" : "offline")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleDevice(device.id)}
                  disabled={!device.isOnline}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    isActive ? "bg-blue-600" : "bg-gray-300"
                  } ${!device.isOnline ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 transition-transform ${
                      isActive ? "left-6" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-gray-900">
                    {device.value || getStatusText(device.status)}
                  </span>
                </div>

                {device.type === "ac" && (
                  <div className="mt-3 flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      -1°C
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Mode
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      +1°C
                    </Button>
                  </div>
                )}

                {device.type === "light" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Brightness</span>
                      <span>{device.value}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}