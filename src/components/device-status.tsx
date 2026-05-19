import { Cpu, Lightbulb, Thermometer, Lock } from "lucide-react"
import { getStatusColor, getStatusText } from "@/lib/utils"

interface Device {
  id: string
  name: string
  type: "light" | "ac" | "lock" | "sensor"
  status: string
  isOnline: boolean
  value?: string
}

// Mock data for demo
const mockDevices: Device[] = [
  {
    id: "1",
    name: "Main Lights",
    type: "light",
    status: "on",
    isOnline: true,
    value: "80%",
  },
  {
    id: "2",
    name: "AC Unit",
    type: "ac",
    status: "on",
    isOnline: true,
    value: "22°C",
  },
  {
    id: "3",
    name: "Front Door",
    type: "lock",
    status: "locked",
    isOnline: true,
  },
  {
    id: "4",
    name: "Meeting Room Sensor",
    type: "sensor",
    status: "occupied",
    isOnline: true,
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
    default:
      return Cpu
  }
}

export function DeviceStatus() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Device Status</h3>
        <a href="/devices" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {mockDevices.map((device) => {
          const Icon = getDeviceIcon(device.type)
          const statusColor = getStatusColor(device.isOnline ? "online" : "offline")

          return (
            <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{device.name}</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColor}`}
                  >
                    {getStatusText(device.isOnline ? "online" : "offline")}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {device.value || getStatusText(device.status)}
                </p>
                <button className="mt-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                  Control
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Devices</span>
          <span className="font-semibold text-gray-900">12</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">Online</span>
          <span className="font-semibold text-green-600">10</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">Offline</span>
          <span className="font-semibold text-red-600">2</span>
        </div>
      </div>
    </div>
  )
}