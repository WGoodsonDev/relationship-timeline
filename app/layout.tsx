import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'A private timeline of our journey together',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full" style={{ backgroundColor: '#fef8ef' }}>
        {children}
      </body>
    </html>
  )
}
