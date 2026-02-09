import { useState, useEffect } from 'react';

export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, [threshold]);

  return scrolled;
}
