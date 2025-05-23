import { getFullCourseDetails, getUserDetails } from '@/lib/actions/user.actions';
import React from 'react';
import Dashboard from '@/components/students/Dashboard';
import LessonList from '@/components/students/LessonList';

const page = async () => {
  const user = await getUserDetails()
  console.log(user, 'user')
  const courselist = await getFullCourseDetails('SWE')
  console.log(courselist, 'courselist')

  // If no user details, you can render a fallback or loading state
  if (!user) {
    return (
      <div>
        <h1>No user found</h1>
      </div>
    );
  }

  return (
    <div className='mt-4 flex flex-col items-center justify-center w-full bg-slate-200 rounded-2xl'>  
        <Dashboard />
        {courselist && <LessonList courseDetails={courselist} />}
    </div>
  );
};

export default page;
