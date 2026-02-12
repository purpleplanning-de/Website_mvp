import { Calendar } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

const POST_IMAGES = [
  '1470071459604-3b5ec3a7fe05',
  '1448375240586-dfd8d395ea6c',
  '1505330622279-bf7d7fc3874d',
  '1517842645767-c639042777db',
];

export default function BlogPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  const posts = t('blog', 'posts');

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24 animate-in fade-in duration-700 pt-16">
      <header className="text-center mb-20 md:mb-28 mt-4 md:mt-8">
        <div
          style={fontSans}
          className={`inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 ${
            darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-50 text-purple-600'
          }`}
        >
          {t('blog', 'tagline')}
        </div>
        <h2 style={fontSerif} className="text-5xl md:text-6xl leading-tight">
          {t('blog', 'title')}
          <br />
          <span className="text-purple-600">{t('blog', 'titleAccent')}</span>.
        </h2>
      </header>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {posts.map((post, i) => (
          <div key={i} className="group cursor-pointer">
            <div
              className={`aspect-[4/3] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mb-7 relative ${
                darkMode ? 'border-white/[0.06]' : 'border-purple-100/40'
              } border`}
            >
              <img
                src={getImg(POST_IMAGES[i])}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={post.title}
              />
              <div
                className={`absolute inset-0 ${
                  darkMode
                    ? 'bg-black/20 group-hover:bg-transparent'
                    : 'bg-purple-900/0 group-hover:bg-purple-900/5'
                } transition-colors duration-500`}
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={13} className="text-purple-500/70" />
              <span
                style={fontSans}
                className="text-xs font-bold tracking-widest uppercase opacity-50"
              >
                {post.date}
              </span>
            </div>
            <h3
              style={fontSerif}
              className="text-2xl md:text-3xl italic mb-3 group-hover:text-purple-600 transition-colors duration-300 leading-tight"
            >
              {post.title}
            </h3>
            <p style={fontSans} className={`font-light leading-relaxed mb-5 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {post.preview}
            </p>
            <button className="text-purple-600 font-bold text-xs uppercase tracking-widest border-b border-purple-500/20 pb-1 group-hover:border-purple-500 transition-all">
              {t('blog', 'readMore')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
