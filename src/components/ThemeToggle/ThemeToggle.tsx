import React, { useCallback, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { shallow } from 'zustand/shallow'; // Import shallow separately
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle: React.FC = () => {
  // Use shallow with the correct syntax
  const theme = useStore((state) => state.theme, shallow);
  const setTheme = useStore((state) => state.setTheme); // Stable function reference

  console.log('ThemeToggle rendered, current theme:', theme);

  const initialRender = useRef(true);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme to:', newTheme);
    setTheme(newTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      // Apply initial theme from store to DOM
      document.documentElement.setAttribute('data-theme', theme as string); // Explicit cast
      document.documentElement.classList.toggle('dark', (theme as string) === 'dark');
      return;
    }

    console.log('Applying data-theme:', theme);
    document.documentElement.setAttribute('data-theme', theme as string); // Explicit cast
    document.documentElement.classList.toggle('dark', (theme as string) === 'dark');
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:text-gold-accent transition-colors focus:outline-none"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <SunIcon className="w-6 h-6 text-gray-700" />
      ) : (
        <MoonIcon className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;