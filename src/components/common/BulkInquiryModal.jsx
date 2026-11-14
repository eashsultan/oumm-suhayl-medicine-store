import React, { useState } from 'react';
import { X, Send, CheckCircle, PackageCheck, Phone, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function BulkInquiryModal() {
  const { isBulkModalOpen, bulkModalProduct, closeBulkModal, submitBulkRequest } = useShop();

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    fabricType: bulkModalProduct ? bulkModalProduct.name : '',
    quantityYards: '50',
    targetDate: '',
    deliveryCity: 'Lagos',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isBulkModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBulkRequest({
      ...formData,
      fabricType: formData.fabricType || (bulkModalProduct ? bulkModalProduct.name : 'General Wholesale Fabrics')
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeBulkModal();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#1E0533] border border-gold-500/30 rounded-2xl p-6 md:p-8 shadow-2xl text-cream-500">
        
        {/* Close Button */}
        <button
          onClick={closeBulkModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-900/60 hover:bg-gold-500 hover:text-purple-950 transition-colors text-cream-500"
          aria-label="Close bulk inquiry"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-500/20 text-green-400 rounded-full flex items-center justify-center border border-green-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif text-gold-400 font-bold">Wholesale Request Received!</h3>
            <p className="text-cream-500/80 max-w-md mx-auto text-sm leading-relaxed">
              Thank you for partnering with Muktar's Textiles. Our VIP wholesale representative will contact your business via phone & WhatsApp within 2 hours with discounted tier pricing.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-gold-500/10 text-gold-400 rounded-lg border border-gold-500/20">
                <PackageCheck className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">B2B & Fashion Designers</span>
                <h2 className="text-2xl font-serif font-bold text-white">Bulk & Wholesale Fabric Inquiry</h2>
              </div>
            </div>

            <p className="text-xs text-cream-500/70 mb-6">
              Tailored discounts for fashion designers, boutiques, bridal trains, and textile retailers across Nigeria. Enjoy special roll pricing and direct dispatch from Kano & Lagos.
            </p>

            {bulkModalProduct && (
              <div className="mb-5 p-3 rounded-xl bg-purple-900/40 border border-gold-500/20 flex items-center gap-3">
                <img
                  src={bulkModalProduct.images[0]}
                  alt={bulkModalProduct.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gold-500/30"
                />
                <div className="overflow-hidden">
                  <p className="text-xs text-gold-400 font-medium">Selected Fabric for Wholesale:</p>
                  <p className="text-sm text-white font-semibold truncate">{bulkModalProduct.name}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-cream-500/90 mb-1">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. De-Chuks Couture / Silk & Style"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-cream-500/90 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hajia Aisha / Chukwudi"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-cream-500/90 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-cream-500/90 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="designer@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-cream-500/90 mb-1">
                    Estimated Quantity (Yards / Rolls)
                  </label>
                  <select
                    value={formData.quantityYards}
                    onChange={(e) => setFormData({ ...formData, quantityYards: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  >
                    <option value="30-50 Yards">30 - 50 Yards (1-2 Rolls)</option>
                    <option value="50-100 Yards">50 - 100 Yards (Small Batch)</option>
                    <option value="100-300 Yards">100 - 300 Yards (Aso-Ebi / Collection)</option>
                    <option value="500+ Yards">500+ Yards (Mega Production / Wholesale)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-cream-500/90 mb-1">
                    Destination City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kano, Lagos, Abuja, Port Harcourt"
                    value={formData.deliveryCity}
                    onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-cream-500/90 mb-1">
                  Specific Colors, Requirements, or Wedding Date
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us specific colors needed, custom cutting requirements, or sample requests..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-purple-950/70 border border-purple-800 rounded-lg focus:border-gold-500 focus:outline-none text-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-purple-950 font-bold rounded-xl hover:from-gold-400 hover:to-gold-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
              >
                <Send className="w-4 h-4" />
                Submit Wholesale Quote Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
