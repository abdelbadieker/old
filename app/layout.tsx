import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ecomate — Scale Your E-Commerce Without the Headache',
  description: 'Ecomate is your end-to-end partner for AI-powered sales automation, fulfillment, creative content, and custom web development. Built for Algerian merchants.',
  keywords: 'ecomate, algeria, ecommerce, agency, fulfillment, chatbot, ai, automation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-dm`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111118',
              color: '#F1F0FF',
              border: '1px solid #2A2A38',
              fontFamily: 'var(--font-dm-sans)',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
