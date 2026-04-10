'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { formatDZD } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'
import type { Order, OrderStatus } from '@/types'

const columns: { id: OrderStatus; title: string; icon: string; color: string }[] = [
  { id: 'pending', title: 'Pending', icon: '🕐', color: '#F59E0B' },
  { id: 'confirmed', title: 'Confirmed', icon: '✅', color: '#7C3AED' },
  { id: 'shipped', title: 'Shipped', icon: '🚚', color: '#3B82F6' },
  { id: 'delivered', title: 'Delivered', icon: '📦', color: '#10B981' },
  { id: 'returned', title: 'Returned', icon: '↩️', color: '#EF4444' },
]

// ── Sortable Order Card ──
function OrderCard({ order, overlay }: { order: Order; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: order.id,
    data: { status: order.status },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={overlay ? {} : style}
      {...attributes}
      {...listeners}
      className={`kanban-card mb-3 ${isDragging ? 'dragging' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-accent">
          #{order.id.slice(0, 8)}
        </span>
        {order.source && (
          <span className="text-[10px] text-[var(--color-muted)] bg-white/5 px-2 py-0.5 rounded-full">
            {order.source}
          </span>
        )}
      </div>
      <div className="text-sm font-semibold text-[var(--color-text)] mb-1">
        {(order.customer as { full_name?: string })?.full_name || 'Unknown'}
      </div>
      <div className="text-xs text-[var(--color-muted)] mb-2">
        {(order.product as { name?: string })?.name || 'N/A'}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--color-muted)]">
          📍 {order.wilaya || '—'}
        </span>
        <span className="font-mono text-xs font-bold text-[var(--color-text)]">
          {order.total_price ? formatDZD(Number(order.total_price)) : '—'}
        </span>
      </div>
      {order.delivery_fee && (
        <div className="text-[10px] text-[var(--color-muted)] mt-1">
          Delivery: {formatDZD(Number(order.delivery_fee))}
        </div>
      )}
    </div>
  )
}

// ── Kanban Column ──
function KanbanColumn({ column, orders }: { column: typeof columns[number]; orders: Order[] }) {
  return (
    <div className="flex-1 min-w-[220px]">
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className="text-lg">{column.icon}</span>
        <span className="font-syne text-sm font-bold text-[var(--color-text)]">
          {column.title}
        </span>
        <span
          className="ml-auto text-[10px] font-bold font-mono px-2 py-0.5 rounded-full"
          style={{ background: `${column.color}15`, color: column.color }}
        >
          {orders.length}
        </span>
      </div>
      <div
        className="bg-[var(--color-surface)]/50 rounded-2xl p-3 min-h-[400px] border border-[var(--color-border)]"
      >
        <SortableContext items={orders.map(o => o.id)} strategy={verticalListSortingStrategy}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          {orders.length === 0 && (
            <div className="text-center py-8 text-xs text-[var(--color-muted)]">
              No orders
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  )
}

// ── Main Kanban Page ──
export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)
  const supabase = createClient()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const fetchOrders = useCallback(async () => {
    if (!user?.id) return
    const { data } = await supabase
      .from('orders')
      .select('*, customer:customers(full_name, wilaya), product:products(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) setOrders(data as Order[])
  }, [user?.id])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  function handleDragStart(event: DragStartEvent) {
    const order = orders.find(o => o.id === event.active.id)
    if (order) setActiveOrder(order)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveOrder(null)
    const { active, over } = event
    if (!over) return

    // Determine target column
    const overOrder = orders.find(o => o.id === over.id)
    const activeData = active.data.current as { status?: OrderStatus } | undefined
    let newStatus: OrderStatus | undefined

    if (overOrder) {
      newStatus = overOrder.status
    } else {
      // Dropped on column itself
      const col = columns.find(c => c.id === over.id)
      if (col) newStatus = col.id
    }

    if (!newStatus || !activeData) return
    if (activeData.status === newStatus) return

    // Optimistic update
    setOrders(prev =>
      prev.map(o => o.id === active.id ? { ...o, status: newStatus! } : o)
    )

    // Persist
    await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', active.id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
            Orders & EcoTrack 🚚
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Drag orders between columns to update their status.
          </p>
        </div>
        <button onClick={fetchOrders} className="btn-ghost text-sm py-2.5 px-4">
          🔄 Refresh
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              orders={orders.filter(o => o.status === col.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeOrder && <OrderCard order={activeOrder} overlay />}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
