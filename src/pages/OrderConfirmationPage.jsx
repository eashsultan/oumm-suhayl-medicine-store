import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  Printer, 
  MessageCircle, 
  Compass, 
  Package, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders, formatPrice, settings } = useShop();

  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="bg-luxury-black min-h-[60vh] flex flex-col items-center justify-center p-6 text-luxury-cream">
        <h2 className="font-serif text-2xl text-luxury-gold">Order Not Found</h2>
        <Link to="/" className="mt-4 px-6 py-2 rounded-full bg-gold-gradient text-luxury-black text-xs font-bold uppercase">
          Return to Boutique
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Maimuna's Luxury Concierge, I have just completed Order *${order.id}* for *${order.customer?.name}*. Total: ₦${order.total?.toLocaleString()}. Please provide delivery updates.`
  );

  return (
    <div className="bg-luxury-black min-h-screen text-luxury-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="w-16 h-16 rounded-full bg-gold-gradient mx-auto flex items-center justify-center text-luxury-black shadow-gold-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 text-luxury-gold text-xs uppercase tracking-[0.3em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Confirmed & Sealed</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-luxury-cream">
            Thank You For Your Patronage
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-light leading-relaxed">
            Your luxury consignment has been recorded with our master packaging team. A confirmation dispatch has been sent to <strong className="text-luxury-goldLight">{order.customer?.email}</strong>.
          </p>
        </div>

        {/* Action Buttons Toolbar (Print & WhatsApp Concierge) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-luxury-charcoal border border-luxury-border text-gray-200 hover:text-luxury-gold hover:border-luxury-gold text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Invoice</span>
          </button>

          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm on WhatsApp Concierge</span>
          </a>

          <Link
            to={`/track-order?orderId=${order.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-luxury-black text-xs font-serif font-bold uppercase tracking-wider shadow-gold-sm hover:brightness-110 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Track Consignment</span>
          </Link>
        </div>

        {/* Printable Official Invoice Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-luxury-card border border-luxury-border shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-luxury-border/80 gap-6">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.2em] uppercase text-luxury-gold">
                MAIMUNA'S LUXURY
              </span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-sans mt-0.5">
                Elegance, Class and Luxury
              </p>
              <p className="text-xs text-gray-400 mt-2 font-mono">
                Victoria Island Atelier, Lagos, Nigeria
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/60 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                {order.paymentStatus || "Payment Confirmed"}
              </span>
              <p className="font-mono text-sm font-bold text-luxury-goldLight">
                Ref: {order.id}
              </p>
              <p className="text-[11px] text-gray-400">
                Date: {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Customer & Courier Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-gray-300">
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-luxury-gold mb-2">
                Consignee / Client:
              </h4>
              <p className="font-bold text-luxury-cream text-sm">{order.customer?.name}</p>
              <p className="text-gray-400 mt-0.5">{order.customer?.address}</p>
              <p className="text-gray-400">{order.customer?.city}, {order.customer?.state} State</p>
              <p className="text-gray-400 mt-1 font-mono">{order.customer?.phone}</p>
              <p className="text-gray-400 font-mono">{order.customer?.email}</p>
            </div>

            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-luxury-gold mb-2">
                Consignment Details:
              </h4>
              <p><span className="text-gray-400">Courier Rail:</span> <strong className="text-luxury-cream">{order.carrier}</strong></p>
              <p><span className="text-gray-400">Tracking Code:</span> <strong className="text-luxury-gold font-mono">{order.trackingNumber}</strong></p>
              <p><span className="text-gray-400">Estimated Delivery:</span> <strong className="text-luxury-cream">{order.estimatedDelivery}</strong></p>
              <p><span className="text-gray-400">Payment Gateway:</span> <strong className="text-luxury-cream">{order.paymentMethod}</strong></p>
              <p><span className="text-gray-400">Auth Ref:</span> <span className="font-mono text-[10px] text-gray-400">{order.paymentReference}</span></p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead>
                <tr className="border-b border-luxury-border text-luxury-gold uppercase tracking-wider text-[11px] font-serif">
                  <th className="py-3 font-bold">Luxury Item</th>
                  <th className="py-3 font-bold">Specs</th>
                  <th className="py-3 font-bold text-center">Qty</th>
                  <th className="py-3 font-bold text-right">Price</th>
                  <th className="py-3 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border/40">
                {order.items?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-luxury-surface/30">
                    <td className="py-4 pr-3">
                      <p className="font-serif font-bold text-luxury-cream text-xs">{item.product?.name || item.name}</p>
                      <span className="text-[10px] text-gray-500 font-mono">{item.product?.sku || item.sku}</span>
                    </td>
                    <td className="py-4 text-[11px] text-gray-400">
                      {item.size && <span>Size: {item.size} </span>}
                      {item.color && <span>• {item.color}</span>}
                    </td>
                    <td className="py-4 text-center font-mono font-medium">{item.quantity}</td>
                    <td className="py-4 text-right font-mono">{formatPrice(item.price || item.product?.price)}</td>
                    <td className="py-4 text-right font-mono font-bold text-luxury-goldLight">
                      {formatPrice((item.price || item.product?.price) * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-6 border-t border-luxury-border flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-luxury-cream">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-luxury-gold">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Armored VIP Courier</span>
                <span>{order.shippingFee === 0 ? <span className="text-emerald-400 uppercase font-bold text-[11px]">Complimentary</span> : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-luxury-border text-base font-bold text-luxury-goldLight">
                <span className="font-serif uppercase tracking-wider">Total Paid</span>
                <span className="font-sans text-xl text-gold-gradient">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Luxury Seal & Assurance */}
          <div className="pt-8 border-t border-luxury-border/60 text-center text-[11px] text-gray-400 space-y-1">
            <p className="font-serif font-bold text-luxury-gold">
              MAIMUNA'S LUXURY ATELIER & VIP SALON
            </p>
            <p>100% Authentic Luxury Guarantee • Inquiries: {settings.phone} • {settings.email}</p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-luxury-gold hover:text-luxury-goldLight"
          >
            <span>Return to Luxury Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
