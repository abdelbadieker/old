import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function MyWebsitePage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
          My Website 🌐
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Request a custom landing page or website, and track its progress.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Website Creation Brief</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
          Fill out the brief template below, and our partner <strong>sitewebdz</strong> will bring your vision to life.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Project Type</label>
            <select className="dashboard-input" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }}>
              <option>Landing Page</option>
              <option>Full Website</option>
              <option>Custom Request</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Website Description / Brief</label>
            <textarea className="dashboard-input" rows={5} placeholder="Describe your brand, colors, style, and goals..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Reference Links</label>
            <textarea className="dashboard-input" rows={2} placeholder="Paste links to websites you like..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }} />
          </div>
          <button type="button" className="btn-primary" style={{ padding: '12px 24px', alignSelf: 'flex-start', borderRadius: 8 }}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  )
}
