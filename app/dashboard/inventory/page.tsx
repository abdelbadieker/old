import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function InventoryPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 26, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
          Inventory Tracking 📦
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          A live view of current stock levels and low-stock alerts.
        </p>
      </div>
      
      <div style={{ background: 'rgba(37,99,235,.1)', border: '1px solid rgba(37,99,235,.2)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#2563eb' }}>
        <strong>Note:</strong> For fulfillment clients, this section is read-only and automatically updated by our team via the Admin Panel.
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} className="admin-table">
          <thead>
            <tr><th>SKU</th><th>Product Name</th><th>Quantity</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                 No inventory data yet. Stock logic will sync from the Admin fulfillment engine.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
