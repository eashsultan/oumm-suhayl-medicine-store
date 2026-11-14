import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { Crown, Sparkles, ArrowRight, Scissors, Layers, CheckCircle, Search } from 'lucide-react';
import { FORMAT_NAIRA } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function CategoriesPage() {
  const { openBulkModal } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#140224] text-cream-500 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Crown className="w-4 h-4" />
            <span>Muktar's Textiles Master Directory</span>
            <Crown className="w-4 h-4" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            12 Premium Fabric Categories
          </h1>
          <p className="mt-4 text-sm sm:text-base text-cream-500/80 font-light leading-relaxed">
            Discover Nigeria's most comprehensive catalog of authentic traditional weaves, imported Austrian brocades, Swiss voile laces, and couture fashion materials.
          </p>

          {/* Category Search Filter */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search category (e.g. Lace, Shadda, Ankara, Chiffon)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-purple-950/80 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white placeholder-cream-500/50 shadow-inner"
            />
            <Search className="w-4 h-4 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className="group bg-[#1E0533] rounded-3xl border border-purple-800/80 hover:border-gold-500/60 overflow-hidden shadow-xl hover:shadow-gold-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-purple-950">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E0533] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Number Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-950/90 backdrop-blur-md border border-gold-500/50 text-gold-400 font-mono text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-700/60 text-white text-[11px] font-semibold">
                      {cat.itemCount}+ Designs
                    </span>
                  </div>

                  {/* Starting Price Tag */}
                  <div className="absolute bottom-3 right-4 z-10">
                    <span className="px-3 py-1 rounded-xl bg-[#140224]/90 backdrop-blur-md border border-gold-500/40 text-gold-400 font-serif text-xs font-bold">
                      From {FORMAT_NAIRA(cat.startingPrice)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold block mb-1">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-cream-500/75 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <Link
                  to={`/category/${cat.slug}`}
                  className="w-full py-3 bg-purple-950/80 hover:bg-gold-500 text-gold-400 hover:text-purple-950 border border-purple-800 hover:border-gold-500 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Browse {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Wholesale & Tailor Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#2B074E] via-[#3E0C6E] to-[#1F0438] border border-gold-500/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Scissors className="w-4 h-4" />
              <span>Fashion Designer & Tailor Wholesale Desk</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Need 50+ Yards or Whole Rolls for Your Atelier?
            </h2>
            <p className="text-xs sm:text-sm text-cream-500/80 leading-relaxed font-light">
              We supply top fashion houses and bridal studios across Lagos, Kano, Abuja, and Port Harcourt with exclusive wholesale pricing and direct factory-roll deliveries.
            </p>
          </div>

          <button
            onClick={() => openBulkModal()}
            className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:from-gold-400 hover:to-gold-300 transition-all shrink-0 active:scale-95"
          >
            Request Wholesale Price Sheet
          </button>
        </div>

        {/* Fabric Care & Sourcing FAQs */}
        <div className="mt-16 pt-12 border-t border-purple-900/60 max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-white text-center mb-8">
            Fabric Consultation & Sourcing Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-cream-500/80">
            <div className="p-5 rounded-2xl bg-[#1E0533] border border-purple-800">
              <h4 className="font-bold text-gold-400 text-sm mb-2">How many yards do I need for an Agbada / Babbar Riga?</h4>
              <p className="leading-relaxed">
                A complete 3-piece Nigerian Agbada (outer robe, inner top, trousers) requires <strong>10 yards</strong> of standard width fabric or <strong>7 to 8 yards</strong> of extra-wide Austrian Getzner Guinea Brocade (63" width).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1E0533] border border-purple-800">
              <h4 className="font-bold text-gold-400 text-sm mb-2">How do I preserve Swiss Voile Cord Lace?</h4>
              <p className="leading-relaxed">
                Swiss voile cotton foundation is delicate yet resilient. Always dry clean beaded and raised cord laces, or gently hand rinse inside-out with mild shampoo. Never wring or twist.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1E0533] border border-purple-800">
              <h4 className="font-bold text-gold-400 text-sm mb-2">Can I request fabric video clips on WhatsApp?</h4>
              <p className="leading-relaxed">
                Yes! Our showroom staff in Kano and Lagos can send high-definition video clips under natural daylight so you can inspect luster, drape, and true color before purchase.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1E0533] border border-purple-800">
              <h4 className="font-bold text-gold-400 text-sm mb-2">How fast is delivery to Abuja, Lagos, or Eastern States?</h4>
              <p className="leading-relaxed">
                Orders dispatched via DHL Express or GIG Priority typically arrive within <strong>24 to 48 hours</strong> in Lagos, Kano, and Abuja, and <strong>2 to 4 business days</strong> nationwide.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
