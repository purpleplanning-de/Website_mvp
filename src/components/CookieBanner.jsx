import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fontSans } from '../data/styles';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useCookieConsent } from '../hooks/useCookieConsent';

export default function CookieBanner() {
  const { bannerVisible, acceptAll, acceptNecessary, updateConsent } = useCookieConsent();
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!bannerVisible) return null;

  const handleSaveSettings = () => {
    updateConsent({ analytics, marketing });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={fontSans}
        className={`fixed bottom-0 left-0 right-0 z-[500] p-4 md:p-6 ${
          darkMode ? 'bg-[#2e1d46]/95' : 'bg-white/95'
        } backdrop-blur-xl border-t ${
          darkMode ? 'border-white/10' : 'border-purple-100'
        } shadow-2xl`}
      >
        <div className="max-w-5xl mx-auto">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">
                  {t('cookie', 'title')}
                </p>
                <p className={`text-xs ${darkMode ? 'text-purple-300/70' : 'text-gray-500'}`}>
                  {t('cookie', 'description')}{' '}
                  <button
                    onClick={() => navigate('/datenschutz')}
                    className="underline hover:text-purple-500 transition-colors"
                  >
                    {t('cookie', 'privacyLink')}
                  </button>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    darkMode
                      ? 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                      : 'border-purple-200 hover:border-purple-300 text-purple-600'
                  }`}
                >
                  {t('cookie', 'settings')}
                </button>
                <button
                  onClick={acceptNecessary}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    darkMode
                      ? 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                      : 'border-purple-200 hover:border-purple-300 text-purple-600'
                  }`}
                >
                  {t('cookie', 'declineOptional')}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-lg shadow-purple-500/20"
                >
                  {t('cookie', 'acceptAll')}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium mb-4">
                {t('cookie', 'settingsTitle')}
              </p>
              <div className="space-y-3 mb-5">
                <CookieCategory
                  label={t('cookie', 'necessary')}
                  description={t('cookie', 'necessaryDesc')}
                  checked={true}
                  disabled={true}
                  darkMode={darkMode}
                />
                <CookieCategory
                  label={t('cookie', 'analytics')}
                  description={t('cookie', 'analyticsDesc')}
                  checked={analytics}
                  onChange={setAnalytics}
                  darkMode={darkMode}
                />
                <CookieCategory
                  label={t('cookie', 'marketing')}
                  description={t('cookie', 'marketingDesc')}
                  checked={marketing}
                  onChange={setMarketing}
                  darkMode={darkMode}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    darkMode
                      ? 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                      : 'border-purple-200 hover:border-purple-300 text-purple-600'
                  }`}
                >
                  {t('cookie', 'back')}
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-lg shadow-purple-500/20"
                >
                  {t('cookie', 'saveSettings')}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CookieCategory({ label, description, checked, disabled, onChange, darkMode }) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
        darkMode ? 'hover:bg-white/5' : 'hover:bg-purple-50/50'
      } ${disabled ? 'opacity-70 cursor-default' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        className="mt-0.5 w-4 h-4 rounded accent-purple-600"
      />
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        <p className={`text-xs mt-0.5 ${darkMode ? 'text-purple-300/60' : 'text-gray-400'}`}>
          {description}
        </p>
      </div>
    </label>
  );
}
