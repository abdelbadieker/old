'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/landing/Navbar'
import AuthModal from '@/components/auth/AuthModal'
import ServicesGrid from '@/components/landing/ServicesGrid'
import PricingTabs from '@/components/landing/PricingTabs'
import SocialProof from '@/components/landing/SocialProof'
import Footer from '@/components/landing/Footer'

// Dynamic import for Three.js — must disable SSR
const HeroSection = dynamic(() => import('@/components/landing/HeroSection'), {
  ssr: false,
  loading: () => (
    <section className="w-full h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <span className="text-sm text-[var(--color-muted)] font-medium">Loading experience...</span>
      </div>
    </section>
  ),
})

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <main className="min-w-[1280px]">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <HeroSection onOpenAuth={() => setAuthOpen(true)} />
      <ServicesGrid />
      <PricingTabs />
      <SocialProof />
      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  )
}
