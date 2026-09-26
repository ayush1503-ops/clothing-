import React from 'react';
import { ArrowDown, MapPin, Star, ArrowUpRight, Compass, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeroProps {
  onExploreClick: () => void;
  onVisitStoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onVisitStoreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#090a0c] border-b border-white/10">
      {/* Background Campaign Visual with Controlled Editorial Grade */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_big_bear_fashion_1790427180502.jpg"
          alt="Big Bear Wear Luxury Editorial Campaign"
          className="w-full h-full object-cover object-[center_28%] scale-100 filter brightness-[0.78] contrast-[1.08]"
          referrerPolicy="no-referrer"
        />
        {/* Editorial Linear Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0c]/90 via-transparent to-[#090a0c]/80" />
      </div>

      {/* Top Editorial Index Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400 uppercase gap-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#c5a880] inline-block" />
          <span className="text-zinc-200">AUTUMN / WINTER '26 EDIT</span>
          <span className="text-zinc-600">/</span>
          <span>CURATED IMPORTS</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-zinc-400">
          <span>COORDINATES: 28.5284° N, 77.0863° E</span>
          <span className="text-zinc-600">/</span>
          <span className="text-[#c5a880] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            STREET 9 FLAGSHIP OPEN TILL 10:30 PM
          </span>
        </div>
      </div>

      {/* Main Editorial Hero Spread */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 my-auto">
        <div className="max-w-3xl">
          {/* Subtle rating indicator without pill bubble */}
          <div className="inline-flex items-center gap-3 mb-6 pb-2 border-b border-white/15 text-xs text-zinc-300">
            <div className="flex items-center text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
              ))}
            </div>
            <span className="font-mono text-white tracking-wider font-semibold">4.8 / 5.0</span>
            <span className="text-zinc-500 font-mono">·</span>
            <span className="text-zinc-300 font-light tracking-wide">77 Google Local Reviews</span>
            <span className="text-zinc-500 font-mono">·</span>
            <span className="text-zinc-400 uppercase font-mono text-[10px] tracking-widest">Kapas Hera Flagship</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white font-light tracking-tight uppercase leading-[0.9] mb-8">
            Wear Your <br />
            <span className="italic font-normal text-[#ece8e1] tracking-normal">Identity.</span>
          </h1>

          {/* High-end Brand Statement */}
          <p className="max-w-xl text-base sm:text-xl text-zinc-300 font-light leading-relaxed mb-10 border-l border-[#c5a880] pl-5">
            Premium fashion, carefully selected for quality, fit, and everyday confidence. High-density 280–450 GSM imported textiles, consistent proportions, and honest personal styling.
          </p>

          {/* Sharp Architectural Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-white text-zinc-950 font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#ece8e1] transition-all flex items-center justify-center gap-3 group shadow-2xl"
            >
              <span>Explore Collection</span>
              <span className="transition-transform group-hover:translate-x-1 font-mono">→</span>
            </button>

            <button
              onClick={onVisitStoreClick}
              className="px-7 py-4 bg-black/60 hover:bg-black/90 text-white font-medium text-xs uppercase tracking-[0.2em] border border-white/20 hover:border-white/60 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Visit Kapas Hera Store</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Specification Grid */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#090a0c]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">01 / Fabric Standards</span>
            <p className="font-medium text-zinc-200">280–450 GSM Combed Weaves</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">02 / Fit Calibration</span>
            <p className="font-medium text-zinc-200">Consistent Measured Drapes</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">03 / Fair Pricing</span>
            <p className="font-medium text-zinc-200">Zero Luxury Mall Surcharges</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest block">04 / Physical Atelier</span>
            <p className="font-medium text-white flex items-center gap-1.5">
              <span>Street 9, Kapas Hera · Till 10:30 PM</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
