// app/course/[page]/page.tsx
import React from "react";
import { fetchCourseByPage } from "@/lib/actions/user.actions";
import CourseDisplay, { Course } from "@/components/CourseDisplay";



interface CoursePageProps {
  params: { page: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
  
  const resolvedParams = await params;
  const pageParam = resolvedParams.page;
  if (!pageParam) {
    return <p>No course page specified.</p>;
  }

  const courses: Course[] | null = await fetchCourseByPage(pageParam);
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
