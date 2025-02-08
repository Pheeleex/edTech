import React from "react";
import { fetchCourseByPage } from "@/lib/actions/user.actions";
import CourseDisplay, { Course } from "@/components/CourseDisplay";



interface CoursePageProps {
  params: Promise<{ page: string }>; //  Explicitly type as Promise
}

export default async function CoursePage({ params }: CoursePageProps) {
  
  const { page } = await params; // Await params properly
  if (!page) {
    return <p>No course page specified.</p>;
  }

  const courses: Course[] | null = await fetchCourseByPage(page);
  if (!courses || courses.length === 0) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="p-8 mt-10">
    { /* <CourseIntro /> */}
      {courses.map((course, idx) => (
        <CourseDisplay key={idx} course={course} />
      ))}
    </div>
  );
}
