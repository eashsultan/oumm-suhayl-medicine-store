import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/product/ProductCard';
import {
  ShieldCheck,
  MessageCircle,
  ShoppingCart,
  Heart,
  FileText,
  AlertCircle,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Star,
  Info,
  Clock,
  Plus,
  Minus
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    getProductWhatsAppUrl,
    toggleWishlist,
    wishlist,
    openPrescriptionModal,
    showToast
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('indications');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Medicine Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The requested pharmaceutical product may have been relocated or updated.
        </p>
        <Link
          to="/shop"
          className="mt-4 bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Return to All Medicines
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Related products from the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Oumm Suhayl Medicine Store`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Medicine link copied to clipboard!");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <nav className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-slate-600">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-slate-600">
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-xs">{product.name}</span>
          </nav>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 p-2 rounded-xl bg-white border border-slate-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            
            {/* Left: Product Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Prescription Badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.prescriptionRequired ? (
                    <span className="bg-rose-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Prescription Required (Rx)</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-md">
                      Over-The-Counter (OTC)
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-md transition-all hover:scale-105"
                  title="Save for later"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>
              </div>

              {/* Verified Badges */}
              <div className="mt-4 w-full grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{product.nafdacNo}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Sealed Factory Pack</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* Brand & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h1>

                {/* Price and Stock */}
                <div className="flex items-center justify-between py-2 border-y border-slate-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-pharmacy-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{product.inStock ? 'Available in Stock' : 'Call to Request'}</span>
                  </div>
                </div>

                {/* Key Spec Box */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Dosage / Formulation:</span>
                    <strong className="text-slate-800">{product.dosage}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Pack Presentation:</span>
                    <strong className="text-slate-800">{product.packSize}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[11px]">Active Ingredient:</span>
                    <strong className="text-slate-800 truncate block">{product.activeIngredient}</strong>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Prescription Warning Box if Rx */}
                {product.prescriptionRequired && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1.5">
                    <div className="font-bold flex items-center gap-2 text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Prescription-Only Medicine (PCN Regulation)</span>
                    </div>
                    <p className="leading-relaxed text-[11px] text-rose-800">
                      By Nigerian law, this medication cannot be dispensed without a valid prescription from a registered medical doctor. Please present your prescription when ordering or upload it below.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Controls & Actions */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-2xl p-1 w-32 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-extrabold text-sm text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add {quantity} to Order List</span>
                  </button>
                </div>

                {/* Primary WhatsApp Enquiry CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={getProductWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  {product.prescriptionRequired ? (
                    <button
                      onClick={() => openPrescriptionModal(product)}
                      className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm transition-colors"
                    >
                      <FileText className="w-4 h-4 text-rose-600" />
                      <span>Send Doctor's Script</span>
                    </button>
                  ) : (
                    <a
                      href={`tel:${product.phone || '+2348038921100'}`}
                      className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-2xl text-xs sm:text-sm transition-colors"
                    >
                      <span>Call Pharmacist</span>
                    </a>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Clinical Information Tabs */}
          <div className="border-t border-slate-200 p-6 sm:p-10 bg-slate-50/60">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('indications')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 ${
                  activeTab === 'indications'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Indications & Uses
              </button>
              <button
                onClick={() => setActiveTab('dosage')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 ${
                  activeTab === 'dosage'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dosage & Administration
              </button>
              <button
                onClick={() => setActiveTab('precautions')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 ${
                  activeTab === 'precautions'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Precautions & Warnings
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 ${
                  activeTab === 'storage'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Storage Instructions
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeTab === 'indications' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Medical Indications:</h4>
                  <p>{product.indications || "Indicated for healthcare and wellness support as directed."}</p>
                </div>
              )}
              {activeTab === 'dosage' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Standard Dosage Instructions:</h4>
                  <p>{product.dosageInstructions || "Follow instructions on packaging or consult your pharmacist/physician."}</p>
                </div>
              )}
              {activeTab === 'precautions' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Contraindications & Warnings:</h4>
                  <p>{product.precautions || "Keep out of reach of children. Discontinue and consult your doctor if adverse reactions occur."}</p>
                </div>
              )}
              {activeTab === 'storage' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Storage Conditions:</h4>
                  <p>{product.storage || "Store in a cool, dry place below 30°C protected from direct sunlight."}</p>
                </div>
              )}
            </div>

            {/* Medical Advice Legal Note */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                <strong>Patient Advisory:</strong> This product profile is for informational purposes only. Do not use this information to self-diagnose or treat any medical illness. Always consult a qualified physician or licensed pharmacist for medical advice.
              </p>
            </div>
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Related {product.categoryName}
              </h3>
              <Link
                to={`/category/${product.category}`}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View all in category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
