import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { fontSans } from './data/styles';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import FeedbackToast from './components/ui/FeedbackToast';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BundlePage from './pages/BundlePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import RoadmapPage from './pages/RoadmapPage';
import ProfilePage from './pages/ProfilePage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { darkMode, bgMain, textMain } = useTheme();

  const themeClasses = `${bgMain} ${textMain} transition-colors duration-700 overflow-y-scroll`;

  return (
    <div
      style={fontSans}
      className={`min-h-screen flex flex-col ${themeClasses} selection:bg-purple-500 selection:text-white`}
    >
      <ScrollToTop />
      <CartSidebar />
      <Navbar />

      <main className="pt-32 pb-4 flex-grow">
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
      </main>

      <Footer />
      <FeedbackToast />
    </div>
  );
}
