import React, { useRef, useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Play, Pause, Volume2, VolumeX, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function PharmacyVideoSection() {
  const { settings, getWhatsAppUrl } = useShop();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Oumm Suhayl Motion Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience Pharmacy Care in Motion
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Watch our official promotional advert highlighting our modern pharmacy stock, licensed pharmaceutical team, and commitment to community wellbeing.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-slate-950 aspect-video group">
            
            <video
              ref={videoRef}
              src="/oumm-suhayl-pharmacy-advert.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Top Video Overlay Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {settings.storeName}
                </span>
              </div>

              <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[11px] font-semibold text-emerald-300 pointer-events-auto">
                Official Pharmacy Advert
              </div>
            </div>

            {/* Video Control Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Bottom Video Callout */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white text-sm">Need Medication or Doctor Prescription Filled?</div>
                <div className="text-slate-400">Our pharmacists are ready to consult with you online or in our store.</div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={getWhatsAppUrl("Hello Oumm Suhayl Medicine Store, I watched your pharmacy video advert and would like to make an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
