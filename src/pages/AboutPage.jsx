import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Award,
  Heart,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  FileText,
  ThermometerSnowflake,
  Activity,
  Plus
} from 'lucide-react';

export default function AboutPage() {
  const { settings, openPrescriptionModal, getWhatsAppUrl } = useShop();

  const values = [
    {
      icon: ShieldCheck,
      title: "100% Zero-Counterfeit Integrity",
      description: "We procure pharmaceuticals exclusively from verified manufacturers and licensed primary distributors. Every box is inspected for authentic security seals and NAFDAC registration."
    },
    {
      icon: ThermometerSnowflake,
      title: "Climate-Controlled Storage",
      description: "Medicines lose efficacy in extreme heat. Our dispensary utilizes active 24/7 cold-chain refrigeration and temperature-monitored shelving to ensure peak pharmacological potency."
    },
    {
      icon: Users,
      title: "Patient-Centered Compassion",
      description: "We treat every customer as family. Our licensed clinical pharmacists provide empathetic, attentive, and confidential consultations for all medical concerns."
    },
    {
      icon: Award,
      title: "Regulatory Excellence",
      description: "Strictly compliant with the statutory guidelines of the Pharmacists Council of Nigeria (PCN) and the Federal Ministry of Health."
    }
  ];

  const faqs = [
    {
      q: "How do I order prescription medicines from Oumm Suhayl?",
      a: "Upload your doctor's prescription using our online prescription tool or send a clear photo directly to our pharmacy WhatsApp (+234 803 892 1100). Our licensed pharmacist will verify the script and arrange dispatch."
    },
    {
      q: "Are all medicines in stock genuine and NAFDAC registered?",
      a: "Yes, 100%. We operate a zero-tolerance policy against counterfeit pharmaceuticals. All inventory is sourced through audited pharmaceutical supply chains with valid NAFDAC certification."
    },
    {
      q: "Do you deliver to my home or office?",
      a: "Yes. We offer swift doorstep delivery across Abuja (same-day within 1-2 hours) as well as secure courier shipping nationwide across Nigeria."
    },
    {
      q: "Can I consult a pharmacist for advice on common ailments?",
      a: "Absolutely. Pharmacist consultation is completely free! You can walk into our pharmacy or message us on WhatsApp anytime for guidance on pain relief, cough/cold remedies, infant colic, or vitamins."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-900 via-pharmacy-800 to-emerald-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>About Oumm Suhayl Medicine Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Dedicated to Safe, Genuine Healthcare for Every Family.
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Founded with a commitment to clinical ethics, authentic medications, and compassionate patient care in Nigeria.
          </p>
        </div>
      </section>

      {/* Brand Story & Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Our History & Commitment
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Your Trusted Neighborhood & Digital Pharmacy
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                At <strong>Oumm Suhayl Medicine Store</strong>, we believe that access to genuine, high-quality medication is a fundamental human right. In a healthcare landscape where substandard and counterfeit drugs pose grave risks, our pharmacy was established to serve as an unyielding beacon of trust, quality, and pharmaceutical professionalism.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                From prescription dispensing and disease management to pediatric essentials and daily wellness supplements, every product on our shelves meets stringent quality standards. Our licensed pharmacists are not just dispensers — they are trusted healthcare partners who take the time to listen, counsel, and guide you towards optimal recovery.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-black text-emerald-700">100%</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">NAFDAC Certified Stock</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-black text-emerald-700">24/7</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">WhatsApp Pharmacist Support</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppUrl("Hello Oumm Suhayl Medicine Store, I would like to consult with a pharmacist.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Consult with Our Pharmacist</span>
                </a>

                <button
                  onClick={() => openPrescriptionModal()}
                  className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
                >
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span>Upload Doctor's Prescription</span>
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-[4/5] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=800&q=80"
                  alt="Pharmacist consulting patient at Oumm Suhayl Medicine Store"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-800 shadow-lg">
                  <div className="font-extrabold text-sm text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>PCN Registered Dispensary</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Operated under the supervision of certified clinical pharmacists.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Why Choose Oumm Suhayl
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Core Clinical Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{val.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-2"
              >
                <h4 className="font-bold text-sm text-slate-900 flex items-start gap-2">
                  <span className="text-emerald-600">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
