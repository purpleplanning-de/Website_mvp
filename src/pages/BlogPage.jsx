import { Calendar } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';

const POSTS = [
  {
    date: '12. Januar 2025',
    title: 'Der Tag, an dem wir "Stopp" sagten',
    preview:
      'Es war ein Dienstag. Grau, nass, Berlin. Der Kalender war voll, aber das Herz war leer. Warum es Mut braucht, alles stehen und liegen zu lassen.',
    img: '1470071459604-3b5ec3a7fe05',
  },
  {
    date: '03. Februar 2025',
    title: 'Stille hören lernen',
    preview:
      'Die ersten Nächte in Borås waren beängstigend. Keine Sirenen, keine Autos. Nur Wind. Wie wir lernten, die Ruhe nicht als Leere zu empfinden.',
    img: '1448375240586-dfd8d395ea6c',
  },
  {
    date: '15. März 2025',
    title: 'Renovieren als Therapie',
    preview:
      'Wände einreißen hat etwas Befreiendes. Jeder Pinselstrich deckt nicht nur alte Farbe zu, sondern auch alte Gewohnheiten.',
    img: '1505330622279-bf7d7fc3874d',
  },
  {
    date: '02. April 2025',
    title: 'Digitaler Minimalismus',
    preview:
      'Warum wir wieder Papier nutzen. Die Haptik des Schreibens als Anker in einer flüchtigen Welt.',
    img: '1517842645767-c639042777db',
  },
];

export default function BlogPage() {
  const { darkMode } = useTheme();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <header className="text-center mb-20 mt-8">
        <div
          style={fontSans}
          className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 ${
            darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-50 text-purple-600'
          }`}
        >
          Tagebuch aus dem Wald
        </div>
        <h2 style={fontSerif} className="text-6xl italic leading-tight">
          Unsere Reise
          <br />
          <span className="text-purple-600">ungeschminkt</span>.
        </h2>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        {POSTS.map((post, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] mb-6 shadow-md border border-gray-100 relative">
              <img
                src={getImg(post.img)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={post.title}
              />
              <div
                className={`absolute inset-0 ${
                  darkMode
                    ? 'bg-black/20 group-hover:bg-transparent'
                    : 'bg-purple-900/0 group-hover:bg-purple-900/10'
                } transition-colors`}
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-purple-500" />
              <span
                style={fontSans}
                className="text-xs font-bold tracking-widest uppercase opacity-60"
              >
                {post.date}
              </span>
            </div>
            <h3
              style={fontSerif}
              className="text-3xl italic mb-3 group-hover:text-purple-600 transition-colors leading-tight"
            >
              {post.title}
            </h3>
            <p style={fontSans} className="opacity-60 font-light leading-relaxed mb-4">
              {post.preview}
            </p>
            <button className="text-purple-600 font-bold text-xs uppercase tracking-widest border-b border-purple-500/30 pb-1 group-hover:border-purple-500 transition-all">
              Weiterlesen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
