# ECOMATE — MASTER BUILD DIRECTIVE FOR ANTIGRAVITY
**Persona:** Senior Principal Full-Stack Next.js Engineer, Automation Architect & UI/UX Director  
**Project:** Ecomate — Premium End-to-End E-Commerce Growth & Fulfillment Agency  
**Market:** Algerian e-commerce ecosystem  
**Tagline:** "Scale your e-commerce without the operational headache."

---

## ⚠️ ABSOLUTE HARD CONSTRAINTS — NEVER VIOLATE

1. ❌ NO mobile responsiveness. Desktop-only. Min-width: 1280px on all containers. Never use `sm:`, `md:`, `lg:` Tailwind breakpoint prefixes. Design for 1440px viewport only.
2. ❌ NO Arabic language. NO RTL. NO `next-intl`. NO `dir="rtl"`. NO `rtl:` Tailwind classes. English only.
3. ❌ NO real photos, stock images, or Unsplash URLs. Use ONLY emojis, CSS gradients, and SVG patterns.
4. ❌ NO generic SaaS copy ("Free Trial", "7 tools in 1", "Sign Up Free"). Ecomate is a premium agency.
5. ❌ NEVER import or reference: `next-intl`, `i18n`, `locale`, `rtl`, `useTranslation`, or any i18n utility.
6. ❌ Native OS cursor ONLY — never override with custom CSS cursors.

---

## TECH STACK (EXACT — DO NOT SUBSTITUTE)

- **Framework:** Next.js 14+ App Router (strict — no Pages Router)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** Framer Motion
- **3D / Hero FX:** Three.js via React Three Fiber (`@react-three/fiber` + `@react-three/drei`)
- **Backend / Auth / DB:** Supabase (Auth, PostgreSQL, RLS, Server Actions)
- **Charts:** Recharts
- **Drag & Drop:** `@dnd-kit/core` + `@dnd-kit/sortable`

---

## DESIGN SYSTEM

### Color Tokens — define all in `globals.css`
```css
:root {
  --color-bg:          #0A0A0F;
  --color-surface:     #111118;
  --color-surface-2:   #1A1A24;
  --color-border:      #2A2A38;
  --color-accent:      #7C3AED;
  --color-accent-glow: #9F67FF;
  --color-gold:        #F59E0B;
  --color-text:        #F1F0FF;
  --color-muted:       #8B8BA0;
  --color-success:     #10B981;
  --color-danger:      #EF4444;
  --color-warning:     #F59E0B;
}
```

### Typography
- **Display font:** `Syne` (Google Fonts) — headings, bold/extrabold weights
- **Body font:** `DM Sans` (Google Fonts) — regular/medium weights
- **Mono accents:** `JetBrains Mono` — for metrics, IDs, data values

### Visual Language
- **Glassmorphism:** `backdrop-blur-xl`, `bg-white/5`, `border border-white/10`
- **Bento Grid:** CSS Grid with irregular cell spans (`col-span-2`, `row-span-2`)
- **Glow:** `box-shadow: 0 0 60px rgba(124, 58, 237, 0.25)` on accent elements
- **Gradients:** `linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)` for CTAs
- **Noise overlay:** `url("data:image/svg+xml,...")` SVG noise on hero bg, opacity 0.04
- **Cards hover:** `transform: translateY(-4px)` + glow border intensify
- **Scroll animations:** Framer Motion `whileInView` with `once: true`

---

## ARCHITECTURE — EXACT FILE TREE

```
src/
├── app/
│   ├── layout.tsx                    # Root layout, Syne + DM Sans fonts
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # CSS vars, base reset, noise texture
│   ├── dashboard/
│   │   ├── layout.tsx                # Sidebar + topbar shell
│   │   ├── page.tsx                  # Analytics overview
│   │   ├── crm/page.tsx
│   │   ├── products/page.tsx
│   │   ├── orders/page.tsx           # Kanban board
│   │   ├── fulfillment/page.tsx
│   │   └── creative/page.tsx         # Google Drive iframe
│   └── admin/
│       ├── page.tsx                  # Admin login (isolated route)
│       ├── layout.tsx
│       ├── clients/page.tsx
│       ├── operations/page.tsx
│       └── warehouse/page.tsx
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── PricingTabs.tsx
│   │   ├── SocialProof.tsx
│   │   └── Navbar.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── AnalyticsChart.tsx
│   │   └── ProductTable.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── Badge.tsx
│   │   ├── StatCard.tsx
│   │   ├── Modal.tsx
│   │   └── Button.tsx
│   └── auth/
│       ├── AuthModal.tsx
│       └── AdminLogin.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── hooks/
│   ├── useAuth.ts
│   └── useOrders.ts
└── types/
    └── index.ts
```

---

## SECTION SPECS

### NAVBAR
- Fixed top, `backdrop-blur-xl`, `border-b border-white/10`, height 72px
- Left: `🌱` emoji + "Ecomate" wordmark in purple gradient (`Syne` font, bold)
- Center: Links — Services · Pricing · Dashboard
- Right: `[Book a Call 🚀]` — purple gradient button, glow on hover
- No hamburger. No mobile breakpoints. No language toggle.

---

### HERO SECTION — ANIMATION SPEC (CRITICAL — IMPLEMENT EXACTLY)

**Layout:** Full viewport (100vh), dark bg (`#0A0A0F`), centered content over canvas.

**Three.js Canvas (Background Layer):**
- Use `@react-three/fiber` Canvas with `camera={{ position: [0, 0, 5], fov: 75 }}`
- Render a `Points` geometry: 3000 particles in a random spherical distribution
- Particle material: `PointsMaterial`, size `0.015`, color `#7C3AED`, `transparent`, `opacity: 0.7`
- Animate with `useFrame`: rotate the points mesh on Y axis at `0.0008` per frame, X axis at `0.0003` per frame
- Add a second `Points` mesh (800 particles), color `#9F67FF`, size `0.025`, rotating opposite direction
- Canvas `style={{ position: 'absolute', inset: 0, zIndex: 0 }}`
- Canvas `gl={{ antialias: true, alpha: true }}`
- Wrap in `<Suspense fallback={null}>` inside the Canvas

**Framer Motion Content (Foreground Layer, `z-index: 10`):**

Use `variants` + `staggerChildren` pattern:
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}
```

Elements (in order, all using `itemVariants`):
1. Small badge: `✦ Algeria's #1 E-Commerce Agency` — pill shape, border `border-purple-500/40`, bg `bg-purple-500/10`, text `text-purple-300`, `DM Sans` font
2. Headline H1 (two lines):
   - Line 1: "Scale Your E-Commerce." — `text-7xl`, `Syne`, white, font-black
   - Line 2: "Without the Headache." — same size, purple gradient text (`from-[#7C3AED] to-[#9F67FF]`)
3. Subheading: "Ecomate is your end-to-end partner — from AI-powered sales automation to fulfillment, creative content, and custom web development. Built specifically for Algerian merchants." — `text-xl`, `text-[var(--color-muted)]`, max-width 600px, `DM Sans`
4. CTA Row: `[Book a Discovery Call 🚀]` (purple gradient, shadow-lg) + `[Explore Services ↓]` (ghost, border `border-white/20`)
5. Stats Row (4 stat pills, each its own `motion.div` with `itemVariants`):
   - `📦 2,400+ Orders Processed`
   - `🤖 98% Automation Rate`
   - `🏙️ 69 Wilayas Covered`
   - `⭐ 4.9/5 Client Rating`
   - Each pill: bg `bg-white/5`, border `border-white/10`, `backdrop-blur-sm`, px-4 py-2, rounded-full, `DM Sans Medium`

**Performance notes:**
- `Canvas` must be wrapped in a `dynamic` import with `ssr: false`
- Add `useEffect` cleanup to dispose Three.js geometries on unmount
- `will-change: transform` on animated foreground container

---

### SERVICES SECTION (Bento Grid, 5 cards)

Grid: `grid-cols-3`, `gap-4`, irregular spans. No ePayment card.

**Card 1 — 🤖 AI Sales Chatbot** (`col-span-2`)
"Automated storefronts on Instagram & WhatsApp. Interactive product catalogs, dynamic 69-wilaya delivery pricing, and instant checkout — running 24/7."

**Card 2 — 📍 EcoTrack Logistics**
"Real-time order tracking synced with top Algerian delivery partners. Live status updates pushed directly to your dashboard."

**Card 3 — 🏭 Ecomate Fulfillment** (`col-span-2`)
"Send us your inventory. We handle warehousing, packaging, and shipping — with full tracking visibility from our end to your customer's door."

**Card 4 — 🎬 Creative Studio**
"High-converting short-form video for TikTok and Reels. Script, shoot, montage — delivered monthly."

**Card 5 — 💻 Web Development**
"Custom, conversion-optimized e-commerce sites and landing pages — built for the Algerian market."

Each card: glassmorphism surface, emoji icon at 48px, `Syne` title, `DM Sans` body, subtle purple glow border on hover, Framer Motion `whileInView` fade-up.

---

### PRICING SECTION (3-Tab Toggle)

Tabs: `[Software & Automation]` · `[Setup & Web Dev]` · `[Creative Studio]`

**Tab 1 — Software & Automation (Subscription):**
| Tier | Price | Features |
|---|---|---|
| Starter | 4,900 DZD/mo | AI Chatbot, CRM, EcoTrack Basic |
| Growth 🏆 | 9,900 DZD/mo | Everything + Analytics, Priority Support |
| Agency | 19,900 DZD/mo | Full suite, multiple channels, dedicated manager |

**Tab 2 — Setup & Web Dev (One-Time):**
| Service | Price |
|---|---|
| Landing Page | 25,000 DZD |
| Full E-Commerce Site | 65,000 DZD |
| Fulfillment / per order | 120 DZD + shipping |

**Tab 3 — Creative Studio (Monthly):**
| Pack | Videos | Price |
|---|---|---|
| Pack 1 | 4 videos | 12,000 DZD/mo |
| Pack 2 | 8 videos | 20,000 DZD/mo |
| Pack 3 🏆 | 12 videos | 28,000 DZD/mo |

Style: Dark glass cards, purple accent border on `🏆` recommended tiers, Framer Motion `AnimatePresence` on tab content switch.

---

### SOCIAL PROOF

"Tools & Partners We Work With"

Emoji logo grid (no real images):
📸 Instagram · 💬 WhatsApp · 📲 Telegram · 🎵 TikTok  
📊 Google Sheets · 🚚 Yalidine · 🟢 Google OAuth

---

### FOOTER
4-column grid, dark minimal. Logo + tagline left. Links center. "© 2025 Ecomate. Built for Algeria." bottom bar.

---

## CLIENT DASHBOARD

### Sidebar (240px fixed)
Nav items:
```
📊 Overview
👥 CRM
📦 Products
🚚 Orders & EcoTrack
🏭 Fulfillment
🎬 Creative Assets
```
- Active state: left `border-l-2 border-[var(--color-accent)]` + `bg-purple-500/10`
- Bottom: user avatar, name, logout

### Dashboard Pages

**Overview:**
- Top row: 4 `StatCard` components — Total Revenue, Orders This Month, Active Customers, Conversion Rate (Recharts sparkline per card)
- Middle: Revenue `LineChart` (Recharts, purple stroke `#7C3AED`, dark grid, 6-month) + `PieChart` (order status split)
- Bottom: Recent Orders table (last 10 rows)

**Orders / EcoTrack (Kanban):**
- 5 columns: `🕐 Pending` · `✅ Confirmed` · `🚚 Shipped` · `📦 Delivered` · `↩️ Returned`
- Each card: Order ID, customer name, wilaya, product, price, delivery fee, timestamp
- `@dnd-kit` drag between columns
- All 69 Algerian wilayas in dropdown selector
- Delivery fee auto-populated from `wilaya_fees` static lookup table

**Products (Catalog):**
- Table: name, SKU, variants (size/color JSON), price, stock
- Inline edit, Add modal, Delete confirm
- Framer Motion row entry animations

**CRM:**
- Table: full name, phone, wilaya, total orders, last order date
- Click row → expand interaction history panel (slide down)

**Fulfillment:**
- Table: product name, quantity at Ecomate warehouse, last restocked, status badge (In Stock 🟢 / Low ⚠️ / Out 🔴)

**Creative Assets:**
- Centered `<iframe>` embed of client's Google Drive folder
- Caption: "Your monthly content is uploaded here by the Ecomate Creative Team 🎬"

---

## ADMIN CONSOLE (`/admin`)

Completely isolated route. Purple-tinted dark theme. Staff only. No link from public site.

**Sidebar sections:**
```
👥 All Clients
📊 Agency Revenue
🏭 Warehouse
🎬 Creative Ops
💻 Dev Ops
```

**All Clients:**
Table: Client name, plan tier, total orders, last active, status badge

**Agency Revenue:**
Combined revenue chart (Recharts) across all clients + monthly breakdown table

**Warehouse:**
Unified inventory view — all clients' stock at Ecomate warehouse

**Creative Ops:**
Internal Kanban: script → shoot → edit → delivered

**Dev Ops:**
Internal Kanban: design → dev → review → launched

---

## AUTHENTICATION

**Client Auth Modal** (triggered from Navbar CTA):
- Backdrop blur overlay, slide-up Framer Motion entry
- Tabs: `[Login]` · `[Register]`
- Login: Email + Password + `[Continue with Google]` OAuth button
- Register: Full name, email, password, confirm password
- OTP: 6 auto-focus digit inputs with `onInput` auto-advance behavior

**Admin Login (`/admin`):**
- Full-page isolated form — zero public nav or shared layout
- Email + password only, no OAuth
- Header: `🔒 Ecomate Staff Portal` (`Syne` bold, purple)

---

## DATABASE SCHEMA

```sql
-- All tables have RLS enabled

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  full_name TEXT,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'client', -- 'client' | 'admin'
  google_drive_folder_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  variants JSONB DEFAULT '[]', -- [{size, color, price, stock}]
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  wilaya TEXT,
  total_orders INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  product_id UUID REFERENCES products(id),
  status TEXT DEFAULT 'pending',
  -- 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned'
  wilaya TEXT,
  delivery_fee NUMERIC,
  total_price NUMERIC,
  notes TEXT,
  source TEXT, -- 'instagram' | 'whatsapp' | 'telegram' | 'manual'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT DEFAULT 0,
  last_restocked TIMESTAMPTZ
);

CREATE TABLE wilaya_fees (
  id SERIAL PRIMARY KEY,
  wilaya_name TEXT UNIQUE NOT NULL,
  wilaya_code INT UNIQUE NOT NULL,
  delivery_fee_domicile NUMERIC NOT NULL,
  delivery_fee_bureau NUMERIC NOT NULL
);
-- Pre-populate all 69 Algerian wilayas (codes 01–58 legacy + 59–69 new wilayas)
```

---

## SUPABASE SERVER UTILITY — CRITICAL FIX

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies() // ← MUST be awaited in Next.js 14+

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

---

## WEBHOOK — ORDER INGESTION

Expose `POST /api/webhooks/order` for external order creation:

```typescript
// app/api/webhooks/order/route.ts
export async function POST(req: Request) {
  const secret = req.headers.get('x-ecomate-secret')
  if (secret !== process.env.WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  // Insert into orders table via Supabase admin client
  return Response.json({ success: true })
}
```

Payload shape:
```json
{
  "customer_name": "string",
  "phone": "string",
  "wilaya": "string",
  "product_name": "string",
  "quantity": "number",
  "total_price": "number",
  "source": "instagram | whatsapp | telegram"
}
```

---

## EXECUTION PROTOCOL — STRICTLY SEQUENTIAL

Do NOT skip or combine phases. Wait for confirmation before each new phase.

| Phase | Scope |
|---|---|
| 1 | Scaffolding, `globals.css` (design tokens), Supabase utils, DB migration |
| 2 | Root `layout.tsx`, Navbar, Hero (Three.js particles + Framer Motion) |
| 3 | Services bento grid, Pricing 3-tab, Social Proof, Footer |
| 4 | Auth Modal (Login/Register/OTP + Google OAuth) + Admin Login page |
| 5 | Dashboard shell (sidebar + topbar) + Overview analytics page |
| 6 | Orders Kanban (`@dnd-kit` + 69 wilayas + delivery fees) |
| 7 | CRM, Products, Fulfillment, Creative Assets pages |
| 8 | Admin console — all sections |
| 9 | Webhook route (`/api/webhooks/order`) |

---

## SELF-VERIFICATION CHECKLIST

Before delivering any phase, verify every item:

- [ ] Zero Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`) used anywhere
- [ ] Zero i18n / `next-intl` / RTL references
- [ ] Zero real image URLs — only emojis, SVGs, CSS gradients
- [ ] All Supabase server calls use `await cookies()`
- [ ] Three.js Canvas imported with `dynamic(..., { ssr: false })`
- [ ] Three.js geometries disposed on unmount via `useEffect` cleanup
- [ ] Framer Motion `variants` + `staggerChildren` used in Hero — not inline `animate` props
- [ ] All colors reference CSS variable tokens, not hardcoded hex values
- [ ] Every page has a `loading.tsx` skeleton
- [ ] TypeScript strict — zero `any` types
- [ ] Fonts loaded via `next/font/google` in `layout.tsx` — not `<link>` tags
- [ ] 69 wilayas everywhere — never 58

---

**BEGIN WITH PHASE 1.**  
Output the complete file tree first, then generate all Phase 1 files in full.  
No truncation. No `// ...rest of code` shortcuts. Every file must be complete and copy-pasteable.
