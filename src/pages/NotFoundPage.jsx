import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ArrowLeft, Sparkle, BookOpen, Mail } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import SEO from '../components/SEO';

const QUICK_LINKS = [
  { icon: Home, labelKey: 'linkHome', descKey: 'linkHomeDesc', path: '/' },
  { icon: ShoppingBag, labelKey: 'linkShop', descKey: 'linkShopDesc', path: '/shop' },
  { icon: Sparkle, labelKey: 'linkBundle', descKey: 'linkBundleDesc', path: '/bundle' },
  { icon: BookOpen, labelKey: 'linkBlog', descKey: 'linkBlogDesc', path: '/blog' },
  { icon: Mail, labelKey: 'linkContact', descKey: 'linkContactDesc', path: '/contact' },
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { darkMode, textMain, cardBg } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={`404 - ${t('notFound', 'seoTitle')}`}
        description={t('notFound', 'seoDescription')}
      />
      <div className="min-h-[75vh] flex items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full text-center"
        >
          {/* 404 Number with Purple Gradient */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            style={fontSerif}
            className="relative mb-8"
          >
            <div
              className={`text-[140px] md:text-[220px] leading-none italic font-light ${
                darkMode ? 'text-purple-500/15' : 'text-purple-200/50'
              }`}
            >
              404
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${
                darkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
              } blur-3xl`}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={fontSerif}
            className={`text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 ${textMain}`}
          >
            {t('notFound', 'title')}{' '}
            <span className="text-purple-600 italic">{t('notFound', 'titleAccent')}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={fontSans}
            className={`text-base md:text-lg font-light leading-relaxed mb-14 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t('notFound', 'description')}
          </motion.p>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            {QUICK_LINKS.map(({ icon: Icon, labelKey, descKey, path }, index) => (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 rounded-2xl border-2 transition-all ${cardBg} ${
                  darkMode
                    ? 'border-white/10 hover:border-purple-500/40 hover:bg-white/5'
                    : 'border-purple-100 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                    darkMode
                      ? 'bg-purple-900/30 text-purple-400'
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3
                  style={fontSerif}
                  className={`text-base md:text-lg italic mb-1 leading-tight ${textMain}`}
                >
                  {t('notFound', labelKey)}
                </h3>
                <p
                  className={`text-xs leading-tight hidden md:block ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {t('notFound', descKey)}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all border-b-2 pb-2 group ${
              darkMode
                ? 'text-purple-300 border-purple-800 hover:text-white hover:border-purple-500'
                : 'text-purple-600 border-purple-200 hover:text-purple-800 hover:border-purple-400'
            }`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t('notFound', 'back')}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
