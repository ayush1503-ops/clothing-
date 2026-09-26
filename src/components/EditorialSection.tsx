import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Scissors, Layers, ShieldCheck } from 'lucide-react';

interface EditorialSectionProps {
  onDiscoverClick: () => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onDiscoverClick }) => {
  return (
    <section id="editorial" className="py-24 bg-[#090a0c] border-y border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual Frame (7 columns) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-zinc-900 border border-white/10 group">
              <img
                src="/src/assets/images/editorial_craft_fashion_1790427203885.jpg"
                alt="Editorial Craft & Tailored Fit by Big Bear Wear"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle image caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-zinc-300">
                <div>
                  <p className="font-semibold text-white tracking-wide">AUTUMN/WINTER '26 EDITORIAL</p>
                  <p className="text-zinc-400 text-[11px]">Structured Utility Outerwear & Combed Organic Weaves</p>
                </div>
                <span className="font-mono text-[#c5a880] text-[11px] hidden sm:inline">KAPAS HERA FLAGSHIP</span>
              </div>
            </div>

            {/* Decorative subtle accent frame */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-40 h-40 border-r border-b border-[#c5a880]/30 pointer-events-none -z-0" />
          </div>

          {/* Editorial Narrative & Highlights (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                The Big Bear Manifesto
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight uppercase leading-[1.05]">
                Made For Everyday <span className="italic text-[#e8e4dc]">Style.</span>
              </h2>
            </div>

            <blockquote className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed border-l-2 border-[#c5a880] pl-4 italic">
              "Thoughtfully selected pieces designed around comfort, quality, and a fit that feels right."
            </blockquote>

            <p className="text-sm text-zinc-400 leading-relaxed">
              We reject fleeting micro-trends and synthetic shortcuts. Every garment in our Kapas Hera boutique is selected with deliberate intent—rigorous fabric weight, double-stitched reinforcements, and a silhouette cut to look exceptional both in motion and at rest.
            </p>

            {/* 3 Craft Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-white/5 rounded text-[#c5a880]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Imported Textiles & Heavyweights</h4>
                  <p className="text-xs text-zinc-400">Custom 280–450 GSM pure combed cottons and shuttle-loomed selvedge denim.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-white/5 rounded text-[#c5a880]">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Consistent Fits Across Articles</h4>
                  <p className="text-xs text-zinc-400">No guesswork. Proportional armhole drop, chest drape, and shoulder placement.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-white/5 rounded text-[#c5a880]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Honest Pricing & In-Store Guidance</h4>
                  <p className="text-xs text-zinc-400">Transparent value without mall markups. Polite staff dedicated to genuine style advice.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onDiscoverClick}
                className="px-8 py-3.5 bg-white text-zinc-950 font-medium text-xs sm:text-sm uppercase tracking-widest hover:bg-[#e8e4dc] transition-all flex items-center gap-2 group"
              >
                <span>Discover Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
