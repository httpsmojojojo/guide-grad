import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GuideGrad',
  description: 'Created by GuideGrad',
  generator: 'GuideGrad',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
