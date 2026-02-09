import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Moon, Sun, Globe, Map } from 'lucide-react';
import { fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { useScrolled } from '../../hooks/useScrolled';

const NAV_LINKS = [
  { path: '/shop', key: 'shop' },
  { path: '/bundle', key: 'systems' },
  { path: '/about', key: 'about' },
  { path: '/blog', key: 'blog' },
];

const LANGUAGES = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'se', label: 'Svenska' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrolled = useScrolled();
  const { darkMode, toggle, textMuted } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { setIsCartOpen, totals } = useCart();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const logoStyle = `text-3xl font-bold italic cursor-pointer inline-block tracking-tight ${
    darkMode ? 'text-white' : 'text-purple-700'
  }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? darkMode
            ? 'bg-[#1a0b2e]/95 border-b border-white/10'
            : 'bg-white/95 shadow-sm'
          : 'bg-transparent'
      } backdrop-blur-lg py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left nav links */}
        <div className="hidden md:flex items-center space-x-10 flex-1">
          {NAV_LINKS.map(({ path, key }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${
                location.pathname === path ? textMuted : `hover:${textMuted}`
              }`}
            >
              {t('nav', key)}
            </button>
          ))}
        </div>

        {/* Logo */}
        <div className="flex-1 text-center">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Purple Planning"
            onClick={() => navigate('/')}
            className="h-12 cursor-pointer inline-block hover:scale-105 transition-transform"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-6 flex-1 justify-end">
          {/* Settings Group */}
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/10 rounded-full px-2 py-1">
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-white/20 transition-all"
            >
              {darkMode ? (
                <Sun size={16} className="text-yellow-300" />
              ) : (
                <Moon size={16} className="text-purple-900" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 p-2 rounded-full hover:bg-white/20 transition-all text-xs font-bold uppercase"
              >
                <Globe size={16} className={darkMode ? 'text-white' : 'text-black'} />
                {language}
              </button>

              {isLangMenuOpen && (
                <div
                  className={`absolute top-full right-0 mt-2 py-2 rounded-xl shadow-xl border ${
                    darkMode
                      ? 'bg-[#2e1d46] border-white/10'
                      : 'bg-white border-purple-100'
                  } min-w-[100px] flex flex-col overflow-hidden animate-in slide-in-from-top-2`}
                >
                  {LANGUAGES.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`text-left px-4 py-2 text-xs font-bold uppercase hover:bg-purple-500 hover:text-white transition-colors ${
                        language === code
                          ? 'text-purple-500'
                          : darkMode
                            ? 'text-white'
                            : 'text-black'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate('/roadmap')}
            className={`transition-colors ${
              location.pathname === '/roadmap'
                ? 'text-purple-500'
                : 'hover:text-purple-500'
            }`}
          >
            <Map size={20} />
          </button>

          <button
            onClick={() => navigate('/profile')}
            className={`transition-colors ${
              location.pathname === '/profile'
                ? 'text-purple-500'
                : 'hover:text-purple-500'
            }`}
          >
            <User size={20} />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-purple-500 transition-colors"
          >
            <ShoppingCart size={20} />
            {totals.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totals.count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
