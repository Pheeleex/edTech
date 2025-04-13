import CourseDisplay from '@/components/CourseDisplay';
import { getFullCourseDetails } from '@/lib/actions/user.actions';
import { FullCourseDetails } from '@/types';
import React from 'react';


interface CoursePageProps {
  params: { code: string };
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { code } = params;

  if (!code) {
    return <p>No course page specified.</p>;
  }

  const course: FullCourseDetails | null = await getFullCourseDetails(code);
  console.log(course, 'course')

  if (!course) {
    return <div className="p-4 bg-blue-200 rounded-full">
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-8 mt-10 text-center">
        <div className="p-4 bg-yellow-50 rounded-full border-2 border-yellow-100">
          <span className="text-3xl" aria-hidden="true">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Course Details Pending</h2>
        <p className="text-gray-600 max-w-md">
          We&apos;re working hard to gather complete information for{" "}
          <span className="font-mono font-semibold text-gray-900">{code}</span>.
          Please check back soon!
        </p>
      </div>
    </div>
  }

  return (
    <div className="p-8 mt-10">
      <CourseDisplay course={course} />
    </div>
  );
};

export default CoursePage;
