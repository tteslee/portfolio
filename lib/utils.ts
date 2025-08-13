import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }
  
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'text-success-600 bg-success-50 border-success-200'
    case 'in_progress':
      return 'text-primary-600 bg-primary-50 border-primary-200'
    case 'on_hold':
      return 'text-warning-600 bg-warning-50 border-warning-200'
    case 'not_started':
      return 'text-secondary-600 bg-secondary-50 border-secondary-200'
    case 'cancelled':
      return 'text-error-600 bg-error-50 border-error-200'
    default:
      return 'text-secondary-600 bg-secondary-50 border-secondary-200'
  }
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-success-100 text-success-800'
    case 'in_progress':
      return 'bg-primary-100 text-primary-800'
    case 'on_hold':
      return 'bg-warning-100 text-warning-800'
    case 'not_started':
      return 'bg-secondary-100 text-secondary-800'
    case 'cancelled':
      return 'bg-error-100 text-error-800'
    default:
      return 'bg-secondary-100 text-secondary-800'
  }
}

export function getActorTypeColor(type: string): string {
  switch (type) {
    case 'government':
      return 'bg-blue-100 text-blue-800'
    case 'private_sector':
      return 'bg-green-100 text-green-800'
    case 'civil_society':
      return 'bg-purple-100 text-purple-800'
    case 'academic':
      return 'bg-orange-100 text-orange-800'
    case 'community':
      return 'bg-pink-100 text-pink-800'
    case 'international':
      return 'bg-indigo-100 text-indigo-800'
    default:
      return 'bg-secondary-100 text-secondary-800'
  }
}

export function getAssetTypeColor(type: string): string {
  switch (type) {
    case 'funding':
      return 'bg-green-100 text-green-800'
    case 'infrastructure':
      return 'bg-blue-100 text-blue-800'
    case 'data':
      return 'bg-purple-100 text-purple-800'
    case 'knowledge':
      return 'bg-orange-100 text-orange-800'
    case 'network':
      return 'bg-pink-100 text-pink-800'
    case 'technology':
      return 'bg-indigo-100 text-indigo-800'
    default:
      return 'bg-secondary-100 text-secondary-800'
  }
}

interface Milestone {
  status: string
}

export function calculateProgress(milestones: Milestone[]): number {
  if (!milestones || milestones.length === 0) return 0
  
  const completed = milestones.filter(m => m.status === 'completed').length
  return Math.round((completed / milestones.length) * 100)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

interface Impact {
  magnitude: number
}

export function calculateImpactScore(impacts: Impact[]): number {
  if (!impacts || impacts.length === 0) return 0
  
  const totalMagnitude = impacts.reduce((sum, impact) => sum + impact.magnitude, 0)
  return Math.round(totalMagnitude / impacts.length)
}

export function getTimeframeColor(timeframe: string): string {
  switch (timeframe) {
    case 'short':
      return 'text-green-600'
    case 'medium':
      return 'text-yellow-600'
    case 'long':
      return 'text-red-600'
    default:
      return 'text-secondary-600'
  }
}
