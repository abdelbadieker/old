import { createClient } from '@/lib/supabase/server'

export default async function AdminInventoryPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>Fulfillment & Inventory Engine 📦</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Manage stock received from clients and sync to their tracked inventory.</p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 14, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: 16, fontWeight: 700 }}>Client Stock Management</h3>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13 }}>+ Log New Stock</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} className="admin-table">
          <thead>
            <tr><th>Client Name</th><th>SKU / Product</th><th>Quantity Received</th><th>Date Logged</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No inventory logged currently</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
