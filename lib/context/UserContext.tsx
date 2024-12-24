'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserDetails } from '../actions/user.actions'; // Adjust path if necessary

// Define the types for the user data
type User = {
  uid: string;
  email: string;
  displayName: string;
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
    // Load user details from cookies when the component mounts
    const fetchUser = async () => {
      const userFromCookies = await getUserDetails();
      if (userFromCookies) {
        console.log(userFromCookies)
        setUser(userFromCookies);
      }
      else{
        console.log('did not get user')
      }
    };

    fetchUser();
  }, []);

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

