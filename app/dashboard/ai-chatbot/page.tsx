import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AIChatbotPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user?.id)
    .single()

  const isLocked = profile?.plan === 'trial' || profile?.plan === 'none' // 'starter' means standard, but wait, the plan in schema says 'trial', 'starter', 'growth', 'business'. Let's say trial is locked. Wait, previously AI chatbot was 'starter'. Let's lock it if plan is 'trial'.

  const platforms = [
    { icon: '📘', name: 'Facebook Messenger', status: 'Connect', color: '#1877f2' },
    { icon: '📸', name: 'Instagram DM', status: 'Connect', color: '#e1306c' },
    { icon: '💬', name: 'WhatsApp Business', status: 'Connect', color: '#25d366' },
    { icon: '✈️', name: 'Telegram', status: 'Connect', color: '#229ED9' },
    { icon: '📧', name: 'Gmail', status: 'Connect', color: '#ea4335' },
  ]

  const features = [
    { icon: '🌐', title: 'Trilingual Support', desc: 'Arabic, French, English — auto-detected' },
    { icon: '🛒', title: 'Order Taking', desc: 'Full checkout flow inside the conversation' },
    { icon: '📦', title: 'Order Tracking', desc: 'Customers check delivery status via chat' },
    { icon: '📋', title: 'Product Catalog', desc: 'Shows products from your catalog automatically' },
  ]

  if (isLocked) {
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 24, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>AI Chatbot 🤖</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Automate your sales and customer support.</p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, overflow: 'hidden', textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Unlock The Sales Machine</h2>
            <div style={{ width: '100%', height: 300, background: '#111', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, position: 'relative' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span style={{ marginLeft: 4, color: '#fff', fontSize: 20 }}>▶</span>
              </div>
              <span style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 11, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: 6, color: '#fff' }}>ROI Tutorial</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Our AI Chatbot handles your DMs, answers customer inquiries, showcases your products, and registers orders automatically, 24/7.
            </p>
            <a href="mailto:support@ecomate.dz" className="btn-primary" style={{ padding: '12px 32px', fontSize: 14, borderRadius: 8 }}>
              Book a Setup Meeting →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 24, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>AI Chatbot 🤖</h1>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Configure and manage your AI sales assistant</p>
      </div>

      <div style={{ background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.15)', borderRadius: 14, padding: '18px 22px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', animation: 'blink 2s infinite' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 14, fontWeight: 700, color: '#10B981' }}>AI System Active</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>Contact us below to customize your AI's behavior across your linked networks.</div>
        </div>
      </div>

      {/* Platform Connections */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px', marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 18 }}>Your Linked Accounts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {platforms.map(p => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-section)', border: '1px solid var(--border-c)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}20`, border: `1px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{p.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Status active</div>
                </div>
              </div>
              <a href="mailto:support@ecomate.dz" style={{ padding: '7px 16px', borderRadius: 9, background: `${p.color}15`, border: `1px solid ${p.color}40`, color: p.color, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .2s', textDecoration: 'none' }}>
                Contact Us
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
