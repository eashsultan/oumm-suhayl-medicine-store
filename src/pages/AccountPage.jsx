import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut, 
  Compass, 
  Printer, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const { currentUser, orders, wishlist, products, formatPrice, logout } = useShop();
  const [activeTab, setActiveTab] = useState(initialTab);
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="bg-luxury-black min-h-[60vh] flex flex-col items-center justify-center p-6 text-luxury-cream text-center">
        <User className="w-12 h-12 text-luxury-gold mb-3" />
        <h2 className="font-serif text-2xl font-bold">Please Sign In</h2>
        <p className="text-xs text-gray-400 mt-1">Sign in to review your luxury order history and personal salon profile.</p>
        <Link to="/login" className="mt-4 px-6 py-2.5 rounded-full bg-gold-gradient text-luxury-black text-xs font-bold uppercase tracking-wider">
          Sign In / Register
        </Link>
      </div>
    );
  }

  // Filter orders for this customer (or show all for demo user)
  const myOrders = orders;
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-luxury-black min-h-screen text-luxury-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-luxury-border gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-luxury-gold text-xs uppercase tracking-[0.3em] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privé Salon Member</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-luxury-cream">
              {currentUser.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === 'admin' && (
              <Link 
                to="/admin" 
                className="px-4 py-2 rounded-full bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold-sm hover:brightness-105"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Admin</span>
              </Link>
            )}

            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="px-4 py-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-luxury-border pb-4 mb-8 text-xs uppercase font-serif font-bold tracking-wider">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === 'profile' ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Package className="w-4 h-4" />
            <span>Order Consignments ({myOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === 'wishlist' ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistProducts.length})</span>
          </button>
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-luxury-card border border-luxury-border space-y-4">
              <h3 className="font-serif text-base font-bold text-luxury-gold uppercase tracking-wider">
                Personal Credentials
              </h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-luxury-gold" />
                  <span>Full Name: <strong className="text-luxury-cream">{currentUser.name}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-luxury-gold" />
                  <span>Email: <strong className="text-luxury-cream">{currentUser.email}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  <span>Phone: <strong className="text-luxury-cream">{currentUser.phone}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-luxury-gold" />
                  <span>Member Tier: <span className="text-luxury-gold font-bold">Privé Royal Circle</span></span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-luxury-card border border-luxury-border space-y-4">
              <h3 className="font-serif text-base font-bold text-luxury-gold uppercase tracking-wider">
                Primary Delivery Residence
              </h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-luxury-cream">{currentUser.address?.street}</p>
                    <p className="text-gray-400">{currentUser.address?.city}, {currentUser.address?.state} State</p>
                    <p className="text-[11px] text-gray-500 mt-1">Nigeria (Armored Courier Dedicated Zone)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.length === 0 ? (
              <p className="text-xs text-gray-400">No previous orders found.</p>
            ) : (
              myOrders.map(order => (
                <div key={order.id} className="p-6 rounded-2xl bg-luxury-card border border-luxury-border space-y-4 shadow-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-luxury-border/60">
                    <div>
                      <span className="font-mono text-xs font-bold text-luxury-gold">{order.id}</span>
                      <p className="text-[11px] text-gray-400">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${order.status === 'Delivered' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40' : 'bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30'}`}>
                        {order.status}
                      </span>
                      <span className="font-sans font-bold text-sm text-luxury-goldLight">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="flex flex-wrap gap-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <img 
                          src={item.product?.images?.[0] || item.images?.[0]} 
                          alt="preview" 
                          className="w-8 h-10 object-cover rounded border border-luxury-border"
                        />
                        <span className="truncate max-w-[150px]">{item.product?.name || item.name} (×{item.quantity})</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3 text-xs">
                    <Link
                      to={`/track-order?orderId=${order.id}`}
                      className="text-luxury-gold hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Track Consignment</span>
                    </Link>

                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="text-gray-300 hover:text-white flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <p className="text-xs text-gray-400">No saved items in your wishlist.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-luxury-card border border-luxury-border flex flex-col justify-between space-y-3">
                    <img src={p.images[0]} alt={p.name} className="w-full aspect-[4/5] object-cover rounded-lg" />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-luxury-cream truncate">{p.name}</h4>
                      <p className="text-xs text-luxury-gold font-bold mt-1">{formatPrice(p.price)}</p>
                    </div>
                    <Link
                      to={`/product/${p.slug || p.id}`}
                      className="block text-center py-2 px-3 rounded-lg bg-gold-gradient text-luxury-black text-xs font-bold uppercase tracking-wider"
                    >
                      View Piece
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
