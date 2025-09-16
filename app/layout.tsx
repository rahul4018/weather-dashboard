import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Smart Weather Dashboard",
  description: "Get real-time weather information for any city worldwide",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
