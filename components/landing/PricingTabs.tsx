'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const tabs = ['Software & Automation', 'Setup & Web Dev', 'Creative Studio']

const tabContent = {
  0: [
    {
      name: 'Starter',
      price: '4,900',
      period: 'DZD/mo',
      features: ['AI Chatbot', 'CRM', 'EcoTrack Basic'],
      popular: false,
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      price: '9,900',
      period: 'DZD/mo',
      features: ['Everything in Starter', 'Analytics Dashboard', 'Priority Support'],
      popular: true,
      cta: 'Start Growing →',
    },
    {
      name: 'Agency',
      price: '19,900',
      period: 'DZD/mo',
      features: ['Full suite', 'Multiple channels', 'Dedicated manager'],
      popular: false,
      cta: 'Contact Sales',
    },
  ],
  1: [
    {
      name: 'Landing Page',
      price: '25,000',
      period: 'DZD one-time',
      features: ['Custom design', 'Mobile optimized', 'Fast delivery'],
      popular: false,
      cta: 'Order Now',
    },
    {
      name: 'Full E-Commerce Site',
      price: '65,000',
      period: 'DZD one-time',
      features: ['Product catalog', 'Payment integration', 'Admin panel'],
      popular: true,
      cta: 'Build My Store →',
    },
    {
      name: 'Fulfillment / per order',
      price: '120',
      period: 'DZD + shipping',
      features: ['Warehousing', 'Packaging', 'Full tracking'],
      popular: false,
      cta: 'Learn More',
    },
  ],
  2: [
    {
      name: 'Pack 1',
      price: '12,000',
      period: 'DZD/mo · 4 videos',
      features: ['Script + shoot + edit', 'Reels & TikTok format', 'Monthly delivery'],
      popular: false,
      cta: 'Choose Pack 1',
    },
    {
      name: 'Pack 2',
      price: '20,000',
      period: 'DZD/mo · 8 videos',
      features: ['Everything in Pack 1', 'Priority scheduling', 'Brand kit integration'],
      popular: false,
      cta: 'Choose Pack 2',
    },
    {
      name: 'Pack 3',
      price: '28,000',
      period: 'DZD/mo · 12 videos',
      features: ['Everything in Pack 2', 'Dedicated videographer', 'A/B variants'],
      popular: true,
      cta: 'Best Value →',
    },
  ],
} as Record<number, Array<{
  name: string
  price: string
  period: string
  features: string[]
  popular: boolean
  cta: string
}>>

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="pricing" className="py-24 px-10 bg-[var(--color-surface)]" style={{ minWidth: 1280 }}>
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-4">
            <span className="w-4 h-[2px] bg-accent" />
            Transparent Pricing
          </div>
          <h2 className="font-syne text-5xl font-extrabold text-[var(--color-text)] mb-4">
            Plans that{' '}
            <span className="gradient-text-purple">fit your stage.</span>
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-[440px] mx-auto">
            No hidden fees. No long-term contracts. Pick what you need.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-12 p-1.5 bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] w-fit mx-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === i
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-5"
          >
            {tabContent[activeTab].map((plan) => (
              <div
                key={plan.name}
                className={`
                  relative rounded-2xl p-8
                  ${plan.popular
                    ? 'bg-gradient-to-b from-accent/20 to-[var(--color-surface)] border-2 border-accent/50 shadow-[0_0_60px_rgba(124,58,237,0.2)]'
                    : 'bg-[var(--color-bg)] border border-[var(--color-border)]'
                  }
                  transition-all duration-300 hover:-translate-y-1
                `}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold font-syne uppercase tracking-wider px-4 py-1 rounded-full shadow-[0_4px_14px_rgba(124,58,237,0.4)]">
                    🏆 Recommended
                  </span>
                )}

                <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-3 font-syne">
                  {plan.name}
                </div>

                <div className="font-syne text-4xl font-black text-[var(--color-text)] mb-1">
                  {plan.price !== 'Custom' && (
                    <sup className="text-base font-bold align-top mt-2 inline-block text-[var(--color-muted)]">
                      DZD
                    </sup>
                  )}
                  {plan.price}
                </div>
                <span className="text-xs text-[var(--color-muted)] block mb-6">
                  {plan.period}
                </span>

                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-[var(--color-muted)] flex items-start gap-2"
                    >
                      <span className="text-[var(--color-success)] font-bold flex-shrink-0">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={`
                    block w-full py-3 rounded-xl text-center text-sm font-bold no-underline transition-all
                    ${plan.popular
                      ? 'bg-accent text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]'
                      : 'border border-[var(--color-border)] text-[var(--color-muted)] hover:border-accent/50 hover:text-[var(--color-text)]'
                    }
                  `}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
