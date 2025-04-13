'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navItems } from '@/constants'
import { useUser } from '@/lib/context/UserContext'

const Sidebar = () => {
  const pathname = usePathname()
  const user = useUser()

  // Extract userId from current path (e.g. /students/:userId or /students/:userId/documents)
  const pathParts = pathname.split('/')
  const userId = pathParts[2] // pathParts = ["", "students", "tk199Ve43HPzTAsKWLPEFaHbPJC3", ...]

  return (
    <aside className="mt-[7rem] w-[17%] px-3">
      <Link href="/">
        <Image
          src="/assets/icons/edtech.png"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ name, icon }) => {
            const isDashboard = name === 'Dashboard'
            const href = isDashboard
              ? `/students/${userId}`
              : `/students/${userId}/${name.toLowerCase()}`

            const isActive = pathname === href

            return (
              <li key={name}>
                <Link
                  href={href}
                  className={cn(
                    'sidebar-nav-item flex items-center gap-3 lg:w-full',
                    isActive && 'shad-active'
                  )}
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className={cn('nav-icon', isActive && 'nav-icon-active')}
                  />
                  <p className="hidden lg:block text-white">{name}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <Image
        src="/assets/images/files.png"
        alt="files illustration"
        width={506}
        height={418}
        className="w-1/2"
      />

      <div className="sidebar-user-info mt-6 flex items-center gap-4">
        <Image
          src="/assets/Images/purple.png"
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block bg-white p-2 rounded-md">
          <p className="subtitle-2 capitalize text-black">{user.user?.displayName}</p>
          <p className="caption text-gray-600">{user.user?.email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
