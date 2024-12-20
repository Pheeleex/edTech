'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { signInAction, signUpAction } from '@/lib/firebase/auth';
import SubmitButton from './SubmitButton';

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

  if (formType === "sign-up") {
    return baseSchema.extend({
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match.",
      path: ["confirmPassword"], // Specify where the error should appear
    });
  }

  return baseSchema;
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [error, setError] = useState<string | null>(null); // For error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'sign-up' ? { confirmPassword: '' } : {}),
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  try {
    let response;
    if (type === 'sign-up') {
      response = await signUpAction({ email: values.email, password: values.password });
    } else {
      response = await signInAction({ email: values.email, password: values.password });
    }
    if (!response?.success) throw new Error(response?.error);
    
    // Only reset the form after a successful submission
    form.reset();
  } catch (error: any) {
    const message = error?.message || 'An unexpected error occurred.';
    setError(message);
  } finally {
    setIsLoading(false);
  }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="form-title">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
        {
          error ? (
            <p>{error}</p>
          ) : (<div />)
        }

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

        {/* Confirm Password Field for Sign Up */}
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

        <SubmitButton isLoading={isLoading}>{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</SubmitButton> 
      </form>
    </Form>
  );
};

export default AuthForm;
