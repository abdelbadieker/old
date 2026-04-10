import { createClient } from '@/lib/supabase/server'

export default async function CreativeStudioPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
          Creative Studio Portal 🎨
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Request and receive high-converting ad creatives tailored for your brand.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Asset Delivery */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Asset Delivery folder</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Your finalized videos and creatives will appear here.</p>
            <div style={{ width: '100%', height: 300, background: 'rgba(255,255,255,.02)', border: '1px dashed var(--border-c)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>[Google Drive iframe integration space]</span>
            </div>
          </div>
          
          {/* Brief Submission */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Brief Submission</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Product/Service</label>
                <input type="text" className="dashboard-input" placeholder="What are we advertising?" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Aesthetic Preferences</label>
                <textarea className="dashboard-input" rows={3} placeholder="Dark mode, vibrant, minimalist..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Reference Links (TikTok, Reels)</label>
                <textarea className="dashboard-input" rows={2} placeholder="Paste URLs here..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }} />
              </div>
              <button type="button" className="btn-primary" style={{ padding: '12px 24px', alignSelf: 'flex-start', borderRadius: 8 }}>Submit Brief</button>
            </form>
          </div>
        </div>

        {/* Sync with Agency Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Direct Agency Contact</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Reach your dedicated creative team.</p>
            <div style={{ padding: 12, background: 'rgba(255,255,255,.05)', borderRadius: 8, fontSize: 14 }}>
              <strong>Email:</strong> creative@ecomate.dz<br/><br/>
              <strong>WhatsApp:</strong> +213 XX XX XX XX
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
