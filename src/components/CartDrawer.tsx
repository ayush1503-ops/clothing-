import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * promoDiscount);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 2500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const freeShippingPercent = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'BIGBEAR10' || code === 'WELCOME10') {
      setPromoDiscount(0.1);
      setPromoApplied(code);
      setPromoError('');
    } else if (code === 'KAPASHERA') {
      setPromoDiscount(0.15);
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "BIGBEAR10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111215] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
              <h2 className="text-lg font-serif tracking-wide">Your Shopping Bag</h2>
              <span className="text-xs font-mono text-zinc-400">({items.length} items)</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-[#15161b] border-b border-white/5 text-xs">
            <div className="flex items-center justify-between text-zinc-300 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#c5a880]" />
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">
                    ✓ Qualified for Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add ₹{amountToFreeShipping.toLocaleString('en-IN')} for Free Express Delivery
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c5a880] transition-all duration-300"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-white/5">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif text-white">Your bag is empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Explore our Kapas Hera curated collection of imported heavyweight tees, jackets, and raw denim.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white text-zinc-950 font-medium text-xs uppercase tracking-wider hover:bg-[#e8e4dc] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 aspect-[3/4] bg-zinc-900 overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-white leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          aria-label="Remove item"
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                        <span>Size: <strong className="text-zinc-200">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-zinc-200">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/15 bg-zinc-900 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 font-mono font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-mono font-semibold text-white tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0e0f12] space-y-4">
              {/* Promo code field */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. BIGBEAR10)"
                      className="w-full bg-zinc-900 border border-white/15 text-white text-xs px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs uppercase tracking-wider font-medium border border-white/10"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Code {promoApplied} applied! ({(promoDiscount * 100)}% off)
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400">{promoError}</p>
                )}
              </form>

              {/* Summary lines */}
              <div className="space-y-1.5 text-xs text-zinc-400 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-zinc-200 tabular-nums">
                    ₹{rawSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({promoApplied})</span>
                    <span className="font-mono tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-zinc-300">
                    {amountToFreeShipping === 0 ? 'FREE' : '₹150 (Free over ₹2,500)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base text-[#e8e4dc] tabular-nums">
                    ₹{(finalTotal + (amountToFreeShipping === 0 ? 0 : 150)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(promoDiscount, promoApplied)}
                className="w-full py-3.5 bg-white hover:bg-[#e8e4dc] text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3 h-3 text-[#c5a880]" />
                <span>Cash on Delivery / UPI Available · Verified Purchase</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
