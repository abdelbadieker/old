import { createClient } from '@/lib/supabase/server'

export default async function SupportPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
          Support Directory 💬
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Platform contact information to reach out for assistance at any time.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {[
          { platform: 'WhatsApp', handle: '+213 555 000 000', icon: '📱', color: '#25D366' },
          { platform: 'Facebook', handle: 'EcoMateDz', icon: '📘', color: '#1877F2' },
          { platform: 'Instagram', handle: '@ecomate.dz', icon: '📸', color: '#E4405F' },
          { platform: 'Email', handle: 'support@ecomate.dz', icon: '✉️', color: '#ea4335' }
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32, color: item.color }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>{item.platform}</div>
              <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>{item.handle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
