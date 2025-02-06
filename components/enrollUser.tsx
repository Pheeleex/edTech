'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as needed
import { useUser } from '@/lib/context/UserContext';
import Link from 'next/link';

// Define interfaces for course and course modules
interface CourseModule {
  title?: string;
  name?: string;
  // Add other properties if needed
}

interface CourseModules {
  basic?: CourseModule[];
  intermediate?: CourseModule[];
  advanced?: CourseModule[];
}

interface Course {
  id: string;
  duration: number;
  title: string;
  modules?: CourseModules;
  page: string;
}

// Define a minimal User interface (adjust as needed)
interface User {
  uid: string;
  displayName?: string;
}

const EnrollUser: React.FC = () => {
  const router = useRouter();
  const { user } = useUser(); // useUser returns an object with a user property
  const [course, setCourse] = useState<Course | null>(null);
  const [courseInterest, setCourseInterest] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // On mount, retrieve course details and course interest from localStorage
  useEffect(() => {
    const storedCourse = localStorage.getItem('Course'); // Ensure key consistency
    const storedCourseInterest = localStorage.getItem('courseInterest');
    if (storedCourse) {
      try {
        const parsedCourse: Course = JSON.parse(storedCourse);
        setCourse(parsedCourse);
      } catch (err) {
        console.error('Error parsing course from localStorage', err);
      }
    }
    setCourseInterest(storedCourseInterest);
  }, []);

  const enrollCourse = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (!user || !user.uid) {
        // If the user is not logged in, redirect to sign-up
        router.push('/sign-up');
        return;
      }

      if (!course) {
        throw new Error('Course data is missing');
      }

      // Reference the user's document in Firestore
      const userRef = doc(db, 'users', user.uid);

      // Update the student's course field with the course title
      await updateDoc(userRef, {
        studentCourse: course.title,
      });

      setIsLoading(false);
      // Redirect to the student's dashboard after successful enrollment
      router.push(`/students/${user.uid}`);
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError('Enrollment failed. Please try again.');
      setIsLoading(false);
    }
  };

  // If course data hasn't loaded yet, show a loading message.
  if (!course) {
    return (
      <p className="text-center text-gray-700">
        Loading course details...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        {courseInterest ? (
          // Render the enrollment card if the user has shown course interest
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-2">
              Duration: {course.duration} months
            </p>
            <p className="text-gray-600 mb-4">Page: {course.page}</p>

            {/* Display modules if available */}
            {course.modules && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Modules
                </h3>
                {course.modules.basic && (
                  <div className="mb-2">
                    <strong className="text-gray-700">Basic:</strong>
                    <ul className="list-disc ml-5">
                      {course.modules.basic.map((mod, index) => (
                        <li key={`basic-${index}`} className="text-gray-600">
                          {mod.title || mod.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.modules.intermediate && (
                  <div className="mb-2">
                    <strong className="text-gray-700">Intermediate:</strong>
                    <ul className="list-disc ml-5">
                      {course.modules.intermediate.map((mod, index) => (
                        <li key={`intermediate-${index}`} className="text-gray-600">
                          {mod.title || mod.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.modules.advanced && (
                  <div>
                    <strong className="text-gray-700">Advanced:</strong>
                    <ul className="list-disc ml-5">
                      {course.modules.advanced.map((mod, index) => (
                        <li key={`advanced-${index}`} className="text-gray-600">
                          {mod.title || mod.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button
              onClick={enrollCourse}
              disabled={isLoading}
              className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Enrolling...' : 'Enroll Now'}
            </button>
          </>
        ) : (
          // Render an alternative UI asking if the user wants to enroll a new course.
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              You haven't shown interest in any course yet.
            </h2>
            <p className="text-gray-600 mb-4">
              Would you like to enroll in a new course?
            </p>
            <Link
              href="/#schools"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Register a course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollUser;
