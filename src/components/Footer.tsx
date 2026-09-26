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
    <footer className="bg-[#07080a] border-t border-white/10 text-zinc-400 text-xs">
      {/* Top Banner / Newsletter Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
              The Flagship Circle
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
              Receive Private Drop Notices & In-Store Trunk Shows
            </h3>
            <p className="text-xs text-zinc-400">
              Limited imported articles sell out rapidly at our Kapas Hera location. Members receive advance 24-hour access.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
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
                  className="flex-1 bg-zinc-900 border border-white/10 text-white text-xs px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:border-[#c5a880]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-zinc-950 font-semibold uppercase tracking-wider text-xs hover:bg-[#e8e4dc] transition-colors whitespace-nowrap"
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
            <h4 className="text-lg font-serif tracking-widest text-white uppercase font-bold">
              BIG BEAR WEAR
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curators of high-grade imported menswear and streetwear articles. Engineered for consistent fits, heavy fabrics, and timeless personal style.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-300 pt-1">
              <div className="flex items-center text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                ))}
              </div>
              <span className="font-semibold text-white">4.8 Rating</span>
              <span className="text-zinc-500">·</span>
              <span>77 Google Reviews</span>
            </div>
          </div>

          {/* Kapas Hera Location (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Kapas Hera Flagship
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 shrink-0" />
                <span>
                  {STORE_INFO.address}, {STORE_INFO.city} {STORE_INFO.pincode}
                </span>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-white font-mono">
                  {STORE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span>Open 7 Days: 11:00 AM – 10:30 PM</span>
              </p>
            </div>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#c5a880] hover:text-white underline text-[11px] pt-1"
            >
              Get Directions on Google Maps →
            </a>
          </div>

          {/* Quick Collection Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Heavyweight T-Shirts
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Camp Linen Shirts
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Selvedge Denim
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Outerwear & Jackets
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  450 GSM Hoodies
                </a>
              </li>
            </ul>
          </div>

          {/* In-Store Guarantees (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              The Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Brand Philosophy
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-white transition-colors">
                  In-Store Fitting Lounge
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-white transition-colors">
                  Free Hem Alterations
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Verified Reviews
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  Lookbook Gallery
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Big Bear Wear. All rights reserved. 497, Street 9, Kapas Hera Extension, New Delhi.
          </div>
          <div className="flex items-center gap-6">
            <span>Honest Pricing</span>
            <span>·</span>
            <span>Imported Quality</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
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
