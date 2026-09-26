import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Eye, ShoppingBag, Check, MapPin, Store } from 'lucide-react';

interface FeaturedCollectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = ['All', 'T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Hoodies', 'Casual Wear'];

  const filteredProducts = products.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleColorSelect = (e: React.MouseEvent, productId: string, colorName: string) => {
    e.stopPropagation();
    setSelectedColors((prev) => ({ ...prev, [productId]: colorName }));
  };

  const handleSizeSelect = (e: React.MouseEvent, productId: string, sizeName: string) => {
    e.stopPropagation();
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeName }));
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const chosenColor = selectedColors[product.id] || product.colors[0]?.name || 'Standard';
    const chosenSize = selectedSizes[product.id] || product.sizes[0] || 'M';
    onAddToCart(product, chosenSize, chosenColor);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a880] mb-2 uppercase">
            <span>Autumn / Winter Curation</span>
            <span className="text-zinc-600">/</span>
            <span>Atelier Releases</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight uppercase">
            The Current Index
          </h2>
        </div>

        {/* Clean interactive category segmented filter controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-150 whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold border-white'
                  : 'text-zinc-400 hover:text-white border-white/10 hover:border-white/30 bg-zinc-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid - 3 columns desktop, 2 columns tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredProducts.map((product) => {
          const isHovered = hoveredProductId === product.id;
          const isWishlisted = wishlistIds.includes(product.id);
          const activeColor = selectedColors[product.id] || product.colors[0]?.name;
          const activeSize = selectedSizes[product.id] || product.sizes[0];
          const isAdded = addedNotice === product.id;

          return (
            <article
              key={product.id}
              className="group flex flex-col bg-[#0f1013] border border-white/10 hover:border-white/30 transition-all duration-300 relative cursor-pointer"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              onClick={() => onQuickView(product)}
            >
              {/* Image Container with 3:4 aspect ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                {/* Fallback pattern underneath */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xs font-mono uppercase">
                  Big Bear Wear · {product.name}
                </div>

                {/* Primary Image */}
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
                    isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                />

                {/* Secondary Alternate Image on Hover */}
                {product.secondaryImage && (
                  <img
                    src={product.secondaryImage}
                    alt={`${product.name} alternate view`}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  />
                )}

                {/* Editorial Top Left Specs */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                  {product.badge && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-100 bg-black/80 px-2 py-0.5 border border-white/15">
                      {product.badge}
                    </span>
                  )}
                  {product.articleCode && (
                    <span className="text-[9px] font-mono tracking-widest text-[#c5a880] bg-black/80 px-2 py-0.5 border border-white/10">
                      {product.articleCode}
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product);
                  }}
                  className={`absolute top-3 right-3 p-2.5 backdrop-blur-md transition-all duration-200 border border-white/10 ${
                    isWishlisted
                      ? 'bg-white text-red-600 scale-105 shadow-lg'
                      : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Action Floating Bar on hover */}
                <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="flex-1 py-2.5 bg-black/90 hover:bg-black text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-white/20 hover:border-white/50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Inspect</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="flex-1 py-2.5 bg-white hover:bg-[#ece8e1] text-zinc-950 text-xs font-mono uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Bag ({activeSize})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Metadata Details */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  {/* Category, weight & stock */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span className="uppercase tracking-widest text-[#c5a880]">{product.category}</span>
                    {product.weightGsm && (
                      <span className="text-zinc-400">{product.weightGsm}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-medium text-white group-hover:text-[#c5a880] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {/* Physical store stock grounding */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>In Stock at Kapas Hera ({product.stockKapasHera || 4} units)</span>
                  </div>
                </div>

                {/* Direct Size Selector Row */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-zinc-400">
                    <span>SELECT SIZE:</span>
                    <span className="text-white font-bold">{activeSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={(e) => handleSizeSelect(e, product.id, sz)}
                        className={`flex-1 py-1 font-mono text-[10px] border transition-all ${
                          activeSize === sz
                            ? 'border-white bg-white text-black font-bold'
                            : 'border-white/10 text-zinc-400 hover:border-white/30'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Colors & Price */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  {/* Color Swatches */}
                  <div className="flex items-center gap-1.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        aria-label={`Select ${color.name}`}
                        title={color.name}
                        onClick={(e) => handleColorSelect(e, product.id, color.name)}
                        className={`w-3.5 h-3.5 rounded-full transition-transform ${
                          activeColor === color.name
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0f1013] scale-110'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                    <span className="text-[10px] font-mono text-zinc-400 ml-1 truncate max-w-[80px]">
                      {activeColor}
                    </span>
                  </div>

                  {/* Price in INR with tabular nums */}
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through font-mono tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-semibold text-white font-mono tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Direct Add button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="sm:hidden w-full py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag ({activeSize})</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

