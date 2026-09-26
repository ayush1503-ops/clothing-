import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, ShieldCheck, Ruler, Truck, RefreshCw, Check, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectRelated: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onSelectRelated,
  allProducts,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const images = [product.primaryImage, product.secondaryImage].filter(Boolean);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const fallbackRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#111215] border border-white/20 max-w-5xl w-full max-h-[94vh] overflow-y-auto relative my-auto shadow-2xl">
        {/* Sticky close button */}
        <button
          onClick={onClose}
          aria-label="Close product detail"
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black text-zinc-300 hover:text-white rounded-full backdrop-blur-md border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
          {/* Left Column: Gallery (7 cols on desktop) */}
          <div className="md:col-span-6 lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 border border-white/10">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/15 text-zinc-200 text-xs px-2.5 py-1 uppercase tracking-wider font-semibold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 aspect-[3/4] overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols on desktop) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, SKU & In-Store Stock */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="uppercase tracking-widest text-[#c5a880]">{product.category}</span>
                <span className="text-zinc-400">{product.articleCode || `BBW-${product.id.toUpperCase()}`}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif text-white font-light mb-2">
                {product.name}
              </h1>

              {/* Garment Weight & Atelier In-Stock badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
                {product.weightGsm && (
                  <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300">
                    {product.weightGsm}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{product.stockKapasHera || 4} in stock at Street 9 Flagship</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl sm:text-3xl font-semibold text-white font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-zinc-500 line-through font-mono tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-medium">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              {/* Color Selector */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase tracking-wider text-zinc-400">Color:</span>
                  <span className="text-zinc-200 font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border transition-all text-xs font-mono ${
                        selectedColor === color.name
                          ? 'border-white bg-white/10 text-white font-semibold'
                          : 'border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/40"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector + Size Guide link */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase tracking-wider text-zinc-400">Select Size:</span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[#c5a880] hover:text-white underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Measurements Chart</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                        selectedSize === sz
                          ? 'border-white bg-white text-zinc-950'
                          : 'border-white/15 text-zinc-300 hover:border-white/40 hover:bg-white/5'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400 pt-1 font-mono">
                  Calibrated fit: {product.fit}
                </p>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">Qty:</span>
                <div className="flex items-center border border-white/20 bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-white hover:bg-[#ece8e1] text-zinc-950 font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    aria-label="Save to Wishlist"
                    className={`p-3.5 border transition-all ${
                      isWishlisted
                        ? 'border-red-500 bg-red-500/10 text-red-500'
                        : 'border-white/20 text-zinc-300 hover:text-white hover:border-white/50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-[#c5a880] hover:bg-[#b5956a] text-zinc-950 font-mono font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <span>Instant Checkout · Cash on Delivery / UPI</span>
                </button>
              </div>

              {/* Service & Trust Markers */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Truck className="w-4 h-4 text-[#c5a880]" />
                  <span>Free Express Delivery across Delhi NCR & India on orders &gt; ₹2,500</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                  <span>Complimentary in-store hem adjustments at Kapas Hera Flagship</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <RefreshCw className="w-4 h-4 text-[#c5a880]" />
                  <span>7-Day Easy Exchange Policy & Instant Store Fitting Guarantee</span>
                </div>
              </div>

              {/* Fabric & Description Details */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                  Article Details & Fabric
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {product.description}
                </p>
                <div className="p-3 bg-zinc-900 border border-white/5 text-xs space-y-1">
                  <p className="text-zinc-200">
                    <strong className="text-white">Fabrication:</strong> {product.fabric}
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 text-[11px] pt-1 space-y-0.5">
                    {product.details.map((dt, i) => (
                      <li key={i}>{dt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related products */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-wider text-zinc-300 font-semibold mb-3">
                Style It With
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {fallbackRelated.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group cursor-pointer p-2 bg-zinc-900/60 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-800 mb-1.5">
                      <img
                        src={rel.primaryImage}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[11px] font-medium text-zinc-200 truncate group-hover:text-[#c5a880]">
                      {rel.name}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-400">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal Sub-drawer */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121316] border border-white/20 p-6 max-w-lg w-full">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-serif text-white">Size Measurement Chart (Inches)</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              All Big Bear Wear pieces are cut with consistent proportions. Need a custom fit? Visit our Kapas Hera store for complimentary alterations.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-zinc-300">
                <thead className="bg-zinc-800/80 uppercase font-mono text-[10px] text-zinc-400">
                  <tr>
                    <th className="p-2">Size</th>
                    <th className="p-2">Chest (In)</th>
                    <th className="p-2">Length (In)</th>
                    <th className="p-2">Shoulder (In)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr>
                    <td className="p-2 font-bold text-white">S</td>
                    <td className="p-2">40"</td>
                    <td className="p-2">27.5"</td>
                    <td className="p-2">19.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">M</td>
                    <td className="p-2">42"</td>
                    <td className="p-2">28.5"</td>
                    <td className="p-2">20.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">L</td>
                    <td className="p-2">44"</td>
                    <td className="p-2">29.5"</td>
                    <td className="p-2">21.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">XL</td>
                    <td className="p-2">46"</td>
                    <td className="p-2">30.5"</td>
                    <td className="p-2">22.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">XXL</td>
                    <td className="p-2">48"</td>
                    <td className="p-2">31.5"</td>
                    <td className="p-2">23.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2 bg-white text-black font-semibold text-xs uppercase tracking-wider"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
