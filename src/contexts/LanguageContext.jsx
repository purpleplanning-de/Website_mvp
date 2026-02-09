import { createContext, useState, useCallback } from 'react';
import { translations } from '../data/translations';

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('de');

  const t = useCallback(
    (section, key) =>
      translations[language]?.[section]?.[key] ??
      translations['de'][section][key],
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
