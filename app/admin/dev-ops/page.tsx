'use client'
import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'

interface KanbanItem {
  id: string
  title: string
  client: string
}

const initialColumns = {
  design: { title: '🎨 Design', color: '#F59E0B', items: [{ id: 'd1', title: 'Landing Page — FashionDZ', client: 'FashionDZ' }] },
  dev: { title: '💻 Development', color: '#7C3AED', items: [{ id: 'd2', title: 'E-Commerce Store Build', client: 'GadgetAlger' }] },
  review: { title: '🔍 Review', color: '#3B82F6', items: [] as KanbanItem[] },
  launched: { title: '🚀 Launched', color: '#10B981', items: [] as KanbanItem[] },
}

export default function DevOpsPage() {
  const [columns] = useState(initialColumns)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
          Dev Ops 💻
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Internal Kanban: design → dev → review → launched.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(columns).map(([key, col]) => (
          <div key={key}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="font-syne text-sm font-bold text-[var(--color-text)]">{col.title}</span>
              <span
                className="ml-auto text-[10px] font-bold font-mono px-2 py-0.5 rounded-full"
                style={{ background: `${col.color}15`, color: col.color }}
              >
                {col.items.length}
              </span>
            </div>
            <div className="bg-[var(--color-surface)]/50 rounded-2xl p-3 min-h-[300px] border border-[var(--color-border)]">
              {col.items.map((item) => (
                <GlassCard key={item.id} hover={false} padding="p-4" className="mb-3">
                  <div className="text-sm font-semibold text-[var(--color-text)] mb-1">{item.title}</div>
                  <div className="text-xs text-[var(--color-muted)]">Client: {item.client}</div>
                </GlassCard>
              ))}
              {col.items.length === 0 && (
                <div className="text-center py-8 text-xs text-[var(--color-muted)]">Empty</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
