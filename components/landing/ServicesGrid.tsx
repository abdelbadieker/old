'use client'
import { motion, Variants } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'

const services = [
  {
    icon: '🤖',
    title: 'AI Sales Chatbot',
    desc: 'Automated storefronts on Instagram & WhatsApp. Interactive product catalogs, dynamic 69-wilaya delivery pricing, and instant checkout — running 24/7.',
    span: 'col-span-2',
  },
  {
    icon: '📍',
    title: 'EcoTrack Logistics',
    desc: 'Real-time order tracking synced with top Algerian delivery partners. Live status updates pushed directly to your dashboard.',
    span: '',
  },
  {
    icon: '🏭',
    title: 'Ecomate Fulfillment',
    desc: "Send us your inventory. We handle warehousing, packaging, and shipping — with full tracking visibility from our end to your customer's door.",
    span: 'col-span-2',
  },
  {
    icon: '🎬',
    title: 'Creative Studio',
    desc: 'High-converting short-form video for TikTok and Reels. Script, shoot, montage — delivered monthly.',
    span: '',
  },
  {
    icon: '💻',
    title: 'Web Development',
    desc: 'Custom, conversion-optimized e-commerce sites and landing pages — built for the Algerian market.',
    span: '',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 px-10" style={{ minWidth: 1280 }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-4">
            <span className="w-4 h-[2px] bg-accent" />
            What We Do
          </div>
          <h2 className="font-syne text-5xl font-extrabold text-[var(--color-text)] leading-tight mb-4">
            Five services.{' '}
            <span className="gradient-text-purple">One partner.</span>
            <br />
            <span className="text-[var(--color-muted)] text-4xl font-bold">
              Zero operational headaches.
            </span>
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-[520px] leading-relaxed">
            Stop juggling freelancers and fragmented tools. Ecomate delivers
            everything under one roof — strategy to execution.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className={service.span}
            >
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl mb-5">
                  {service.icon}
                </div>
                <h3 className="font-syne text-lg font-bold text-[var(--color-text)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {service.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
