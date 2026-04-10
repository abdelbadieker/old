'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import GlassCard from '@/components/ui/GlassCard'
import type { InventoryItem } from '@/types'

export default function FulfillmentPage() {
  const { user } = useAuth()
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const supabase = createClient()

  useEffect(() => {
    if (!user?.id) return
    async function load() {
      const { data } = await supabase
        .from('inventory')
        .select('*, product:products(name)')
        .eq('user_id', user!.id)
        .order('last_restocked', { ascending: false })
      if (data) setInventory(data as InventoryItem[])
    }
    load()
  }, [user?.id])

  function getStatusBadge(qty: number) {
    if (qty === 0) return { label: '🔴 Out of Stock', color: 'var(--color-danger)' }
    if (qty < 10) return { label: '⚠️ Low Stock', color: 'var(--color-warning)' }
    return { label: '🟢 In Stock', color: 'var(--color-success)' }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
          Fulfillment 🏭
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Inventory stored at Ecomate warehouse. We handle packaging and shipping.
        </p>
      </div>

      <GlassCard hover={false}>
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty at Warehouse</th>
              <th>Last Restocked</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => {
                const status = getStatusBadge(item.quantity)
                return (
                  <tr key={item.id}>
                    <td className="font-semibold text-[var(--color-text)]">
                      {(item.product as { name?: string })?.name || '—'}
                    </td>
                    <td className="font-mono">{item.quantity}</td>
                    <td className="text-xs">
                      {item.last_restocked
                        ? new Date(item.last_restocked).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td>
                      <span
                        className="text-xs font-bold"
                        style={{ color: status.color }}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-12 text-[var(--color-muted)]">
                  No inventory logged. Send your products to Ecomate warehouse to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
