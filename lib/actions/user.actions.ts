'use server'

import { collection,  getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import { db } from "../firebase";
import { Course, FullCourseDetails, GroupedModules, Lesson } from "@/types";

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

  export async function getFullCourseDetails(code: string): Promise<FullCourseDetails | null> {
    try {
      // Step 1: Get the course
      const courseQuery = query(collection(db, 'Courses'), where('title', '==', code));
      const courseSnapshot = await getDocs(courseQuery);
  
      if (courseSnapshot.empty) {
        console.log('No course found for:', code);
        return null;
      }
  
      const courseDoc = courseSnapshot.docs[0];
      const courseData = {
        id: courseDoc.id,
        ...courseDoc.data(),
      } as Course;
  
      // Step 2: Get lessons for this course
      const lessonsQuery = query(
        collection(db, 'lessons'),
        where('courseId', '==', courseData.courseId)
      );
      const lessonsSnapshot = await getDocs(lessonsQuery);
  
      const groupedModules: GroupedModules = {};
  
      lessonsSnapshot.forEach((doc) => {
        const data = doc.data() as Lesson;
  
        if (!groupedModules[data.level]) {
          groupedModules[data.level] = [];
        }
  
        groupedModules[data.level].push({
          title: data.lessonName,
          topics: data.topics,
          lessonId: data.lessonId,
        });
      });
  
      // Step 3: Return full course + grouped modules
      const fullCourse: FullCourseDetails = {
        ...courseData,
        groupedModules,
      };
  
      return fullCourse;
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }

  export async function getTasks(){
    try {
      const TaskQuery = collection(db, "Tasks")
      const TaskSnapshot = await getDocs(TaskQuery)
      const tasks = TaskSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log(tasks, 'tasks')
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return null;
    }
  }