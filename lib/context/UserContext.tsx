'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserDetails } from '../actions/user.actions'; // Adjust path if necessary
import { auth } from '../firebase';

// Define the types for the user data
type User = {
  uid: string;
  email: string | null; // Allow null
  displayName: string | null; // Allow null
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create context with undefined as the default value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to provide context to children
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userFromCookies = await getUserDetails();
      if (userFromCookies) {
       // console.log('User from cookies:', userFromCookies);
        setUser(userFromCookies);
      } else {
        console.log('No user found in cookies');
      }
    };
  
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUser(); // Sync with cookies
        console.log('the user')
      } else {
        setUser(null); // Clear user if logged out
        console.log('i never see user')
      }
    });
  
    return () => unsubscribe();
  }, []); // Empty dependency array

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

