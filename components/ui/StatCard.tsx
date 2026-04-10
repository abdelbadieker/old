'use client'
import GlassCard from './GlassCard'

interface StatCardProps {
  label: string
  value: string
  icon: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

export default function StatCard({ label, value, icon, change, changeType = 'positive' }: StatCardProps) {
  const changeColor = {
    positive: 'text-[var(--color-success)]',
    negative: 'text-[var(--color-danger)]',
    neutral: 'text-[var(--color-muted)]',
  }

  return (
    <GlassCard hover={false} padding="p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          {label}
        </span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
        {value}
      </div>
      {change && (
        <div className={`text-xs font-medium font-mono ${changeColor[changeType]}`}>
          {change}
        </div>
      )}
    </GlassCard>
  )
}
