import { createAdminClient } from '@/lib/supabase/server'
import type { OrderWebhookPayload } from '@/types'

export async function POST(req: Request) {
  // Verify webhook secret
  const secret = req.headers.get('x-ecomate-secret')
  if (secret !== process.env.WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as OrderWebhookPayload
    const supabase = createAdminClient()

    // Find or create customer
    let customerId: string | null = null
    if (body.phone) {
      const { data: existing } = await supabase
        .from('customers')
        .select('id')
        .eq('phone', body.phone)
        .limit(1)
        .single()

      if (existing) {
        customerId = existing.id
        // Increment order count
        await supabase.rpc('increment_customer_orders', { customer_id: customerId })
      }
    }

    // Look up wilaya delivery fee
    let deliveryFee = 0
    if (body.wilaya) {
      const { data: fee } = await supabase
        .from('wilaya_fees')
        .select('delivery_fee_domicile')
        .ilike('wilaya_name', body.wilaya)
        .limit(1)
        .single()

      if (fee) deliveryFee = Number(fee.delivery_fee_domicile)
    }

    // Insert order
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_id: customerId,
        wilaya: body.wilaya,
        delivery_fee: deliveryFee,
        total_price: body.total_price,
        source: body.source,
        status: 'pending',
        notes: `Product: ${body.product_name}, Qty: ${body.quantity}`,
      })
      .select('id')
      .single()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, order_id: order.id })
  } catch (err) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
