import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Award, Shield, CheckCircle2, Scissors, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function BrandStory() {
  const { openBulkModal } = useShop();

  return (
    <section className="py-24 bg-[#140224] relative overflow-hidden border-b border-purple-900/60">
      
      {/* Decorative background radial pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Textile Imagery */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl aspect-[3/4] bg-purple-950">
                <img 
                  src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80" 
                  alt="African Wax Print Textile" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-purple-800 shadow-xl aspect-square bg-[#1E0533] p-6 flex flex-col justify-center text-center">
                <span className="font-serif text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200">100%</span>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold mt-1">Authentic Guarantee</span>
                <p className="text-[11px] text-cream-500/70 mt-2 font-light leading-relaxed">
                  Every yard of Swiss voile lace, Getzner brocade, and Ankara wax is directly certified for authenticity and purity.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden border border-purple-800 shadow-xl aspect-square bg-[#1C0432] p-6 flex flex-col justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/40 mx-auto flex items-center justify-center text-gold-400 mb-2">
                  <Scissors className="w-5 h-5" />
                </div>
                <span className="font-serif text-sm uppercase tracking-widest text-gold-400 font-bold">Tailor's Choice</span>
                <p className="text-[11px] text-cream-500/70 mt-1 font-light leading-relaxed">
                  Supplying over 10,000+ fashion designers and boutiques across Nigeria and West Africa with bulk rolls and custom cuts.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl aspect-[3/4] bg-purple-950">
                <img 
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80" 
                  alt="Guinea Brocade Agbada Shadda" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Center Floating Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#18032C]/95 border-2 border-gold-500/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-3 shadow-2xl shadow-gold-sm">
              <Crown className="w-5 h-5 text-gold-400 mb-0.5" />
              <span className="font-serif text-[10px] uppercase font-black tracking-widest text-white leading-tight">
                MUKTAR'S
              </span>
              <span className="text-[8px] uppercase tracking-widest text-gold-400 font-mono">
                SINCE 2012
              </span>
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-bold">
              <Crown className="w-3.5 h-3.5" />
              <span>The Heritage of Muktar's Textiles</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              Rooted in Ancient Weaving Traditions, Refined for Modern Grandeur.
            </h2>

            <p className="text-sm text-cream-500/85 leading-relaxed font-light">
              Muktar's Textiles was established with a singular, unwavering mission: to provide Nigerians, fashion designers, tailors, and luxury lovers with access to authentic, majestic, and enduring fabrics without the risks of counterfeits or inflated prices.
            </p>

            <p className="text-sm text-cream-500/80 leading-relaxed font-light">
              From our physical trade showrooms in the historic Kantin Kwari textile markets of Kano and the fashion hubs of Lagos Island, we build direct relationships with heritage mills in Lustenau (Austria), Saint Gallen (Switzerland), Como (Italy), and West African wax houses.
            </p>

            {/* Feature List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs text-cream-500/90 font-medium leading-relaxed">
                  <strong className="text-white">Direct European & African Mill Partnerships:</strong> Sourced with certified origin seals and full width guarantees.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs text-cream-500/90 font-medium leading-relaxed">
                  <strong className="text-white">Wholesale Tier Pricing for Tailors & Boutiques:</strong> 30-yard rolls, 10-yard bundles, and customized cutting for wedding entourages.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs text-cream-500/90 font-medium leading-relaxed">
                  <strong className="text-white">Nationwide Safe Transit:</strong> Insured priority shipping to all 36 Nigerian states and Abuja FCT.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                to="/about"
                className="px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:from-gold-400 hover:to-gold-300 transition-all flex items-center gap-2"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => openBulkModal()}
                className="px-6 py-3.5 bg-purple-950/60 hover:bg-purple-900 text-gold-300 font-bold text-xs rounded-xl border border-gold-500/30 transition-colors"
              >
                Wholesale Inquiry
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
