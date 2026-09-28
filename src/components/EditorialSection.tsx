import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Scissors, Layers, ShieldCheck } from 'lucide-react';

interface EditorialSectionProps {
  onDiscoverClick: () => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onDiscoverClick }) => {
  return (
    <section id="editorial" className="py-20 sm:py-28 bg-white border-b border-zinc-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual Frame (7 columns) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-zinc-100 border border-zinc-200 rounded-2xl shadow-lg group">
              <img
                src="/src/assets/images/editorial_craft_fashion_1790427203885.jpg"
                alt="Editorial Craft & Tailored Fit by Vesper Atelier"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle image caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-xl flex items-center justify-between text-xs text-zinc-600 shadow-sm">
                <div>
                  <p className="font-semibold text-zinc-900 tracking-wide">AUTUMN/WINTER '26 EDITORIAL</p>
                  <p className="text-zinc-500 text-[11px]">Structured Utility Outerwear & Combed Organic Weaves</p>
                </div>
                <span className="font-mono text-emerald-700 font-semibold text-[11px] hidden sm:inline">FLAGSHIP ATELIER</span>
              </div>
            </div>

            {/* Decorative subtle accent frame */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-40 h-40 border-r-2 border-b-2 border-emerald-600/30 rounded-br-2xl pointer-events-none -z-0" />
          </div>

          {/* Editorial Narrative & Highlights (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-700 font-bold font-mono">
                The Vesper Atelier Manifesto
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-black text-zinc-950 uppercase tracking-tight leading-[1.02]">
                Made For Everyday <span className="font-serif font-normal italic text-zinc-800">Style.</span>
              </h2>
            </div>

            <blockquote className="text-base sm:text-lg text-zinc-700 font-light leading-relaxed border-l-2 border-emerald-600 pl-4 italic">
              "Thoughtfully selected pieces designed around comfort, quality, and a fit that feels right."
            </blockquote>

            <p className="text-sm text-zinc-600 leading-relaxed font-light">
              We reject fleeting micro-trends and synthetic shortcuts. Every garment in our flagship boutique is selected with deliberate intent—rigorous fabric weight, double-stitched reinforcements, and a silhouette cut to look exceptional both in motion and at rest.
            </p>

            {/* 3 Craft Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 p-2 bg-zinc-100 rounded-lg text-emerald-700 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">Imported Textiles & Heavyweights</h4>
                  <p className="text-xs text-zinc-600 font-light">Custom 280–450 GSM pure combed cottons and shuttle-loomed selvedge denim.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 p-2 bg-zinc-100 rounded-lg text-emerald-700 shrink-0">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">Consistent Fits Across Articles</h4>
                  <p className="text-xs text-zinc-600 font-light">No guesswork. Proportional armhole drop, chest drape, and shoulder placement.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 p-2 bg-zinc-100 rounded-lg text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">Honest Pricing & In-Store Guidance</h4>
                  <p className="text-xs text-zinc-600 font-light">Transparent value without mall markups. Polite staff dedicated to genuine style advice.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onDiscoverClick}
                className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-2 group shadow-md"
              >
                <span>Discover Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
