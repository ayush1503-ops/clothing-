import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, ShieldCheck, MapPin, Truck, CreditCard, Banknote, Smartphone, Store } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountMultiplier: number;
  promoCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountMultiplier,
  promoCode,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState('110097');
  const [deliveryType, setDeliveryType] = useState<'courier' | 'store_pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'store_pay'>('cod');
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * discountMultiplier);
  const shippingFee = deliveryType === 'store_pickup' || rawSubtotal >= 2500 ? 0 : 150;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    const orderId = `BBW-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(orderId);
    setStep('confirmation');
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-zinc-200 rounded-2xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-bold font-mono">
              Big Bear Wear Checkout
            </span>
            <h2 className="text-xl font-serif text-zinc-950 font-bold">
              {step === 'details' && '1. Shipping & Customer Information'}
              {step === 'payment' && '2. Payment & Confirmation'}
              {step === 'confirmation' && 'Order Confirmed!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on step */}
        <div className="p-6 sm:p-8">
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Delivery mode toggle */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-600 block font-mono font-bold">
                  Delivery Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('courier')}
                    className={`p-3.5 border rounded-xl text-left flex items-start gap-3 transition-all ${
                      deliveryType === 'courier'
                        ? 'border-zinc-900 bg-zinc-50 text-zinc-950 ring-1 ring-zinc-900 shadow-xs'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-zinc-950">Express Doorstep Delivery</span>
                      <span className="text-[11px] text-zinc-500 font-light">2-3 days in Delhi NCR, 4-5 days PAN India</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('store_pickup')}
                    className={`p-3.5 border rounded-xl text-left flex items-start gap-3 transition-all ${
                      deliveryType === 'store_pickup'
                        ? 'border-zinc-900 bg-zinc-50 text-zinc-950 ring-1 ring-zinc-900 shadow-xs'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-zinc-950">Pickup at Kapas Hera Flagship</span>
                      <span className="text-[11px] text-zinc-500 font-light">Ready in 2 hours · Try before taking</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                    Mobile Number (For updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {deliveryType === 'courier' && (
                <>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                      Street Address / Flat / Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Apartment no., Street, Colony"
                      className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                        City / State *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Order total review strip */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-500 block">Total for {items.length} items:</span>
                  <span className="font-mono text-base font-bold text-zinc-950">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-colors shadow-sm"
                >
                  Continue to Payment →
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block">
                  Select Payment Option
                </label>

                <div className="space-y-2.5">
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-emerald-700" />
                      <div>
                        <span className="block text-xs font-bold text-zinc-950">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-zinc-500">Pay cash or UPI upon package inspection at your door</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-zinc-900"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-emerald-700" />
                      <div>
                        <span className="block text-xs font-bold text-zinc-950">Instant UPI (GPay, PhonePe, Paytm)</span>
                        <span className="text-[11px] text-zinc-500">Scan QR or enter UPI ID for instantaneous receipt</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-zinc-900"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-700" />
                      <div>
                        <span className="block text-xs font-bold text-zinc-950">Credit / Debit Card</span>
                        <span className="text-[11px] text-zinc-500">Visa, Mastercard, RuPay with 256-bit encryption</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-zinc-900"
                    />
                  </label>

                  {deliveryType === 'store_pickup' && (
                    <label
                      onClick={() => setPaymentMethod('store_pay')}
                      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'store_pay' ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Store className="w-5 h-5 text-emerald-700" />
                        <div>
                          <span className="block text-xs font-bold text-zinc-950">Pay at Flagship Store</span>
                          <span className="text-[11px] text-zinc-500">Try in our lounge and pay at the Kapas Hera counter</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'store_pay'}
                        onChange={() => setPaymentMethod('store_pay')}
                        className="accent-zinc-900"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Articles ({items.length})</span>
                  <span className="font-mono text-zinc-900 font-medium">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery ({deliveryType === 'store_pickup' ? 'Store Pickup' : 'Courier'})</span>
                  <span className="font-mono text-zinc-900 font-medium">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span className="font-mono text-base">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-zinc-600 hover:text-black font-medium"
                >
                  ← Back to Details
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="px-8 py-3 bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors shadow-sm"
                >
                  Place Order Now
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-zinc-950 font-bold">Order Confirmed!</h3>
                <p className="text-xs text-zinc-600 font-light">
                  Thank you, <strong className="text-zinc-950 font-semibold">{fullName}</strong>. We've received your order and our Kapas Hera team is preparing your articles.
                </p>
              </div>

              {/* Order receipt badge */}
              <div className="max-w-md mx-auto p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500 font-mono">Order ID:</span>
                  <span className="font-mono font-bold text-zinc-950 tracking-wider">{generatedOrderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Method:</span>
                  <span className="text-zinc-900 capitalize font-medium">{paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Total Charged:</span>
                  <span className="font-mono font-bold text-zinc-950">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Destination:</span>
                  <span className="text-zinc-800">
                    {deliveryType === 'store_pickup'
                      ? 'Flagship Pickup: 497, Street 9, Kapas Hera'
                      : `${city} (${pincode})`}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 max-w-sm mx-auto font-light">
                A verification notification has been queued for your mobile ({phone}). For any fitting questions, call our direct store line: <span className="text-zinc-900 font-mono font-semibold">{STORE_INFO.phone}</span>.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-full transition-colors shadow-sm"
              >
                Back to Storefront
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
