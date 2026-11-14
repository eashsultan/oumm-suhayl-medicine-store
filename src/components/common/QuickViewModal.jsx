import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  ShoppingCart,
  Heart,
  FileText,
  Check,
  Info
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    isQuickViewOpen,
    closeQuickView,
    addToCart,
    getProductWhatsAppUrl,
    toggleWishlist,
    wishlist,
    openPrescriptionModal
  } = useShop();

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image & Badges */}
          <div className="bg-slate-50 p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100">
            <div className="relative w-full aspect-square max-w-[260px] rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200/80">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.prescriptionRequired && (
                <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                  <span>Rx Prescription Required</span>
                </div>
              )}
            </div>

            <div className="mt-4 w-full flex items-center justify-between text-xs text-slate-500 px-2">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {product.categoryName}
              </span>
              <span className="font-medium text-slate-400">
                {product.nafdacNo}
              </span>
            </div>
          </div>

          {/* Right: Medicine Details */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {product.brand}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug mt-0.5">
                  {product.name}
                </h3>
              </div>

              {/* Price and Stock */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-pharmacy-800">
                    ₦{product.price.toLocaleString()}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-xs text-slate-400 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{product.inStock ? "In Stock" : "Available on Request"}</span>
                </div>
              </div>

              {/* Active Ingredient & Dosage */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="text-slate-700">
                  <strong className="text-slate-900">Dosage/Specs:</strong> {product.dosage}
                </div>
                <div className="text-slate-700">
                  <strong className="text-slate-900">Active Compound:</strong> {product.activeIngredient}
                </div>
                <div className="text-slate-700">
                  <strong className="text-slate-900">Pack:</strong> {product.packSize}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Rx Warning */}
              {product.prescriptionRequired && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Prescription Required (PCN Regulation)</span>
                  </div>
                  <p className="text-[11px] leading-tight text-rose-800">
                    A valid doctor's prescription is required before dispensing. You can upload it during inquiry or via WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-5 space-y-2.5 border-t border-slate-100 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getProductWhatsAppUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Order List</span>
                </button>
              </div>

              {product.prescriptionRequired && (
                <button
                  onClick={() => {
                    closeQuickView();
                    openPrescriptionModal(product);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-semibold text-xs py-2 rounded-xl transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Upload Doctor's Prescription for this Medicine</span>
                </button>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>{isWishlisted ? "Saved in Wishlist" : "Save for Later"}</span>
                </button>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Genuine Medicine</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
