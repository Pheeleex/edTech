import EnrollUser from '@/components/enrollUser';
import Schools from '@/components/Schools';
import { getUserCourse, getUserDetails } from '@/lib/actions/user.actions';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  // Fetch user details
  const user = await getUserDetails();

  // If no user details are found, render a fallback view.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">No user found</h1>
      </div>
    );
  }

  // Fetch the student's course. If getUserCourse is asynchronous, await it.
  const studentCourse = await getUserCourse(user.uid);

  if (!studentCourse) {
    return (
     <div className='mt-20'>
      <EnrollUser />
    
      <Link href="/#schools" className='border border-white p-2 cursor-pointer'>
      Register a course</Link>
     </div>
    );
  }


  return (
    <div className="min-h-screen mt-20 mr-20 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {user.displayName}!</h1>
        <p className="text-lg text-gray-700">
          Are you ready to continue your journey in{' '}
          <span className="font-semibold text-indigo-600">
            {studentCourse ? studentCourse : 'your course'}
          </span>
          ?
        </p>
      </div>

        
    </div>
  );
};

export default Page;
