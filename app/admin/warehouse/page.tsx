'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import GlassCard from '@/components/ui/GlassCard'
import type { InventoryItem } from '@/types'

export default function AdminWarehousePage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('inventory')
        .select('*, product:products(name, user_id)')
        .order('quantity', { ascending: true })
      if (data) setInventory(data as InventoryItem[])
    }
    load()
  }, [])

  function getStatus(qty: number) {
    if (qty === 0) return { label: '🔴 Out', color: 'var(--color-danger)' }
    if (qty < 10) return { label: '⚠️ Low', color: 'var(--color-warning)' }
    return { label: '🟢 In Stock', color: 'var(--color-success)' }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
          Warehouse 🏭
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Unified inventory view — all clients&apos; stock at Ecomate warehouse.
        </p>
      </div>

      <GlassCard hover={false}>
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Client</th>
              <th>Quantity</th>
              <th>Last Restocked</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => {
                const status = getStatus(item.quantity)
                return (
                  <tr key={item.id}>
                    <td className="font-semibold text-[var(--color-text)]">
                      {(item.product as { name?: string })?.name || '—'}
                    </td>
                    <td className="text-xs font-mono">{item.user_id.slice(0, 8)}…</td>
                    <td className="font-mono">{item.quantity}</td>
                    <td className="text-xs">
                      {item.last_restocked ? new Date(item.last_restocked).toLocaleDateString() : 'Never'}
                    </td>
                    <td>
                      <span className="text-xs font-bold" style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12 text-[var(--color-muted)]">
                  No warehouse inventory logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
