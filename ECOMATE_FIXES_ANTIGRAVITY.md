# ECOMATE — FIX DIRECTIVES FOR ANTIGRAVITY
**Scope:** 3 isolated fixes. Do NOT touch any other file unless explicitly listed.

---

## FIX 1 — GOOGLE OAUTH

Wire the existing "Continue with Google" button in `AuthModal.tsx` and create the OAuth callback route.

### `components/auth/AuthModal.tsx` — add this handler:

```typescript
import { createClient } from '@/lib/supabase/client'

const handleGoogleLogin = async () => {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })
}
```

Attach `onClick={handleGoogleLogin}` to the existing Google button. Do not rebuild the modal.

### Create `app/auth/callback/route.ts` (new file):

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
```

### Run this SQL in Supabase SQL Editor (auto-create profile on Google signup):

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    'client'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Add to `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```
Replace `yourdomain.com` with your real deployed domain.

---

## FIX 2 — ADMIN PANEL (HARDCODED ACCESS)

The admin panel is accessible at `/admin`. Access is restricted to ONE
authorized account only. No role column needed — the email itself is
the gate. Credentials are hardcoded at the environment level.

### Add to `.env.local`:
```
ADMIN_EMAIL=abdelbadie.kertimi1212@gmail.com
ADMIN_PASSWORD=12345678
```

### Deliver `app/admin/layout.tsx` (fully isolated — no shared layout):

```typescript
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0A0A0F' }}>
        {children}
      </body>
    </html>
  )
}
```

### Deliver `app/admin/page.tsx` (full login page with credential check):

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    // Hard gate: reject anything that isn't the admin email
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('Access denied. Staff only.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Invalid credentials.')
      setLoading(false)
      return
    }

    router.push('/admin/clients')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 420,
          padding: '48px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '28px',
            fontWeight: 800,
            color: '#F1F0FF',
            margin: 0,
          }}>
            Staff Portal
          </h1>
          <p style={{ color: '#8B8BA0', marginTop: '8px', fontSize: '14px' }}>
            Ecomate internal access only
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Staff email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={inputStyle}
          />

          {error && (
            <p style={{ color: '#EF4444', fontSize: '14px', margin: 0 }}>
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '8px',
            }}
          >
            {loading ? 'Verifying...' : 'Enter Console →'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#F1F0FF',
  fontSize: '15px',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}
```

### Add to `.env.local`:
```
NEXT_PUBLIC_ADMIN_EMAIL=abdelbadie.kertimi1212@gmail.com
```

### Deliver `middleware.ts` (full file — protects both admin and dashboard):

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect /dashboard — redirect to home if not logged in
  if (pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/?auth=login', request.url))
  }

  // Protect /admin/* (not /admin login page itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    if (!user) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    // Only the hardcoded admin email may pass
    if (user.email?.toLowerCase() !== process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase()) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
```

### Deliver `app/admin/clients/page.tsx` — confirm heading:

Add this at the top of the page content (do not rebuild the page):
```tsx
<h1 style={{ fontFamily: 'Syne, sans-serif', color: '#F1F0FF' }}>
  🛡️ Staff Console — Client Management
</h1>
```

---

## FIX 3 — SUPABASE EMAIL TEMPLATES

Go to **Supabase Dashboard → Authentication → Email Templates**.
Replace the default templates with the following.

---

### TEMPLATE 1 — Confirm Signup

**Subject:**
```
Welcome to Ecomate — Confirm your email ✉️
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Confirm your Ecomate account</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#111118;border:1px solid #2A2A38;border-radius:20px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7C3AED,#4F46E5);padding:40px;text-align:center;">
              <div style="font-size:40px;margin-bottom:12px;">🌱</div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;letter-spacing:-0.5px;">
                Ecomate
              </h1>
              <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:8px 0 0;">
                Algeria's #1 E-Commerce Agency Platform
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 40px;">
              <h2 style="color:#F1F0FF;font-size:22px;font-weight:700;margin:0 0 16px;">
                Confirm your email address
              </h2>
              <p style="color:#8B8BA0;font-size:15px;line-height:1.7;margin:0 0 32px;">
                You're one step away from accessing your Ecomate dashboard. 
                Click the button below to verify your email and activate your account.
              </p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="{{ .ConfirmationURL }}"
                       style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#7C3AED,#4F46E5);color:#ffffff;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:0.2px;">
                      ✅ Confirm My Account
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#8B8BA0;font-size:13px;margin:32px 0 0;text-align:center;">
                This link expires in 24 hours. If you didn't create an account, ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2A2A38;text-align:center;">
              <p style="color:#8B8BA0;font-size:12px;margin:0;">
                © 2025 Ecomate · Built for Algeria 🇩🇿
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

### TEMPLATE 2 — Reset Password

**Subject:**
```
Ecomate — Reset your password 🔐
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Reset your Ecomate password</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#111118;border:1px solid #2A2A38;border-radius:20px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7C3AED,#4F46E5);padding:40px;text-align:center;">
              <div style="font-size:40px;margin-bottom:12px;">🔐</div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;letter-spacing:-0.5px;">
                Password Reset
              </h1>
              <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:8px 0 0;">
                Ecomate Staff & Client Portal
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 40px;">
              <h2 style="color:#F1F0FF;font-size:22px;font-weight:700;margin:0 0 16px;">
                Reset your password
              </h2>
              <p style="color:#8B8BA0;font-size:15px;line-height:1.7;margin:0 0 12px;">
                We received a request to reset the password for your Ecomate account.
                Click the button below to choose a new password.
              </p>
              <p style="color:#8B8BA0;font-size:15px;line-height:1.7;margin:0 0 32px;">
                If you didn't request this, you can safely ignore this email — 
                your password will remain unchanged.
              </p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="{{ .ConfirmationURL }}"
                       style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#7C3AED,#4F46E5);color:#ffffff;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:0.2px;">
                      🔑 Reset My Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security notice box -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;">
                <tr>
                  <td style="background:#1A1A24;border:1px solid #2A2A38;border-radius:12px;padding:20px 24px;">
                    <p style="color:#F59E0B;font-size:13px;font-weight:700;margin:0 0 6px;">
                      ⚠️ Security Notice
                    </p>
                    <p style="color:#8B8BA0;font-size:13px;margin:0;line-height:1.6;">
                      This link expires in <strong style="color:#F1F0FF;">1 hour</strong>. 
                      Never share this link with anyone. Ecomate staff will never ask for your password.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2A2A38;text-align:center;">
              <p style="color:#8B8BA0;font-size:12px;margin:0;">
                © 2025 Ecomate · Built for Algeria 🇩🇿
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## DEPLOYMENT CHECKLIST

After applying all 3 fixes, verify the following:

**Supabase Dashboard:**
- [ ] Authentication → Providers → Google → Enable + add Client ID & Secret from Google Cloud Console
- [ ] Add your real domain to: Authentication → URL Configuration → Site URL
- [ ] Add `https://yourdomain.com/auth/callback` to Redirect URLs
- [ ] Run the `handle_new_user` SQL trigger in SQL Editor
- [ ] Paste both email templates in Authentication → Email Templates

**Google Cloud Console:**
- [ ] OAuth 2.0 Client → Authorized redirect URIs → add:
  `https://[your-supabase-project-ref].supabase.co/auth/v1/callback`

**Codebase:**
- [ ] `.env.local` contains `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADMIN_EMAIL`
- [ ] `app/admin/layout.tsx` is fully isolated (no shared root layout)
- [ ] `middleware.ts` is at the project root (same level as `app/`)

---

**Admin panel URL:** `https://yourdomain.com/admin`  
**Admin credentials:** abdelbadie.kertimi1212@gmail.com / 12345678
