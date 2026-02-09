import { createContext, useState, useMemo } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggle = () => setDarkMode((prev) => !prev);

  const theme = useMemo(() => {
    const bgMain = darkMode ? 'bg-[#1a0b2e]' : 'bg-[#faf9f6]';
    const textMain = darkMode ? 'text-[#e9d5ff]' : 'text-gray-900';
    const textMuted = darkMode ? 'text-[#a78bfa]' : 'text-purple-600';
    const cardBg = darkMode
      ? 'bg-[#2e1d46] border-[#4c1d95]'
      : 'bg-white border-purple-200 shadow-sm';
    const borderColor = darkMode ? 'border-white/10' : 'border-purple-200';

    return { darkMode, bgMain, textMain, textMuted, cardBg, borderColor };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ ...theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
