import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Crown 
} from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, currentUser } = useShop();

  const isRegisterParam = location.pathname.includes('register');
  const [isRegister, setIsRegister] = useState(isRegisterParam);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  // If already logged in, show quick redirection
  if (currentUser) {
    return (
      <div className="bg-luxury-black min-h-[60vh] flex flex-col items-center justify-center p-6 text-luxury-cream text-center">
        <Crown className="w-12 h-12 text-luxury-gold mb-3" />
        <h2 className="font-serif text-2xl font-bold">Welcome, {currentUser.name}</h2>
        <p className="text-xs text-gray-400 mt-1">You are signed in as {currentUser.role === 'admin' ? 'Executive Administrator' : 'Privé Member'}.</p>
        <div className="flex gap-4 mt-6">
          <Link to="/account" className="px-6 py-2.5 rounded-full bg-gold-gradient text-luxury-black text-xs font-bold uppercase tracking-wider">
            View My Account
          </Link>
          {currentUser.role === 'admin' && (
            <Link to="/admin" className="px-6 py-2.5 rounded-full bg-luxury-charcoal border border-luxury-gold text-luxury-gold text-xs font-bold uppercase tracking-wider">
              Admin Portal
            </Link>
          )}
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      const res = register({ name, email, phone, city });
      if (res.success) navigate('/account');
    } else {
      const res = login(email, password);
      if (res.success) {
        if (res.user.role === 'admin') navigate('/admin');
        else navigate('/account');
      }
    }
  };

  const fillDemoCustomer = () => {
    setEmail('customer@maimunasluxury.com');
    setPassword('luxuryVIP2026');
    setIsRegister(false);
  };

  const fillDemoAdmin = () => {
    setEmail('admin@maimunasluxury.com');
    setPassword('admin123');
    setIsRegister(false);
  };

  return (
    <div className="bg-luxury-black min-h-screen text-luxury-cream py-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-luxury-cream">
              MAIMUNA'S <span className="text-luxury-gold">LUXURY</span>
            </span>
            <p className="text-[9px] uppercase tracking-[0.3em] text-luxury-goldLight/70 font-sans mt-0.5">
              Elegance, Class and Luxury
            </p>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-luxury-card border border-luxury-border shadow-2xl space-y-6">
          
          {/* Tabs */}
          <div className="flex border-b border-luxury-border pb-3 text-xs uppercase font-serif font-bold tracking-wider">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 pb-2 border-b-2 transition-all ${!isRegister ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-500 hover:text-white'}`}
            >
              VIP Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 pb-2 border-b-2 transition-all ${isRegister ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-500 hover:text-white'}`}
            >
              Privé Registration
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegister && (
              <>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1 font-medium">
                    Full Title & Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Zainab Al-Mansur"
                      required
                      className="w-full bg-luxury-surface text-luxury-cream text-xs pl-10 pr-4 py-2.5 rounded-lg border border-luxury-border focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1 font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      required
                      className="w-full bg-luxury-surface text-luxury-cream text-xs pl-10 pr-4 py-2.5 rounded-lg border border-luxury-border focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1 font-medium">
                    City / Residence
                  </label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ikoyi, Lagos or Maitama, Abuja"
                    className="w-full bg-luxury-surface text-luxury-cream text-xs px-4 py-2.5 rounded-lg border border-luxury-border focus:border-luxury-gold focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@luxurymail.com"
                  required
                  className="w-full bg-luxury-surface text-luxury-cream text-xs pl-10 pr-4 py-2.5 rounded-lg border border-luxury-border focus:border-luxury-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1 font-medium">
                Secret Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-luxury-surface text-luxury-cream text-xs pl-10 pr-4 py-2.5 rounded-lg border border-luxury-border focus:border-luxury-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-gold-gradient text-luxury-black font-serif text-xs font-bold uppercase tracking-[0.2em] shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-6"
            >
              <span>{isRegister ? "Complete Privé Registration" : "Enter Luxury Salon"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Quick Demo Logins Helper */}
          <div className="pt-4 border-t border-luxury-border/60">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-mono text-center">
              Quick One-Click Test Profiles:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="p-2 rounded-lg bg-luxury-surface border border-luxury-border hover:border-luxury-gold text-gray-300 hover:text-luxury-gold text-[11px] transition-colors"
              >
                VIP Customer Demo
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="p-2 rounded-lg bg-luxury-surface border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/15 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Suite Demo</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
