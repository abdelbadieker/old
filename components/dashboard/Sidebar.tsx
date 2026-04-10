'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/lib/utils'

const navItems = [
  { icon: '📊', label: 'Overview', path: '/dashboard' },
  { icon: '👥', label: 'CRM', path: '/dashboard/crm' },
  { icon: '📦', label: 'Products', path: '/dashboard/products' },
  { icon: '🚚', label: 'Orders & EcoTrack', path: '/dashboard/orders' },
  { icon: '🏭', label: 'Fulfillment', path: '/dashboard/fulfillment' },
  { icon: '🎬', label: 'Creative Assets', path: '/dashboard/creative' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <aside className="w-[240px] h-screen sticky top-0 flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)] py-6 px-4">
      {/* Brand */}
      <Link href="/dashboard" className="flex items-center gap-2 px-3 mb-8 no-underline">
        <span className="text-xl">🌱</span>
        <span className="font-syne text-lg font-bold gradient-text-purple">Ecomate</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-3 px-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center text-xs font-bold text-white">
            {user?.full_name ? getInitials(user.full_name) : '?'}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-semibold text-[var(--color-text)] truncate">
              {user?.full_name || 'Loading...'}
            </div>
            <div className="text-[10px] text-[var(--color-muted)] truncate">
              {user?.email || ''}
            </div>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-[var(--color-danger)] bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/10 hover:bg-[var(--color-danger)]/10 transition-colors"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  )
}
