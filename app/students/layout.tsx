import Sidebar from '@/components/Sidebar'
import React from 'react'

export const dynamic = "force-dynamic";

const Layout = async({ children }: { children: React.ReactNode }) => {
    return (
    <main className='flex h-screen'>
        <Sidebar  />
        <section className='flex-1 h-full mx-8 mt-20'>
            <div className='main-content'>{children}</div>
        </section>
    </main>
  )
}

export default Layout