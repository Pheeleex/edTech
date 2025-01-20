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
  return (
    <aside className='mt-[7rem]'>
        <Link href='/'>
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
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active",
                  )}
                />
                <p className="hidden lg:block text-white">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src="/assets/images/files.png"
        alt="logo"
        width={506}
        height={418}
        className="w-1/2"
      />

      <div className="sidebar-user-info">
        <Image
          src='/assets/Images/purple.png'
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block bg-white">
          <p className="subtitle-2 capitalize">{user.user?.displayName}</p>
          <p className="caption">{user.user?.email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar