import { createClient } from '@/lib/supabase/server'

export default async function AdminCreativePage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>Creative Studio Command 🎨</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Backend for receiving briefs and distributing assets to clients.</p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Pending Client Briefs</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} className="admin-table">
          <thead>
            <tr><th>Client Name</th><th>Project/Service</th><th>Aesthetics</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No pending briefs found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px', marginTop: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Distribute Assets (Google Drive)</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <select className="dashboard-input" style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }}>
            <option>Select Client...</option>
          </select>
          <input type="text" className="dashboard-input" placeholder="Google Drive Link..." style={{ flex: 2, padding: 12, borderRadius: 8, border: '1px solid var(--border-c)', background: 'var(--bg-input)' }} />
          <button className="btn-primary" style={{ padding: '0 24px', borderRadius: 8 }}>Save Link</button>
        </div>
      </div>
    </div>
  )
}
