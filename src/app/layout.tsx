import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OneLink Holdings',
  icons: {
    icon: '/assets/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
