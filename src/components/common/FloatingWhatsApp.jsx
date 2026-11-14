import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { MessageCircle, X, Send, ShieldCheck, Clock, UserCheck } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { settings, getWhatsAppUrl, openPrescriptionModal } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const query = userQuery.trim() || "Hello Oumm Suhayl Medicine Store, I would like to speak with a pharmacist.";
    const url = getWhatsAppUrl(query);
    window.open(url, '_blank');
    setIsOpen(false);
    setUserQuery('');
  };

  const handleQuickOption = (optionText) => {
    const url = getWhatsAppUrl(`Hello Oumm Suhayl Medicine Store,\n\nI am contacting you regarding: *${optionText}*.\nPlease assist me.`);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-pharmacy-700 to-emerald-800 p-4 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3.5 top-3.5 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-600/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                  alt="Pharmacist on duty"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Oumm Suhayl Pharmacist</h4>
                <div className="text-[11px] text-emerald-200 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online • Usually replies in minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-pharmacy-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Welcome to Oumm Suhayl Medicine Store!</span>
              </p>
              <p>
                How can our licensed pharmacy team assist you today? We can check drug availability, receive doctor prescriptions, or advise on dosage.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-1">
                Quick Options:
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  onClick={() => handleQuickOption("Check Medicine Availability & Price")}
                  className="text-left text-xs bg-white hover:bg-emerald-50 hover:text-pharmacy-700 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 transition-colors font-medium flex items-center justify-between"
                >
                  <span>💊 Check Medicine Availability & Price</span>
                  <span className="text-emerald-600">→</span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openPrescriptionModal();
                  }}
                  className="text-left text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 px-3 py-2 rounded-xl border border-rose-200 transition-colors font-medium flex items-center justify-between"
                >
                  <span>📋 Upload / Send Doctor's Prescription</span>
                  <span className="text-rose-600">→</span>
                </button>
                <button
                  onClick={() => handleQuickOption("Consult Pharmacist on Minor Ailment")}
                  className="text-left text-xs bg-white hover:bg-emerald-50 hover:text-pharmacy-700 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 transition-colors font-medium flex items-center justify-between"
                >
                  <span>🩺 Ask Pharmacist a Health Question</span>
                  <span className="text-emerald-600">→</span>
                </button>
              </div>
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSend} className="pt-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message or medicine name..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors shadow-md"
                title="Send via WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="bg-slate-100 px-4 py-2 text-[10px] text-center text-slate-500 border-t border-slate-200/80">
            Clicking send opens WhatsApp with your prompt
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 transition-all duration-300"
        title="Chat with Pharmacy on WhatsApp"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full">
            <span className="w-full h-full block rounded-full bg-emerald-400 animate-ping"></span>
          </span>
        </span>
        <span className="font-bold text-sm tracking-wide hidden sm:inline">
          Chat With Pharmacist
        </span>
      </button>
    </div>
  );
}
