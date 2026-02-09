import { createContext, useState } from 'react';

export const UserContext = createContext(null);

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

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    name: 'Sarah Planner',
    email: 'sarah@purpleplanning.de',
    address: 'Musterstraße 12, 10115 Berlin',
    newsletter: true,
    points: 150,
  });

  const levelInfo = computeLevel(userData.points);

  return (
    <UserContext.Provider value={{ userData, setUserData, levelInfo, levels: LEVELS }}>
      {children}
    </UserContext.Provider>
  );
}
