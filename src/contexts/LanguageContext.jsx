import { createContext, useState, useCallback, useEffect } from 'react';
import { translations } from '../data/translations';

export const LanguageContext = createContext(null);

const LANGUAGE_STORAGE_KEY = 'purpleplanning_language';

export function LanguageProvider({ children }) {
  // Initialize from localStorage or browser language
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && translations[saved]) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      return translations[browserLang] ? browserLang : 'de';
    } catch {
      return 'de';
    }
  });

  // Persist language to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  }, [language]);

  const t = useCallback(
    (section, key) => {
      const lang = translations[language] ?? translations['de'];
      const fallback = translations['de'];

      if (key === null || key === undefined) {
        return lang[section] ?? fallback[section];
      }

      return lang[section]?.[key] ?? fallback[section]?.[key];
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
