import Link from 'next/link'

const footerLinks = [
  {
    title: 'Services',
    links: ['AI Chatbot', 'EcoTrack Logistics', 'Fulfillment', 'Creative Studio', 'Web Development'],
  },
  {
    title: 'Company',
    links: ['About Ecomate', 'Our Team'],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'FAQs'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)] pt-16 pb-8 px-10" style={{ minWidth: 1280 }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-4 gap-12 mb-14">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🌱</span>
              <span className="font-syne text-lg font-bold gradient-text-purple">
                Ecomate
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6 max-w-[250px]">
              Your end-to-end e-commerce growth partner. From automation to fulfillment — built for Algeria.
            </p>
            <div className="flex gap-3">
              {['📸', '💬', '🎵', '💼'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 no-underline"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h5 className="font-syne text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-5">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/30 hover:text-accent transition-colors no-underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-border)] pt-6 flex items-center justify-between">
          <p className="text-xs text-white/30">
            © 2025{' '}
            <span className="text-white/60 font-semibold">Ecomate</span>
            . All rights reserved.
          </p>
          <p className="text-xs text-white/20">🇩🇿 Built for Algeria</p>
        </div>
      </div>
    </footer>
  )
}
