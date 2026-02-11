import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { fontSans } from './data/styles';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import FeedbackToast from './components/ui/FeedbackToast';

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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { bgMain, textMain } = useTheme();

  return (
    <div
      style={fontSans}
      className={`min-h-screen flex flex-col ${bgMain} ${textMain} transition-colors duration-700 selection:bg-purple-500 selection:text-white`}
    >
      <ScrollToTop />
      <CartSidebar />
      <Navbar />

      <main className="pt-24 md:pt-28 flex-grow">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/bundle" element={<BundlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <FeedbackToast />
    </div>
  );
}
