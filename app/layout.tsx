import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import { SiteNav } from '@/components/layout/site-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { RouteTransition } from '@/components/layout/route-transition'
import { CustomCursor } from '@/components/layout/custom-cursor'
import { MinimalPreloader } from '@/components/layout/minimal-preloader'

import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Aden Joseph - Interaction Designer',
    template: '%s | Aden Joseph',
  },
  description: 'Interaction Designer crafting considered digital experiences.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <MinimalPreloader />
        <CustomCursor />
        <SiteNav />
        <div className="min-h-screen">
          <RouteTransition>{children}</RouteTransition>
        </div>
        <SiteFooter />
      </body>
    </html>
  )
}
