import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    cartTotal,
    cartItemCount,
    cartHasRx,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartWhatsAppUrl,
    openPrescriptionModal
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleWhatsAppCheckout = () => {
    const fullNotes = `${customerName}${phoneNumber ? ` (Phone: ${phoneNumber})` : ''}`;
    const url = getCartWhatsAppUrl(fullNotes, deliveryAddress);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span>Pharmacy Order Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Medicine Order List ({cartItemCount} item{cartItemCount !== 1 ? 's' : ''})
            </h1>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Your Order List is Empty
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Browse our verified pharmaceutical categories to add pain relief, vitamins, pediatric syrups, or home medical devices.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
            >
              <span>Explore All Medicines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Prescription Warning if Rx item exists */}
              {cartHasRx && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-900">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-rose-700 font-bold block">
                      Prescription Required (Nigerian Pharmacy Regulation)
                    </strong>
                    <p className="text-[11px] leading-relaxed text-rose-800">
                      One or more medicines in your order list require a valid doctor's prescription. In compliance with PCN guidelines, these items will only be dispensed after verification by our clinical pharmacist.
                    </p>
                    <button
                      onClick={() => openPrescriptionModal()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 underline mt-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Upload prescription photo now →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200/80 shrink-0 bg-slate-50"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-emerald-700 uppercase">
                            {item.product.brand}
                          </span>
                          {item.product.prescriptionRequired && (
                            <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">
                              Rx Only
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-slate-500">
                          ₦{item.product.price.toLocaleString()} each
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-sm sm:text-base font-black text-slate-900 min-w-[90px] text-right">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors"
                        title="Remove from list"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 px-2">
                <button
                  onClick={clearCart}
                  className="hover:text-rose-600 transition-colors"
                >
                  Clear all items from list
                </button>
                <div className="flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NAFDAC Regulated Medications</span>
                </div>
              </div>
            </div>

            {/* Right: Order Summary & WhatsApp Checkout */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              {/* Delivery Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ibrahim Abubakar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0803 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Address / Store Pickup
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Plot 12, Wuse 2, Abuja (or Self Pickup at Store)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery / Logistics</span>
                  <span className="text-emerald-700 font-semibold">Calculated on WhatsApp</span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-xl font-black text-pharmacy-900">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Complete Order on WhatsApp</span>
              </button>

              <div className="text-[11px] text-slate-400 text-center leading-relaxed">
                Clicking opens WhatsApp with your pre-filled medicine order. Our on-duty pharmacist confirms stock, verifies prescriptions, and coordinates immediate dispatch.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
