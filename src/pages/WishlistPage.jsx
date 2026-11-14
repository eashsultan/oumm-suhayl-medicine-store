import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/product/ProductCard';
import { Heart, ArrowLeft, ShoppingCart, ShieldCheck } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Saved Healthcare Items</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Saved Medicines ({wishlist.length})
            </h1>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Medicines</span>
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Your Saved List is Empty
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Tap the heart icon on any medicine, vitamin, or diagnostic device to save it for quick reference or refills.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Explore Pharmacy Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
