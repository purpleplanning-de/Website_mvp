import { createContext, useState, useCallback } from 'react';
import { translations } from '../data/translations';

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('de');

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
