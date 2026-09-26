import React from 'react';
import { STORE_INFO } from '../data/storeData';
import { Sparkles, HeartHandshake, Scale, CheckCircle, MapPin, Clock } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="relative border border-white/10 bg-[#101114] p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Subtle geometric watermark-free accent line */}
        <div className="absolute top-0 left-0 w-24 h-[2px] bg-[#c5a880]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                Behind Big Bear Wear
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-light tracking-tight leading-tight">
                Crafted in Kapas Hera. <br />
                Worn with <span className="italic text-[#e8e4dc]">Distinction.</span>
              </h2>
            </div>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              Big Bear Wear was started with a simple, refreshing principle: menswear shouldn't require compromising between exceptional quality and a fair price tag. Too many men were tired of paper-thin fast fashion that unravels after three washes or overpriced mall designer labels inflated by high rents.
            </p>

            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              At our Street 9 location in Kapas Hera, New Delhi, we personally curate every roll of fabric, overseas import, and garment batch. When you step into our store, our team offers honest suggestions based on what truly flatters your build—never high-pressure sales tactics.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <span className="text-xs font-mono text-[#c5a880]">01.</span>
                  <span>Authentic Heavyweight Goods</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Imported combed cottons and structured denims that hold their weight and collar line year after year.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <span className="text-xs font-mono text-[#c5a880]">02.</span>
                  <span>Fit Predictability</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Every size Medium or Large is rigorously calibrated so you never have to gamble on whether an article fits.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <span className="text-xs font-mono text-[#c5a880]">03.</span>
                  <span>Honest Value</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Every rupee is spent on yarn quality, stitch density, and custom hardware rather than exorbitant markups.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <span className="text-xs font-mono text-[#c5a880]">04.</span>
                  <span>Warm Human Hospitality</span>
                </div>
                <p className="text-xs text-zinc-400">
                  A welcoming, unhurried vibe with genuine styling consultations and complimentary alteration adjustments.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Store Snapshot & Credibility Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-zinc-400">Store Verification</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Local Merchant
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block">Flagship Location</span>
                  <p className="text-zinc-200 font-medium mt-0.5">{STORE_INFO.address}</p>
                  <p className="text-zinc-400 text-xs">{STORE_INFO.city} {STORE_INFO.pincode}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block">Business Hours</span>
                    <p className="text-zinc-200 font-medium text-xs mt-0.5">11:00 AM – 10:30 PM</p>
                    <span className="text-[11px] text-[#c5a880]">Open 7 Days a Week</span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block">Direct Line</span>
                    <p className="text-zinc-200 font-mono font-medium text-xs mt-0.5">{STORE_INFO.phone}</p>
                    <span className="text-[11px] text-zinc-400">In-Store Staff</span>
                  </div>
                </div>
              </div>

              {/* Real metric stats */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-white/5">
                  <span className="block text-xl font-bold text-white font-mono">4.8★</span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Rating</span>
                </div>
                <div className="p-2 bg-white/5">
                  <span className="block text-xl font-bold text-white font-mono">77+</span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Reviews</span>
                </div>
                <div className="p-2 bg-white/5">
                  <span className="block text-xl font-bold text-white font-mono">100%</span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Originals</span>
                </div>
              </div>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white text-zinc-950 font-medium text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#e8e4dc] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Navigate to Flagship on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
