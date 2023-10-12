import React, { ReactNode } from 'react'
import Header from './header'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>{children}</main>
    </div>
  )
}
