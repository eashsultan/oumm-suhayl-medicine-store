import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  FileText,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function PrescriptionModal() {
  const {
    isPrescriptionModalOpen,
    closePrescriptionModal,
    prescriptionTargetProduct,
    submitEnquiry,
    getWhatsAppUrl
  } = useShop();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [doctorOrHospital, setDoctorOrHospital] = useState('');
  const [medicationNotes, setMedicationNotes] = useState(
    prescriptionTargetProduct ? `Prescription for: ${prescriptionTargetProduct.name}` : ''
  );
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isPrescriptionModalOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert("Please enter patient name and contact phone number.");
      return;
    }

    // Submit to store enquiries
    submitEnquiry({
      name: patientName,
      phone: patientPhone,
      email: '',
      subject: `Prescription Submission: ${doctorOrHospital || 'Doctor Prescription'}`,
      type: "Prescription Upload",
      message: `Prescription for ${patientName}. Details: ${medicationNotes || 'See attached/WhatsApp image'}. Prescribing Doctor/Hospital: ${doctorOrHospital || 'Not specified'}. File attached: ${fileName || 'Ready to send on WhatsApp'}.`
    });

    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const text = `*PRESCRIPTION DISPENSING REQUEST - OUMM SUHAYL PHARMACY*\n\n` +
      `• Patient Name: *${patientName}*\n` +
      `• Phone: ${patientPhone}\n` +
      `• Doctor/Clinic: ${doctorOrHospital || 'Not specified'}\n` +
      `• Medicine Requested: ${medicationNotes || (prescriptionTargetProduct ? prescriptionTargetProduct.name : 'As per attached prescription')}\n` +
      (fileName ? `• Attached Document: ${fileName}\n` : '') +
      `\nHello Pharmacist, I have attached / will attach the photo of my doctor's prescription. Please review and advise on availability and dosage. Thank you!`;

    window.open(getWhatsAppUrl(text), '_blank');
    closePrescriptionModal();
  };

  const handleClose = () => {
    setSubmitted(false);
    setPatientName('');
    setPatientPhone('');
    setDoctorOrHospital('');
    setMedicationNotes('');
    setFileName('');
    closePrescriptionModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-emerald-800 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-rose-200 hover:text-white p-1 rounded-full hover:bg-rose-600/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-rose-200">
                Oumm Suhayl Medicine Store
              </div>
              <h3 className="text-xl font-bold leading-tight">
                Upload Doctor's Prescription
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Prescription Details Logged!
                </h4>
                <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  Our licensed pharmacist has received your request. To expedite verification, send the prescription photo directly on WhatsApp.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Photo to Pharmacist on WhatsApp</span>
                </button>
                <button
                  onClick={handleClose}
                  className="text-xs text-slate-500 hover:text-slate-800 py-1"
                >
                  Close this window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* PCN Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>PCN & NAFDAC Requirement:</strong> Prescription-Only Medicines (marked Rx) require a legible doctor's prescription showing patient name, doctor's signature/stamp, and date.
                </p>
              </div>

              {/* Target Product Notice */}
              {prescriptionTargetProduct && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">Requesting: </span>
                    <strong className="text-slate-900">{prescriptionTargetProduct.name}</strong>
                  </div>
                  <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded text-[10px]">
                    Rx Required
                  </span>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Abubakar"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prescribing Doctor / Hospital (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Haruna / National Hospital Abuja"
                  value={doctorOrHospital}
                  onChange={(e) => setDoctorOrHospital(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Medication Name(s) or Special Instructions
                </label>
                <textarea
                  rows="2"
                  placeholder="Mention the medicines written on the prescription or dosage details..."
                  value={medicationNotes}
                  onChange={(e) => setMedicationNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                ></textarea>
              </div>

              {/* Prescription Image / Document Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attach Prescription Photo / Scan (PNG, JPG, PDF)
                </label>
                <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/30">
                  <UploadCloud className="w-7 h-7 text-emerald-600 mb-1" />
                  <span className="text-xs font-medium text-slate-700">
                    {fileName ? (
                      <span className="text-emerald-700 font-bold">{fileName}</span>
                    ) : (
                      "Click to choose prescription photo or camera snapshot"
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Clear snapshot of doctor's handwritten or printed script
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-rose-600/20"
                >
                  Submit for Pharmacist Review
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Confidential medical data protected under pharmacist-patient privilege.</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
