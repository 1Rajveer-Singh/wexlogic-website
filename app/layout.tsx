import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DirectCallWidget } from '@/components/wexlogic/DirectCallWidget'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://wexlogic.com'),
  title: {
    default: 'WexLogic IT COMPANY — India\'s #1 Creative Studio',
    template: '%s | WexLogic IT COMPANY'
  },
  description: 'CGI & VFX Ads, Web & App Development, Branding, SEO & Marketing, Paid Ads, Video Editing, custom CRM/ERP integrations — playful & high-impact digital solutions.',
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/company-logo.png',
    apple: '/company-logo.png',
  },
  openGraph: {
    title: 'WexLogic IT COMPANY — India\'s #1 Creative Studio',
    description: 'CGI & VFX Ads, Web & App Development, Branding, SEO & Marketing, Paid Ads, Video Editing, custom CRM/ERP integrations — playful & high-impact digital solutions.',
    url: 'https://wexlogic.com',
    siteName: 'WexLogic IT COMPANY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WexLogic IT COMPANY — India\'s #1 Creative Studio',
    description: 'CGI & VFX Ads, Web & App Development, Branding, SEO & Marketing, Paid Ads, Video Editing, custom CRM/ERP integrations — playful & high-impact digital solutions.',
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFDF5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/company-logo.png" />
        <link rel="apple-touch-icon" href="/company-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased text-[#1E293B] bg-[#FFFDF5] selection:bg-[#F472B6] selection:text-white min-h-screen"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <div className="fixed inset-0 pointer-events-none bg-dot-pattern opacity-60 z-[-1]" aria-hidden="true" />
        {children}
        <DirectCallWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
