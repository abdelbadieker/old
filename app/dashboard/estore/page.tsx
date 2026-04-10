import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function EStoreCommandPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
          E-Store Command Center 🛍️
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Manage your live storefront, products, and orders through our partner Ma5zani.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 32 }}>
        {/* Live Storefront */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🔴</span> Live Storefront
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Access your live e-commerce site directly.</p>
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13, borderRadius: 6 }}>Visit Storefront →</button>
        </div>

        {/* Create Store */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Create Your E-Store
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Set up a new store with Ma5zani.</p>
          <a href="#" className="btn-primary" style={{ display: 'inline-block', padding: '8px 16px', fontSize: 13, borderRadius: 6, background: '#10B981' }}>Create on Ma5zani</a>
        </div>
      </div>

      {/* Embedded Ma5zani Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { icon: '📦', title: 'E-Store Orders', desc: 'Syncs with Ma5zani' },
          { icon: '📋', title: 'Product Catalog', desc: 'Add/Edit Ma5zani products' },
          { icon: '📣', title: 'Marketing Broadcast', desc: 'Mass communications' },
        ].map((item, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '20px', cursor: 'pointer', transition: 'all .2s' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
