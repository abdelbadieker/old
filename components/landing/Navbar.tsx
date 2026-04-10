'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-10
        backdrop-blur-xl border-b border-white/10 transition-all duration-300
        ${scrolled ? 'bg-[#0A0A0F]/95' : 'bg-transparent'}
      `}
      style={{ minWidth: 1280 }}
    >
      {/* Left — Brand */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl">🌱</span>
        <span className="font-syne text-xl font-bold gradient-text-purple">
          Ecomate
        </span>
      </Link>

      {/* Center — Links */}
      <div className="flex flex-row items-center gap-8">
        {[
          { label: 'Services', href: '#services' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Dashboard', href: '/dashboard' },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors no-underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right — CTA */}
      <button
        onClick={onOpenAuth}
        className="btn-primary text-sm py-3 px-6"
      >
        Book a Call 🚀
      </button>
    </nav>
  )
}
