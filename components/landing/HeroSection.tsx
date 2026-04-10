'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import ParticleField from './ParticleField'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stats = [
  { icon: '📦', text: '2,400+ Orders Processed' },
  { icon: '🤖', text: '98% Automation Rate' },
  { icon: '🏙️', text: '69 Wilayas Covered' },
  { icon: '⭐', text: '4.9/5 Client Rating' },
]

export default function HeroSection({ onOpenAuth }: { onOpenAuth?: () => void }) {
  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ minWidth: 1280 }}>
      {/* Three.js Canvas — Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ParticleField
              count={3000}
              color="#7C3AED"
              size={0.015}
              rotationSpeed={0.0008}
            />
            <ParticleField
              count={800}
              color="#9F67FF"
              size={0.025}
              rotationSpeed={0.0008}
              reverseRotation
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124, 58, 237, 0.12), transparent 70%)',
        }}
      />

      {/* Framer Motion Content — Foreground */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8"
        style={{ willChange: 'transform' }}
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 text-purple-300 text-sm font-medium"
        >
          <span className="text-xs">✦</span>
          Algeria&apos;s #1 E-Commerce Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-syne text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-[var(--color-text)]">Scale Your E-Commerce.</span>
          <br />
          <span className="gradient-text-purple">Without the Headache.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-[var(--color-muted)] max-w-[600px] mb-10 leading-relaxed"
        >
          Ecomate is your end-to-end partner — from AI-powered sales automation
          to fulfillment, creative content, and custom web development. Built
          specifically for Algerian merchants.
        </motion.p>

        {/* CTA Row */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
          <button onClick={onOpenAuth} className="btn-primary text-base py-4 px-8 shadow-lg">
            Book a Discovery Call 🚀
          </button>
          <Link
            href="#services"
            className="btn-ghost text-base py-4 px-7 no-underline"
          >
            Explore Services ↓
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.text}
              variants={itemVariants}
              className="stat-pill"
            >
              <span>{stat.icon}</span>
              <span>{stat.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
