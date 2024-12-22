import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";
import { auth } from ".";
import { setAuthCookie } from "../actions/setAuth";



// Define the input type for authentication actions
interface AuthActionParams {
  email: string;
  password: string;
}

// Define the return type for authentication actions
interface AuthActionResult {
  success: boolean;
  user?: User // User is part of Firebase's API
  error?: string;
}




// Sign-up action with type safety
export async function signUpAction({ email, password }: AuthActionParams, res?: any): Promise<AuthActionResult> {
  console.log("Rendering AuthForm component");
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setAuthCookie(user); // Set the auth cookie after successful sign up
    console.log(user, 'how many times'); // Log user details
    return { success: true, user };
  } catch (error: unknown) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}

// Sign-in action with type safety
export async function signInAction({ email, password }: AuthActionParams): Promise<AuthActionResult> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setAuthCookie(user); // Set the auth cookie after successful sign up
    console.log(user); // Log user details
    return { success: true, user };
  } catch (error: unknown) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}

  