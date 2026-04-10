'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import { formatDZD } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', sku: '', price: '', stock: '', size: '', color: '' })
  const supabase = createClient()

  useEffect(() => {
    if (!user?.id) return
    loadProducts()
  }, [user?.id])

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
    if (data) setProducts(data as Product[])
  }

  async function handleSave() {
    if (!form.name) return toast.error('Product name is required')

    const variant = {
      size: form.size || 'default',
      color: form.color || 'default',
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    }

    if (editId) {
      const { error } = await supabase
        .from('products')
        .update({ name: form.name, sku: form.sku, variants: [variant] })
        .eq('id', editId)
      if (error) return toast.error(error.message)
      toast.success('Product updated')
    } else {
      const { error } = await supabase
        .from('products')
        .insert({ user_id: user!.id, name: form.name, sku: form.sku, variants: [variant] })
      if (error) return toast.error(error.message)
      toast.success('Product added')
    }

    setShowModal(false)
    setEditId(null)
    setForm({ name: '', sku: '', price: '', stock: '', size: '', color: '' })
    loadProducts()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product permanently?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) return toast.error(error.message)
    toast.success('Product deleted')
    loadProducts()
  }

  function openEdit(product: Product) {
    const v = product.variants[0] || { size: '', color: '', price: 0, stock: 0 }
    setForm({
      name: product.name,
      sku: product.sku || '',
      price: String(v.price),
      stock: String(v.stock),
      size: v.size,
      color: v.color,
    })
    setEditId(product.id)
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne text-2xl font-extrabold text-[var(--color-text)] mb-1">
            Products 📦
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Manage your product catalog and variants.
          </p>
        </div>
        <button
          onClick={() => { setEditId(null); setForm({ name: '', sku: '', price: '', stock: '', size: '', color: '' }); setShowModal(true) }}
          className="btn-primary text-sm py-3 px-5"
        >
          + Add Product
        </button>
      </div>

      <GlassCard hover={false}>
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Variants</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.map((p) => {
                const v = p.variants[0] || { size: '—', color: '—', price: 0, stock: 0 }
                return (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="font-semibold text-[var(--color-text)]">{p.name}</td>
                    <td className="font-mono text-xs">{p.sku || '—'}</td>
                    <td className="text-xs">
                      {v.size}/{v.color}
                    </td>
                    <td className="font-mono">{formatDZD(v.price)}</td>
                    <td>
                      <span className={`font-mono ${v.stock > 10 ? 'text-[var(--color-success)]' : v.stock > 0 ? 'text-[var(--color-warning)]' : 'text-[var(--color-danger)]'}`}>
                        {v.stock}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-danger)]/10 text-[var(--color-danger)] border border-[var(--color-danger)]/20 hover:bg-[var(--color-danger)]/20 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-[var(--color-muted)]">
                  No products yet. Add your first product above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editId ? 'Edit Product' : 'Add Product'}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Name</label>
            <input className="auth-input pl-4" placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">SKU</label>
            <input className="auth-input pl-4" placeholder="SKU-001" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Size</label>
              <input className="auth-input pl-4" placeholder="M, L, XL" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Color</label>
              <input className="auth-input pl-4" placeholder="Black, Red" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Price (DZD)</label>
              <input className="auth-input pl-4" type="number" placeholder="3500" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Stock</label>
              <input className="auth-input pl-4" type="number" placeholder="100" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary w-full justify-center mt-2">
            {editId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
