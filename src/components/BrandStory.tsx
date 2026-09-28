import React from 'react';
import { STORE_INFO } from '../data/storeData';
import { Sparkles, HeartHandshake, Scale, CheckCircle, MapPin, Clock } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 bg-white">
      <div className="relative border border-zinc-200 bg-[#fbfbfd] rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xs">
        {/* Subtle decorative accent line */}
        <div className="absolute top-0 left-0 w-32 h-[3px] bg-emerald-600" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-700 font-bold font-mono">
                Behind Vesper Atelier
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-zinc-950 uppercase tracking-tight leading-tight">
                Crafted with Deliberation. <br />
                Worn with <span className="font-serif font-normal italic text-zinc-800">Distinction.</span>
              </h2>
            </div>

            <p className="text-zinc-700 leading-relaxed text-sm sm:text-base font-light">
              Vesper Atelier was started with a simple, refreshing principle: menswear shouldn't require compromising between exceptional quality and a fair price tag. Too many men were tired of paper-thin fast fashion that unravels after three washes or overpriced mall designer labels inflated by high rents.
            </p>

            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base font-light">
              At our flagship atelier in the Velvet Arcade Fashion District, we personally curate every roll of fabric, overseas import, and garment batch. When you step into our store, our team offers honest suggestions based on what truly flatters your build—never high-pressure sales tactics.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-950 font-semibold text-sm">
                  <span className="text-xs font-mono text-emerald-700">01.</span>
                  <span>Authentic Heavyweight Goods</span>
                </div>
                <p className="text-xs text-zinc-600 font-light">
                  Imported combed cottons and structured denims that hold their weight and collar line year after year.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-950 font-semibold text-sm">
                  <span className="text-xs font-mono text-emerald-700">02.</span>
                  <span>Fit Predictability</span>
                </div>
                <p className="text-xs text-zinc-600 font-light">
                  Every size Medium or Large is rigorously calibrated so you never have to gamble on whether an article fits.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-950 font-semibold text-sm">
                  <span className="text-xs font-mono text-emerald-700">03.</span>
                  <span>Honest Value</span>
                </div>
                <p className="text-xs text-zinc-600 font-light">
                  Every rupee is spent on yarn quality, stitch density, and custom hardware rather than exorbitant markups.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-950 font-semibold text-sm">
                  <span className="text-xs font-mono text-emerald-700">04.</span>
                  <span>Warm Human Hospitality</span>
                </div>
                <p className="text-xs text-zinc-600 font-light">
                  A welcoming, unhurried vibe with genuine styling consultations and complimentary alteration adjustments.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Store Snapshot & Credibility Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">Store Verification</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Verified Local Merchant
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block font-mono">Flagship Location</span>
                  <p className="text-zinc-950 font-semibold mt-0.5">{STORE_INFO.address}</p>
                  <p className="text-zinc-600 text-xs">{STORE_INFO.city} {STORE_INFO.pincode}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block font-mono">Business Hours</span>
                    <p className="text-zinc-950 font-semibold text-xs mt-0.5">11:00 AM – 10:30 PM</p>
                    <span className="text-[11px] text-emerald-700 font-medium">Open 7 Days a Week</span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block font-mono">Direct Contact</span>
                    <p className="text-zinc-950 font-mono font-semibold text-xs mt-0.5">{STORE_INFO.phone}</p>
                    <span className="text-[11px] text-zinc-500">Call for Stock Checks</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100">
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-mono text-xs uppercase tracking-wider font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Get Directions via Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
