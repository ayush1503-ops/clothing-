import React from 'react';
import { ArrowDown, MapPin, Star, ArrowUpRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeroProps {
  onExploreClick: () => void;
  onVisitStoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onVisitStoreClick }) => {
  return (
    <section className="relative bg-[#fafafc] border-b border-zinc-200 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typographic Headline, Description, & Capsule CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top kicker badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white border border-zinc-300 rounded-full text-xs shadow-xs text-zinc-700 font-mono">
              <span className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </span>
              <span className="font-bold text-zinc-900">4.8 Rating</span>
              <span className="text-zinc-300">·</span>
              <span className="text-zinc-600">77 Verified Google Reviews</span>
              <span className="text-zinc-300 hidden sm:inline">·</span>
              <span className="text-emerald-700 font-semibold hidden sm:inline">Flagship Atelier</span>
            </div>

            {/* Sub-label */}
            <p className="text-xs uppercase font-mono tracking-[0.25em] text-emerald-700 font-bold">
              AUTUMN / WINTER '26 EDITORIAL CAPSULE
            </p>

            {/* Bold Headline inspired by reference structure */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-zinc-950 uppercase leading-[0.95]">
              WEAR YOUR <br />
              <span className="font-serif font-normal italic text-zinc-800">Identity.</span>
            </h1>

            {/* Supporting description copy */}
            <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-light leading-relaxed">
              Curated imported menswear crafted from heavyweight 280–450 GSM combed cottons and shuttle-loomed selvedge denim. Clean cuts, consistent drapes, and honest in-store personal styling.
            </p>

            {/* Capsule CTA Buttons like the reference ("View Details") */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 group"
              >
                <span>Explore Collection</span>
                <span className="transition-transform group-hover:translate-x-1 font-mono text-emerald-400">→</span>
              </button>

              <button
                onClick={onVisitStoreClick}
                className="px-6 py-3.5 bg-white hover:bg-zinc-50 text-zinc-900 font-medium text-xs sm:text-sm uppercase tracking-wider rounded-full border border-zinc-300 hover:border-zinc-400 transition-all flex items-center gap-2 shadow-xs"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Visit Flagship Atelier</span>
              </button>
            </div>

            {/* Core Pillars Row */}
            <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Fabric Weight</span>
                <span className="font-bold text-zinc-900 text-xs sm:text-sm">280–450 GSM</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Fit Assurance</span>
                <span className="font-bold text-zinc-900 text-xs sm:text-sm">Calibrated Proportions</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Store Hours</span>
                <span className="font-bold text-emerald-700 text-xs sm:text-sm">Till 10:30 PM Daily</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Studio Cutout/Fashion Photography on Pristine White */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/90 bg-white group">
              <img
                src="/src/assets/images/hero_white_studio_fashion_1790431595732.jpg"
                alt="Vesper Atelier White Studio Fashion"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating article tag */}
              <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-zinc-200/80 text-xs space-y-0.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 font-bold block">
                  FEATURED ARTICLE
                </span>
                <p className="font-semibold text-zinc-900">450 GSM French Terry Hoodie</p>
                <p className="font-mono text-[11px] text-zinc-500">₹3,290 · In Stock at Flagship</p>
              </div>

              {/* In-Store fitting guarantee watermark */}
              <div className="absolute bottom-4 right-4 p-2.5 bg-black/85 backdrop-blur-md rounded-md text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Available to try at Flagship Atelier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
