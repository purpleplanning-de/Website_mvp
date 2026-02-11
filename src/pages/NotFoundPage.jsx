import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ArrowLeft, Sparkle } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { darkMode, textMain } = useTheme();
  const { t } = useLanguage();

  const quickLinks = [
    {
      icon: Home,
      label: t('nav', 'shop') || 'Home',
      path: '/',
      description: 'Return to homepage',
    },
    {
      icon: ShoppingBag,
      label: t('nav', 'shop') || 'Shop',
      path: '/shop',
      description: 'Browse our products',
    },
    {
      icon: Sparkle,
      label: t('nav', 'systems') || 'System Finder',
      path: '/bundle',
      description: 'Find your perfect match',
    },
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={fontSerif}
          className={`text-[120px] md:text-[180px] leading-none italic font-light mb-6 ${
            darkMode ? 'text-purple-500/20' : 'text-purple-300/40'
          }`}
        >
          404
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={fontSerif}
          className={`text-4xl md:text-5xl italic mb-4 ${textMain}`}
        >
          Page not found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={fontSans}
          className={`text-lg mb-12 max-w-xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {quickLinks.map(({ icon: Icon, label, path, description }, index) => (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`p-6 rounded-2xl border-2 transition-all ${
                darkMode
                  ? 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'
                  : 'border-purple-100 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
                }`}
              >
                <Icon
                  size={20}
                  className={darkMode ? 'text-purple-400' : 'text-purple-600'}
                />
              </div>
              <h3 style={fontSerif} className={`text-lg italic mb-1 ${textMain}`}>
                {label}
              </h3>
              <p
                className={`text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
            darkMode
              ? 'text-purple-400 hover:text-purple-300'
              : 'text-purple-600 hover:text-purple-700'
          }`}
        >
          <ArrowLeft size={16} />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
}
