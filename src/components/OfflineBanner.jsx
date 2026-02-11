import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { fontSans } from '../data/styles';

/**
 * OfflineBanner Component
 *
 * Displays a banner when the user goes offline and hides it when back online.
 * Uses browser's online/offline events for detection.
 */
export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Keep the "back online" message for 3 seconds
      setTimeout(() => {
        setWasOffline(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const shouldShowBanner = !isOnline || (wasOffline && isOnline);

  return (
    <AnimatePresence>
      {shouldShowBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
          }}
          style={fontSans}
          className={`fixed top-0 left-0 right-0 z-[300] ${
            isOnline
              ? 'bg-green-500'
              : 'bg-gradient-to-r from-red-500 to-red-600'
          } text-white shadow-lg`}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center gap-3">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15,
              }}
            >
              {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
            </motion.div>

            <p className="text-sm font-semibold">
              {isOnline ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    ✓
                  </motion.span>
                  You're back online!
                </span>
              ) : (
                'No internet connection. Please check your network.'
              )}
            </p>

            {!isOnline && (
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full bg-white ml-2"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
