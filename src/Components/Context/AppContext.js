import React, { createContext, useState, useContext } from 'react';

// Create a new context for managing the active tab state and tasks
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Create the context provider component
export const AppContextProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [tasks, setTasks] = useState([]);
    const [activeNavTab, setActiveNavTab] = useState('home');


    return (
        <AppContext.Provider value={{ activeTab, setActiveTab, tasks, setTasks, activeNavTab, setActiveNavTab }}>
            {children}
        </AppContext.Provider>
    );
};
