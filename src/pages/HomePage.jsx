import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Sparkle, Compass } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { products, getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';

const MANIFEST_CARDS = [
  {
    title: 'Du leistest genug.',
    text: "Unsere Planer sind keine Peitschen. Sie sind Anker. Erlaube dir, stolz auf das 'Sein' zu sein.",
    icon: Target,
    persona: 'Für die High-Performerin',
  },
  {
    title: 'Dein Leben ist Kunst.',
    text: 'Funktionalität muss nicht hässlich sein. Dein Planer ist ein Accessoire deiner Identität.',
    icon: Sparkle,
    persona: 'Für die Ästhetin',
  },
  {
    title: 'Ruhe im Kopf.',
    text: 'Du brauchst keine bunten Blümchen. Du brauchst ein System so klar wie ein Wintermorgen.',
    icon: Compass,
    persona: 'Für den Klarheits-Sucher',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { darkMode, textMain, textMuted, cardBg } = useTheme();
  const { t } = useLanguage();

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
      <header className="max-w-4xl mx-auto px-8 text-center mt-10 md:mt-20 mb-14 md:mb-20">
        <div className="mb-10 md:mb-14">
          <p
            style={fontSerif}
            className={`text-xl md:text-2xl lg:text-3xl italic font-light leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-gray-500'
            }`}
          >
            {t('home', 'quote')}
          </p>
          <div className="mt-5 flex justify-center items-center gap-5">
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
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <img
            src={getImg('1464822759023-fed622ff2c3b')}
            className="w-full h-[320px] md:h-[520px] lg:h-[580px] object-cover transition-transform duration-[5s] group-hover:scale-105"
            alt="Hero Landschaft Schweden"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              darkMode ? 'from-[#1a0b2e]/80' : 'from-purple-950/20'
            } via-transparent to-transparent`}
          />
        </div>
      </section>

      {/* Pause Section */}
      <section className="max-w-2xl mx-auto px-8 text-center mb-28 md:mb-40">
        <h2
          style={fontSerif}
          className={`text-3xl md:text-5xl italic leading-tight mb-8 ${textMain}`}
        >
          {t('home', 'pause')}
        </h2>
        <p
          style={fontSans}
          className={`font-light text-base md:text-lg italic leading-relaxed mb-10 max-w-xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Hast du dich jemals gefragt, ob du dein Leben lebst oder ob dein Terminkalender dich
          lebt? Purple Planning ist die Einladung, dir den Raum zurückzuholen, den du verdienst.
        </p>
        <button onClick={() => navigate('/about')} className={linkButtonStyle}>
          Unsere persönliche Geschichte{' '}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Manifest Section */}
      <section
        className={`section-spacing mb-28 md:mb-40 ${
          darkMode ? 'bg-white/[0.02] border-y border-white/[0.04]' : 'bg-purple-50/30'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 style={fontSerif} className={`text-3xl md:text-5xl italic mb-5 ${textMain}`}>
              Nicht noch ein <span className="text-purple-600">To-Do.</span>
            </h2>
            <p
              className={`max-w-lg mx-auto text-base md:text-lg font-light ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Wir bauen Werkzeuge für deine Identität.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {MANIFEST_CARDS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`card-hover p-9 md:p-11 rounded-3xl md:rounded-[2rem] border cursor-default ${cardBg}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-7 ${
                      darkMode
                        ? 'bg-purple-900/40 text-purple-300'
                        : 'bg-purple-50 text-purple-500'
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 style={fontSerif} className="text-xl md:text-2xl italic mb-4">
                    {item.title}
                  </h3>
                  <p
                    className={`font-light leading-relaxed mb-7 text-sm md:text-[15px] ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {item.text}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500/80">
                    {item.persona}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-16 md:mt-20">
            <button
              onClick={() => navigate('/bundle')}
              className={actionButtonStyle}
            >
              Finde dein System <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-6xl mx-auto px-8 md:px-12 pb-28 md:pb-40">
        <div className="text-center mb-16 md:mb-20">
          <h3 style={fontSerif} className={`text-3xl md:text-4xl italic mb-4 ${textMain}`}>
            {t('home', 'popular')}
          </h3>
          <p
            className={`text-sm md:text-base font-light ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Die Favoriten unserer Community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 text-left">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-16 md:mt-20">
          <button onClick={() => navigate('/shop')} className={linkButtonStyle}>
            Alle Produkte ansehen{' '}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
