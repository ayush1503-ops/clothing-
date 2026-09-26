import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeData';
import { Star, MapPin, Phone, Clock, ArrowUp, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f8f9fa] border-t border-zinc-200 text-zinc-600 text-xs">
      {/* Top Banner / Newsletter Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-700 font-mono font-bold">
              The Flagship Circle
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zinc-950">
              Receive Private Drop Notices & In-Store Trunk Shows
            </h3>
            <p className="text-xs text-zinc-500 font-light">
              Limited imported articles sell out rapidly at our Kapas Hera location. Members receive advance 24-hour access.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You're on the list. We'll alert you for the next imported capsule drop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white border border-zinc-300 rounded-full text-zinc-900 text-xs px-5 py-3 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 shadow-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-zinc-900 hover:bg-black text-white font-semibold uppercase tracking-wider text-xs rounded-full transition-colors whitespace-nowrap shadow-sm"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Store Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md overflow-hidden border border-zinc-200 bg-white p-0.5">
                <img
                  src="/src/assets/images/big_bear_wear_logo_mark_1790431612287.jpg"
                  alt="Big Bear Wear Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-base font-serif tracking-widest text-zinc-950 uppercase font-bold">
                BIG BEAR WEAR
              </h4>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-light">
              Curators of high-grade imported menswear and streetwear articles. Engineered for consistent fits, heavy fabrics, and timeless personal style.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-700 pt-1">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="font-bold text-zinc-950">4.8 Rating</span>
              <span className="text-zinc-300">·</span>
              <span className="text-zinc-600 font-mono">77 Google Reviews</span>
            </div>
          </div>

          {/* Kapas Hera Location (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-zinc-900 font-bold font-mono">
              Kapas Hera Flagship
            </h4>
            <div className="space-y-2 text-xs text-zinc-600 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                <span>
                  {STORE_INFO.address}, {STORE_INFO.city} {STORE_INFO.pincode}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-black font-mono font-medium">
                  {STORE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Open 7 Days: 11:00 AM – 10:30 PM</span>
              </p>
            </div>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-emerald-700 hover:text-emerald-800 font-semibold text-[11px] pt-1"
            >
              Get Directions on Google Maps →
            </a>
          </div>

          {/* Quick Collection Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-zinc-900 font-bold font-mono">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <a href="#collection" className="hover:text-zinc-950 transition-colors">
                  Heavyweight T-Shirts
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-zinc-950 transition-colors">
                  Camp Linen Shirts
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-zinc-950 transition-colors">
                  Selvedge Denim
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-zinc-950 transition-colors">
                  Outerwear & Jackets
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-zinc-950 transition-colors">
                  450 GSM Hoodies
                </a>
              </li>
            </ul>
          </div>

          {/* In-Store Guarantees (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-zinc-900 font-bold font-mono">
              The Experience
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <a href="#about" className="hover:text-zinc-950 transition-colors">
                  Brand Philosophy
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-zinc-950 transition-colors">
                  In-Store Fitting Lounge
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-zinc-950 transition-colors">
                  Free Hem Alterations
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-zinc-950 transition-colors">
                  Verified Reviews
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-zinc-950 transition-colors">
                  Lookbook Gallery
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Big Bear Wear. All rights reserved. 497, Street 9, Kapas Hera Extension, New Delhi.
          </div>
          <div className="flex items-center gap-6">
            <span>Honest Pricing</span>
            <span>·</span>
            <span>Imported Quality</span>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-700 hover:text-black font-semibold transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
