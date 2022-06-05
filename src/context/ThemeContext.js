import React, { useState, createContext, useContext } from 'react';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
  colors: {
    primary: '#5E56E7',
    light: '#F8F7FF',
    mediumGrey: '#F0F0F6',
    grey: '#A0A0A0',
    darkGrey: '#333333',
  },
};

const initialState = {
  theme: themes.light,
  setTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes.colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
