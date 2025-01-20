"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { setAuthCookie } from "@/lib/actions/setAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setDoc, doc } from "firebase/firestore"; // Import Firestore methods


type FormType = "sign-in" | "sign-up";

// Validation schema factory
// Separate schemas for each form type
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(9, { message: "Password must be at least 9 characters." }),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(5, { message: "Full Name must have at least 5 characters." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  stateOfResidence: z.string().min(2, { message: "State of Residence is required." }),
  dateOfBirth: z.string().nonempty({ message: "Date of Birth is required." }),
  confirmPassword: z.string().min(9, { message: "Confirm Password is required." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match.",
  path: ["confirmPassword"],
});

// Create discriminated union types
type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;
type AuthFormValues = SignInFormValues | SignUpFormValues;


const AuthForm = ({ type }: { type: FormType }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formSchema = type === 'sign-in' ? signInSchema : signUpSchema;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: type === "sign-up"
      ? {
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          stateOfResidence: "",
          dateOfBirth: "",
        }
      : { email: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      if (type === "sign-up") {
        // Type narrowing to SignUpFormValues
        const signUpValues = values as SignUpFormValues;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          signUpValues.email,
          signUpValues.password
        );

        await updateProfile(userCredential.user, { displayName: signUpValues.fullName });

        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName: signUpValues.fullName,
          email: signUpValues.email,
          phoneNumber: signUpValues.phoneNumber,
          stateOfResidence: signUpValues.stateOfResidence,
          dateOfBirth: signUpValues.dateOfBirth,
          createdAt: new Date().toISOString(),
        });
      } else {
        // Type narrowing to SignInFormValues
        const signInValues = values as SignInFormValues;
        if(signInValues){
          console.log(signInValues)
        }
      }

      const user = auth.currentUser;
      if (user) {
        await setAuthCookie(user);
        router.push(`/students/${user.uid}`);
      }

      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="form-title text-blue-700">{type === "sign-in" ? "Sign In" : "Sign Up"}</h1>
        {error && <p className="text-red-500">{error}</p>}

        {/* Full Name Field for Sign-Up */}
        {type === "sign-up" && (
          <>
            <div className="flex gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname Lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
           <div className="flex gap-4">
           <FormField
              control={form.control}
              name="stateOfResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Residence</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your state of residence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel> <br />
                  <FormControl>
                  <DatePicker
                      selected={field.value ? new Date(field.value) : new Date()}
                      onChange={(date) =>
                        field.onChange(date ? date.toISOString() : "")
                      }
                      dateFormat='MM/dd/yyyy'
                      showTimeSelect
                      timeInputLabel='Time'
                      wrapperClassName='date-picker'
                          />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
          </>
        )}

        {/* Email Field */}
        <div className="flex gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Confirm Password Field for Sign-Up */}
        {type === "sign-up" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading} className="bg-brand rounded-md">
          {isLoading ? "Loading..." : type === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      {/* Navigation Links */}
      <div className="mt-6 text-center">
        {type === "sign-in" ? (
          <p className="text-gray-700">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </Form>
  );
};

export default AuthForm;
