'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import GlassCard from '@/components/ui/GlassCard'
import { formatDate } from '@/lib/utils'
import type { Customer } from '@/types'

export default function CRMPage() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => {
    if (!user?.id) return
    async function load() {
      const { data } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
      if (data) setCustomers(data as Customer[])
    }
    load()
  }, [user?.id])

  const filtered = customers.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) ||
    c.wilaya?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
            CRM — Customer Relations 👥
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Track every customer interaction and purchase history.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="auth-input w-64 pl-4"
        />
      </div>

      <GlassCard hover={false}>
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Wilaya</th>
              <th>Total Orders</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <>
                  <tr
                    key={c.id}
                    className="cursor-pointer"
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                  >
                    <td className="font-semibold text-[var(--color-text)]">
                      {c.full_name || 'Anonymous'}
                    </td>
                    <td className="font-mono text-xs">{c.phone || '—'}</td>
                    <td>{c.wilaya || '—'}</td>
                    <td className="font-mono">{c.total_orders}</td>
                    <td className="text-xs">{formatDate(c.created_at)}</td>
                  </tr>
                  {expandedId === c.id && (
                    <tr key={`${c.id}-expanded`}>
                      <td colSpan={5}>
                        <div className="py-4 px-6 bg-[var(--color-surface-2)] rounded-xl my-2">
                          <h4 className="font-syne text-sm font-bold text-[var(--color-text)] mb-3">
                            Interaction History
                          </h4>
                          <p className="text-xs text-[var(--color-muted)]">
                            Detailed interaction history will be populated from order data.
                            Customer has placed {c.total_orders} order(s) total.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12 text-[var(--color-muted)]">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
