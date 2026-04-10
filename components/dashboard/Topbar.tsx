'use client'
import { useAuth } from '@/hooks/useAuth'

export default function Topbar() {
  const { user } = useAuth()

  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-8">
      <div>
        <h2 className="font-syne text-lg font-bold text-[var(--color-text)]">
          Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''} 👋
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:border-accent/30 transition-colors">
          🔔
        </button>
        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:border-accent/30 transition-colors">
          ⚙️
        </button>
      </div>
    </header>
  )
}
