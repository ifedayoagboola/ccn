import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import './globals.css'
import { AppProviders } from '@/components/providers/app-providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Counter Cultural Nurses - Empowering African Nurses',
  description: 'Empowering African nurses with digital skills, remote opportunities, and financial freedom. Join our community and soar beyond the bedside.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable}`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}




