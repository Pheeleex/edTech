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
    <div className='dashboard-container'>  
      
    </div>
  );
};

export default page;
