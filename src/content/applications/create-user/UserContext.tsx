// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  password: string;
  role: string;
  email: string; // New field
  phoneNumber: string; // New field
}


interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  getUser: (username: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([
    {
      username: 'admin', password: 'password', role: 'admin',
      email: '',
      phoneNumber: ''
    },
    {
      username: 'user', password: 'password', role: 'user',
      email: '',
      phoneNumber: ''
    },
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
