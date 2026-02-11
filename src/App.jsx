import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fontSans } from './data/styles';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import FeedbackToast from './components/ui/FeedbackToast';
import OfflineBanner from './components/OfflineBanner';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const BundlePage = lazy(() => import('./pages/BundlePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-[50vh]"
  >
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"
    />
  </motion.div>
);

export default function App() {
  const { bgMain, textMain } = useTheme();
  const location = useLocation();

  return (
    <div
      style={fontSans}
      className={`min-h-screen flex flex-col ${bgMain} ${textMain} transition-colors duration-700 selection:bg-purple-500 selection:text-white`}
    >
      {/* Skip to Content Links for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[400] focus:px-6 focus:py-3 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:font-bold focus:shadow-xl"
      >
        Skip to main content
      </a>
      <a
        href="#footer"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 focus:z-[400] focus:px-6 focus:py-3 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:font-bold focus:shadow-xl"
      >
        Skip to footer
      </a>

      <ScrollToTop />
      <OfflineBanner />
      <CartSidebar />
      <Navbar />

      <main id="main-content" className="pt-24 md:pt-40 flex-grow">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
              <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />
              <Route path="/product/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
              <Route path="/bundle" element={<PageWrapper><BundlePage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
              <Route path="/roadmap" element={<PageWrapper><RoadmapPage /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
              <Route path="/impressum" element={<PageWrapper><ImpressumPage /></PageWrapper>} />
              <Route path="/datenschutz" element={<PageWrapper><DatenschutzPage /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
      <FeedbackToast />
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
