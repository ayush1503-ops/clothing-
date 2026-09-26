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
    <section className="py-24 bg-[#07080a] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a880] uppercase">
              <span>Textile Engineering</span>
              <span className="text-zinc-600">/</span>
              <span>The Big Bear Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight">
              Weight. Texture. <span className="italic text-[#ece8e1]">Permanence.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            The difference between fast fashion and heirloom menswear is measured in grams per square metre, fibre length, and stitch integrity.
          </p>
        </div>

        {/* 2-Column Textile Interactive Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Extreme Macro Visual */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/3] bg-zinc-950 border border-white/15 overflow-hidden">
              <img
                src="/src/assets/images/macro_fabric_texture_1790427660977.jpg"
                alt="Extreme Macro Textile Weave Big Bear Wear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Technical Measurement Overlay */}
              <div className="absolute top-4 left-4 p-3 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono space-y-1">
                <span className="text-[#c5a880] uppercase block">MACRO SPECIMEN #09</span>
                <span className="text-zinc-300">High-Density Ring Spun Threading</span>
              </div>

              <div className="absolute bottom-4 right-4 p-3 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-400">
                <span>INSPECTED AT STREET 9 ATELIER</span>
              </div>
            </div>

            {/* GSM Comparison Pill Bar */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedGsm('280')}
                className={`py-3 px-3 border text-left transition-all ${
                  selectedGsm === '280'
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
                }`}
              >
                <span className="block font-mono text-xs font-bold">280 GSM</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Heavyweight Tee</span>
              </button>

              <button
                onClick={() => setSelectedGsm('450')}
                className={`py-3 px-3 border text-left transition-all ${
                  selectedGsm === '450'
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
                }`}
              >
                <span className="block font-mono text-xs font-bold">450 GSM</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">French Terry</span>
              </button>

              <button
                onClick={() => setSelectedGsm('14oz')}
                className={`py-3 px-3 border text-left transition-all ${
                  selectedGsm === '14oz'
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
                }`}
              >
                <span className="block font-mono text-xs font-bold">14.0 OZ</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Selvedge Denim</span>
              </button>
            </div>
          </div>

          {/* Right Column: Specification Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 bg-[#0f1013] border border-white/15 space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] block mb-1">
                  Active Standard
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
                  {current.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {current.application}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-l-2 border-[#c5a880] pl-4">
                {current.description}
              </p>

              {/* Spec Table */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                {current.specs.map((item, idx) => (
                  <div key={idx} className="p-3 bg-zinc-900/80 border border-white/5 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-zinc-200 font-semibold block">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Touch & feel this exact fabric at our Kapas Hera store.
                </span>
                <button
                  onClick={onExploreArticles}
                  className="px-4 py-2 bg-white text-zinc-950 text-xs font-semibold uppercase tracking-wider hover:bg-[#ece8e1] transition-colors flex items-center gap-1.5"
                >
                  <span>View Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Why Big Bear Wear Beats Mall Brands comparison row */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-zinc-950 border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Fast Fashion</span>
                <span className="text-red-400 font-bold block mt-1">140–160 GSM</span>
                <span className="text-[10px] text-zinc-400">Collars bacon after 3 washes</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Mall Retailers</span>
                <span className="text-amber-400 font-bold block mt-1">180–200 GSM</span>
                <span className="text-[10px] text-zinc-400">Marked up 3x for mall rent</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-[#c5a880]/50">
                <span className="text-[#c5a880] block text-[10px] font-bold">Big Bear Wear</span>
                <span className="text-white font-bold block mt-1">280–450 GSM</span>
                <span className="text-[10px] text-zinc-300">Direct boutique pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
