'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const menuItems = [
  { name: 'All Clients', icon: '👥', path: '/admin/clients' },
  { name: 'Agency Revenue', icon: '📊', path: '/admin/operations' },
  { name: 'Warehouse', icon: '🏭', path: '/admin/warehouse' },
  { name: 'Creative Ops', icon: '🎬', path: '/admin/creative-ops' },
  { name: 'Dev Ops', icon: '💻', path: '/admin/dev-ops' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out')
    window.location.href = '/admin'
  }

  return (
    <aside className="w-[240px] h-screen sticky top-0 flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)] py-6 px-4">
      {/* Brand */}
      <Link href="/admin/clients" className="flex items-center gap-2 px-3 mb-8 no-underline">
        <span className="text-xl">🌱</span>
        <span className="font-syne text-lg font-bold gradient-text-purple">
          Ecomate
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
          Admin
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-[var(--color-danger)] bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/10 hover:bg-[var(--color-danger)]/10 transition-colors"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  )
}
