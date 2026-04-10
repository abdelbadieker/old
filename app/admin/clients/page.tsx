'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import GlassCard from '@/components/ui/GlassCard'
import { formatDate } from '@/lib/utils'
import type { Profile } from '@/types'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'client')
      .order('created_at', { ascending: false })
    if (data) setClients(data as Profile[])
    setLoading(false)
  }

  const filtered = clients.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', color: '#F1F0FF' }}>
            🛡️ Staff Console — Client Management
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Manage all registered merchants and their accounts.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="auth-input w-64 pl-4"
        />
      </div>

      <GlassCard hover={false}>
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-[var(--color-muted)]">
                  Loading...
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td className="font-semibold text-[var(--color-text)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center text-xs font-bold text-white">
                        {c.full_name?.[0]?.toUpperCase() || '?'}
                      </div>
                      {c.full_name || 'Anonymous'}
                    </div>
                  </td>
                  <td className="text-xs font-mono">{c.email}</td>
                  <td className="text-xs">{formatDate(c.created_at)}</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-12 text-[var(--color-muted)]">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
