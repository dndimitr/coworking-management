import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'BGN') {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDateTime(date: Date | string) {
  const d = new Date(date)
  return d.toLocaleString('bg-BG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(date: Date | string) {
  const d = new Date(date)
  return d.toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string) {
  const d = new Date(date)
  return d.toLocaleTimeString('bg-BG', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'checked_in': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800',
    'no_show': 'bg-orange-100 text-orange-800',
    'active': 'bg-green-100 text-green-800',
    'expired': 'bg-red-100 text-red-800',
    'offline': 'bg-gray-100 text-gray-800',
    'online': 'bg-green-100 text-green-800',
  }

  return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

export function getStatusText(status: string) {
  const texts: Record<string, string> = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'checked_in': 'Checked In',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'no_show': 'No Show',
    'active': 'Active',
    'expired': 'Expired',
    'offline': 'Offline',
    'online': 'Online',
  }

  return texts[status.toLowerCase()] || status
}

export function truncate(str: string, length: number = 50) {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}