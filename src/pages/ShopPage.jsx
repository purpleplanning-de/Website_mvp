import { motion } from 'framer-motion';
import { fontSerif, fontSans } from '../data/styles';
import { products, getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import ProductCard from '../components/ui/ProductCard';
import SEO from '../components/SEO';

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
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function ShopPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Shop - Purple Planning | Handgefertigte Planer & Journale"
        description="Entdecke unsere komplette Kollektion an handgefertigten Planern, Journalen und Organizern. Minimalistisches Design, höchste Qualität. Jetzt shoppen!"
        keywords="planer shop, journal kaufen, handgefertigte planer, bullet journal shop, organizer kaufen"
      />
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 md:mb-28 flex flex-col items-center"
      >
        <h2 style={fontSerif} className="text-5xl md:text-6xl mb-6">
          {t('shop', 'title')}
        </h2>
        <p
          style={fontSans}
          className={`font-light not-italic text-base md:text-lg max-w-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          {t('shop', 'subtitle')}
        </p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-24 md:mb-32"
      >
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group max-w-4xl mx-auto">
          <img
            src={getImg('1490730811888-31b1e1ea3e7e')}
            loading="eager"
            className="w-full h-[280px] md:h-[400px] object-cover transition-transform duration-[5s] group-hover:scale-105"
            alt="Purple Planning Shop Collection"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              darkMode ? 'from-[#1a0b2e]/60' : 'from-purple-900/15'
            } via-transparent to-transparent`}
          />
        </div>
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
    </>
  );
}
