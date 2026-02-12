import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Moon, Sun, Globe, Map, Menu, X } from 'lucide-react';
import { fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';

const NAV_LINKS = [
  { path: '/shop', key: 'shop' },
  { path: '/bundle', key: 'systems' },
  { path: '/about', key: 'about' },
  { path: '/blog', key: 'blog' },
  { path: '/contact', key: 'contact' },
];

const LANGUAGES = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'se', label: 'Svenska' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggle } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { setIsCartOpen, totals } = useCart();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const navTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isLangMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen, isLangMenuOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, isLangMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main Navbar - Fixed at top */}
      <nav
        className={`fixed top-0 left-0 right-0 h-20 z-50 ${
          darkMode
            ? 'bg-[#1a0b2e]/95 border-b border-white/10'
            : 'bg-white/95 shadow-sm'
        } backdrop-blur-lg`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12">
          {/* Grid Layout: Left | Center | Right */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 h-full items-center">

            {/* LEFT: Navigation Links (Desktop) */}
            <div className="justify-self-start">
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map(({ path, key }) => (
                  <button
                    key={path}
                    onClick={() => navTo(path)}
                    style={fontSans}
                    className={`text-xs font-semibold tracking-wide uppercase transition-colors relative ${
                      location.pathname === path
                        ? 'text-purple-600'
                        : darkMode
                          ? 'text-white/60 hover:text-white'
                          : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {t('nav', key)}
                    {location.pathname === path && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile: Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? t('nav', 'closeMenu') : t('nav', 'openMenu')}
                className="md:hidden p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* CENTER: Logo */}
            <div className="justify-self-center">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Purple Planning"
                onClick={() => navTo('/')}
                className="h-14 sm:h-16 cursor-pointer hover:scale-105 transition-transform"
              />
            </div>

            {/* RIGHT: Icons & Actions */}
            <div className="justify-self-end">
              <div className="flex items-center gap-2">

                {/* Theme & Language (Desktop) */}
                <div className="hidden sm:flex items-center gap-1 bg-gray-100/80 dark:bg-white/5 rounded-full px-2 py-1.5">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggle}
                    aria-label={darkMode ? t('nav', 'switchToLightMode') : t('nav', 'switchToDarkMode')}
                    className="p-3 rounded-full hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    {darkMode ? (
                      <Sun size={18} className="text-yellow-300" />
                    ) : (
                      <Moon size={18} className="text-gray-500" />
                    )}
                  </button>

                  {/* Language Selector */}
                  <div className="relative" ref={langMenuRef}>
                    <button
                      onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                      aria-label={t('nav', 'changeLanguage')}
                      aria-expanded={isLangMenuOpen}
                      className={`flex items-center gap-1.5 px-3 py-3 rounded-full hover:bg-white/20 transition-colors text-xs font-bold uppercase min-w-[44px] min-h-[44px] ${
                        darkMode ? 'text-white/60' : 'text-gray-500'
                      }`}
                    >
                      <Globe size={16} />
                      {language}
                    </button>

                    {/* Language Dropdown */}
                    {isLangMenuOpen && (
                      <div
                        role="menu"
                        className={`absolute top-full right-0 mt-2 py-2 rounded-xl shadow-xl border min-w-[120px] z-50 ${
                          darkMode
                            ? 'bg-[#2e1d46] border-white/10'
                            : 'bg-white border-gray-100'
                        }`}
                      >
                        {LANGUAGES.map(({ code, label }) => (
                          <button
                            key={code}
                            onClick={() => {
                              setLanguage(code);
                              setIsLangMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-purple-500 hover:text-white transition-colors ${
                              language === code
                                ? 'text-purple-500'
                                : darkMode
                                  ? 'text-white/70'
                                  : 'text-gray-600'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Roadmap Icon (Desktop) */}
                <button
                  onClick={() => navTo('/roadmap')}
                  aria-label={t('nav', 'roadmap')}
                  className={`hidden sm:flex items-center justify-center p-3 rounded-full transition-colors min-w-[44px] min-h-[44px] ${
                    location.pathname === '/roadmap'
                      ? 'text-purple-500'
                      : darkMode
                        ? 'text-white/40 hover:text-white'
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <Map size={20} />
                </button>

                {/* Profile Icon */}
                <button
                  onClick={() => navTo('/profile')}
                  aria-label={t('nav', 'profile')}
                  className={`p-3 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                    location.pathname === '/profile'
                      ? 'text-purple-500'
                      : darkMode
                        ? 'text-white/40 hover:text-white'
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <User size={20} />
                </button>

                {/* Shopping Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label={t('nav', 'cart')}
                  className={`relative p-3 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                    darkMode
                      ? 'text-white/40 hover:text-white'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {totals.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs min-w-[20px] min-h-[20px] rounded-full flex items-center justify-center font-bold">
                      {totals.count}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Appears BELOW navbar */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={`fixed top-20 left-0 right-0 bottom-0 z-40 ${
            darkMode ? 'bg-[#1a0b2e]/98' : 'bg-white/98'
          } backdrop-blur-xl animate-in fade-in`}
        >
          <div className="flex flex-col items-center justify-center gap-8 pt-16">
            {/* Mobile Nav Links */}
            {NAV_LINKS.map(({ path, key }) => (
              <button
                key={path}
                onClick={() => navTo(path)}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  location.pathname === path
                    ? 'text-purple-600 font-semibold'
                    : darkMode
                      ? 'text-white/70 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('nav', key)}
              </button>
            ))}

            {/* Mobile Bottom Actions */}
            <div className="flex items-center gap-4 pt-8 mt-8 border-t border-white/10">
              {/* Theme Toggle */}
              <button
                onClick={toggle}
                aria-label={darkMode ? t('nav', 'switchToLightMode') : t('nav', 'switchToDarkMode')}
                className="p-4 rounded-full hover:bg-white/10 transition-colors"
              >
                {darkMode ? <Sun size={22} className="text-yellow-300" /> : <Moon size={22} />}
              </button>

              {/* Language Selector */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  aria-label={t('nav', 'changeLanguage')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full hover:bg-white/10 transition-colors text-sm font-bold uppercase ${
                    darkMode ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  <Globe size={18} />
                  {language}
                </button>

                {isLangMenuOpen && (
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 py-2 rounded-xl shadow-xl border min-w-[120px] ${
                      darkMode
                        ? 'bg-[#2e1d46] border-white/10'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    {LANGUAGES.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-purple-500 hover:text-white transition-colors ${
                          language === code
                            ? 'text-purple-500'
                            : darkMode
                              ? 'text-white/70'
                              : 'text-gray-600'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Roadmap */}
              <button
                onClick={() => navTo('/roadmap')}
                aria-label={t('nav', 'roadmap')}
                className={`p-4 rounded-full hover:bg-white/10 transition-colors ${
                  location.pathname === '/roadmap' ? 'text-purple-500' : ''
                }`}
              >
                <Map size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
