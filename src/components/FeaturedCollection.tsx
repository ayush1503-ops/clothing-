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
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 bg-white">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-200 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-700 mb-2 uppercase font-semibold">
            <span>Curated Autumn / Winter '26</span>
            <span className="text-zinc-300">/</span>
            <span>Imported Articles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-zinc-950 uppercase tracking-tight">
            Featured Collection
          </h2>
        </div>

        {/* Clean capsule category buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap rounded-full border ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white font-bold border-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-black border-zinc-200 hover:border-zinc-300 bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid - 3 columns desktop, 2 columns tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isHovered = hoveredProductId === product.id;
          const isWishlisted = wishlistIds.includes(product.id);
          const activeColor = selectedColors[product.id] || product.colors[0]?.name;
          const activeSize = selectedSizes[product.id] || product.sizes[0];
          const isAdded = addedNotice === product.id;

          return (
            <article
              key={product.id}
              className="group flex flex-col bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-xl rounded-xl transition-all duration-300 relative cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              onClick={() => onQuickView(product)}
            >
              {/* Image Container with 3:4 aspect ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
                {/* Fallback pattern underneath */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs font-mono uppercase">
                  Vesper Atelier · {product.name}
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

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                  {product.badge && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-900 bg-white/95 px-2.5 py-0.5 rounded-full border border-zinc-200 font-semibold shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  {product.articleCode && (
                    <span className="text-[9px] font-mono tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 font-bold">
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
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 border border-zinc-200 ${
                    isWishlisted
                      ? 'bg-white text-red-600 scale-105 shadow-md'
                      : 'bg-white/80 text-zinc-600 hover:text-black hover:bg-white shadow-xs'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-red-600' : ''}`} />
                </button>

                {/* Quick Action Floating Bar on hover */}
                <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="flex-1 py-2.5 bg-white/95 hover:bg-white text-zinc-900 text-xs font-mono uppercase tracking-wider font-semibold backdrop-blur-md border border-zinc-300 hover:border-zinc-500 rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Quick View</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="flex-1 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add ({activeSize})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Metadata Details */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
                    <span className="uppercase tracking-widest text-emerald-700 font-semibold">{product.category}</span>
                    {product.weightGsm && (
                      <span className="text-zinc-600">{product.weightGsm}</span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 mt-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>In Stock at Flagship Atelier ({product.flagshipStock || 4} available)</span>
                  </div>
                </div>

                {/* Size Selector Row */}
                <div className="pt-2 border-t border-zinc-100">
                  <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-zinc-500">
                    <span>SELECT SIZE:</span>
                    <span className="text-zinc-900 font-bold">{activeSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={(e) => handleSizeSelect(e, product.id, sz)}
                        className={`flex-1 py-1 font-mono text-[10px] rounded-xs border transition-all ${
                          activeSize === sz
                            ? 'border-zinc-900 bg-zinc-900 text-white font-bold'
                            : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-black bg-zinc-50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Colors & Price */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  {/* Color Swatches */}
                  <div className="flex items-center gap-1.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        aria-label={`Select ${color.name}`}
                        title={color.name}
                        onClick={(e) => handleColorSelect(e, product.id, color.name)}
                        className={`w-4 h-4 rounded-full border transition-transform ${
                          activeColor === color.name
                            ? 'ring-2 ring-emerald-600 ring-offset-2 ring-offset-white scale-110 border-black/20'
                            : 'opacity-80 hover:opacity-100 border-zinc-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                    <span className="text-[10px] font-mono text-zinc-500 ml-1 truncate max-w-[80px]">
                      {activeColor}
                    </span>
                  </div>

                  {/* Price in INR */}
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-400 line-through font-mono tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-base sm:text-lg font-bold text-zinc-950 font-mono tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Direct Add button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="sm:hidden w-full py-2.5 bg-zinc-900 text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
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
