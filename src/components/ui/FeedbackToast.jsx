import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fontSans } from '../../data/styles';
import { useCart } from '../../hooks/useCart';

export default function FeedbackToast() {
  const { feedback } = useCart();

  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          style={fontSans}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.1,
              type: 'spring',
              stiffness: 400,
              damping: 15,
            }}
          >
            <Check size={18} />
          </motion.div>
          {feedback}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
