import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../product/ProductCard';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FeaturedSection() {
  const { products, getWhatsAppUrl } = useShop();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'pain-relief', label: 'Pain Relief' },
    { id: 'vitamins-supplements', label: 'Vitamins & Immunity' },
    { id: 'first-aid', label: 'First Aid' },
    { id: 'baby-care', label: 'Baby Care' },
    { id: 'medical-equipment', label: 'Diagnostic Devices' },
    { id: 'prescription-medicines', label: 'Prescription (Rx)' }
  ];

  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return product.featured || product.isSpecialOffer;
    return product.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Essential Healthcare Supplies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Medicines & Healthcare Products
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Verified authentic medicines and clinical diagnostics recommended by our pharmacy team.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0 group"
          >
            <span>Browse Full Pharmacy Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Pharmacist Help Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-pharmacy-800 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Can't Find Your Prescribed Drug?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Ask Our Pharmacist for Instant Stock Check & Special Orders
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              We stock hundreds of additional pharmaceuticals not listed online, including specialized cardiac medications, insulin, pediatric antibiotics, and chronic care drugs.
            </p>
          </div>

          <a
            href={getWhatsAppUrl("Hello Oumm Suhayl Medicine Store, I am searching for a specific medication. Can you check availability for me?")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-800 text-emerald-800" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
