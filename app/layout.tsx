import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FinCoach - Your Money, Your Move 💸',
  description: 'AI-powered financial wellness app that makes personal finance fun and engaging',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}