import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  selectedCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'GBP'>('INR');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'NEW RELEASES', category: 'All', href: '#collection', isSpecial: true },
    { label: 'MEN', category: 'All', href: '#collection' },
    { label: 'T-SHIRTS', category: 'T-Shirts', href: '#collection' },
    { label: 'SHIRTS & DENIM', category: 'Shirts', href: '#collection' },
    { label: 'OUTERWEAR', category: 'Jackets', href: '#collection' },
    { label: 'TEXTILE STANDARDS', category: null, href: '#craft' },
    { label: 'EDITORIAL', category: null, href: '#editorial' },
    { label: 'THE ATELIER', category: null, href: '#store' },
    { label: 'REVIEWS (4.8★)', category: null, href: '#reviews' },
  ];

  return (
    <>
      {/* Top store announcement banner */}
      <aside aria-label="Store announcement" className="bg-[#f8f9fa] border-b border-zinc-200/80 py-1.5 px-4 text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <strong className="text-zinc-900">Kapas Hera Flagship Open:</strong> 11:00 AM – 10:30 PM Today
            </span>
            <span className="hidden md:inline text-zinc-300">|</span>
            <span className="hidden md:inline text-zinc-600 font-mono text-[10px]">
              Direct Imported Textiles · 280–450 GSM Heavyweights
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-1 text-zinc-700 hover:text-emerald-700 transition-colors font-mono"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <span className="text-zinc-300">|</span>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Street 9, New Delhi 110097</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header with 2-tier aesthetic */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b border-zinc-200 ${
          isScrolled ? 'shadow-sm py-2' : 'py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tier 1: Search Bar (Left) | Brand Centerpiece (Center) | Controls (Right) */}
          <div className="flex items-center justify-between gap-4 py-1">
            {/* Left: Capsule Search Bar */}
            <div className="w-1/4 min-w-[200px] hidden md:block">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full max-w-[280px] flex items-center justify-between px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-300 hover:border-zinc-400 rounded-full text-xs text-zinc-500 shadow-sm transition-all text-left group"
              >
                <span className="italic font-light text-zinc-500 group-hover:text-zinc-700">Type here to search</span>
                <Search className="w-4 h-4 text-emerald-600 shrink-0" />
              </button>
            </div>

            {/* Mobile Search button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-2 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Brand Identity Logo Mark & Typography */}
            <a href="/" className="flex flex-col items-center group text-center my-0.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xs flex items-center justify-center p-0.5">
                  <img
                    src="/src/assets/images/big_bear_wear_logo_mark_1790431612287.jpg"
                    alt="Big Bear Wear Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left sm:text-center">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-zinc-950 uppercase group-hover:text-emerald-700 transition-colors block leading-tight">
                    BIG BEAR WEAR
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-500 block">
                    Kapas Hera · New Delhi
                  </span>
                </div>
              </div>
            </a>

            {/* Right: Currency Selector + Wishlist + Shopping Bag Drawer */}
            <div className="w-1/4 flex items-center justify-end gap-3 sm:gap-4">
              {/* Currency Selector matching reference SELECT: */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-600 font-mono">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">SELECT:</span>
                <div className="flex items-center gap-1 border border-zinc-200 rounded-sm p-0.5 bg-zinc-50 text-[11px]">
                  <button
                    onClick={() => setCurrency('INR')}
                    className={`px-1.5 py-0.5 font-semibold transition-colors rounded-xs ${
                      currency === 'INR' ? 'bg-emerald-600 text-white' : 'text-zinc-700 hover:text-black'
                    }`}
                    title="Indian Rupee (₹)"
                  >
                    🇮🇳 ₹
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-1.5 py-0.5 font-semibold transition-colors rounded-xs ${
                      currency === 'USD' ? 'bg-emerald-600 text-white' : 'text-zinc-700 hover:text-black'
                    }`}
                    title="US Dollar ($)"
                  >
                    🇺🇸 $
                  </button>
                  <button
                    onClick={() => setCurrency('GBP')}
                    className={`px-1.5 py-0.5 font-semibold transition-colors rounded-xs ${
                      currency === 'GBP' ? 'bg-emerald-600 text-white' : 'text-zinc-700 hover:text-black'
                    }`}
                    title="British Pound (£)"
                  >
                    🇬🇧 £
                  </button>
                </div>
              </div>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                aria-label="View Wishlist"
                className="relative p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-emerald-600 text-white rounded-full flex items-center justify-center font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button (Capsule) */}
              <button
                onClick={onOpenCart}
                aria-label="Shopping Bag"
                className="relative flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-mono font-medium rounded-full transition-all shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">BAG</span>
                <span className="bg-zinc-800 text-zinc-200 px-1.5 py-0.2 rounded-full text-[10px]">
                  {cartCount}
                </span>
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="p-2 lg:hidden text-zinc-700 hover:text-black rounded-md hover:bg-zinc-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Tier 2: Category Navigation Row with Active Green Accent */}
          <div className="hidden lg:block border-t border-zinc-200 mt-2.5 pt-2.5">
            <nav className="flex items-center justify-center gap-6 xl:gap-8 text-xs font-mono tracking-wider">
              {navLinks.map((link) => {
                const isActive = link.category && selectedCategory === link.category;
                const isSpecial = link.isSpecial;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      if (link.category) {
                        onSelectCategory(link.category);
                      }
                    }}
                    className={`py-1 font-semibold uppercase transition-colors relative ${
                      isSpecial || isActive
                        ? 'text-emerald-700 font-bold'
                        : 'text-zinc-700 hover:text-zinc-950'
                    }`}
                  >
                    <span>{link.label}</span>
                    {(isActive || isSpecial) && (
                      <span className="absolute -bottom-2.5 left-0 right-0 h-[2px] bg-emerald-600" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-200 px-6 py-6 animate-fadeIn shadow-lg">
            <div className="mb-4">
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-full text-xs text-zinc-500"
              >
                <span>Search articles, cuts, fabrics...</span>
                <Search className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3 text-xs font-mono tracking-wider uppercase font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    if (link.category) onSelectCategory(link.category);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 border-b border-zinc-100 flex items-center justify-between ${
                    link.isSpecial ? 'text-emerald-700 font-bold' : 'text-zinc-800 hover:text-emerald-700'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-zinc-400 text-xs">→</span>
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col gap-2 text-xs text-zinc-600 font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open Today: 11:00 AM – 10:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>497, Street 9, Kapas Hera Ext., New Delhi</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
