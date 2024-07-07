import React, { useState, FC, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { themeCreator } from './base';

// Define the context type
export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

// Define props interface for the provider
interface ThemeProviderWrapperProps {
  children: ReactNode;
}

// Use the props interface in the functional component
const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({ children }) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
