import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/product/ProductCard';
import {
  Filter,
  Search,
  SlidersHorizontal,
  X,
  ShieldCheck,
  AlertCircle,
  FileText,
  ChevronDown
} from 'lucide-react';

export default function ShopPage() {
  const { products, categories, openPrescriptionModal } = useShop();
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [rxFilter, setRxFilter] = useState('all'); // 'all', 'otc', 'rx'
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync categoryId from route
  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory('all');
    }
  }, [categoryId]);

  // Sync search query from url
  useEffect(() => {
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchFromUrl]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Rx filter
      if (rxFilter === 'otc' && product.prescriptionRequired) return false;
      if (rxFilter === 'rx' && !product.prescriptionRequired) return false;

      // Stock filter
      if (inStockOnly && !product.inStock) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesActive = product.activeIngredient.toLowerCase().includes(query);
        const matchesIndication = product.indications.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesActive && !matchesIndication && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, rxFilter, inStockOnly, searchTerm, sortBy]);

  const activeCategoryObj = categories.find(c => c.id === selectedCategory);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setRxFilter('all');
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-emerald-700">Home</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">
              {activeCategoryObj ? activeCategoryObj.name : 'All Medicines & Products'}
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeCategoryObj ? activeCategoryObj.name : 'Pharmacy Products & Medicines'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : `Showing ${filteredProducts.length} authentic healthcare products and medicines.`}
              </p>
            </div>

            {/* Upload Prescription button */}
            <button
              onClick={() => openPrescriptionModal()}
              className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>Send Doctor's Prescription</span>
            </button>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by medicine, condition, or active ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle & Sort Dropdown */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold px-3 py-2 rounded-xl outline-none focus:border-emerald-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>Filter Medicines</span>
                </div>
                {(selectedCategory !== 'all' || rxFilter !== 'all' || inStockOnly || searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-emerald-700 hover:underline font-semibold"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Department / Category Filter */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Department ({categories.length})
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left text-xs px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Departments</span>
                    <span className="text-[10px] text-slate-400">{products.length}</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      {cat.isRx ? (
                        <span className="text-[9px] bg-rose-100 text-rose-700 px-1 py-0.5 rounded font-bold">Rx</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prescription Type Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Prescription Status
                </h4>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="rxFilter"
                      checked={rxFilter === 'all'}
                      onChange={() => setRxFilter('all')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>All Medicines</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="rxFilter"
                      checked={rxFilter === 'otc'}
                      onChange={() => setRxFilter('otc')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Over-The-Counter (OTC) Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-rose-700 font-medium">
                    <input
                      type="radio"
                      name="rxFilter"
                      checked={rxFilter === 'rx'}
                      onChange={() => setRxFilter('rx')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>Prescription Required (Rx Only)</span>
                  </label>
                </div>
              </div>

              {/* In Stock Only Toggle */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Pharmacy Guarantee Notice */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NAFDAC Regulated</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-tight">
                  All medicines are certified authentic and dispensed according to Pharmacists Council guidelines.
                </p>
              </div>

            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Bar */}
            {(selectedCategory !== 'all' || rxFilter !== 'all' || inStockOnly || searchTerm) && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 font-medium">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                    {activeCategoryObj ? activeCategoryObj.name : selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {rxFilter !== 'all' && (
                  <span className="bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                    {rxFilter === 'rx' ? 'Prescription Only' : 'OTC Only'}
                    <button onClick={() => setRxFilter('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Results Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">No medicines found matching criteria</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your filters, clearing your search term, or contacting our on-duty pharmacist directly on WhatsApp.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
