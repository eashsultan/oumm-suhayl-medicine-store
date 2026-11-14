import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import QuickViewModal from './components/common/QuickViewModal';
import PrescriptionModal from './components/common/PrescriptionModal';
import ReviewModal from './components/common/ReviewModal';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import Toast from './components/common/Toast';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';

// Automatically scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white font-sans">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:categoryId" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Fallback to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <PrescriptionModal />
      <ReviewModal />
      <FloatingWhatsApp />
      <Toast />
    </div>
  );
}
