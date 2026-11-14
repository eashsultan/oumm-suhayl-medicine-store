import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    cartItemCount,
    cartHasRx,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartWhatsAppUrl,
    openPrescriptionModal
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const url = getCartWhatsAppUrl(customerName, deliveryAddress);
    window.open(url, '_blank');
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-pharmacy-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Medicine Order List</h3>
              <p className="text-xs text-emerald-200">
                {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prescription Notice if Rx Item exists */}
        {cartHasRx && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 px-4 flex items-start gap-2.5 text-xs text-rose-900">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-700">Prescription Item Included:</strong>
              <p className="text-[11px] text-rose-800 leading-tight mt-0.5">
                Your order contains prescription medicine(s). A doctor's prescription must be presented before dispatch.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openPrescriptionModal();
                }}
                className="mt-1 text-[11px] font-bold text-rose-700 underline flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                <span>Upload prescription photo now</span>
              </button>
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-700">Your order list is empty</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Browse our pharmacy categories and add pain relief, vitamins, first aid, or medical equipment.
                </p>
              </div>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Browse Medicines
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 flex gap-3 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200/80 shrink-0 bg-white"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>₦{item.product.price.toLocaleString()} each</span>
                      {item.product.prescriptionRequired && (
                        <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1 rounded">
                          Rx
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-pharmacy-800">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Info */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            
            {/* Quick customer info fields */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Delivery Address / City (Optional)"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-medium text-slate-600">Estimated Total:</span>
              <span className="text-xl font-black text-pharmacy-900">
                ₦{cartTotal.toLocaleString()}
              </span>
            </div>

            {/* WhatsApp Checkout CTA */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp to Pharmacist</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <button
                onClick={clearCart}
                className="hover:text-rose-600 transition-colors"
              >
                Clear all items
              </button>
              <div className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NAFDAC Regulated Store</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
