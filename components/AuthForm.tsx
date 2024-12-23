'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setAuthCookie } from '@/lib/actions/setAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormType = 'sign-in' | 'sign-up';

// Validation schema factory
const authFormSchema = (formType: FormType) => {
  const baseSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(9, { message: 'Password must be at least 9 characters.' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character.' }),
  });

  if (formType === 'sign-up') {
    return baseSchema.extend({
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match.',
      path: ['confirmPassword'], // Specify where the error should appear
    });
  }

  return baseSchema;
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [error, setError] = useState<string | null>(null); // For error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'sign-up' ? { confirmPassword: '' } : {}),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response =
        type === 'sign-up'
          ? await createUserWithEmailAndPassword(auth, values.email, values.password)
          : await signInWithEmailAndPassword(auth, values.email, values.password);

      const user = response.user;

      if (user) {
        await setAuthCookie(user);
        router.push(`/students/${user.uid}`);
      }

      form.reset();
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="form-title">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
        {error && <p className="text-red-500">{error}</p>}

        {/* Email Field */}
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

        {/* Confirm Password Field for Sign-Up */}
        {type === 'sign-up' && (
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      {/* Conditional Container */}
      <div className="mt-6 text-center">
        {type === 'sign-in' ? (
          <p className="text-gray-700">
            Don’t have an account?{' '}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
             Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-gray-700">
            Already have an account?{' '}
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
