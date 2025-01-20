import { User } from 'firebase/auth';

export async function setAuthCookie(user: User) {
  const token = await user.getIdToken(); // Get the Firebase ID token

  // Create an object with user details
  const userDetails = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
  
  // Send the token to your API route
  const response = await fetch('api/auth/set-cookie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, userDetails }),
  });

  if (!response.ok) {
    throw new Error('Failed to set authentication cookie.');
  }
}


