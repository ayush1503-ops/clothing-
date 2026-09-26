import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection Index', href: '#collection', action: () => onSelectCategory('All') },
    { label: 'Tees & Denim', href: '#collection', action: () => onSelectCategory('T-Shirts') },
    { label: 'Textile Standards', href: '#craft' },
    { label: 'Editorial', href: '#editorial' },
    { label: 'The Atelier (Street 9)', href: '#store' },
    { label: 'Patron Ledger (4.8★)', href: '#reviews' },
  ];

  return (
    <>
      {/* Top store status announcement banner */}
      <aside aria-label="Store announcement" className="bg-[#121316] border-b border-white/5 py-1.5 px-4 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] tracking-wide">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Kapas Hera Flagship Open till 10:30 PM
            </span>
            <span className="hidden md:inline text-zinc-500">·</span>
            <span className="hidden md:inline text-zinc-400">
              Imported Articles & Custom Tailored Fits
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#c5a880]" />
              <span className="font-mono">{STORE_INFO.phone}</span>
            </a>
            <span className="text-zinc-600">|</span>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#c5a880]" />
              <span>Street 9, New Delhi</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navigation - strictly adhering to 3-zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0d0e11]/95 backdrop-blur-md border-white/10 py-3 shadow-lg shadow-black/40'
            : 'bg-[#0d0e11]/80 backdrop-blur-sm border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="/"
            className="flex items-center gap-2 group text-white tracking-widest uppercase font-serif text-xl sm:text-2xl font-bold whitespace-nowrap"
          >
            <span>BIG BEAR WEAR</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-widest font-medium text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.action) {
                    link.action();
                  }
                }}
                className="relative py-1 hover:text-white transition-colors group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a880] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions & utility affordances */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenSearch}
              aria-label="Search collection"
              className="p-2 text-zinc-300 hover:text-white transition-colors hover:bg-white/5 rounded-full"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-2 text-zinc-300 hover:text-white transition-colors hover:bg-white/5 rounded-full"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-[#c5a880] text-black rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="relative flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/10 hover:border-white/25 rounded-md text-xs tracking-wider text-white transition-all hover:bg-zinc-800"
            >
              <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
              <span className="hidden sm:inline font-medium">BAG</span>
              <span className="font-mono text-[11px] text-zinc-400">({cartCount})</span>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 lg:hidden text-zinc-300 hover:text-white rounded-md hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0e11] border-b border-white/10 px-6 py-6 animate-fadeIn">
            <nav className="flex flex-col space-y-4 text-sm tracking-wider uppercase font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    if (link.action) link.action();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-zinc-300 hover:text-[#c5a880] transition-colors border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-zinc-600 text-xs">→</span>
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Open Today: 11:00 AM – 10:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>497, Street 9, Kapas Hera Ext., New Delhi</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
