import { createClient } from '@/lib/supabase/server'

export default async function AdminNetworkPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>Partnership Network Tracking 🌐</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Track API providers, logistics contacts, and service partners.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#10B981' }}>Ma5zani E-store Creations</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Clients who created a store through our link.</p>
          <div style={{ padding: '30px', background: 'var(--bg-section)', borderRadius: 8, textAlign: 'center', color: 'var(--text-muted)', border: '1px solid var(--border-c)' }}>
            No recent creations
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>Sitewebdz Web Requests</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Clients who requested a custom website via brief.</p>
          <div style={{ padding: '30px', background: 'var(--bg-section)', borderRadius: 8, textAlign: 'center', color: 'var(--text-muted)', border: '1px solid var(--border-c)' }}>
            No recent requests
          </div>
        </div>
      </div>
    </div>
  )
}
