import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  FileText,
  User,
  Plus
} from 'lucide-react';

export default function Navbar() {
  const {
    settings,
    categories,
    products,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    openPrescriptionModal,
    isAdminLoggedIn
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setIsSearchFocused(false);
  }, [location.pathname]);

  // Click outside search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.activeIngredient.toLowerCase().includes(query) ||
      p.indications.toLowerCase().includes(query)
    ).slice(0, 6);
    setSearchResults(results);
  }, [searchQuery, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Emergency & Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-pharmacy-800 to-emerald-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Contact & Pharmacist Status */}
          <div className="flex items-center flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5"></span>
              Pharmacist on Duty
            </span>
            <span className="hidden sm:inline text-emerald-600">|</span>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-1 hover:text-emerald-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>{settings.phoneDisplay}</span>
            </a>
            <span className="hidden sm:inline text-emerald-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              {settings.openingHours.weekdays}
            </span>
          </div>

          {/* Right: Announcement / NAFDAC & Admin */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-emerald-200/90 font-medium">
              {settings.heroAnnouncement.slice(0, 75)}...
            </span>
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="text-xs bg-emerald-700/80 hover:bg-emerald-600 px-2.5 py-0.5 rounded-full transition-colors text-white font-medium flex items-center gap-1"
                title="Admin Control Center"
              >
                <User className="w-3 h-3" />
                <span>{isAdminLoggedIn ? "Admin Panel (Active)" : "Staff Login"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pharmacy-700 via-pharmacy-600 to-medblue-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="relative flex items-center justify-center">
                <Plus className="w-7 h-7 stroke-[3]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-pharmacy-900 leading-tight">
                OUMM SUHAYL
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-600 flex items-center gap-1">
                <span>Medicine Store</span>
                <span className="w-1.5 h-1.5 rounded-full bg-medblue-500"></span>
                <span className="text-[10px] text-slate-500 font-semibold lowercase">Pharmacy</span>
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden lg:block flex-1 max-w-md mx-4 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search medicines, pain relief, baby care, vitamins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm pl-10 pr-12 py-2.5 rounded-full border border-slate-200 focus:border-pharmacy-500 focus:ring-2 focus:ring-pharmacy-500/20 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Instant Autocomplete Popup */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Medicines & Products ({searchResults.length})
                </div>
                {searchResults.map(prod => (
                  <Link
                    key={prod.id}
                    to={`/product/${prod.id}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-emerald-50 transition-colors group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate group-hover:text-pharmacy-700">
                        {prod.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{prod.categoryName}</span>
                        {prod.prescriptionRequired && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 rounded">
                            Rx Only
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-pharmacy-700">
                      ₦{prod.price.toLocaleString()}
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchFocused(false)}
                  className="block text-center text-xs font-semibold text-pharmacy-600 hover:text-pharmacy-800 py-2 bg-slate-50 border-t border-slate-100"
                >
                  View all search results →
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'text-pharmacy-600' : 'text-slate-700 hover:text-pharmacy-600'
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/shop' ? 'text-pharmacy-600' : 'text-slate-700 hover:text-pharmacy-600'
              }`}
            >
              All Medicines
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-pharmacy-600 transition-colors py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-pharmacy-700 transition-colors"
                    >
                      <span>{cat.name}</span>
                      {cat.isRx ? (
                        <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                          Rx
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          {cat.itemCount} items
                        </span>
                      )}
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      to="/shop"
                      className="block text-center text-xs font-semibold text-pharmacy-600 hover:text-pharmacy-800 py-1"
                    >
                      Browse All Categories →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/about' ? 'text-pharmacy-600' : 'text-slate-700 hover:text-pharmacy-600'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/contact' ? 'text-pharmacy-600' : 'text-slate-700 hover:text-pharmacy-600'
              }`}
            >
              Contact & Hours
            </Link>
          </nav>

          {/* Action CTAs: Prescription Modal, WhatsApp Button, Cart Drawer */}
          <div className="flex items-center gap-3">
            
            {/* Upload Prescription Action Button */}
            <button
              onClick={() => openPrescriptionModal()}
              className="hidden sm:inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-sm"
              title="Upload Doctor's Prescription"
            >
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              <span>Send Prescription</span>
            </button>

            {/* Direct WhatsApp Chat Action */}
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Oumm Suhayl Medicine Store, I would like to speak with a pharmacist.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl text-slate-600 hover:text-pharmacy-600 hover:bg-emerald-50 transition-colors"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart / Order Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-slate-700 hover:text-pharmacy-600 hover:bg-emerald-50 transition-colors"
              title="View Medicine Order List"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search medicines, vitamins, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 text-slate-800 text-xs pl-9 pr-8 py-2 rounded-xl border border-slate-200 outline-none focus:border-pharmacy-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-800">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-pharmacy-700"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-pharmacy-700"
            >
              All Medicines & Products
            </Link>
            
            {/* Mobile Categories list */}
            <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Browse Categories
            </div>
            <div className="grid grid-cols-1 gap-1 pl-2">
              {categories.map(c => (
                <Link
                  key={c.id}
                  to={`/category/${c.id}`}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-emerald-50 hover:text-pharmacy-700 flex items-center justify-between"
                >
                  <span>{c.name}</span>
                  {c.isRx && <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1 rounded">Rx</span>}
                </Link>
              ))}
            </div>

            <Link
              to="/about"
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-pharmacy-700"
            >
              About Oumm Suhayl Store
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-pharmacy-700"
            >
              Contact & Store Location
            </Link>
            <Link
              to="/admin"
              className="px-3 py-2 rounded-lg bg-emerald-50 text-pharmacy-800 font-semibold flex items-center justify-between"
            >
              <span>Admin Management Dashboard</span>
              <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Secure</span>
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPrescriptionModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-700 border border-rose-200 font-semibold py-2.5 rounded-xl text-xs"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>Send Prescription to Pharmacist</span>
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Oumm Suhayl Medicine Store, I have a medical question.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
