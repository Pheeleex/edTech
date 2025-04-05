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
    return <p>Course not found.</p>;
  }

  return (
    <div className="p-8 mt-10">
      <CourseDisplay course={course} />
    </div>
  );
};

export default CoursePage;
