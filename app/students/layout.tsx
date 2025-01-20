import Sidebar from '@/components/Sidebar'
import React from 'react'

export const dynamic = "force-dynamic";

const Layout = async({ children }: { children: React.ReactNode }) => {
    return (
    <main className='flex h-screen'>
        <Sidebar  />
        <section className='flex h-full flex-1 flex-col'>
            <div className='main-content'>{children}</div>
        </section>
    </main>
  )
}

export default Layout