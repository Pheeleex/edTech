// middleware.ts (for Next.js 13+)

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the paths that do not require authentication (e.g., login, signup)
const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up'];


export  async function middleware(req: NextRequest) {
  const cookieStore = await cookies(); // Retrieve cookies from the request
  const authToken = cookieStore.get('auth_token');
  const userDetails = cookieStore.get('user_details');
   // Check if the user is accessing a public path
   const isPublicPath = PUBLIC_PATHS.includes(req.nextUrl.pathname);
  // If the user is not authenticated and trying to access a protected page, redirect to login
  if (!authToken || !userDetails) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/sign-in', req.url));  // Redirect to login page
    }
  }

  // If the user is authenticated, proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/students/:path*'],  // Define your protected routes here
};
