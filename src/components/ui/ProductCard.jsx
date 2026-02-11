import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fontSerif, fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../hooks/useLanguage';
import OptimizedImage from './OptimizedImage';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { darkMode, textMuted } = useTheme();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] mb-7 overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-700"
        style={{
          backgroundColor: darkMode ? '#2e1d46' : product.bgColor,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          rotateX: 3,
          rotateY: -3,
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
        }}
      >
        <OptimizedImage
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          aspectRatio="3/4"
          className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-multiply group-hover:mix-blend-normal"
        />
        <span
          style={fontSerif}
          className="absolute inset-0 flex items-center justify-center text-8xl text-purple-900/8 italic z-10 select-none"
        >
          0{product.id}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
        <div className="absolute bottom-0 left-0 right-0 p-7 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 z-30">
          <button
            style={fontSans}
            onClick={handleAdd}
            className="w-full bg-white/95 backdrop-blur-sm py-4 rounded-2xl text-purple-700 font-bold text-[10px] uppercase tracking-widest shadow-xl text-center active:scale-[0.97] transition-transform"
          >
            {t('product', 'selectCompanion')}
          </button>
        </div>
      </motion.div>
      <motion.h4
        style={fontSerif}
        className="text-xl md:text-2xl mb-1.5 italic text-left"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {product.name}
      </motion.h4>
      <p style={fontSans} className={`${textMuted} font-medium text-sm text-left`}>
        {product.price.toFixed(2)} €
      </p>
    </motion.div>
  );
}
