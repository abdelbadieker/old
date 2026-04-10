import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as DZD currency
 */
export function formatDZD(amount: number): string {
  return `${amount.toLocaleString('en-US')} DZD`
}

/**
 * Format a date string into a readable format
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Truncate a string to a given length
 */
export function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len) + '…'
}

/**
 * Get initials from a full name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Order status configuration for Kanban columns
 */
export const ORDER_STATUSES = [
  { id: 'pending' as const, title: 'Pending', icon: '🕐' },
  { id: 'confirmed' as const, title: 'Confirmed', icon: '✅' },
  { id: 'shipped' as const, title: 'Shipped', icon: '🚚' },
  { id: 'delivered' as const, title: 'Delivered', icon: '📦' },
  { id: 'returned' as const, title: 'Returned', icon: '↩️' },
] as const
