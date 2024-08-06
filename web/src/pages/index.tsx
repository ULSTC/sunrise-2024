import React, { useState, useEffect } from 'react';
import TaskList from '@/components/taskList';

// Function to toggle dark mode in localStorage
const toggleDarkMode = (isDarkMode: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }
};

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check initial dark mode setting from localStorage
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('dark-mode');
      setIsDarkMode(savedMode ? JSON.parse(savedMode) : false);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    toggleDarkMode(newDarkMode);
  };

  return (
    <div className={`w-max-screen min-h-[100vh] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full text-lg font-bold py-4 px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Task Board</h1>
          <button
            onClick={handleDarkModeToggle}
            className={`p-2 rounded-full transition-transform duration-300 ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌞' : '🌜'}
          </button>
        </div>
      </div>
      <TaskList />
    </div>
  );
};

export default Home;
