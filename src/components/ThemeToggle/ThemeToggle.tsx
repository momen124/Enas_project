import React, { useCallback, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useStore();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:text-gold-accent transition-colors focus:outline-none"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 text-gray-700" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;