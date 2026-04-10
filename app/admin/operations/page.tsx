'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { createClient } from '@/lib/supabase/client'
import GlassCard from '@/components/ui/GlassCard'
import StatCard from '@/components/ui/StatCard'
import { formatDZD } from '@/lib/utils'

const revenueData = [
  { month: 'Jan', revenue: 180000 },
  { month: 'Feb', revenue: 245000 },
  { month: 'Mar', revenue: 320000 },
  { month: 'Apr', revenue: 290000 },
  { month: 'May', revenue: 410000 },
  { month: 'Jun', revenue: 530000 },
]

export default function AdminOperationsPage() {
  const [totalClients, setTotalClients] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { count: clients } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'client')

      const { count: orders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      setTotalClients(clients || 0)
      setTotalOrders(orders || 0)
    }
    load()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
          Agency Revenue 📊
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Combined revenue across all clients.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Clients" value={String(totalClients)} icon="👥" />
        <StatCard label="Total Orders" value={String(totalOrders)} icon="📦" />
        <StatCard label="Est. Monthly Revenue" value={formatDZD(530000)} icon="💰" change="↑ 29% vs last month" />
      </div>

      <GlassCard hover={false}>
        <h3 className="font-syne text-sm font-bold text-[var(--color-text)] mb-4">
          Agency Revenue (6 months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="var(--color-muted)" fontSize={12} />
            <YAxis stroke="var(--color-muted)" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                fontSize: 12,
                color: 'var(--color-text)',
              }}
              formatter={(value: number) => [formatDZD(value), 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{ fill: '#7C3AED', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  )
}
