import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';
import { fontSerif } from '../data/styles';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
            darkMode ? 'bg-green-900/30' : 'bg-green-50'
          }`}>
            <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
          </div>
        </motion.div>

        <h1 style={fontSerif} className="text-4xl mb-4">
          {t('checkout', 'successTitle')}
        </h1>

        <p className={`text-lg mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
          {t('checkout', 'successMessage')}
        </p>

        <div className={`flex items-center justify-center gap-2 mb-10 text-sm ${
          darkMode ? 'text-white/50' : 'text-gray-400'
        }`}>
          <Download size={16} />
          <span>{t('checkout', 'downloadHint')}</span>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
        >
          {t('checkout', 'backToShop')} <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
