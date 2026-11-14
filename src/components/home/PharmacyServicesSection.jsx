import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  FileCheck,
  UserCheck,
  Activity,
  HeartHandshake,
  ShieldPlus,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICE_ICONS = {
  FileCheck,
  UserCheck,
  Activity,
  HeartHandshake,
  ShieldPlus,
  Truck
};

export default function PharmacyServicesSection() {
  const { services, openPrescriptionModal } = useShop();

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full">
            <span>Professional Healthcare</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Pharmaceutical & Clinical Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            More than a medicine store — we are your healthcare partners dedicated to ensuring safe medication use, monitoring your vitals, and supporting your family.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => {
            const Icon = SERVICE_ICONS[service.icon] || Activity;

            return (
              <div
                key={service.id}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {service.id === 'srv-1' ? (
                    <button
                      onClick={() => openPrescriptionModal()}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
                    >
                      <span>Upload Prescription Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      to="/contact"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
                    >
                      <span>Inquire About Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
