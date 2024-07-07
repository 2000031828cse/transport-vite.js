// src/contexts/SidebarContext.tsx

import { FC, useState, createContext, ReactNode } from 'react';

type SidebarContextType = {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

// Create the context with default value as undefined
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggle(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
