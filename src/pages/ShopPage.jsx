import { motion } from 'framer-motion';
import { fontSerif, fontSans } from '../data/styles';
import { products } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function ShopPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-8 md:px-12 text-center pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 md:mb-24 mt-6 md:mt-12"
      >
        <h2 style={fontSerif} className="text-4xl md:text-6xl mb-6 text-center">
          {t('shop', 'title')}
        </h2>
        <p
          style={fontSans}
          className={`font-light italic text-base md:text-lg max-w-lg mx-auto text-center ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          {t('shop', 'subtitle')}
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 mb-24 md:mb-36"
      >
        {products.map((p, index) => (
          <motion.div key={p.id} variants={itemVariants}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
