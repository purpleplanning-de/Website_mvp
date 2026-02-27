import { createContext, useState, useMemo, useEffect } from 'react';

export const UserContext = createContext(null);

const USER_STORAGE_KEY = 'purpleplanning_user';

const LEVELS = [
  { name: 'Reisender', min: 0, benefit: 'Zugang zu Standard-Downloads' },
  { name: 'Entdecker', min: 100, benefit: '5% Dauerrabatt & Early Access' },
  { name: 'Gestalter', min: 300, benefit: 'Kostenlose Sticker monatlich' },
  { name: 'Visionär', min: 600, benefit: 'Persönliches Coaching & Retreat-Invite' },
];

function computeLevel(points) {
  const idx = LEVELS.slice().reverse().findIndex((l) => points >= l.min);
  const actualIdx = idx >= 0 ? LEVELS.length - 1 - idx : 0;
  const current = LEVELS[actualIdx];
  const next = LEVELS[actualIdx + 1] ?? null;

  let progressPercent = 100;
  let pointsToNext = 0;
  if (next) {
    const range = next.min - current.min;
    const inLevel = points - current.min;
    progressPercent = (inLevel / range) * 100;
    pointsToNext = next.min - points;
  }

  return { current, next, progressPercent, pointsToNext, actualIdx };
}

const DEFAULT_USER = {
  name: 'Sarah Planner',
  email: 'sarah@purpleplanning.de',
  address: 'Musterstraße 12, 10115 Berlin',
  newsletter: true,
  points: 150,
};

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? { ...DEFAULT_USER, ...JSON.parse(saved) } : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Änderungen in localStorage persistieren
  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data to localStorage:', error);
    }
  }, [userData]);

  // useMemo verhindert unnötige Neuberechnungen bei unabhängigen State-Änderungen
  const levelInfo = useMemo(() => computeLevel(userData.points), [userData.points]);

  return (
    <UserContext.Provider value={{ userData, setUserData, levelInfo, levels: LEVELS }}>
      {children}
    </UserContext.Provider>
  );
}
