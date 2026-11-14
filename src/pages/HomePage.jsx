import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import PharmacyVideoSection from '../components/home/PharmacyVideoSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedSection from '../components/home/FeaturedSection';
import PharmacyServicesSection from '../components/home/PharmacyServicesSection';
import SpecialOffersSection from '../components/home/SpecialOffersSection';
import PrescriptionBanner from '../components/home/PrescriptionBanner';
import ReviewsSection from '../components/home/ReviewsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Motion Video Advert Spotlight */}
      <PharmacyVideoSection />

      {/* 3. 9 Product Categories */}
      <CategoryShowcase />

      {/* 4. Featured Products & Pharmacy Essentials */}
      <FeaturedSection />

      {/* 5. Professional Pharmacy Services */}
      <PharmacyServicesSection />

      {/* 6. Prescription Submission & Legal Compliance */}
      <PrescriptionBanner />

      {/* 7. Special Offers & Health Campaigns */}
      <SpecialOffersSection />

      {/* 8. Patient Reviews & Testimonials */}
      <ReviewsSection />
    </div>
  );
}
