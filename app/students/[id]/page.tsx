import Navbar from '@/components/Navbar';
import { getUserDetails } from '@/lib/actions/user.actions';
import React from 'react';

const page = async () => {
  const user = await getUserDetails()

  // If no user details, you can render a fallback or loading state
  if (!user) {
    return (
      <div>
       
        <h1>No user found</h1>
      </div>
    );
  }

  return (
    <div>
       <Navbar />
      <div className='mt-20'>
      <h1>Welcome, {user.displayName || 'Student'}</h1>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      </div>
    </div>
  );
};

export default page;
