import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Plus,
  Heart,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const { settings, categories, openPrescriptionModal } = useShop();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">100% Genuine Medicines</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly sourced from certified manufacturers & NAFDAC authorized pharmaceutical distributors. Zero counterfeits.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Licensed Pharmacists on Duty</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Qualified healthcare professionals ready to review prescriptions, advise on dosages, and check drug interactions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Fast WhatsApp Orders</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Snap and send your prescription or medicine list directly to our pharmacy WhatsApp for instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <Plus className="w-7 h-7 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl text-white tracking-tight">
                  OUMM SUHAYL
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Medicine Store & Healthcare
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your premier neighborhood & digital pharmacy in Abuja, Nigeria. Dedicated to safeguarding your health with authentic medications, trusted clinical care, and compassionate pharmaceutical guidance.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified & Regulated Pharmacy</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {settings.licenseNotice}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Oumm Suhayl Medicine Store!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Pharmacist</span>
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Store</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Explore Store
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Home Page</span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>All Medicines & Catalog</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openPrescriptionModal()}
                  className="text-left text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                  <span className="text-rose-400 font-semibold">Upload Prescription</span>
                </button>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>About Our Pharmacy</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Contact & Store Hours</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Pharmacy Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Key Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="text-emerald-400 hover:underline font-medium block">
                  View all 9 categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-emerald-400">
                  {settings.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-emerald-400">
                  {settings.email}
                </a>
              </div>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                <div className="font-semibold text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Opening Hours:</span>
                </div>
                <div>{settings.openingHours.weekdays}</div>
                <div>{settings.openingHours.saturday}</div>
                <div>{settings.openingHours.sunday}</div>
                <div className="text-emerald-400 font-semibold pt-1">
                  {settings.openingHours.emergency}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory & Medical Disclaimer Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Medical, Regulatory & Safety Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              The pharmaceutical and health content presented on the Oumm Suhayl Medicine Store website is provided for general informational and educational purposes only. It is not intended to substitute for direct clinical advice, diagnosis, or treatment by a licensed physician, clinical pharmacist, or qualified healthcare professional. Do not disregard professional medical advice or delay in seeking it because of something you have read on this website.
            </p>
            <p className="leading-relaxed text-slate-400">
              <strong>Prescription-Only Medicines (Rx):</strong> In strict compliance with the regulations of the Pharmacists Council of Nigeria (PCN) and the National Agency for Food and Drug Administration and Control (NAFDAC), prescription medicines will not be dispensed without a valid, verifiable prescription issued by a registered medical doctor. We do not make unsubstantiated curative claims for any pharmaceutical product.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">Oumm Suhayl Medicine Store</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">Your Health, Our Priority</span>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-400">Privacy & Terms</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-slate-400">Admin Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
