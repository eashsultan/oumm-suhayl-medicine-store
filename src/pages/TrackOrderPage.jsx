import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Compass, 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  MessageCircle,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';

export default function TrackOrderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const { orders, formatPrice, settings } = useShop();

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      setOrderQuery(initialOrderId);
      handleSearch(initialOrderId);
    } else if (orders.length > 0) {
      // Default to first order for instant preview
      setActiveOrder(orders[0]);
    }
  }, [initialOrderId, orders]);

  const handleSearch = (queryToSearch) => {
    const q = (queryToSearch || orderQuery).trim().toUpperCase();
    if (!q) return;

    setSearched(true);
    const found = orders.find(o => 
      o.id.toUpperCase() === q ||
      o.trackingNumber?.toUpperCase() === q ||
      o.customer?.email?.toLowerCase() === q.toLowerCase()
    );

    setActiveOrder(found || null);
  };

  const statusOrder = [
    "Pending",
    "Payment Confirmed",
    "Processing",
    "Shipped",
    "Delivered"
  ];

  const getStatusIndex = (status) => {
    if (status === 'Cancelled') return -1;
    const idx = statusOrder.indexOf(status);
    return idx !== -1 ? idx : 1;
  };

  const currentStep = activeOrder ? getStatusIndex(activeOrder.status) : 0;

  return (
    <div className="bg-luxury-black min-h-screen text-luxury-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-luxury-charcoal border border-luxury-gold/40 mx-auto flex items-center justify-center text-luxury-gold mb-3 shadow-lg">
            <Compass className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-2 text-luxury-gold text-xs uppercase tracking-[0.3em] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consignment Concierge</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-luxury-cream">
            Live Consignment Tracking
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-2 font-light">
            Enter your serialized Order Identifier or registered client email to inspect real-time courier dispatch status.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              <input 
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order Ref (e.g. ML-2026-8941) or Email..."
                className="w-full bg-luxury-charcoal text-luxury-cream text-xs pl-11 pr-4 py-3 rounded-full border border-luxury-border focus:border-luxury-gold focus:outline-none uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gold-gradient text-luxury-black text-xs font-serif font-bold uppercase tracking-[0.2em] shadow-gold-sm hover:brightness-110 transition-all shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          {orders.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-gray-400">
              <span className="uppercase tracking-wider">Recent Orders:</span>
              {orders.slice(0, 3).map(o => (
                <button
                  key={o.id}
                  onClick={() => { setOrderQuery(o.id); handleSearch(o.id); }}
                  className="px-2.5 py-1 rounded bg-luxury-charcoal border border-luxury-border hover:border-luxury-gold text-luxury-gold font-mono transition-colors"
                >
                  {o.id} ({o.status})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Card */}
        {activeOrder ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-luxury-card border border-luxury-border shadow-2xl space-y-8 animate-in fade-in duration-300">
            
            {/* Order Status Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-luxury-border gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                  Consignment Ref
                </span>
                <h2 className="font-mono text-2xl font-bold text-luxury-cream">
                  {activeOrder.id}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Placed on {new Date(activeOrder.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono ${activeOrder.status === 'Delivered' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/60' : activeOrder.status === 'Cancelled' ? 'bg-red-950/80 text-red-400 border border-red-500/60' : 'bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/40'}`}>
                  ● {activeOrder.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  Est. Delivery: <strong className="text-luxury-goldLight">{activeOrder.estimatedDelivery || "2-3 Days"}</strong>
                </p>
              </div>
            </div>

            {/* Visual Step-by-Step Luxury Timeline */}
            <div>
              <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-luxury-gold mb-6">
                Transit Milestones
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                {statusOrder.map((stepName, idx) => {
                  const isCompleted = idx <= currentStep && activeOrder.status !== 'Cancelled';
                  const isCurrent = idx === currentStep && activeOrder.status !== 'Cancelled';

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative group">
                      
                      {/* Circle Icon */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 transition-all ${isCompleted ? 'bg-gold-gradient border-luxury-gold text-luxury-black shadow-gold-sm' : 'bg-luxury-surface border-luxury-border text-gray-600'}`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="font-mono text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>

                      {/* Label */}
                      <span className={`font-serif text-xs font-bold tracking-wider ${isCurrent ? 'text-luxury-gold' : isCompleted ? 'text-luxury-cream' : 'text-gray-500'}`}>
                        {stepName}
                      </span>

                      {/* Sub-note */}
                      <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {isCurrent ? "Current Stage" : isCompleted ? "Completed" : "Scheduled"}
                      </span>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consignment Coordinates & Courier Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-luxury-border text-xs text-gray-300">
              <div className="p-4 rounded-xl bg-luxury-charcoal/60 border border-luxury-border space-y-2">
                <div className="flex items-center gap-2 text-luxury-gold font-bold uppercase tracking-wider font-serif">
                  <Truck className="w-4 h-4" />
                  <span>Courier & Armored Dispatch</span>
                </div>
                <p><span className="text-gray-400">Carrier:</span> <strong className="text-luxury-cream">{activeOrder.carrier || "DHL Express VIP Courier"}</strong></p>
                <p><span className="text-gray-400">Tracking Code:</span> <strong className="text-luxury-gold font-mono">{activeOrder.trackingNumber}</strong></p>
                <p><span className="text-gray-400">Payment Status:</span> <span className="text-emerald-400 font-bold">{activeOrder.paymentStatus}</span> ({activeOrder.paymentMethod})</p>
              </div>

              <div className="p-4 rounded-xl bg-luxury-charcoal/60 border border-luxury-border space-y-2">
                <div className="flex items-center gap-2 text-luxury-gold font-bold uppercase tracking-wider font-serif">
                  <MapPin className="w-4 h-4" />
                  <span>Destination Salon</span>
                </div>
                <p className="font-bold text-luxury-cream">{activeOrder.customer?.name}</p>
                <p className="text-gray-400">{activeOrder.customer?.address}</p>
                <p className="text-gray-400">{activeOrder.customer?.city}, {activeOrder.customer?.state} State</p>
              </div>
            </div>

            {/* Items Included */}
            <div className="pt-6 border-t border-luxury-border">
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-luxury-gold mb-3">
                Consignment Contents ({activeOrder.items?.length} Items)
              </h4>
              <div className="space-y-2">
                {activeOrder.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-luxury-surface/50 border border-luxury-border text-xs">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.product?.images?.[0] || item.images?.[0]} 
                        alt={item.product?.name || item.name} 
                        className="w-10 h-12 object-cover rounded border border-luxury-border shrink-0"
                      />
                      <div>
                        <p className="font-serif font-bold text-luxury-cream">{item.product?.name || item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-luxury-goldLight">
                      {formatPrice((item.price || item.product?.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Follow-up */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-luxury-border">
              <span className="text-xs text-gray-400">
                Have a special request regarding this consignment?
              </span>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20Maimuna's%20Luxury,%20I%20am%20following%20up%20on%20consignment%20*${activeOrder.id}*.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Dispatch Concierge</span>
              </a>
            </div>

          </div>
        ) : (
          searched && (
            <div className="p-8 text-center bg-luxury-card rounded-2xl border border-luxury-border space-y-3">
              <AlertCircle className="w-10 h-10 text-luxury-gold mx-auto" />
              <h3 className="font-serif text-lg font-bold text-luxury-cream">Consignment Not Located</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto font-light">
                Please double-check your Order Reference ID (e.g. ML-2026-8941) or email address, or contact our private salon on WhatsApp.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
}
