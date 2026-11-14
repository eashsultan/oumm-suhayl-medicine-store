import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  MessageCircle,
  ShoppingCart,
  Eye,
  Heart,
  AlertCircle,
  CheckCircle,
  FileText,
  Star
} from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    openQuickView,
    addToCart,
    getProductWhatsAppUrl,
    toggleWishlist,
    wishlist,
    openPrescriptionModal
  } = useShop();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Prescription or OTC Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.prescriptionRequired ? (
            <span className="bg-rose-600/95 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm flex items-center gap-1">
              <span>Rx Required</span>
            </span>
          ) : (
            <span className="bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm">
              OTC Medicine
            </span>
          )}

          {product.isSpecialOffer && product.discountPercent && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              Save {product.discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-md transition-all hover:scale-110"
            title={isWishlisted ? "Remove from wishlist" : "Save for later"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>

          <button
            onClick={() => openQuickView(product)}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-pharmacy-700 flex items-center justify-center shadow-md transition-all hover:scale-110"
            title="Quick view product details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock status indicator pill */}
        <div className="absolute bottom-2 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200/60 shadow-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>{product.inStock ? 'In Stock' : 'Low Stock'}</span>
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-emerald-700 text-[11px] truncate max-w-[150px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="block font-bold text-sm text-slate-900 group-hover:text-pharmacy-700 transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Active Ingredient / Dosage */}
          <p className="text-[11px] text-slate-500 line-clamp-1">
            <span className="font-medium text-slate-600">Spec:</span> {product.dosage}
          </p>

          {/* Price */}
          <div className="pt-1 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-pharmacy-900">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3.5 space-y-1.5">
          {/* Primary: WhatsApp Enquiry */}
          <a
            href={getProductWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs py-2 rounded-xl transition-all hover:scale-[1.01]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enquire on WhatsApp</span>
          </a>

          {/* Secondary: Add to Order List or Send Prescription */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] py-1.5 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Add to List</span>
            </button>

            {product.prescriptionRequired ? (
              <button
                onClick={() => openPrescriptionModal(product)}
                className="w-full flex items-center justify-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium text-[11px] py-1.5 rounded-lg transition-colors"
              >
                <FileText className="w-3 h-3" />
                <span>Send Rx</span>
              </button>
            ) : (
              <button
                onClick={() => openQuickView(product)}
                className="w-full flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] py-1.5 rounded-lg transition-colors"
              >
                <Eye className="w-3 h-3" />
                <span>Details</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
