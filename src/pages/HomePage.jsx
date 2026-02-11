import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Sparkle, Compass } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { products, getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';

const MANIFEST_ICONS = [Target, Sparkle, Compass];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function HomePage() {
  const navigate = useNavigate();
  const { darkMode, textMain, textMuted, cardBg } = useTheme();
  const { t } = useLanguage();

  const manifestCards = t('home', 'manifestCards');

  const linkButtonStyle = `text-[11px] uppercase tracking-[0.3em] font-semibold border-b pb-2 transition-all flex items-center gap-2 group mx-auto justify-center cursor-pointer ${
    darkMode
      ? 'text-purple-300 border-purple-700 hover:text-white hover:border-purple-400'
      : 'text-purple-600 border-purple-200 hover:text-purple-800 hover:border-purple-400'
  }`;

  const actionButtonStyle =
    'bg-purple-600 text-white py-4 md:py-5 px-10 md:px-14 rounded-2xl font-bold shadow-lg hover:bg-purple-700 hover:shadow-xl active:scale-[0.98] transition-all text-center inline-flex items-center gap-2 cursor-pointer text-sm md:text-base';

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Quote */}
      <header className="max-w-4xl mx-auto px-6 md:px-8 text-center mt-20 md:mt-32 mb-20 md:mb-28">
        <div className="mb-14 md:mb-20">
          <p
            style={fontSerif}
            className={`text-lg md:text-xl lg:text-2xl italic font-light leading-relaxed ${
              darkMode ? 'text-white/50' : 'text-gray-400'
            }`}
          >
            {t('home', 'quote')}
          </p>
          <div className="mt-6 flex justify-center items-center gap-5">
            <div className={`h-px w-12 ${darkMode ? 'bg-white/10' : 'bg-purple-200/50'}`} />
            <p
              style={fontSans}
              className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-35"
            >
              Antoine de Saint-Exupéry
            </p>
            <div className={`h-px w-12 ${darkMode ? 'bg-white/10' : 'bg-purple-200/50'}`} />
          </div>
        </div>
        <h1
          style={fontSerif}
          className={`text-5xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight ${textMain}`}
        >
          {t('home', 'hero')[0]} <br />
          <span className={`${textMuted} italic`}>{t('home', 'hero')[1]}</span>
        </h1>
      </header>

      {/* Hero Image */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-32 md:mb-48">
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <img
            src={getImg('1464822759023-fed622ff2c3b')}
            loading="eager"
            className="w-full h-[320px] md:h-[520px] lg:h-[580px] object-cover transition-transform duration-[5s] group-hover:scale-105"
            alt="Hero planning workspace with purple planner"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              darkMode ? 'from-[#1a0b2e]/80' : 'from-purple-950/20'
            } via-transparent to-transparent`}
          />
        </div>
      </section>

      {/* Pause Section */}
      <section className="max-w-3xl mx-auto px-6 md:px-8 text-center mb-32 md:mb-48">
        <h2
          style={fontSerif}
          className={`text-4xl md:text-5xl italic leading-tight mb-6 ${textMain}`}
        >
          {t('home', 'pause')}
        </h2>
        <p
          style={fontSans}
          className={`font-light text-base md:text-lg italic leading-relaxed mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {t('home', 'pauseText')}
        </p>
        <button onClick={() => navigate('/about')} className={linkButtonStyle}>
          {t('home', 'pauseLink')}{' '}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Manifest Section */}
      <section
        className={`section-spacing mb-32 md:mb-48 ${
          darkMode ? 'bg-white/[0.02] border-y border-white/[0.04]' : 'bg-purple-50/30'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-20 md:mb-24">
            <h2 style={fontSerif} className={`text-4xl md:text-5xl italic mb-6 ${textMain}`}>
              {t('home', 'manifestTitle')} <span className="text-purple-600">{t('home', 'manifestTodo')}</span>
            </h2>
            <p
              className={`max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {t('home', 'manifestSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-24">
            {manifestCards.map((item, i) => {
              const Icon = MANIFEST_ICONS[i];
              return (
                <div
                  key={i}
                  className={`card-hover p-8 md:p-10 rounded-3xl md:rounded-[2rem] border cursor-default text-center ${cardBg}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto ${
                      darkMode
                        ? 'bg-purple-900/40 text-purple-300'
                        : 'bg-purple-50 text-purple-500'
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 style={fontSerif} className={`text-2xl md:text-2xl italic mb-4 ${textMain}`}>
                    {item.title}
                  </h3>
                  <p
                    className={`font-light leading-relaxed mb-6 text-sm md:text-[15px] ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {item.text}
                  </p>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${darkMode ? 'text-purple-400/70' : 'text-purple-500/70'}`}>
                    {item.persona}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate('/bundle')}
              className={actionButtonStyle}
            >
              {t('home', 'findSystem')} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pb-32 md:pb-48">
        <div className="text-center mb-20 md:mb-24">
          <h3 style={fontSerif} className={`text-4xl md:text-5xl italic mb-5 ${textMain}`}>
            {t('home', 'popular')}
          </h3>
          <p
            className={`text-base md:text-lg font-light ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {t('home', 'popularSubtitle')}
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {products.slice(0, 3).map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-20 md:mt-24">
          <button onClick={() => navigate('/shop')} className={linkButtonStyle}>
            {t('home', 'viewAll')}{' '}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
