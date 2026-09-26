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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-zinc-900 flex flex-col justify-between shadow-2xl animate-slideLeft">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-lg font-serif tracking-wide font-bold">Saved Looks</h2>
              <span className="text-xs font-mono text-zinc-500">({wishlist.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif text-zinc-950 font-bold">No saved items yet</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto font-light">
                  Click the heart icon on any article in our collection to save for later review or store visit.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-zinc-50 border border-zinc-200 rounded-xl items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 aspect-[3/4] bg-zinc-200 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                      <img
                        src={item.primaryImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-zinc-950 mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                        {item.weightGsm || item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onMoveToCart(item)}
                      title="Move to bag"
                      className="p-2 bg-zinc-900 hover:bg-black text-white rounded-full transition-colors shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      title="Remove from saved"
                      className="p-2 text-zinc-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-zinc-200 bg-zinc-50">
            <button
              onClick={onClose}
              className="w-full py-3 bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-900 font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-colors shadow-xs"
            >
              Continue Browsing Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
