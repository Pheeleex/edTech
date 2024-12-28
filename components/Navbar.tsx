'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from './Button'
import Link from 'next/link';
import { useUser } from '@/lib/context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { deleteCookies } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
    const navItems = ["Why Edutech", "Contact"];
    const user = useUser()
     const router = useRouter();
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const handleSignOut = async() => {
      try {
        await signOut(auth)
        await deleteCookies()
        console.log('signed out successfully')
        router.push('/sign-in')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }
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
           <div className="flex h-full items-center relative gap-8">
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
              src='/assets/Images/purple.png'
              alt="Avatar"
              width={44}
              height={44}
              className="navbar-user-avatar cursor-pointer z-40"
              onClick={toggleDropdown}
            />

{dropdownOpen && (
                <div className="absolute right-1 top-8 mt-2 w-48 bg-white border rounded-lg shadow-lg z-30">
                  <Link 
                    href={`/students/${user.user?.uid}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={toggleDropdown}
                    >
                    Dashboard
                  </Link>
                  <button 
                    //create signout logic
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
        </nav>
        </header>
    </div>
  )
}

export default Navbar