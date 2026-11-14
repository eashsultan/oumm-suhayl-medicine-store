# OUMM SUHAYL MEDICINE STORE – Professional Pharmacy & Healthcare Website

**OUMM SUHAYL MEDICINE STORE** is a modern, responsive, and trustworthy pharmaceutical web platform built to advertise the pharmacy, showcase available medicines and healthcare products, build customer trust, ensure full compliance with Nigerian pharmacy regulations (PCN & NAFDAC), and allow patients and families to consult and order easily via WhatsApp and direct contact.

---

## ✦ Brand Identity & Visual Aesthetic

- **Pharmacy Name**: OUMM SUHAYL MEDICINE STORE
- **Brand Slogan**: *"Your Health, Our Priority."*
- **Color Palette**:
  - **Medical Green**: `#059669`, `#10b981`, `#047857` (Fresh clinical pharmacy green)
  - **Dark Green**: `#064e3b`, `#065f46`, `#022c22` (Deep pharmacy authority accents)
  - **Light Blue / Sky**: `#0284c7`, `#38bdf8`, `#e0f2fe` (Clinical confidence and cleanliness)
  - **White & Slate**: `#ffffff`, `#f8fafc`, `#f1f5f9` (Clean, sterile, hospital-grade background)
  - **Rx Amber / Red**: `#dc2626`, `#f59e0b` (Prescription-only alerts)
- **Typography**: Clean, professional sans-serif pairing (`Plus Jakarta Sans` and `Inter`).

---

## ✦ 9 Product & Healthcare Categories

1. **Pain Relief Medicines**: Fast-acting analgesics, migraine relief, anti-inflammatory rubs, dental pain caplets.
2. **Vitamins and Supplements**: High-strength effervescent Vitamin C + Zinc, multivitamins, pure cod liver oil, calcium.
3. **First Aid Products**: Comprehensive family trauma kits, Dettol antiseptic, sterile bandages, gauze, burn care.
4. **Baby Care Products**: Infacol infant colic drops, Sudocrem healing ointment, pediatric fever drops, gentle wipes.
5. **Personal Care Products**: Antibacterial soaps, sensitive toothpaste, oral rinses, sanitizers.
6. **Skin Care Products**: Dermatological moisturizers (CeraVe), therapeutic creams, broad-spectrum SPF 50+ sunscreens.
7. **Medical Equipment**: Clinically validated Omron digital BP monitors, Accu-Chek glucose kits, fingertip pulse oximeters, nebulizers.
8. **Prescription Medicines (Rx Only)**: Artemether/Lumefantrine malaria therapy, Augmentin, Metformin, Amlodipine (dispensed strictly upon doctor prescription).
9. **General Healthcare Products**: Heartburn relief suspensions (Gaviscon), multi-symptom cold caplets, WHO ORS rehydration sachets.

---

## ✦ Key Features & Functionalities

### 1. Modern Homepage
- **Prominent Brand Hero**: Large headline *"Your Health, Our Priority"*, welcome message, instant search bar, quick pills.
- **Action Buttons**: Explore Products, Contact Us, Chat With Us, Send Prescription.
- **Motion Pharmacy Advert Video**: Features the store's motion pharmacy video advert with responsive playback and audio controls.
- **9 Category Showcases**: Department cards with photos, tags, item counts, and links.
- **Featured Medicines**: Filterable tabs (Pain Relief, Vitamins, Baby Care, Medical Equipment, Rx Only).
- **Clinical Pharmacy Services**: Prescription Dispensing, OTC Consultation, Health Screening, Maternal Care, First Aid, Swift Delivery.
- **Prescription Compliance Banner**: Detailed 3-step guide for submitting doctor scripts.
- **Special Offers & Health Campaigns**: Free Saturday BP checks, first aid discounts, chronic care subsidies.
- **Verified Customer Reviews**: Authentic patient testimonials with "Share Your Experience" submission modal.

### 2. Comprehensive Medicine Catalog (`/shop`)
- Real-time search across medicine names, active ingredients, brands, and indications.
- Filter by all 9 departments, OTC vs Prescription (Rx Only), and in-stock status.
- Sort by featured, price (low/high), name, and customer rating.
- Interactive Quick View modal for rapid dosage and spec review.

### 3. Rich Product Detail Page (`/product/:id`)
- High-res product imagery and stock status.
- Dosage, active chemical ingredient, pack presentation, and NAFDAC registration badge.
- Clinical tabs: Indications, Dosage & Administration, Precautions & Warnings, Storage Guidelines.
- Direct "Enquire on WhatsApp" pre-filled message generator.
- "Upload Prescription" modal trigger for regulated Rx items.

### 4. Prescription Upload & Verification (`PrescriptionModal`)
- Compliant with Pharmacists Council of Nigeria (PCN) guidelines.
- Patients can input patient name, phone, doctor/hospital, and attach photos of handwritten/printed prescriptions.
- Instant routing to the dispensary queue and WhatsApp pharmacist.

### 5. Floating WhatsApp Pharmacist Widget
- Sticky floating widget at the bottom-right corner.
- Live status indicator: *"Pharmacist Online • Usually replies in minutes"*.
- Quick action options: Check availability, send doctor's prescription, or ask health questions.

### 6. Interactive Contact & Store Location (`/contact`)
- WhatsApp chat, direct phone dial, email, and verified physical store address in Abuja, Nigeria.
- Interactive Google Maps location embed.
- Full business hours schedule (Weekdays, Saturday, Sunday, Emergency 24/7).
- Contact form that records inquiries directly into the pharmacy queue.

### 7. Secure Admin Dashboard (`/admin`)
- **Login Credentials**:
  - **Username**: `admin`
  - **Password**: `oumm-suhayl2026`
- **Product Management**: Add new medicines, edit existing records, update prices, change stock status, toggle Rx prescription requirement.
- **Store & Contact Settings**: Edit Pharmacy Name, phone, WhatsApp number, email, address, opening hours, and banner announcements.
- **Promotions & Offers**: Create and manage health campaign banners.
- **Inquiries & Prescription Queue**: View patient messages and reply via WhatsApp or phone.
- **Reviews Moderation**: Approve, add, or delete patient reviews.
- **Restore Defaults Button**: Easily resets inventory to verified pharmaceutical defaults.

---

## ✦ Regulatory & Medical Safety Disclaimers

1. **Not a Substitute for Medical Advice**: All website health information is educational and not intended to replace direct consultation with a licensed doctor or pharmacist.
2. **Prescription Integrity**: Prescription-Only Medicines (marked Rx) are strictly dispensed only after presentation and verification of a valid doctor's prescription in accordance with PCN and NAFDAC laws.

---

## ✦ Development & Build

```bash
# Start local development server
npm.cmd run dev

# Build production bundle
npm.cmd run build

# Preview production build
npm.cmd run preview
```
