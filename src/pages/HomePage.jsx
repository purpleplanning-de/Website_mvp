import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Sparkle, Compass } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { products, getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ui/ProductCard';

const MANIFEST_CARDS = [
  {
    title: 'Du leistest genug.',
    text: 'Unsere Planer sind keine Peitschen. Sie sind Anker. Erlaube dir, stolz auf das \'Sein\' zu sein.',
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
  const { addToCart } = useCart();

  const linkButtonStyle = `text-[10px] uppercase tracking-[0.5em] font-bold border-b pb-2 transition-all flex items-center gap-2 group mx-auto justify-center cursor-pointer ${
    darkMode
      ? 'text-purple-300 border-purple-800 hover:text-white'
      : 'text-purple-700 border-purple-100 hover:text-purple-400'
  }`;

  const actionButtonStyle =
    'w-full bg-purple-600 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-purple-700 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer';

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Quote */}
      <header className="max-w-7xl mx-auto px-6 text-center mb-6 mt-12">
        <div className="mb-6">
          <p
            style={fontSerif}
            className={`text-2xl md:text-3xl italic font-light leading-relaxed ${textMain}`}
          >
            {t('home', 'quote')}
          </p>
          <div className="mt-4 flex justify-center items-center gap-4">
            <div className={`h-[0.5px] w-8 ${darkMode ? 'bg-white/20' : 'bg-black/20'}`} />
            <p
              style={fontSans}
              className={`text-[10px] uppercase tracking-[0.5em] font-bold opacity-60 text-center ${textMain}`}
            >
              Antoine de Saint-Exupéry
            </p>
            <div className={`h-[0.5px] w-8 ${darkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          </div>
        </div>
        <h1
          style={fontSerif}
          className={`text-5xl md:text-8xl mb-6 leading-tight tracking-tight text-center ${textMain}`}
        >
          {t('home', 'hero')[0]} <br />
          <span className={`${textMuted} italic`}>{t('home', 'hero')[1]}</span>
        </h1>
      </header>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <img
            src={getImg('1464822759023-fed622ff2c3b')}
            className="w-full h-[450px] object-cover transition-transform duration-[4s] group-hover:scale-105"
            alt="Hero Landschaft Schweden"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              darkMode ? 'from-[#1a0b2e]' : 'from-purple-950/40'
            } via-transparent to-transparent`}
          />
        </div>
      </section>

      {/* Pause Section */}
      <section className="max-w-3xl mx-auto px-6 py-4 text-center space-y-4 mb-12">
        <h2 style={fontSerif} className="text-4xl md:text-5xl italic leading-tight text-center">
          {t('home', 'pause')}
        </h2>
        <div
          style={fontSans}
          className={`space-y-4 font-light text-lg italic leading-relaxed text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <p>
            Hast du dich jemals gefragt, ob du dein Leben lebst oder ob dein Terminkalender dich
            lebt? Purple Planning ist die Einladung, dir den Raum zurückzuholen, den du verdienst.
          </p>
        </div>
        <button onClick={() => navigate('/about')} className={linkButtonStyle}>
          Unsere persönliche Geschichte{' '}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Manifest Section */}
      <section
        className={`py-16 mb-16 ${
          darkMode ? 'bg-white/5 border-y border-white/10' : 'bg-purple-50/50'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 style={fontSerif} className={`text-4xl md:text-5xl italic mb-4 ${textMain}`}>
              Nicht noch ein <span className="text-purple-600">To-Do.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-70">
              Wir bauen Werkzeuge für deine Identität.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MANIFEST_CARDS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`p-8 rounded-[2.5rem] border shadow-sm hover:-translate-y-2 transition-transform duration-500 cursor-default ${cardBg}`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                      darkMode
                        ? 'bg-purple-900/50 text-purple-300'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={fontSerif} className="text-2xl italic mb-4">
                    {item.title}
                  </h3>
                  <p className="opacity-70 font-light leading-relaxed mb-6">{item.text}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-500">
                    {item.persona}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/bundle')}
              className={`${actionButtonStyle} max-w-md mx-auto`}
            >
              Finde mehr Struktur <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="text-center mb-12">
          <h3 style={fontSerif} className="text-4xl italic mb-2 text-center">
            {t('home', 'popular')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-12">
          <button onClick={() => navigate('/shop')} className={linkButtonStyle}>
            Zum Shop{' '}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
