'use server'

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import { db } from "../firebase";
import { Course } from "@/components/CourseDisplay";

// Function to retrieve the user details from cookies
export async function getUserDetails() {
  const cookieStore = await cookies(); // Get the cookies from the request header

  // Access cookies directly if Next.js API routes are used
  const authToken = cookieStore.get('auth_token');
  const userDetails = cookieStore.get('user_details');

  if (authToken && userDetails && userDetails.value) {
    //console.log('authToken:', authToken);
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


export async function fetchCourses() {
  try {
    const coursesCollection = collection(db, 'Courses')
    // Retrieve all documents in the collection
    const querySnapshot = await getDocs(coursesCollection);
    const courses: Course[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Course
      console.log(data)
      return data
    })
    return courses
  } catch (error) {
    console.log(error)
  }
}


export async function fetchCourseByPage(page: string) {
  try {
    const coursesCollection = collection(db, "Courses");

    // Query Firestore for a course where "page" matches
    const q = query(coursesCollection, where("page", "==", page));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching course found");
      return null;
    }

    // Retrieve all matching courses (if multiple exist with the same page name)
    const course: Course[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }) as Course);

    return course;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}


export async function getUserCourse(userId: string): Promise<string | null>{
  const userDocRef = doc(db, "users", userId)

   // Fetch the document snapshot
   const docSnap = await getDoc(userDocRef);

   if (docSnap.exists()) {
    
    // Option 2: Directly using .get() to retrieve the field's value:
    return docSnap.get("studentCourse") as string;
  } else {
    console.log("No such user found.");
    return null;
  }
}
