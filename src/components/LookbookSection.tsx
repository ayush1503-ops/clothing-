import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/storeData';
import { LookbookItem } from '../types';
import { ArrowUpRight, Sparkles, X, ShoppingBag } from 'lucide-react';

interface LookbookSectionProps {
  onShopItem: (itemTitle: string) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onShopItem }) => {
  const [activeLook, setActiveLook] = useState<LookbookItem | null>(null);

  return (
    <section id="lookbook" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-zinc-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 mb-2 font-mono font-bold">
            <span>Visual Editorial & In-Store Captures</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="text-zinc-500">@vesperatelier</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-zinc-950 uppercase tracking-tight">
            The Living Lookbook
          </h2>
        </div>
        <p className="text-xs text-zinc-500 max-w-xs sm:text-right font-light leading-relaxed">
          Asymmetric cuts and everyday silhouettes styled directly from the Flagship Atelier racks.
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Large Feature Item 1 (7 cols) */}
        <div
          onClick={() => setActiveLook(LOOKBOOK_ITEMS[0])}
          className="md:col-span-7 group relative aspect-[16/11] md:aspect-auto md:min-h-[520px] overflow-hidden bg-zinc-100 border border-zinc-200 rounded-2xl cursor-pointer shadow-sm"
        >
          <img
            src={LOOKBOOK_ITEMS[0].image}
            alt={LOOKBOOK_ITEMS[0].title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-300" />

          {/* Hover Details */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono font-bold">
                {LOOKBOOK_ITEMS[0].vibe}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                {LOOKBOOK_ITEMS[0].title}
              </h3>
              <p className="text-xs text-zinc-200 font-light opacity-90 group-hover:opacity-100 transition-opacity">
                {LOOKBOOK_ITEMS[0].subtitle}
              </p>
            </div>
            <div className="p-3 bg-white text-zinc-950 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 shadow-md">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Stacked Right Column (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6 sm:gap-8">
          {/* Item 2 */}
          <div
            onClick={() => setActiveLook(LOOKBOOK_ITEMS[1])}
            className="group relative aspect-[4/3] overflow-hidden bg-zinc-100 border border-zinc-200 rounded-2xl cursor-pointer shadow-sm"
          >
            <img
              src={LOOKBOOK_ITEMS[1].image}
              alt={LOOKBOOK_ITEMS[1].title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold">
                  {LOOKBOOK_ITEMS[1].vibe}
                </span>
                <h4 className="text-base font-serif text-white font-medium">{LOOKBOOK_ITEMS[1].title}</h4>
              </div>
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white group-hover:bg-white group-hover:text-zinc-950 transition-colors shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div
            onClick={() => setActiveLook(LOOKBOOK_ITEMS[2])}
            className="group relative aspect-[4/3] overflow-hidden bg-zinc-100 border border-zinc-200 rounded-2xl cursor-pointer shadow-sm"
          >
            <img
              src={LOOKBOOK_ITEMS[2].image}
              alt={LOOKBOOK_ITEMS[2].title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold">
                  {LOOKBOOK_ITEMS[2].vibe}
                </span>
                <h4 className="text-base font-serif text-white font-medium">{LOOKBOOK_ITEMS[2].title}</h4>
              </div>
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white group-hover:bg-white group-hover:text-zinc-950 transition-colors shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Look Modal Preview */}
      {activeLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-zinc-100">
              <img
                src={activeLook.image}
                alt={activeLook.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-mono font-bold">
                    {activeLook.vibe}
                  </span>
                  <button
                    onClick={() => setActiveLook(null)}
                    className="p-1 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-2xl font-serif text-zinc-950 mb-2">{activeLook.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-6 font-light">
                  {activeLook.subtitle}
                </p>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-700 font-bold font-mono block">
                    Featured In This Look:
                  </span>
                  <div className="space-y-1.5">
                    {activeLook.itemsFeatured.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg flex items-center justify-between text-xs text-zinc-800"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => {
                            onShopItem(item);
                            setActiveLook(null);
                          }}
                          className="text-emerald-700 hover:text-emerald-800 font-medium text-[11px]"
                        >
                          View Item →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200">
                <button
                  onClick={() => {
                    onShopItem(activeLook.itemsFeatured[0] || 'All');
                    setActiveLook(null);
                  }}
                  className="w-full py-3 bg-zinc-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>Shop This Look</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
