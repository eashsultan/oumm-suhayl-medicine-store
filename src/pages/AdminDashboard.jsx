import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Package,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Search,
  Settings,
  Tag,
  MessageSquare,
  FileText,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Lock,
  Unlock,
  AlertCircle,
  RotateCcw,
  Star,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    products,
    categories,
    settings,
    promotions,
    reviews,
    enquiries,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addProduct,
    updateProduct,
    deleteProduct,
    updateSettings,
    addPromotion,
    deletePromotion,
    deleteReview,
    deleteEnquiry,
    resetToDefaultData,
    getWhatsAppUrl
  } = useShop();

  // Authentication State
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'settings', 'promotions', 'enquiries', 'reviews'

  // Product Form State (for adding / editing)
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    category: 'pain-relief',
    categoryName: 'Pain Relief Medicines',
    price: '',
    originalPrice: '',
    dosage: '',
    activeIngredient: '',
    packSize: '',
    nafdacNo: '',
    description: '',
    indications: '',
    dosageInstructions: '',
    precautions: '',
    storage: '',
    image: '',
    inStock: true,
    prescriptionRequired: false,
    featured: true,
    isSpecialOffer: false,
    discountPercent: 0
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // New Promotion Form
  const [isAddingPromo, setIsAddingPromo] = useState(false);
  const [promoForm, setPromoForm] = useState({
    title: '',
    badge: 'Special Campaign',
    discount: '10% DISCOUNT',
    description: '',
    validUntil: 'Limited Time',
    ctaText: 'Explore Offer',
    ctaLink: '/shop',
    bgGradient: 'from-emerald-800 to-teal-900'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(adminUsername, adminPassword);
    if (!success) {
      setLoginError("Invalid credentials. Use username: admin, password: oumm-suhayl2026");
    } else {
      setLoginError('');
      setAdminPassword('');
    }
  };

  // Populate form to edit product
  const startEditProduct = (prod) => {
    setIsEditingProduct(true);
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name || '',
      brand: prod.brand || '',
      category: prod.category || 'pain-relief',
      categoryName: prod.categoryName || '',
      price: prod.price || '',
      originalPrice: prod.originalPrice || '',
      dosage: prod.dosage || '',
      activeIngredient: prod.activeIngredient || '',
      packSize: prod.packSize || '',
      nafdacNo: prod.nafdacNo || '',
      description: prod.description || '',
      indications: prod.indications || '',
      dosageInstructions: prod.dosageInstructions || '',
      precautions: prod.precautions || '',
      storage: prod.storage || '',
      image: prod.image || '',
      inStock: prod.inStock !== false,
      prescriptionRequired: !!prod.prescriptionRequired,
      featured: !!prod.featured,
      isSpecialOffer: !!prod.isSpecialOffer,
      discountPercent: prod.discountPercent || 0
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const cancelEditProduct = () => {
    setIsEditingProduct(false);
    setEditingProductId(null);
    setProductForm({
      name: '',
      brand: '',
      category: 'pain-relief',
      categoryName: 'Pain Relief Medicines',
      price: '',
      originalPrice: '',
      dosage: '',
      activeIngredient: '',
      packSize: '',
      nafdacNo: '',
      description: '',
      indications: '',
      dosageInstructions: '',
      precautions: '',
      storage: '',
      image: '',
      inStock: true,
      prescriptionRequired: false,
      featured: true,
      isSpecialOffer: false,
      discountPercent: 0
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.price) {
      alert("Please provide product name and price.");
      return;
    }

    const matchedCat = categories.find(c => c.id === productForm.category);
    const catName = matchedCat ? matchedCat.name : productForm.category;

    const payload = {
      ...productForm,
      categoryName: catName,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice) || Number(productForm.price),
      image: productForm.image.trim() || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    };

    if (isEditingProduct && editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    cancelEditProduct();
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoForm.title.trim() || !promoForm.description.trim()) {
      alert("Please enter title and description for the promotion.");
      return;
    }
    addPromotion(promoForm);
    setIsAddingPromo(false);
    setPromoForm({
      title: '',
      badge: 'Special Campaign',
      discount: '10% DISCOUNT',
      description: '',
      validUntil: 'Limited Time',
      ctaText: 'Explore Offer',
      ctaLink: '/shop',
      bgGradient: 'from-emerald-800 to-teal-900'
    });
  };

  const filteredAdminProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(productSearch.toLowerCase())
  );

  // If not logged in, show secure login form
  if (!isAdminLoggedIn) {
    return (
      <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md shadow-emerald-600/30">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Pharmacy Admin Portal
            </h2>
            <p className="text-xs text-slate-500">
              Oumm Suhayl Medicine Store • Secure Management Console
            </p>
          </div>

          {/* Demo helper badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
            <div className="font-bold">Default Demo Credentials:</div>
            <div>Username: <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">admin</code></div>
            <div>Password: <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">oumm-suhayl2026</code></div>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security Password / PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-400">
            Protected pharmacy dispensary system • Authorized personnel only
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Store Administrator Panel
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {settings.storeName} Management Console
            </h1>
            <p className="text-xs text-slate-500">
              Manage inventory, prices, prescription alerts, customer inquiries, and store settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm("Restore initial sample medicines and store settings?")) {
                  resetToDefaultData();
                }
              }}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
              title="Reset inventory to initial default medicines"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Products</span>
            <div className="text-2xl font-black text-slate-900">{products.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Active in catalogue</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">Prescription Items (Rx)</span>
            <div className="text-2xl font-black text-rose-600">
              {products.filter(p => p.prescriptionRequired).length}
            </div>
            <div className="text-[11px] text-slate-500">Regulated medicines</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">Customer Inquiries</span>
            <div className="text-2xl font-black text-sky-600">{enquiries.length}</div>
            <div className="text-[11px] text-slate-500">Messages & Rx requests</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">Patient Reviews</span>
            <div className="text-2xl font-black text-amber-500">{reviews.length}</div>
            <div className="text-[11px] text-slate-500">5-Star average feedback</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Medicines & Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store & Contact Info</span>
          </button>

          <button
            onClick={() => setActiveTab('promotions')}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'promotions'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Special Offers ({promotions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'enquiries'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquiries & Prescriptions ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({reviews.length})</span>
          </button>
        </div>

        {/* TAB 1: MEDICINES & PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            
            {/* Add / Edit Medicine Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {isEditingProduct ? "Edit Medicine / Product" : "Add New Medicine / Healthcare Product"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill in product details, pricing, prescription requirement, and upload picture link.
                    </p>
                  </div>
                </div>

                {isEditingProduct && (
                  <button
                    onClick={cancelEditProduct}
                    className="text-xs text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl font-medium"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Medicine / Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Panadol Extra Caplets"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Manufacturer / Brand *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GSK, Emzor, Bayer"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category Department *
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-emerald-500"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Selling Price (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1850"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Original / Strike Price (₦)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2200"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dosage / Formulation Specs
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 500mg Paracetamol / 65mg Caffeine"
                      value={productForm.dosage}
                      onChange={(e) => setProductForm({ ...productForm, dosage: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Active Chemical Ingredient
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Paracetamol BP 500mg"
                      value={productForm.activeIngredient}
                      onChange={(e) => setProductForm({ ...productForm, activeIngredient: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pack Presentation / Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Blister pack of 20 Caplets"
                      value={productForm.packSize}
                      onChange={(e) => setProductForm({ ...productForm, packSize: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      NAFDAC Registration Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. NAFDAC Reg: 04-1234"
                      value={productForm.nafdacNo}
                      onChange={(e) => setProductForm({ ...productForm, nafdacNo: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Picture URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Picture Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Description & Indications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Description & Benefits
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Describe the medical benefits and intended treatment..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dosage Instructions & Warnings
                    </label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Take 1 tablet twice daily with meals..."
                      value={productForm.dosageInstructions}
                      onChange={(e) => setProductForm({ ...productForm, dosageInstructions: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                    ></textarea>
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Available in Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-rose-700">
                    <input
                      type="checkbox"
                      checked={productForm.prescriptionRequired}
                      onChange={(e) => setProductForm({ ...productForm, prescriptionRequired: e.target.checked })}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>Requires Doctor's Prescription (Rx Only)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>

                {/* Action button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isEditingProduct ? "Update Medicine Record" : "Save Medicine to Store"}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Existing Medicines Inventory Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Current Pharmacy Inventory ({filteredAdminProducts.length} items)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time list of medicines available in store.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Medicine / Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Rx Type</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAdminProducts.map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                            />
                            <div>
                              <div className="font-bold text-slate-900">{prod.name}</div>
                              <div className="text-[11px] text-slate-400">{prod.brand} • {prod.dosage}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-800">
                          {prod.categoryName}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">
                          ₦{prod.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            prod.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${prod.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            {prod.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {prod.prescriptionRequired ? (
                            <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                              Rx Required
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                              OTC
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${prod.name}" from inventory?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STORE SETTINGS & CONTACT INFO */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Pharmacy Contact & Operational Settings
              </h3>
              <p className="text-xs text-slate-500">
                Update phone numbers, WhatsApp, physical address, business hours, and announcements.
              </p>
            </div>

            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pharmacy Store Name
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Store Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Chat Number (with country code, no +)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2348038921100"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value, phoneDisplay: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.city}
                    onChange={(e) => setSettingsForm({ ...settingsForm, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Physical Store Address
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Opening Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Weekdays Opening Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openingHours?.weekdays || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      openingHours: { ...settingsForm.openingHours, weekdays: e.target.value }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Saturday Opening Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openingHours?.saturday || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      openingHours: { ...settingsForm.openingHours, saturday: e.target.value }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sunday Opening Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openingHours?.sunday || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      openingHours: { ...settingsForm.openingHours, sunday: e.target.value }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Top Banner Announcement */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Top Announcement Ticker
                </label>
                <input
                  type="text"
                  value={settingsForm.heroAnnouncement || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroAnnouncement: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Store Settings</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: PROMOTIONS & SPECIAL OFFERS */}
        {activeTab === 'promotions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Special Offers & Health Campaign Banners
                  </h3>
                  <p className="text-xs text-slate-500">
                    Announce upcoming health screening days, seasonal discounts, and family packs.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingPromo(!isAddingPromo)}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingPromo ? "Close Form" : "Create New Banner"}</span>
                </button>
              </div>

              {isAddingPromo && (
                <form onSubmit={handlePromoSubmit} className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Campaign Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Free Blood Sugar Check"
                        value={promoForm.title}
                        onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Free Service, 15% Off"
                        value={promoForm.badge}
                        onChange={(e) => setPromoForm({ ...promoForm, badge: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Validity / Schedule
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Every Saturday (8am-12pm)"
                        value={promoForm.validUntil}
                        onChange={(e) => setPromoForm({ ...promoForm, validUntil: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Campaign Description *
                    </label>
                    <textarea
                      rows="2"
                      required
                      placeholder="Explain the health campaign details..."
                      value={promoForm.description}
                      onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                  >
                    Publish Campaign Banner
                  </button>
                </form>
              )}

              {/* Active Campaigns List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promotions.map(promo => (
                  <div
                    key={promo.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          {promo.badge}
                        </span>
                        <button
                          onClick={() => deletePromotion(promo.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove promo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900">{promo.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {promo.description}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 border-t border-slate-200 pt-2 flex items-center justify-between">
                      <span>{promo.validUntil}</span>
                      <span className="font-bold text-emerald-700">{promo.discount}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: ENQUIRIES & PRESCRIPTION SUBMISSIONS */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Patient Inquiries & Prescription Requests ({enquiries.length})
              </h3>
              <p className="text-xs text-slate-500">
                Messages submitted through the contact page and doctor prescription upload forms.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No inquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          enq.type === 'Prescription Upload' ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'
                        }`}>
                          {enq.type || 'Enquiry'}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{enq.name}</h4>
                        <span className="text-xs text-slate-400">• {enq.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">
                          {new Date(enq.date).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteEnquiry(enq.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Archive enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {enq.message}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href={getWhatsAppUrl(`Hello ${enq.name}, this is Oumm Suhayl Medicine Store replying to your enquiry.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Reply on WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${enq.phone}`}
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold px-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Call Patient</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Customer Reviews Moderation ({reviews.length})
              </h3>
              <p className="text-xs text-slate-500">
                Reviews shown on the homepage and about page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{rev.content}"
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <strong>{rev.author}</strong>
                    <span>{rev.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
