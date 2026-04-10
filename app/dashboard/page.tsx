'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '@/components/ui/StatCard'
import GlassCard from '@/components/ui/GlassCard'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { formatDZD, formatDate } from '@/lib/utils'
import type { Order } from '@/types'

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 71000 },
  { month: 'Apr', revenue: 63000 },
  { month: 'May', revenue: 89000 },
  { month: 'Jun', revenue: 127000 },
]

const statusColors: Record<string, string> = {
  pending: '#F59E0B',
  confirmed: '#7C3AED',
  shipped: '#3B82F6',
  delivered: '#10B981',
  returned: '#EF4444',
}

export default function DashboardOverview() {
  const { user } = useAuth()
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ordersThisMonth: 0,
    activeCustomers: 0,
    conversionRate: 0,
  })

  useEffect(() => {
    if (!user?.id) return

    async function loadData() {
      const supabase = createClient()

      // Fetch recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*, customer:customers(full_name, wilaya), product:products(name)')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (orders) setRecentOrders(orders as Order[])

      // Fetch stats
      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)

      const { count: customerCount } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)

      const { data: revenueRows } = await supabase
        .from('orders')
        .select('total_price')
        .eq('user_id', user!.id)
        .eq('status', 'delivered')

      const totalRevenue = revenueRows?.reduce((sum, r) => sum + (Number(r.total_price) || 0), 0) || 0

      setStats({
        totalRevenue,
        ordersThisMonth: orderCount || 0,
        activeCustomers: customerCount || 0,
        conversionRate: orderCount ? Math.round((totalRevenue / ((orderCount || 1) * 3500)) * 100) : 0,
      })
    }

    loadData()
  }, [user?.id])

  // Pie chart data
  const pieData = [
    { name: 'Pending', value: recentOrders.filter(o => o.status === 'pending').length || 1 },
    { name: 'Confirmed', value: recentOrders.filter(o => o.status === 'confirmed').length || 1 },
    { name: 'Shipped', value: recentOrders.filter(o => o.status === 'shipped').length || 1 },
    { name: 'Delivered', value: recentOrders.filter(o => o.status === 'delivered').length || 2 },
    { name: 'Returned', value: recentOrders.filter(o => o.status === 'returned').length || 0 },
  ].filter(d => d.value > 0)

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Revenue"
          value={formatDZD(stats.totalRevenue)}
          icon="💰"
          change="↑ 23.4% vs last month"
          changeType="positive"
        />
        <StatCard
          label="Orders This Month"
          value={String(stats.ordersThisMonth)}
          icon="📦"
          change="↑ 12 new orders"
          changeType="positive"
        />
        <StatCard
          label="Active Customers"
          value={String(stats.activeCustomers)}
          icon="👥"
          change="↑ 8 this week"
          changeType="positive"
        />
        <StatCard
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon="📈"
          change="↑ 2.1% improvement"
          changeType="positive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Revenue Line Chart */}
        <GlassCard hover={false} className="col-span-2">
          <h3 className="font-syne text-sm font-bold text-[var(--color-text)] mb-4">
            Revenue Overview (6 months)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
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
                activeDot={{ r: 6, fill: '#9F67FF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Order Status Pie */}
        <GlassCard hover={false}>
          <h3 className="font-syne text-sm font-bold text-[var(--color-text)] mb-4">
            Order Status
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={statusColors[entry.name.toLowerCase()] || '#7C3AED'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px] text-[var(--color-muted)]">
                <div className="w-2 h-2 rounded-full" style={{ background: statusColors[d.name.toLowerCase()] }} />
                {d.name}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Orders */}
      <GlassCard hover={false}>
        <h3 className="font-syne text-sm font-bold text-[var(--color-text)] mb-4">Recent Orders</h3>
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Wilaya</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono text-xs text-accent">{order.id.slice(0, 8)}…</td>
                  <td>{(order.customer as { full_name?: string })?.full_name || '—'}</td>
                  <td>{(order.product as { name?: string })?.name || '—'}</td>
                  <td>{order.wilaya || '—'}</td>
                  <td className="font-mono">{order.total_price ? formatDZD(Number(order.total_price)) : '—'}</td>
                  <td>
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: `${statusColors[order.status]}15`,
                        color: statusColors[order.status],
                        border: `1px solid ${statusColors[order.status]}30`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[order.status] }} />
                      {order.status}
                    </span>
                  </td>
                  <td className="text-xs">{formatDate(order.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-12 text-[var(--color-muted)]">
                  No orders yet. They&apos;ll appear here once your first order comes in.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
