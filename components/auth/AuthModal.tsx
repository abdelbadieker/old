'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const supabase = createClient()

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    toast.success('Welcome back!')
    onClose()
    router.push('/dashboard')
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    toast.success('Account created! Check your email to verify.')
    setLoading(false)
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    if (error) toast.error(error.message)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <span className="font-syne text-lg font-bold gradient-text-purple">Ecomate</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--color-border)]">
              {(['login', 'register'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-semibold transition-all ${
                    tab === t
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {t === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {tab === 'login' ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Email</label>
                      <input className="auth-input pl-4" type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Password</label>
                      <input className="auth-input pl-4" type="password" required placeholder="••••••••" value={form.password} onChange={(e) => set('password', e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                      {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--color-border)]" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-[var(--color-surface)] px-3 text-xs text-[var(--color-muted)]">or</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="btn-ghost w-full justify-center text-sm"
                    >
                      🟢 Continue with Google
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Full Name</label>
                      <input className="auth-input pl-4" type="text" required placeholder="Youcef Benmoussa" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Email</label>
                      <input className="auth-input pl-4" type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Password</label>
                      <input className="auth-input pl-4" type="password" required placeholder="Min. 8 characters" value={form.password} onChange={(e) => set('password', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5 block">Confirm Password</label>
                      <input className="auth-input pl-4" type="password" required placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                      {loading ? 'Creating account...' : 'Create Account →'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
