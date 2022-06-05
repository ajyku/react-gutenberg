import React, { useState, useEffect, createContext, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState();
  const [device, setDevice] = useState();

  useEffect(() => {
    function handleResize() {
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });

      if (window.innerWidth <= 481) {
        setDevice('mobile');
      } else if (window.innerWidth > 481 && window.innerWidth <= 600) {
        setDevice('landscape');
      } else if (window.innerWidth > 600 && window.innerWidth <= 961) {
        setDevice('tablet');
      } else if (window.innerWidth > 961) {
        setDevice('laptop');
      } else {
        setDevice('other');
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GlobalContext.Provider value={{ windowSize, device }}>
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
