import React from 'react'
import { Navigation } from '@/app/components/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='grid h-screen grid-rows-[auto_1fr]'>
      <Navigation />
      {children}
    </main>
  )
}
