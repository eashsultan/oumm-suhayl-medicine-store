import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Star, MessageSquarePlus, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const { reviews, setIsReviewModalOpen } = useShop();

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Patient & Family Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Hundreds of Patients
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Read authentic feedback from individuals, families, and healthcare professionals who rely on Oumm Suhayl Medicine Store.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-105 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {rev.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
