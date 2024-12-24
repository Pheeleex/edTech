"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();
 // Check if the current path starts with "/sign-in" or "/sign-up"
 const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");


  if (isAuthRoute) return null;

  return <Navbar />;
}