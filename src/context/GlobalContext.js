import React, { useState, useEffect, createContext, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    function handleResize() {
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GlobalContext.Provider value={{ windowSize }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};
