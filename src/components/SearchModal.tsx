import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );

  const popularTags = ['Heavyweight Tee', 'Selvedge Denim', 'Camp Shirt', 'Hoodie', 'Jacket'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111215] border border-white/20 max-w-2xl w-full shadow-2xl overflow-hidden">
        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-zinc-950">
          <Search className="w-5 h-5 text-[#c5a880] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, fabrics, fits, or cuts..."
            className="w-full bg-transparent text-white text-sm sm:text-base focus:outline-none placeholder:text-zinc-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular searches suggestions */}
        {query.trim() === '' && (
          <div className="p-6 space-y-4">
            <span className="text-xs uppercase tracking-wider text-zinc-500 block font-medium">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-zinc-900 border border-white/10 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-zinc-500">
              Big Bear Wear Flagship Catalog · 497, Street 9, Kapas Hera
            </div>
          </div>
        )}

        {/* Live Results */}
        {query.trim() !== '' && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
            <div className="text-xs text-zinc-400 mb-2">
              Found {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-10 text-xs text-zinc-500">
                No matching articles found for "{query}". Try checking "Denim", "Shirt", or "T-Shirt".
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="w-14 aspect-[3/4] bg-zinc-800 shrink-0 overflow-hidden">
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-medium text-white truncate group-hover:text-[#c5a880] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{item.fabric}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-mono font-semibold text-white">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors ml-auto mt-1" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
