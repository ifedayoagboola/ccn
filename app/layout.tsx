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
  title: 'CCN',
  description: 'Next.js application with Tailwind, shadcn/ui, React Query, and Supabase',
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




