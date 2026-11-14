import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Crown, Sparkles, CheckCircle2, ArrowRight, Scissors } from 'lucide-react';

export default function VipClub() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setJoined(true);
      showToast("Welcome to Muktar's Royal Fabric Club! Use coupon code MUKTAR10 for 10% off.");
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#170228] via-[#22063B] to-[#170228] border-b border-purple-900/60 relative overflow-hidden text-white">
      
      {/* Decorative gold emblem */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-96 h-96 rounded-full border border-gold-500/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-400 mx-auto flex items-center justify-center text-purple-950 shadow-gold-md mb-6">
          <Crown className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailor & Designer Priority Access</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Join the Muktar's Royal Textile Club
        </h2>

        <p className="text-sm sm:text-base text-cream-500/80 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
          Designed for fashion designers, tailors, bridal entourages, and fabric lovers across Nigeria. Enjoy early notifications on new Swiss lace shipments, bulk discounts on Guinea brocade rolls, and fabric video consultations.
        </p>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-950/70 border border-purple-800">
            <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="text-xs text-cream-500/90 font-medium">First Access to New Shipments</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-950/70 border border-purple-800">
            <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="text-xs text-cream-500/90 font-medium">Special Designer Wholesale Tier</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-950/70 border border-purple-800">
            <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="text-xs text-cream-500/90 font-medium">Direct WhatsApp Video Previews</span>
          </div>
        </div>

        {/* Subscribe Form */}
        {joined ? (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
            🎉 You have successfully joined! Your 10% coupon code: <strong>MUKTAR10</strong>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email for 10% discount..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-sm bg-purple-950/80 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white placeholder-cream-500/40"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:from-gold-400 hover:to-gold-300 transition-all flex items-center justify-center gap-2"
            >
              <span>Join Club</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
