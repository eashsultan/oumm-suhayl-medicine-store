import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Tag, Sparkles, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SpecialOffersSection() {
  const { promotions } = useShop();

  if (!promotions || promotions.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Health Campaigns & Offers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Special Pharmacy Offers & Health Initiatives
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Promoting accessible wellness for families through regular health campaigns, discounted packages, and community initiatives.
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`rounded-3xl p-7 text-white bg-gradient-to-br ${promo.bgGradient || 'from-emerald-800 to-teal-900'} shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group`}
            >
              {/* Top Pill & Discount */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {promo.badge}
                  </span>
                  <span className="text-xs font-extrabold text-amber-300 bg-black/20 px-2.5 py-1 rounded-lg">
                    {promo.discount}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold leading-snug text-white">
                    {promo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed">
                    {promo.description}
                  </p>
                </div>
              </div>

              {/* Bottom Validity & CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{promo.validUntil}</span>
                </div>

                <a
                  href={promo.ctaLink}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-900 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors shadow-md"
                >
                  <span>{promo.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
