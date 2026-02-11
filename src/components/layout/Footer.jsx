import { useNavigate } from 'react-router-dom';
import { fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';

export default function Footer() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className={`py-20 md:py-28 border-t text-center ${
        darkMode ? 'border-white/[0.04] bg-[#1a0b2e]' : 'border-purple-50/60 bg-[#faf9f6]'
      }`}
    >
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Purple Planning"
        onClick={() => navigate('/')}
        className="h-16 cursor-pointer mx-auto block hover:scale-105 transition-transform mb-12 drop-shadow-sm"
      />
      <div className={`w-16 h-px mx-auto mb-10 ${darkMode ? 'bg-white/[0.06]' : 'bg-purple-200/40'}`} />
      <div
        style={fontSans}
        className="flex justify-center gap-8 text-[10px] font-medium uppercase tracking-widest opacity-25 mb-5"
      >
        <button
          onClick={() => navigate('/impressum')}
          className="hover:text-purple-600 hover:opacity-100 transition-all"
        >
          Impressum
        </button>
        <button
          onClick={() => navigate('/datenschutz')}
          className="hover:text-purple-600 hover:opacity-100 transition-all"
        >
          Datenschutz
        </button>
      </div>
      <p
        style={fontSans}
        className="text-[10px] uppercase tracking-widest opacity-15 font-medium"
      >
        &copy; {new Date().getFullYear()} Studio PurplePlanning
      </p>
    </footer>
  );
}
