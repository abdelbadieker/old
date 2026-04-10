/* ══════════════════════════════════════════════════
   ECOMATE — TYPE DEFINITIONS
   ══════════════════════════════════════════════════ */

export type UserRole = 'client' | 'admin'

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned'

export type OrderSource = 'instagram' | 'whatsapp' | 'telegram' | 'manual'

export interface Profile {
  id: string
  full_name: string | null
  email: string
  role: UserRole
  google_drive_folder_id: string | null
  created_at: string
}

export interface Product {
  id: string
  user_id: string
  name: string
  sku: string | null
  variants: ProductVariant[]
  created_at: string
}

export interface ProductVariant {
  size: string
  color: string
  price: number
  stock: number
}

export interface Customer {
  id: string
  user_id: string
  full_name: string | null
  phone: string | null
  wilaya: string | null
  total_orders: number
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  customer_id: string | null
  product_id: string | null
  status: OrderStatus
  wilaya: string | null
  delivery_fee: number | null
  total_price: number | null
  notes: string | null
  source: OrderSource | null
  created_at: string
  // Joined relations (optional)
  customer?: Customer
  product?: Product
}

export interface InventoryItem {
  id: string
  user_id: string
  product_id: string | null
  quantity: number
  last_restocked: string | null
  product?: Product
}

export interface WilayaFee {
  id: number
  wilaya_name: string
  wilaya_code: number
  delivery_fee_domicile: number
  delivery_fee_bureau: number
}

// Kanban column definition
export interface KanbanColumn {
  id: OrderStatus
  title: string
  icon: string
  orders: Order[]
}

// Webhook payload
export interface OrderWebhookPayload {
  customer_name: string
  phone: string
  wilaya: string
  product_name: string
  quantity: number
  total_price: number
  source: OrderSource
}

// Pricing types
export interface PricingTier {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  popular: boolean
}
