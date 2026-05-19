import { Button } from "@/components/ui/button"
import { Plus, Users, Clock, Edit, Trash2 } from "lucide-react"

export default function SpacesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Spaces</h2>
          <p className="text-gray-600">Manage workspace spaces and pricing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Space
        </Button>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: "1",
            name: "Meeting Room A",
            type: "Meeting Room",
            capacity: 8,
            priceHour: "лв 30",
            priceDay: "лв 200",
            isActive: true,
            image: "bg-blue-100",
            features: ["Projector", "Whiteboard", "Video Conference"],
          },
          {
            id: "2",
            name: "Private Office 1",
            type: "Private Office",
            capacity: 4,
            priceHour: "лв 25",
            priceDay: "лв 150",
            isActive: true,
            image: "bg-green-100",
            features: ["Window View", "Lockable", "Storage"],
          },
          {
            id: "3",
            name: "Phone Booth 1",
            type: "Phone Booth",
            capacity: 1,
            priceHour: "лв 10",
            priceDay: "лв 60",
            isActive: true,
            image: "bg-purple-100",
            features: ["Soundproof", "Video Call Ready"],
          },
          {
            id: "4",
            name: "Desk Area",
            type: "Hot Desk",
            capacity: 20,
            priceHour: "лв 5",
            priceDay: "лв 35",
            isActive: true,
            image: "bg-orange-100",
            features: ["Power Outlets", "WiFi", "Coffee Bar"],
          },
          {
            id: "5",
            name: "Event Space",
            type: "Event Space",
            capacity: 50,
            priceHour: "лв 100",
            priceDay: "лв 600",
            isActive: false,
            image: "bg-red-100",
            features: ["Stage", "Sound System", "Catering"],
          },
          {
            id: "6",
            name: "Phone Booth 2",
            type: "Phone Booth",
            capacity: 1,
            priceHour: "лв 10",
            priceDay: "лв 60",
            isActive: true,
            image: "bg-purple-100",
            features: ["Soundproof", "Video Call Ready"],
          },
        ].map((space) => (
          <div
            key={space.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`h-32 ${space.image} flex items-center justify-center`}>
              <span className="text-4xl">🏢</span>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{space.name}</h3>
                  <p className="text-sm text-gray-500">{space.type}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    space.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {space.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {space.capacity}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Available
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Pricing:</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm font-medium text-gray-900">{space.priceHour}/hour</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm font-medium text-gray-900">{space.priceDay}/day</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Features:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {space.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}