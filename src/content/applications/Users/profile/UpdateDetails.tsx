// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Updated User interface to include email
interface User {
  username: string;
  password: string;
  email: string; // Add email
  role: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  getUser: (username: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with example users that include email
  const [users, setUsers] = useState<User[]>([
    { username: 'admin', password: 'password', email: 'admin@example.com', role: 'admin' },
    { username: 'user', password: 'password', email: 'user@example.com', role: 'user' },
  ]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const getUser = (username: string) => {
    return users.find(user => user.username === username);
  };

  return (
    <UserContext.Provider value={{ users, addUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
