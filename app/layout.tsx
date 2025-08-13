import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PortfolioProvider } from '@/contexts/PortfolioContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Tool - Strategic Management Platform',
  description: 'Strategic thinking and management platform for portfolio managers, practitioners, and investors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-secondary-50 text-secondary-900 antialiased`}>
        <PortfolioProvider>
          <div className="min-h-screen flex">
            {children}
          </div>
        </PortfolioProvider>
      </body>
    </html>
  )
}
