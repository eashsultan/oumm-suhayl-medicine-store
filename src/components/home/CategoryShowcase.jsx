import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  ShieldAlert,
  Sparkles,
  Heart,
  Smile,
  Activity,
  FileText,
  PlusCircle,
  ArrowRight,
  Cross
} from 'lucide-react';

const ICON_MAP = {
  ShieldAlert,
  Sparkles,
  Cross,
  Heart,
  Smile,
  Activity,
  FileText,
  PlusCircle
};

export default function CategoryShowcase() {
  const { categories } = useShop();

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full mb-2">
              <span>Comprehensive Health Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Medicines & Healthcare Catalog
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Carefully organized pharmaceutical departments stocked with genuine, climate-controlled medications and medical essentials.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (9 Categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || PlusCircle;

            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-card-hover overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Category Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    {category.isRx ? (
                      <span className="bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                        Prescription Required
                      </span>
                    ) : (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                        Available OTC
                      </span>
                    )}
                  </div>

                  {/* Item count tag */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {category.itemCount}+ Items
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-medium mt-1">
                      {category.tagline}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
