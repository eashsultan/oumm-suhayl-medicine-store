export const DEFAULT_PHARMACY_SETTINGS = {
  storeName: "Oumm Suhayl Medicine Store",
  tagline: "Your Health, Our Priority",
  welcomeMessage: "Welcome to Oumm Suhayl Medicine Store. We are your trusted neighborhood and digital pharmacy, providing 100% genuine medications, essential healthcare supplies, and professional pharmaceutical consultation.",
  phone: "+234 803 892 1100",
  phoneDisplay: "+234 803 892 1100",
  whatsappNumber: "+2348038921100",
  whatsappDisplay: "+234 803 892 1100",
  email: "care@oummsuhayl.ng",
  address: "Plot 14, Commercial Health Arcade, Aminu Kano Way, Wuse 2, Abuja, Nigeria",
  city: "Abuja",
  state: "Federal Capital Territory",
  country: "Nigeria",
  openingHours: {
    weekdays: "Monday – Friday: 7:30 AM – 10:00 PM",
    saturday: "Saturday: 8:00 AM – 10:00 PM",
    sunday: "Sunday: 10:00 AM – 8:00 PM",
    emergency: "24/7 On-Call Pharmacist via WhatsApp"
  },
  licenseNotice: "Licensed by Pharmacists Council of Nigeria (PCN) • License No: PCN/FCT/2024/9918 • 100% NAFDAC Regulated",
  heroAnnouncement: "✨ Healthy Living Campaign: Free Blood Pressure & Glucose Checks every Saturday! 100% Genuine NAFDAC registered medications.",
  mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.8163939632896!2d7.472145374828116!3d9.071343990991965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0af9381e59c7%3A0x63391d643ee1f91!2sAminu%20Kano%20Cres%2C%20Wuse%202%2C%20Abuja!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
};

export const DEFAULT_PROMOTIONS = [
  {
    id: "promo-1",
    title: "Saturday Community Health Screening",
    badge: "Free In-Store Service",
    description: "Walk into Oumm Suhayl Medicine Store every Saturday for free blood pressure, blood glucose, and BMI screening conducted by our licensed pharmacist.",
    discount: "Free Checkup",
    validUntil: "Every Saturday (8:00 AM - 12:00 PM)",
    ctaText: "Book Your Slot",
    ctaLink: "#contact",
    bgGradient: "from-emerald-700 via-emerald-800 to-teal-900"
  },
  {
    id: "promo-2",
    title: "Family First Aid Preparedness Month",
    badge: "15% Off All First Aid",
    description: "Equip your home, office, and vehicle with certified medical first aid supplies and comprehensive trauma kits. Protect your loved ones from unforeseen emergencies.",
    discount: "15% DISCOUNT",
    validUntil: "Limited Time Offer",
    ctaText: "Shop First Aid",
    ctaLink: "/category/first-aid",
    bgGradient: "from-teal-800 via-cyan-900 to-blue-950"
  },
  {
    id: "promo-3",
    title: "Senior Citizens Chronic Care Refills",
    badge: "Prescription Refill Subsidy",
    description: "Get seamless monthly doorstep refills on blood pressure, cholesterol, and diabetes maintenance prescriptions with free pharmacist medication review.",
    discount: "Free Delivery",
    validUntil: "Ongoing Support",
    ctaText: "Send Prescription",
    ctaLink: "#prescription",
    bgGradient: "from-blue-900 via-emerald-900 to-slate-900"
  }
];

export const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    author: "Hajiya Maryam Bello",
    role: "Verified Patient • Wuse 2, Abuja",
    rating: 5,
    date: "November 2, 2026",
    content: "Oumm Suhayl Medicine Store is my family's most trusted pharmacy. When my mother needed urgent hypertension medication late in the evening, I messaged their WhatsApp. The pharmacist answered immediately, verified the prescription, and delivered it within 45 minutes! 100% genuine medicines.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-2",
    author: "Dr. Ibrahim Danladi",
    role: "Medical Consultant • Garki Hospital",
    rating: 5,
    date: "October 26, 2026",
    content: "As a practicing physician, finding a retail pharmacy that strictly adheres to prescription protocols and ethical storage for temperature-sensitive drugs is crucial. Oumm Suhayl Medicine Store sets the benchmark. Their staff are knowledgeable, polite, and uncompromising on quality.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-3",
    author: "Amina Yusuf",
    role: "Mother of Two • Maitama, Abuja",
    rating: 5,
    date: "October 18, 2026",
    content: "Their baby care section is a blessing! When my 3-month-old was having severe colic, the on-duty pharmacist patiently guided me on using Infacol and baby comfort techniques. Their prices are very reasonable compared to other stores in town.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-4",
    author: "Engr. Emmanuel Okon",
    role: "Verified Customer • Central Business District",
    rating: 5,
    date: "October 12, 2026",
    content: "I purchased the Omron digital BP monitor and a complete family first aid kit. Both items arrived in sealed factory packaging with valid warranty and NAFDAC numbers. The WhatsApp follow-up to ensure I understood how to calibrate the device was top notch.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const PHARMACY_SERVICES = [
  {
    id: "srv-1",
    title: "Prescription Dispensing & Refills",
    description: "Accurate, timely dispensing of prescription medications by licensed pharmacists with comprehensive dosage and contraindication counseling.",
    icon: "FileCheck",
    badge: "PCN Certified"
  },
  {
    id: "srv-2",
    title: "Pharmacist OTC Consultation",
    description: "Speak directly with our clinical pharmacist for trusted guidance on minor ailments, cold remedies, pain management, and pediatric wellness.",
    icon: "UserCheck",
    badge: "Always Free"
  },
  {
    id: "srv-3",
    title: "Vital Signs & Health Screening",
    description: "Fast, accurate blood pressure checks, blood glucose monitoring, BMI calculation, and temperature screening conducted in a comfortable private setting.",
    icon: "Activity",
    badge: "Walk-in Welcome"
  },
  {
    id: "srv-4",
    title: "Maternal & Child Healthcare",
    description: "Specialized pediatric supplements, infant formula, colic remedies, diaper care, and pregnancy nutritional supplements tailored for mother and child.",
    icon: "HeartHandshake",
    badge: "Family Focus"
  },
  {
    id: "srv-5",
    title: "First Aid & Emergency Preparedness",
    description: "Customized first aid supplies for homes, schools, corporate offices, and transport fleets, backed by basic triage counseling.",
    icon: "ShieldPlus",
    badge: "Emergency Kits"
  },
  {
    id: "srv-6",
    title: "Prompt Doorstep Delivery",
    description: "Fast, discreet delivery of over-the-counter essentials and verified prescription medications right to your doorstep in Abuja and nationwide.",
    icon: "Truck",
    badge: "Swift Dispatch"
  }
];
