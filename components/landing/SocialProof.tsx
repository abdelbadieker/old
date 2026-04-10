'use client'
import { motion } from 'framer-motion'

const tools = [
  { icon: '📸', label: 'Instagram' },
  { icon: '💬', label: 'WhatsApp' },
  { icon: '📲', label: 'Telegram' },
  { icon: '🎵', label: 'TikTok' },
  { icon: '📊', label: 'Google Sheets' },
  { icon: '🚚', label: 'Yalidine' },
  { icon: '🟢', label: 'Google OAuth' },
]

export default function SocialProof() {
  return (
    <section className="py-20 px-10" style={{ minWidth: 1280 }}>
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)] mb-10">
            Tools & Partners We Work With
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-[var(--color-muted)] font-medium transition-all duration-300 hover:border-accent/30 hover:text-[var(--color-text)]"
              >
                <span className="text-xl">{tool.icon}</span>
                {tool.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
