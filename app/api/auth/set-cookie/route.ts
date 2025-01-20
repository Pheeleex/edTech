//app/api/auth/set-cookie/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Get the request body, which should contain the token and userDetails
  const { token, userDetails } = await req.json();

  if (!token || !userDetails) {
    return NextResponse.json({ error: 'Token and user details are required.' }, { status: 400 });
  }

  // Set two separate cookies: one for the token and one for user details
  const cookies = [
    `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`,
    `user_details=${JSON.stringify(userDetails)}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`,
  ];

  // Set the cookies using NextResponse
  const response = NextResponse.json({ message: 'Cookies set successfully.' });
  cookies.forEach(cookie => response.headers.append('Set-Cookie', cookie));

  return response;
}
