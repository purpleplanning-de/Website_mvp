import { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const CookieConsentContext = createContext(null);

const CONSENT_STORAGE_KEY = 'purpleplanning_cookie_consent';

const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => {
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* localStorage unavailable */ }
    return null;
  });

  const [bannerVisible, setBannerVisible] = useState(() => consent === null);

  useEffect(() => {
    if (consent) {
      try {
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
      } catch { /* localStorage unavailable */ }
    }
  }, [consent]);

  const acceptAll = useCallback(() => {
    setConsent({ necessary: true, analytics: true, marketing: true });
    setBannerVisible(false);
  }, []);

  const acceptNecessary = useCallback(() => {
    setConsent({ ...DEFAULT_CONSENT });
    setBannerVisible(false);
  }, []);

  const updateConsent = useCallback((categories) => {
    setConsent({ ...DEFAULT_CONSENT, ...categories, necessary: true });
    setBannerVisible(false);
  }, []);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch { /* localStorage unavailable */ }
    setConsent(null);
    setBannerVisible(true);
  }, []);

  const hasConsent = useCallback(
    (category) => consent?.[category] ?? false,
    [consent],
  );

  const value = useMemo(
    () => ({
      consent,
      bannerVisible,
      acceptAll,
      acceptNecessary,
      updateConsent,
      resetConsent,
      hasConsent,
    }),
    [consent, bannerVisible, acceptAll, acceptNecessary, updateConsent, resetConsent, hasConsent],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
