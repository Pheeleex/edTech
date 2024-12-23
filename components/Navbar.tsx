import Image from 'next/image'
import React from 'react'
import Button from './Button'
import Link from 'next/link';
import { avatarPlaceholderUrl } from '@/constants';

const Navbar = () => {
    const navItems = ["Why Edutech", "Contact"];
  return (
    <div
     className="fixed inset-x-0 top-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
         <header className="absolute top-1/2 w-full -translate-y-1/2">
         <nav className="flex size-full items-center justify-between p-4">
             {/* Logo and Prgrams button */}
          <Link href='/'>
          <div className="flex items-center gap-7">
          <Image src="/assets/icons/eTech-logo.png" alt="logo"
            width={150}
            height={100}
          />
          <Button 
             id="product-button"
             title="Products"
             containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
          />
          </div>
          </Link>

           {/* Navigation Links and Audio Button */}
           <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </Link>
              ))}
            </div>
            <Image
          src={avatarPlaceholderUrl}
          alt="Avatar"
          width={44}
          height={44}
          className="navbar-user-avatar"
        />
            </div>
        </nav>
        </header>
    </div>
  )
}

export default Navbar