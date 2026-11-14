import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Heart, CheckCircle2 } from 'lucide-react';

export default function ReviewModal() {
  const { isReviewModalOpen, setIsReviewModalOpen, addReview } = useShop();
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      alert("Please enter your name and review message.");
      return;
    }

    addReview({
      author: author.trim(),
      role: role.trim() || "Verified Customer • Nigeria",
      rating: rating,
      content: content.trim()
    });

    setIsReviewModalOpen(false);
    setAuthor('');
    setRole('');
    setRating(5);
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pharmacy-700 to-emerald-800 p-6 text-white relative">
          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="absolute right-4 top-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-600/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-bold">Share Your Pharmacy Experience</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Help fellow patients and families know about our service & medication quality.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Rating:
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-amber-600 ml-2">
                {rating} of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hajia Aisha Mohammed"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location / City
            </label>
            <input
              type="text"
              placeholder="e.g. Verified Patient • Abuja"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Feedback & Experience *
            </label>
            <textarea
              rows="3"
              required
              placeholder="Share how Oumm Suhayl Medicine Store assisted you with genuine medicines, customer care, or prescription service..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              Submit Customer Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
