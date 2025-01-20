'use server'

import { cookies } from "next/headers";

// Function to retrieve the user details from cookies
export async function getUserDetails() {
    const cookieStore = await cookies(); // Get the cookies from the request header
  
    // Access cookies directly if Next.js API routes are used
    const authToken = cookieStore.get('auth_token');
    const userDetails = cookieStore.get('user_details');
  
    if (authToken && userDetails && userDetails.value) {
     // console.log('authToken:', authToken);
 // console.log('userDetails:', userDetails);
      try {
        // You can return the cookies or parse them as needed
        const parsedUserDetails = JSON.parse(userDetails.value); // if you saved as JSON
        return parsedUserDetails;  // Return the user details
      } catch (error) {
        console.error('Error parsing user details cookie:', error);
        return null; // Or return an appropriate fallback
      }
    }
  
    return null; // Return null if no cookies are found
  }
  

  export async function deleteCookies() {
    const cookieStore = await cookies(); // Get the cookies from the request header
    cookieStore.delete('auth_token')
    cookieStore.delete('user_details')
    console.log('Cookies deleted successfully');
  }