import { createContext, useState, useMemo, useEffect } from 'react';

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'purpleplanning_theme';

export function ThemeProvider({ children }) {
  // Initialize from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Persist theme to localStorage and sync html background color
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
    document.documentElement.style.backgroundColor = darkMode ? '#1a0b2e' : '#faf9f6';
  }, [darkMode]);

  const toggle = () => setDarkMode((prev) => !prev);

  const theme = useMemo(() => {
    const bgMain = darkMode ? 'bg-[#1a0b2e]' : 'bg-[#faf9f6]';
    const textMain = darkMode ? 'text-white' : 'text-gray-900';
    const textMuted = 'text-purple-600';
    const cardBg = darkMode
      ? 'bg-[#2e1d46]/80 border-white/[0.06]'
      : 'bg-white border-purple-100/60';
    const borderColor = darkMode ? 'border-white/[0.06]' : 'border-purple-100/40';

    return { darkMode, bgMain, textMain, textMuted, cardBg, borderColor };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ ...theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
