import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  ShieldCheck,
  MessageCircle,
  Phone,
  Search,
  ArrowRight,
  Clock,
  Sparkles,
  FileText,
  CheckCircle2,
  HeartPulse,
  Plus
} from 'lucide-react';

export default function HeroBanner() {
  const { settings, categories, openPrescriptionModal, getWhatsAppUrl } = useShop();
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/shop?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-8 pb-16 lg:py-20">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Welcome, Search & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pharmacy Brand Tag */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{settings.storeName.toUpperCase()} • LICENSED PHARMACY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Your Health, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-pharmacy-600 to-medblue-600">
                Our Priority.
              </span>
            </h1>

            {/* Welcome Message */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {settings.welcomeMessage}
            </p>

            {/* Hero Quick Search Bar */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleHeroSearch} className="relative flex items-center shadow-lg shadow-emerald-900/5 rounded-2xl bg-white border-2 border-emerald-500/30 focus-within:border-emerald-600 transition-colors">
                <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                <input
                  type="text"
                  placeholder="Search over 1,000+ medicines, vitamins, first aid..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-28 py-3.5 text-sm text-slate-800 outline-none rounded-2xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/30"
                >
                  Find Medicine
                </button>
              </form>

              {/* Popular quick links */}
              <div className="mt-2.5 flex items-center justify-center lg:justify-start gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Popular:</span>
                <Link to="/category/pain-relief" className="hover:text-emerald-700 underline underline-offset-2">Pain Relief</Link>
                <span>•</span>
                <Link to="/category/vitamins-supplements" className="hover:text-emerald-700 underline underline-offset-2">Multivitamins</Link>
                <span>•</span>
                <Link to="/category/first-aid" className="hover:text-emerald-700 underline underline-offset-2">First Aid Kits</Link>
                <span>•</span>
                <Link to="/category/medical-equipment" className="hover:text-emerald-700 underline underline-offset-2">BP Monitors</Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppUrl("Hello Oumm Suhayl Medicine Store, I would like to speak with a pharmacist.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-300 font-bold text-sm px-5 py-3.5 rounded-2xl shadow-sm transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Chat With Us</span>
              </a>

              <button
                onClick={() => openPrescriptionModal()}
                className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-sm px-5 py-3.5 rounded-2xl shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Upload Prescription</span>
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-3.5 rounded-2xl hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px] leading-tight text-slate-600 font-medium">
                  <strong className="text-slate-900 block">100% Genuine</strong>
                  NAFDAC Verified
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-600 shrink-0" />
                <div className="text-[11px] leading-tight text-slate-600 font-medium">
                  <strong className="text-slate-900 block">Licensed Staff</strong>
                  PCN Registered
                </div>
              </div>

              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-500 shrink-0" />
                <div className="text-[11px] leading-tight text-slate-600 font-medium">
                  <strong className="text-slate-900 block">Clinical Advice</strong>
                  Free Consultations
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px] leading-tight text-slate-600 font-medium">
                  <strong className="text-slate-900 block">Fast Delivery</strong>
                  Direct to Doorstep
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Pharmacy Imagery & Floating Care Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=85"
                  alt="Modern Oumm Suhayl Pharmacy with stocked medicines"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>

                {/* Bottom caption in image */}
                <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Oumm Suhayl Medicine Store</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Fully stocked with temperature-regulated pharmaceuticals, cold-chain vaccines, and diagnostic medical gear.
                  </p>
                </div>
              </div>

              {/* Floating Pharmacist Badge Card */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 max-w-[210px] hidden sm:block animate-bounce-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">PCN Certified</div>
                    <div className="text-[10px] text-slate-500">Zero Counterfeits</div>
                  </div>
                </div>
              </div>

              {/* Floating Prescription Card */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-rose-100 max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Send Prescription</div>
                    <div className="text-[10px] text-slate-500">Verified by Pharmacist</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
