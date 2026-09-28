import React, { useState } from 'react';
import { Layers, Scissors, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';

export const FabricCraftSection: React.FC<{ onExploreArticles: () => void }> = ({ onExploreArticles }) => {
  const [selectedGsm, setSelectedGsm] = useState<'280' | '450' | '14oz'>('280');

  const gsmData = {
    '280': {
      title: '280 GSM Heavyweight Combed Cotton',
      application: 'Featured on: Washed Boxy T-Shirts & Acid Drops',
      description: 'Twice the physical yarn density of typical commercial tees. Spun from long-staple combed cotton fibres that resist pilling, combined with a 1x1 tight-rib collar engineered to maintain shape through countless wash cycles.',
      specs: [
        { label: 'Yarn Count', val: '24s Compact Spun' },
        { label: 'Shrinkage Rate', val: '< 1.8% Pre-Shrunk' },
        { label: 'Collar Reinforcement', val: 'Twin-Needle Rib Lock' },
        { label: 'Hand Feel', val: 'Heavy Structured Drape' }
      ]
    },
    '450': {
      title: '450 GSM Archival French Terry',
      application: 'Featured on: Archival Pullover Hoodies',
      description: 'Heavyweight cross-grain diagonal fleece knit with dense loopback interior. Provides substantial thermal insulation and a self-supporting double-layer hood that sits crisp without drawstrings.',
      specs: [
        { label: 'Knit Structure', val: 'Diagonal Loopback Terry' },
        { label: 'Ribbing', val: '480 GSM Heavy Spandex Blend' },
        { label: 'Seam Construction', val: 'Four-Thread Flatlock' },
        { label: 'Silhouette', val: 'Boxy Drop-Shoulder Volume' }
      ]
    },
    '14oz': {
      title: '14.0 oz Shuttle-Loomed Selvedge',
      application: 'Featured on: Obsidian Raw Denim & Trucker Jackets',
      description: 'Woven slowly on heritage shuttle looms yielding a distinct textured warp. Finished with copper-plated rivets at high-stress points, vintage brass hardware, and clean interior selvedge ID edges.',
      specs: [
        { label: 'Loom Type', val: 'Vintage Shuttle Loom' },
        { label: 'Dye Process', val: 'Rope-Dyed Pure Indigo/Obsidian' },
        { label: 'Hardware', val: 'Custom Gunmetal Shanks' },
        { label: 'Tailoring Service', val: 'Complimentary In-Store Hemming' }
      ]
    }
  };

  const current = gsmData[selectedGsm];

  return (
    <section className="py-20 sm:py-24 bg-[#fafafc] border-y border-zinc-200 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-200 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-700 uppercase font-semibold">
              <span>Textile Engineering</span>
              <span className="text-zinc-300">/</span>
              <span>The Vesper Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight text-zinc-950">
              Weight. Texture. <span className="italic text-zinc-700">Permanence.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-light leading-relaxed">
            The difference between fast fashion and heirloom menswear is measured in grams per square metre, fibre length, and stitch integrity.
          </p>
        </div>

        {/* 2-Column Textile Interactive Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Extreme Macro Visual */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/3] bg-zinc-100 border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
              <img
                src="/src/assets/images/macro_fabric_texture_1790427660977.jpg"
                alt="Extreme Macro Textile Weave Vesper Atelier"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Technical Measurement Overlay */}
              <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-lg text-[11px] font-mono space-y-1 shadow-xs">
                <span className="text-emerald-700 font-bold uppercase block">MACRO SPECIMEN #09</span>
                <span className="text-zinc-800">High-Density Ring Spun Threading</span>
              </div>

              <div className="absolute bottom-4 right-4 p-2.5 bg-black/85 backdrop-blur-md rounded-md text-[11px] font-mono text-zinc-200 shadow-md">
                <span>INSPECTED AT FLAGSHIP ATELIER</span>
              </div>
            </div>

            {/* GSM Comparison Pill Bar */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedGsm('280')}
                className={`py-3 px-3 border rounded-lg text-left transition-all ${
                  selectedGsm === '280'
                    ? 'border-zinc-900 bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-900'
                    : 'border-zinc-200 bg-white/70 text-zinc-600 hover:border-zinc-300 hover:text-black'
                }`}
              >
                <span className="block font-mono text-xs font-bold">280 GSM</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Heavyweight Tee</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGsm('450')}
                className={`py-3 px-3 border rounded-lg text-left transition-all ${
                  selectedGsm === '450'
                    ? 'border-zinc-900 bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-900'
                    : 'border-zinc-200 bg-white/70 text-zinc-600 hover:border-zinc-300 hover:text-black'
                }`}
              >
                <span className="block font-mono text-xs font-bold">450 GSM</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">French Terry</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGsm('14oz')}
                className={`py-3 px-3 border rounded-lg text-left transition-all ${
                  selectedGsm === '14oz'
                    ? 'border-zinc-900 bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-900'
                    : 'border-zinc-200 bg-white/70 text-zinc-600 hover:border-zinc-300 hover:text-black'
                }`}
              >
                <span className="block font-mono text-xs font-bold">14.0 OZ</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Selvedge Denim</span>
              </button>
            </div>
          </div>

          {/* Right Column: Specification Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                  Active Standard
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-zinc-950 font-normal">
                  {current.title}
                </h3>
                <p className="text-xs font-mono text-zinc-500 mt-1">
                  {current.application}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed border-l-2 border-emerald-600 pl-4">
                {current.description}
              </p>

              {/* Spec Table */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                {current.specs.map((item, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-lg space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-zinc-900 font-semibold block">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Touch & feel this exact fabric at our Flagship store.
                </span>
                <button
                  type="button"
                  onClick={onExploreArticles}
                  className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>View Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Why Vesper Atelier Beats Mall Brands comparison row */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-white border border-zinc-200 rounded-lg">
                <span className="text-zinc-500 block text-[10px] uppercase">Fast Fashion</span>
                <span className="text-rose-600 font-bold block mt-1">140–160 GSM</span>
                <span className="text-[10px] text-zinc-500">Collars bacon after 3 washes</span>
              </div>
              <div className="p-3 bg-white border border-zinc-200 rounded-lg">
                <span className="text-zinc-500 block text-[10px] uppercase">Mall Retailers</span>
                <span className="text-amber-600 font-bold block mt-1">180–200 GSM</span>
                <span className="text-[10px] text-zinc-500">Marked up 3x for mall rent</span>
              </div>
              <div className="p-3 bg-white border-2 border-emerald-600 rounded-lg shadow-xs">
                <span className="text-emerald-700 block text-[10px] font-bold uppercase">Vesper Atelier</span>
                <span className="text-zinc-950 font-bold block mt-1">280–450 GSM</span>
                <span className="text-[10px] text-zinc-600 font-medium">Direct boutique pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
