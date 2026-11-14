import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function ContactPage() {
  const { settings, submitEnquiry, getWhatsAppUrl, openPrescriptionModal } = useShop();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('General Pharmacy Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !message.trim()) {
      alert("Please fill in your name, phone number, and message.");
      return;
    }

    submitEnquiry({
      name: fullName.trim(),
      phone: phoneNumber.trim(),
      email: email.trim(),
      subject: department,
      type: "Contact Form",
      message: message.trim()
    });

    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `*NEW CONTACT MESSAGE - OUMM SUHAYL MEDICINE STORE*\n\n` +
      `• Name: *${fullName}*\n` +
      `• Phone: ${phoneNumber}\n` +
      (email ? `• Email: ${email}\n` : '') +
      `• Department/Subject: ${department}\n` +
      `• Message:\n${message}\n\n` +
      `Hello Pharmacist, please attend to my enquiry above. Thank you!`;

    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>We Are Here For You</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Oumm Suhayl Medicine Store
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach out directly to our clinical pharmacists via WhatsApp, phone, email, or visit our modern pharmacy store in Abuja.
          </p>
        </div>

        {/* 4 Contact Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* 1. WhatsApp */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-sm hover:shadow-card-hover transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-emerald-600 text-white" />
              </div>
              <h3 className="font-bold text-base text-slate-900">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant response from on-duty pharmacists for medicine availability, price checks, and advice.
              </p>
            </div>
            <a
              href={getWhatsAppUrl("Hello Oumm Suhayl Medicine Store, I would like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm block"
            >
              Open WhatsApp
            </a>
          </div>

          {/* 2. Direct Phone */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Direct Telephone</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Speak directly with our dispensary desk during normal opening hours.
              </p>
            </div>
            <a
              href={`tel:${settings.phone}`}
              className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm block"
            >
              Call {settings.phoneDisplay}
            </a>
          </div>

          {/* 3. Email Contact */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Email Address</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                For corporate inquiries, bulk supplies for clinics, and partnership queries.
              </p>
            </div>
            <a
              href={`mailto:${settings.email}`}
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors block truncate px-2"
            >
              {settings.email}
            </a>
          </div>

          {/* 4. Prescription Service */}
          <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-sm hover:shadow-card-hover transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Doctor Prescriptions</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Snap and upload your doctor's stamped prescription for expedited review.
              </p>
            </div>
            <button
              onClick={() => openPrescriptionModal()}
              className="w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm block"
            >
              Upload Prescription
            </button>
          </div>

        </div>

        {/* Main Content Grid: Form + Address/Hours/Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Send an Enquiry or Message
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Our pharmacy team will review and reply via phone call or WhatsApp.
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                    Thank you, {fullName}. Your enquiry has been routed to our on-duty pharmacist.
                  </p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Also Continue on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="inline-flex items-center justify-center text-xs text-slate-600 hover:text-slate-900 px-4 py-3"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aliyu Mohammed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. aliyu@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="General Pharmacy Inquiry">General Pharmacy Inquiry</option>
                      <option value="Check Medicine Availability">Check Medicine Availability & Price</option>
                      <option value="Doctor Prescription Dispensing">Doctor Prescription Dispensing</option>
                      <option value="Blood Pressure / Glucose Test">Vital Signs & Health Screening</option>
                      <option value="Medical Equipment & Supplies">Medical Equipment & Supplies</option>
                      <option value="Bulk Order for Clinic/Organization">Bulk Order for Clinic / School</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / Medicine Details *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Specify the medicine name, dosage, or your health question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20"
                  >
                    Submit Enquiry to Pharmacist
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your medical information is kept strictly confidential.</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Address, Opening Hours & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Opening Hours Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span>Business Opening Hours</span>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">Monday – Friday</span>
                  <strong className="text-slate-900">7:30 AM – 10:00 PM</strong>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">Saturday</span>
                  <strong className="text-slate-900">8:00 AM – 10:00 PM</strong>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">Sunday</span>
                  <strong className="text-slate-900">10:00 AM – 8:00 PM</strong>
                </div>
                <div className="flex items-center justify-between pt-2 text-emerald-700 font-bold">
                  <span>Emergency On-Call</span>
                  <span>24/7 via WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Store Location Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Physical Store Location</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {settings.address}
              </p>

              {/* Interactive Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] w-full bg-slate-100 relative shadow-inner">
                <iframe
                  title="Oumm Suhayl Medicine Store Location"
                  src={settings.mapLocation}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
