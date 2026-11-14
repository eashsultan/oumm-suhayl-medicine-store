import React from 'react';
import { useShop } from '../../context/ShopContext';
import { FileText, ShieldCheck, CheckCircle2, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function PrescriptionBanner() {
  const { openPrescriptionModal, getWhatsAppUrl } = useShop();

  return (
    <section id="prescription" className="py-16 sm:py-20 bg-gradient-to-r from-emerald-900 via-pharmacy-900 to-teal-950 text-white relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe & Regulated Pharmacy Dispensing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Have a Doctor's Prescription? <br />
              <span className="text-emerald-300">We Dispense It Accurately & Discreetly.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              Under Nigerian pharmacy regulations (PCN & NAFDAC), prescription-only medications require a valid doctor's prescription. Our licensed pharmacists meticulously review every script for proper dosing, contraindications, and drug interactions.
            </p>

            {/* 3 Step Process */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-emerald-400 font-black text-lg">01</span>
                <h4 className="text-xs font-bold text-white">Snap Prescription</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Take a clear photo of your doctor's stamped paper or digital script.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-emerald-400 font-black text-lg">02</span>
                <h4 className="text-xs font-bold text-white">Pharmacist Review</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Our licensed pharmacist verifies authenticity and confirms total price.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-emerald-400 font-black text-lg">03</span>
                <h4 className="text-xs font-bold text-white">Swift Delivery</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Receive sealed, genuine medications with full dosage instructions.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => openPrescriptionModal()}
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
              >
                <FileText className="w-4 h-4" />
                <span>Upload Doctor's Prescription</span>
              </button>

              <a
                href={getWhatsAppUrl("Hello Pharmacist, I have a doctor's prescription photo I would like to send for verification.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Prescription via WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Prescription Compliance</h3>
                  <div className="text-xs text-slate-500">Pharmacists Council of Nigeria Guidelines</div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prescription details must be legible with patient name and age.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Doctor's name, medical council registration, and facility stamp.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valid date of prescription (standard validity is 30 days).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Strict cold-chain storage maintained for insulin and biologics.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <div>
                  <div className="font-bold">Need a doctor referral?</div>
                  <div className="text-[11px] text-emerald-700">We connect you to trusted clinical specialists.</div>
                </div>
                <a
                  href={getWhatsAppUrl("Hello Pharmacist, I need medical advice or a doctor referral.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-emerald-800 underline"
                >
                  Ask Now →
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
