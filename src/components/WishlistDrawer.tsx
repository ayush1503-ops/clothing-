import React from 'react';
import { Product } from '../types';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111215] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl animate-slideLeft">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h2 className="text-lg font-serif tracking-wide">Saved Looks</h2>
              <span className="text-xs font-mono text-zinc-400">({wishlist.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif text-white">No saved items yet</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Click the heart icon on any article in our collection to save for later review or store visit.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-zinc-900/60 border border-white/5 items-center justify-between"
                >
                  <div className="w-16 aspect-[3/4] bg-zinc-800 overflow-hidden shrink-0">
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0 px-2">
                    <h4 className="text-xs font-medium text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-zinc-400 capitalize">{item.category}</p>
                    <p className="text-xs font-mono font-semibold text-white mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => onMoveToCart(item)}
                      title="Move to bag"
                      className="p-2 bg-white text-black hover:bg-[#e8e4dc] transition-colors rounded-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      title="Remove from saved"
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-[#0e0f12]">
            <button
              onClick={onClose}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs uppercase tracking-wider font-medium"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
