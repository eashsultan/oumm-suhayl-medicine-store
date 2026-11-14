import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Copy,
  Scissors,
  Check,
  PackageCheck
} from 'lucide-react';
import { FORMAT_NAIRA } from '../data/products';

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", 
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", 
  "Sokoto", "Taraba", "Yobe", "Zamfara", "Abuja FCT"
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    subtotal, 
    appliedCoupon, 
    discountAmount, 
    deliveryFee, 
    grandTotal, 
    createOrder, 
    currentUser, 
    showToast 
  } = useShop();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="bg-[#140224] min-h-[60vh] flex flex-col items-center justify-center p-6 text-cream-500 text-center">
        <h2 className="font-serif text-2xl text-gold-400 font-bold">Your Cart is Empty</h2>
        <p className="text-xs text-cream-500/70 mt-2">Please add fabrics to your shopping cart before checking out.</p>
        <Link 
          to="/shop" 
          className="mt-4 px-6 py-2.5 rounded-xl bg-gold-500 text-purple-950 text-xs font-bold uppercase tracking-wider"
        >
          Browse All Fabrics
        </Link>
      </div>
    );
  }

  // Delivery method
  const [deliveryOption, setDeliveryOption] = useState(subtotal >= 100000 ? 'standard_free' : 'standard');
  
  let calculatedShipping = deliveryFee;
  if (deliveryOption === 'express') {
    calculatedShipping = 6000;
  } else if (deliveryOption === 'pickup') {
    calculatedShipping = 0;
  } else if (subtotal >= 100000) {
    calculatedShipping = 0;
  }

  const payableTotal = Math.max(0, subtotal - discountAmount + calculatedShipping);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: currentUser?.name ? currentUser.name.split(' ')[0] : 'Hajia Fatima',
    lastName: currentUser?.name ? (currentUser.name.split(' ')[1] || 'Aliyu') : 'Aliyu',
    email: currentUser?.email || 'fatima.aliyu@kanotextiles.ng',
    phone: currentUser?.phone || '+234 803 456 7890',
    address: currentUser?.addresses?.[0]?.address || '18 Bompai Road, Nassarawa GRA',
    city: currentUser?.addresses?.[0]?.city || 'Kano',
    state: currentUser?.addresses?.[0]?.state || 'Kano',
    fabricNotes: 'Please cut continuously without breaks. Package with extra water-resistant sleeve.'
  });

  // Payment Selection: 'paystack' | 'flutterwave' | 'bank_transfer' | 'pay_on_delivery'
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Simulated gateway modal state
  const [gatewayModalOpen, setGatewayModalOpen] = useState(false);
  const [gatewayStatus, setGatewayStatus] = useState('input'); // 'input' | 'processing' | 'success'

  const copyBankDetails = (accountNum) => {
    navigator.clipboard.writeText(accountNum);
    setCopiedAccount(true);
    showToast("Bank Account Number copied to clipboard!");
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.phone || !formData.address || !formData.state) {
      showToast("Please fill in all required customer and delivery address fields.", "error");
      return;
    }

    if (paymentMethod === 'paystack' || paymentMethod === 'flutterwave') {
      // Open interactive payment simulation modal
      setGatewayModalOpen(true);
      setGatewayStatus('input');
    } else {
      // Direct Bank Transfer or Pay on Delivery
      executeOrderPlacement(paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer' : 'Pay on Delivery');
    }
  };

  const executeOrderPlacement = (paymentMethodName, paymentRef = null) => {
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          notes: formData.fabricNotes
        },
        paymentMethod: paymentMethodName,
        paymentReference: paymentRef || (paymentMethodName.includes('Transfer') ? `TXN-ZENITH-${Math.floor(100000 + Math.random() * 900000)}` : `POD-${Math.floor(10000 + Math.random() * 90000)}`),
        paymentStatus: paymentMethodName.includes('Pay on Delivery') ? 'Pending upon Delivery' : 'Paid',
        carrier: deliveryOption === 'express' ? 'DHL Express Priority' : 'GIG Logistics / Red Star'
      });

      // Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setIsProcessing(false);
      setGatewayModalOpen(false);
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1500);
  };

  return (
    <div className="bg-[#140224] text-cream-500 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <Link to="/cart" className="text-xs text-gold-400 hover:underline inline-flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
            Secure Fabric Checkout
          </h1>
          <p className="text-xs text-cream-500/70 mt-1">
            Fast, insured nationwide delivery across all 36 Nigerian states and Abuja FCT.
          </p>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (7 Cols): Customer Details, Address, Delivery, Payment Selection */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Customer Information */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E0533] border border-purple-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-800">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-purple-950 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif font-bold text-lg text-white">Customer Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cream-500/90 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cream-500/90 mb-1">Last Name / Surname *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cream-500/90 mb-1">Phone Number (WhatsApp Active) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cream-500/90 mb-1">Email Address (For Receipt & Tracking) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address in Nigeria */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E0533] border border-purple-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-800">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-purple-950 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif font-bold text-lg text-white">Delivery Address</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-cream-500/90 mb-1">Street Address / Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 18 Bompai Road, Near Nassarawa Hospital / Plot 14 Victoria Island"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cream-500/90 mb-1">State (Nigeria) *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white font-medium"
                  >
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cream-500/90 mb-1">City / LGA *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kano Municipal, Ikeja, Maitama, GRA"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cream-500/90 mb-1">
                  Special Tailoring or Delivery Instructions
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Continuous cut without splicing, call before arriving, deliver to security post..."
                  value={formData.fabricNotes}
                  onChange={(e) => setFormData({ ...formData, fabricNotes: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-purple-950 border border-purple-800 rounded-xl focus:border-gold-500 focus:outline-none text-white resize-none"
                ></textarea>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E0533] border border-purple-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-800">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-purple-950 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif font-bold text-lg text-white">Shipping & Dispatch Option</h2>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryOption.startsWith('standard')
                    ? 'border-gold-400 bg-purple-900/40 text-white'
                    : 'border-purple-800 bg-purple-950/40 text-cream-500/80 hover:border-purple-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption.startsWith('standard')}
                      onChange={() => setDeliveryOption(subtotal >= 100000 ? 'standard_free' : 'standard')}
                      className="text-gold-500 focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Standard Nationwide Courier (2 - 4 Days)</p>
                      <p className="text-[11px] text-cream-500/60">Dispatched via DHL Express / GIG Priority across Nigeria</p>
                    </div>
                  </div>
                  <span className="text-xs font-serif font-bold text-gold-400">
                    {subtotal >= 100000 ? 'FREE' : FORMAT_NAIRA(3500)}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryOption === 'express'
                    ? 'border-gold-400 bg-purple-900/40 text-white'
                    : 'border-purple-800 bg-purple-950/40 text-cream-500/80 hover:border-purple-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="text-gold-500 focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">VIP Priority Express (24 - 48 Hours)</p>
                      <p className="text-[11px] text-cream-500/60">Guaranteed next-day delivery to Kano, Lagos & Abuja</p>
                    </div>
                  </div>
                  <span className="text-xs font-serif font-bold text-gold-400">
                    {FORMAT_NAIRA(6000)}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryOption === 'pickup'
                    ? 'border-gold-400 bg-purple-900/40 text-white'
                    : 'border-purple-800 bg-purple-950/40 text-cream-500/80 hover:border-purple-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'pickup'}
                      onChange={() => setDeliveryOption('pickup')}
                      className="text-gold-500 focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Pick Up from Kano or Lagos Showroom</p>
                      <p className="text-[11px] text-cream-500/60">Kantin Kwari Market (Kano) or Balogun Galleria (Lagos)</p>
                    </div>
                  </div>
                  <span className="text-xs font-serif font-bold text-emerald-400">
                    FREE
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method Selection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E0533] border border-purple-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-800">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-purple-950 font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <h2 className="font-serif font-bold text-lg text-white">Payment Method</h2>
              </div>

              <div className="space-y-3">
                
                {/* Paystack */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'paystack'
                    ? 'border-gold-400 bg-purple-900/40'
                    : 'border-purple-800 bg-purple-950/40'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'paystack'}
                        onChange={() => setPaymentMethod('paystack')}
                        className="text-gold-500 focus:ring-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Paystack Secure Gateway</p>
                        <p className="text-[11px] text-cream-500/60">Debit Cards (Mastercard, Visa, Verve), USSD, Bank & Apple Pay</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      Recommended
                    </span>
                  </div>
                </label>

                {/* Flutterwave */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'flutterwave'
                    ? 'border-gold-400 bg-purple-900/40'
                    : 'border-purple-800 bg-purple-950/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'flutterwave'}
                      onChange={() => setPaymentMethod('flutterwave')}
                      className="text-gold-500 focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Flutterwave Payment Gateway</p>
                      <p className="text-[11px] text-cream-500/60">All Nigerian Cards, Barter, Mobile Money & Direct Account Debit</p>
                    </div>
                  </div>
                </label>

                {/* Direct Nigerian Bank Transfer */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-gold-400 bg-purple-900/40'
                    : 'border-purple-800 bg-purple-950/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-gold-500 focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Direct Nigerian Bank Transfer</p>
                      <p className="text-[11px] text-cream-500/60">Transfer to Muktar's Textiles Ltd (Zenith Bank / GTBank)</p>
                    </div>
                  </div>

                  {paymentMethod === 'bank_transfer' && (
                    <div className="mt-4 pt-4 border-t border-purple-800 space-y-3 animate-fadeIn text-xs">
                      <div className="p-3 rounded-xl bg-purple-950 border border-gold-500/30 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-gold-400 font-bold">Zenith Bank Plc</span>
                          <button
                            type="button"
                            onClick={() => copyBankDetails("1018921764")}
                            className="text-[11px] text-gold-300 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                        <p className="text-white font-mono font-bold text-sm">Account: 1018921764</p>
                        <p className="text-cream-500/70">Account Name: <strong>Muktar's Textiles Ltd</strong></p>
                      </div>

                      <div className="p-3 rounded-xl bg-purple-950 border border-gold-500/30 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-gold-400 font-bold">Guaranty Trust Bank (GTBank)</span>
                          <button
                            type="button"
                            onClick={() => copyBankDetails("0284918274")}
                            className="text-[11px] text-gold-300 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                        <p className="text-white font-mono font-bold text-sm">Account: 0284918274</p>
                        <p className="text-cream-500/70">Account Name: <strong>Muktar's Textiles Ltd</strong></p>
                      </div>
                    </div>
                  )}
                </label>

                {/* Pay on Delivery */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'pay_on_delivery'
                    ? 'border-gold-400 bg-purple-900/40'
                    : 'border-purple-800 bg-purple-950/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'pay_on_delivery'}
                      onChange={() => setPaymentMethod('pay_on_delivery')}
                      className="text-gold-500 focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Pay On Delivery (POD)</p>
                      <p className="text-[11px] text-cream-500/60">Available for Kano Municipal, Lagos & Abuja FCT orders</p>
                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): Order Items Review & Final Submit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E0533] border border-gold-500/30 shadow-2xl space-y-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-white border-b border-purple-800 pb-3">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h2>

              {/* Items Thumbnail List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-purple-900/40">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product?.images?.[0]}
                      alt={item.product?.name}
                      className="w-14 h-16 rounded-xl object-cover border border-purple-800 shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate">{item.product?.name}</h4>
                      <p className="text-[11px] text-cream-500/70">{item.size} • {item.color}</p>
                      <p className="text-[11px] text-gold-400 font-mono font-bold mt-0.5">
                        Qty: {item.quantity} × {FORMAT_NAIRA(item.price)}
                      </p>
                    </div>
                    <span className="text-xs font-serif font-bold text-gold-400">
                      {FORMAT_NAIRA(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-xs text-cream-500/80 pt-3 border-t border-purple-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{FORMAT_NAIRA(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-gold-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{FORMAT_NAIRA(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span className="text-white font-semibold">
                    {calculatedShipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : FORMAT_NAIRA(calculatedShipping)}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-serif font-black text-white pt-3 border-t border-purple-800">
                  <span>Payable Total</span>
                  <span className="text-gold-400">{FORMAT_NAIRA(payableTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-purple-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl hover:from-gold-400 hover:to-gold-300 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Processing Your Fabric Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Pay {FORMAT_NAIRA(payableTotal)}</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[11px] text-cream-500/60 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>Secured by 256-bit SSL Banking Protection</span>
                </p>
                <p>Instant SMS & WhatsApp confirmation upon order placement</p>
              </div>
            </div>
          </div>

        </form>

      </div>

      {/* SIMULATED NIGERIAN PAYMENT MODAL (PAYSTACK / FLUTTERWAVE) */}
      {gatewayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#1B0530] border-2 border-gold-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-cream-500 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500 flex items-center justify-center text-purple-950 font-bold">
                  ₦
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-base">
                    {paymentMethod === 'paystack' ? 'Paystack Nigerian Gateway' : 'Flutterwave Gateway'}
                  </h3>
                  <p className="text-[10px] text-gold-400">Merchant: Muktar's Textiles Ltd</p>
                </div>
              </div>
              <span className="font-serif font-bold text-gold-400 text-base">
                {FORMAT_NAIRA(payableTotal)}
              </span>
            </div>

            {gatewayStatus === 'input' && (
              <div className="space-y-4">
                <p className="text-xs text-cream-500/80 leading-relaxed">
                  Choose your test payment channel for Nigerian cards or direct bank transfer:
                </p>

                <div className="p-4 rounded-2xl bg-purple-950/80 border border-purple-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CreditCard className="w-4 h-4 text-gold-400" />
                    <span>Nigerian Debit Card (Mastercard / Visa / Verve)</span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value="5399 •••• •••• 8821"
                    className="w-full px-3 py-2 text-xs bg-[#120220] border border-purple-800 rounded-lg text-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      readOnly
                      value="11/28"
                      className="px-3 py-2 bg-[#120220] border border-purple-800 rounded-lg text-white font-mono"
                    />
                    <input
                      type="text"
                      readOnly
                      value="CVV: 891"
                      className="px-3 py-2 bg-[#120220] border border-purple-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setGatewayModalOpen(false)}
                    className="flex-1 py-3 border border-purple-800 rounded-xl text-xs font-bold text-cream-500 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGatewayStatus('processing');
                      setTimeout(() => {
                        setGatewayStatus('success');
                        setTimeout(() => {
                          executeOrderPlacement(
                            paymentMethod === 'paystack' ? 'Paystack (Card/Bank)' : 'Flutterwave',
                            `PSTK_MT_${Date.now()}`
                          );
                        }, 1200);
                      }, 1800);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-purple-950 font-bold text-xs rounded-xl shadow-lg hover:from-gold-400 hover:to-gold-300 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Simulate Success</span>
                  </button>
                </div>
              </div>
            )}

            {gatewayStatus === 'processing' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-serif font-bold text-white text-base">Contacting Your Bank...</h4>
                <p className="text-xs text-cream-500/70">Authorizing {FORMAT_NAIRA(payableTotal)} via Paystack Secure Tunnel</p>
              </div>
            )}

            {gatewayStatus === 'success' && (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">Payment Confirmed!</h4>
                <p className="text-xs text-cream-500/80">Generating your Muktar's Textiles order invoice...</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
