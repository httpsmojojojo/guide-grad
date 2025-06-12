import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Suspense } from 'react'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Guide Grad',
  description: 'Created by Guide Grad',
  generator: 'Guide Grad',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
