import { useNavigate } from 'react-router-dom';
import { fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';

export default function Footer() {
  const navigate = useNavigate();
  const { darkMode, borderColor } = useTheme();

  const logoStyle = `text-3xl font-bold italic cursor-pointer inline-block tracking-tight ${
    darkMode ? 'text-white' : 'text-purple-700'
  }`;

  return (
    <footer className={`py-12 border-t text-center ${darkMode ? 'border-white/10' : 'border-purple-50'}`}>
      <div onClick={() => navigate('/')} className={`${logoStyle} mb-8`}>
        PurplePlanning
      </div>
      <p
        style={fontSans}
        className="text-[10px] uppercase tracking-widest opacity-30 font-bold mb-8 text-center"
      >
        &copy; {new Date().getFullYear()} Studio PurplePlanning
      </p>
      <div
        style={fontSans}
        className="flex justify-center space-x-12 text-[10px] font-bold uppercase tracking-widest opacity-40"
      >
        <button
          onClick={() => navigate('/impressum')}
          className="hover:text-purple-600 transition-colors"
        >
          Impressum
        </button>
        <button
          onClick={() => navigate('/datenschutz')}
          className="hover:text-purple-600 transition-colors"
        >
          Datenschutz
        </button>
      </div>
    </footer>
  );
}
