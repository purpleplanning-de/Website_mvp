import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Moon, Sun, Globe, Map, Menu, X } from 'lucide-react';
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
  const { darkMode, toggle } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { setIsCartOpen, totals } = useCart();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? 'bg-[#1a0b2e]/95 border-b border-white/10'
              : 'bg-white/95 shadow-sm'
            : 'bg-transparent'
        } backdrop-blur-lg`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left nav links — desktop */}
          <div className="hidden md:flex items-center gap-10 flex-1">
            {NAV_LINKS.map(({ path, key }) => (
              <button
                key={path}
                onClick={() => navTo(path)}
                style={fontSans}
                className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors relative pb-1 ${
                  location.pathname === path
                    ? 'text-purple-600'
                    : darkMode
                      ? 'text-white/60 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t('nav', key)}
                {location.pathname === path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Purple Planning"
              onClick={() => navTo('/')}
              className="h-14 cursor-pointer hover:scale-105 transition-transform drop-shadow-sm"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div
              className={`hidden sm:flex items-center gap-1 rounded-full px-2 py-1.5 ${
                darkMode ? 'bg-white/5' : 'bg-gray-100/80'
              }`}
            >
              <button
                onClick={toggle}
                className="p-1.5 rounded-full hover:bg-white/20 transition-all"
              >
                {darkMode ? (
                  <Sun size={15} className="text-yellow-300" />
                ) : (
                  <Moon size={15} className="text-gray-500" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-1 p-1.5 rounded-full hover:bg-white/20 transition-all text-[11px] font-bold uppercase ${
                    darkMode ? 'text-white/60' : 'text-gray-500'
                  }`}
                >
                  <Globe size={14} />
                  {language}
                </button>

                {isLangMenuOpen && (
                  <div
                    className={`absolute top-full right-0 mt-2 py-2 rounded-xl shadow-xl border ${
                      darkMode
                        ? 'bg-[#2e1d46] border-white/10'
                        : 'bg-white border-gray-100'
                    } min-w-[120px] flex flex-col overflow-hidden animate-in slide-in-from-top-2`}
                  >
                    {LANGUAGES.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`text-left px-4 py-2.5 text-xs font-semibold hover:bg-purple-500 hover:text-white transition-colors ${
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

            <button
              onClick={() => navTo('/roadmap')}
              className={`hidden sm:block p-2 rounded-full transition-colors ${
                location.pathname === '/roadmap'
                  ? 'text-purple-500'
                  : darkMode
                    ? 'text-white/40 hover:text-white'
                    : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <Map size={18} />
            </button>

            <button
              onClick={() => navTo('/profile')}
              className={`p-2 rounded-full transition-colors ${
                location.pathname === '/profile'
                  ? 'text-purple-500'
                  : darkMode
                    ? 'text-white/40 hover:text-white'
                    : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <User size={18} />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${
                darkMode
                  ? 'text-white/40 hover:text-white'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <ShoppingCart size={18} />
              {totals.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-purple-600 text-white text-[9px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                  {totals.count}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 pt-20 ${
            darkMode ? 'bg-[#1a0b2e]/98' : 'bg-white/98'
          } backdrop-blur-xl animate-in fade-in`}
        >
          <div className="flex flex-col items-center gap-8 pt-12">
            {NAV_LINKS.map(({ path, key }) => (
              <button
                key={path}
                onClick={() => navTo(path)}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  location.pathname === path
                    ? 'text-purple-600'
                    : darkMode
                      ? 'text-white/70'
                      : 'text-gray-600'
                }`}
              >
                {t('nav', key)}
              </button>
            ))}
            <div className="flex gap-4 mt-8">
              <button onClick={toggle} className="p-3 rounded-full bg-purple-100 text-purple-600">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => navTo('/roadmap')} className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Map size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
