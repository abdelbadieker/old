'use client'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  padding?: string
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'p-6',
}: GlassCardProps) {
  return (
    <div
      className={`
        bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl
        ${padding}
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_60px_rgba(124,58,237,0.15)]' : ''}
        ${glow ? 'shadow-[0_0_60px_rgba(124,58,237,0.25)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
