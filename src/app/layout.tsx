import { Providers } from '@/shared/providers/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers token={cookies().get('token')}>
        <body className={`min-h-screen ${inter.className}`}>{children}</body>
      </Providers>
    </html>
  )
}
