import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Camera,
  Coffee,
  Laptop,
  Zap,
  Home,
  Utensils,
  Target,
  Instagram,
  Video,
  ShoppingBag,
  Plus,
} from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-50' },
  { name: 'TikTok', icon: Video, color: 'text-black dark:text-white', bg: 'bg-gray-100 dark:bg-white/10' },
  { name: 'Etsy Shop', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Bald verfügbar', icon: Plus, color: 'text-gray-400', bg: 'bg-gray-50 dark:bg-white/5' },
];

const DREAMS = [
  { t: 'The Modern Gård', desc: 'Minimalismus im Wald.', icon: Home },
  { t: 'Smultron Café', desc: 'Kaffee & echte Gespräche.', icon: Utensils },
  { t: 'Roots Fitness', desc: 'Kraft tanken in der Natur.', icon: Target },
  { t: 'Northern Focus', desc: 'Stille Workation.', icon: Laptop },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { darkMode, cardBg, borderColor } = useTheme();

  const linkButtonStyle = `text-[10px] uppercase tracking-[0.4em] font-bold border-b pb-2 transition-all flex items-center gap-2 group cursor-pointer ${
    darkMode
      ? 'text-purple-300 border-purple-800 hover:text-white'
      : 'text-purple-700 border-purple-100 hover:text-purple-400'
  }`;

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 py-16 md:py-20 animate-in fade-in duration-1000">
      {/* Header */}
      <header className="text-center mb-20 md:mb-28">
        <div
          style={fontSans}
          className={`inline-block px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 mx-auto ${
            darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-50 text-purple-600'
          }`}
        >
          Von Berlin nach Borås
        </div>
        <h2 style={fontSerif} className="text-5xl md:text-6xl italic leading-tight text-center">
          Hinter den <span className="text-purple-600">Linien</span>.
        </h2>
      </header>

      {/* Story + Image */}
      <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start mb-28 md:mb-36 text-left">
        <div
          style={fontSans}
          className={`space-y-8 leading-relaxed text-base md:text-lg font-light text-left ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <div className="space-y-7 text-left">
            <h3 style={fontSerif} className="text-2xl md:text-3xl text-purple-600 italic">
              Warum wir nicht mehr rennen.
            </h3>
            <p>
              In Berlin hatten wir eigentlich alles, was man zum „Glücklichsein" braucht. Aber wir
              fühlten uns seltsam leer.
            </p>
            <p>
              Es geht nicht darum, dass wir &quot;es geschafft&quot; hatten und uns nun auf einem
              Bauernhof ausruhen. Ganz im Gegenteil. Wir haben gemerkt, dass wir Teil eines Systems
              waren, das uns belohnt hat, je schneller wir liefen – und uns bestraft hat, wenn wir
              atmen wollten.
            </p>
            <p>
              Diese Leere, die man am Sonntagabend spürt, wenn man an den Montag denkt? Die kennen
              wir. Und wir wissen: Ein neuer Planer löst das Problem nicht, wenn er nur dazu dient,
              noch mehr Aufgaben zu verwalten.
            </p>
            <p className="font-medium text-purple-600 italic">
              Wir bauen Purple Planning nicht für die Produktivität. Wir bauen es für die Identität.
              Wer bist du, wenn du nicht arbeitest?
            </p>
            <div
              className={`p-7 rounded-2xl border mt-10 ${
                darkMode
                  ? 'bg-purple-900/20 border-purple-800/40'
                  : 'bg-purple-50/40 border-purple-100/60'
              }`}
            >
              <p
                className={`italic text-sm mb-5 leading-relaxed ${
                  darkMode ? 'text-purple-300' : 'text-purple-900'
                }`}
              >
                Möchtest du mehr über unseren Weg aus dem Hamsterrad erfahren? Lies unsere ganz
                persönlichen Geschichten.
              </p>
              <button onClick={() => navigate('/blog')} className={linkButtonStyle}>
                Zum Blog <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="relative pt-8 md:pt-12">
          <div className="aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl grayscale-[10%]">
            <img
              src={getImg('1517842645767-c639042777db')}
              className="w-full h-full object-cover"
              alt="Studio Workspace"
            />
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-28 md:mb-36">
        {[
          {
            name: 'Michelle',
            icon: Camera,
            accentIcon: Coffee,
            quote:
              '„Früher habe ich versucht, 48 Stunden in 24 zu quetschen. Heute gestalte ich Seiten, die dir erlauben, auch mal nichts zu tun."',
          },
          {
            name: 'Eric',
            icon: Laptop,
            accentIcon: Zap,
            quote:
              '„Zahlen waren meine Welt. Jetzt zähle ich lieber Momente. Ich sorge dafür, dass unsere Technik dir dient, nicht umgekehrt."',
          },
        ].map((person) => {
          const Icon = person.icon;
          const AccentIcon = person.accentIcon;
          return (
            <div
              key={person.name}
              className={`card-hover-subtle p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border flex flex-col items-center text-center ${cardBg}`}
            >
              <div
                className={`aspect-square w-full rounded-2xl md:rounded-3xl mb-8 flex items-center justify-center ${
                  darkMode ? 'bg-white/[0.06] text-white/60' : 'bg-purple-50/60 text-purple-200'
                }`}
              >
                <Icon size={48} strokeWidth={1} />
              </div>
              <div
                className={`p-2.5 rounded-xl w-fit mb-5 text-purple-500 ${
                  darkMode ? 'bg-white/[0.06]' : 'bg-purple-50'
                }`}
              >
                <AccentIcon size={20} />
              </div>
              <h4 style={fontSerif} className="text-3xl mb-4 italic">
                {person.name}
              </h4>
              <p style={fontSans} className="text-sm opacity-50 italic leading-relaxed">
                {person.quote}
              </p>
            </div>
          );
        })}
      </div>

      {/* Social Media */}
      <div className="mb-28 md:mb-36">
        <h4 style={fontSerif} className="text-3xl italic mb-14 text-center">
          Verbinde dich
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {SOCIAL_LINKS.map((social, i) => {
            const Icon = social.icon;
            return (
              <div
                key={i}
                className={`card-hover-subtle p-7 rounded-[1.5rem] md:rounded-[2rem] border flex flex-col items-center justify-center gap-4 cursor-pointer ${cardBg}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${social.bg} ${social.color}`}
                >
                  <Icon size={24} />
                </div>
                <span style={fontSans} className="font-bold text-sm tracking-wide">
                  {social.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dreams */}
      <div className={`pt-20 md:pt-28 border-t ${borderColor}`}>
        <h4 style={fontSerif} className="text-3xl italic mb-14 text-center">
          Was wir noch träumen
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {DREAMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`card-hover-subtle p-6 rounded-[1.5rem] border flex flex-col justify-between aspect-square group text-left ${cardBg}`}
              >
                <div
                  className={`p-2.5 rounded-xl w-fit text-purple-500 ${
                    darkMode ? 'bg-white/[0.06]' : 'bg-purple-50/80'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="text-left mt-2">
                  <h5 style={fontSerif} className="text-lg italic mb-1.5 leading-tight">
                    {p.t}
                  </h5>
                  <p
                    style={fontSans}
                    className="text-[10px] opacity-50 leading-tight font-light mt-1"
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
