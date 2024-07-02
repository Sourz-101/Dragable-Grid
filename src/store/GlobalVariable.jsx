import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context
const GlobalStateContext = createContext();

// Create a provider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  // Initialize state with data from local storage if available
  const [component, setComponent] = useState(() => {
    const localData = localStorage.getItem('component');
    return localData ? JSON.parse(localData) : [];
  });

  // UseEffect to store state in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('component', JSON.stringify(component));
  }, [component]);

  return (
    <GlobalStateContext.Provider value={{ component, setComponent }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to access the global state
export const useGlobalState = () => {
  const { component, setComponent } = useContext(GlobalStateContext);
  return [component, setComponent];
};