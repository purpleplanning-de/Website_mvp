import { Laptop, BookOpen } from 'lucide-react';
import { fontSerif } from '../data/styles';
import { useTheme } from '../hooks/useTheme';

export default function RoadmapPage() {
  const { darkMode, cardBg, borderColor } = useTheme();

  return (
    <div className="max-w-5xl mx-auto px-8 md:px-12 py-20 md:py-28 animate-in fade-in text-left">
      <header className="text-center mb-20 md:mb-28">
        <h2 style={fontSerif} className="text-5xl md:text-6xl mb-7 italic">
          Der Pfad nach Morgen
        </h2>
        <p className="opacity-50 font-light max-w-2xl mx-auto text-base md:text-lg">
          Wir sind noch lange nicht fertig. Purple Planning wächst mit dir. Hier siehst du, woran
          wir in unserer Hütte in Borås gerade arbeiten.
        </p>
      </header>

      <div className={`relative border-l-2 ml-6 md:ml-12 space-y-20 ${borderColor}`}>
        {/* Q2 */}
        <div className="relative pl-12 md:pl-20">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100" />
          <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-3 block">
            Kurzfristig (Q2 2026)
          </span>
          <h3 style={fontSerif} className="text-2xl md:text-3xl italic mb-6">
            Deep Work Dashboard (Notion)
          </h3>
          <div className={`p-8 md:p-10 rounded-[2rem] border md:flex gap-8 items-start ${cardBg}`}>
            <div
              className={`p-4 rounded-2xl text-purple-500 mb-5 md:mb-0 shrink-0 ${
                darkMode ? 'bg-white/[0.06]' : 'bg-purple-50'
              }`}
            >
              <Laptop size={28} />
            </div>
            <div>
              <p className="opacity-60 leading-relaxed mb-5 text-sm md:text-base">
                Viele von euch nutzen Notion für die Arbeit. Wir bringen die &quot;Purple
                Aesthetics&quot; auf euren Desktop. Ein Template für Freelancer und High-Performer.
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  darkMode ? 'bg-white/[0.06] text-purple-300' : 'bg-purple-50 text-purple-600'
                }`}
              >
                In Entwicklung
              </span>
            </div>
          </div>
        </div>

        {/* Q3 */}
        <div className="relative pl-12 md:pl-20">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-purple-300" />
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-3 block">
            Mittelfristig (Q3 2026)
          </span>
          <h3 style={fontSerif} className="text-2xl md:text-3xl italic text-gray-400 mb-6">
            Saisonale Reflexions-Guides
          </h3>
          <div
            className={`p-8 md:p-10 rounded-[2rem] border md:flex gap-8 items-start opacity-60 ${cardBg}`}
          >
            <div
              className={`p-4 rounded-2xl text-purple-500 mb-5 md:mb-0 shrink-0 ${
                darkMode ? 'bg-white/[0.06]' : 'bg-purple-50'
              }`}
            >
              <BookOpen size={28} />
            </div>
            <div>
              <p className="opacity-60 leading-relaxed mb-5 text-sm md:text-base">
                Ein Abo-Modell für die Seele. Jedes Quartal ein neues Workbook.
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  darkMode ? 'bg-white/[0.06] text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}
              >
                Konzeptphase
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
