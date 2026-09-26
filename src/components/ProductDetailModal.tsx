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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-zinc-200 rounded-2xl max-w-5xl w-full max-h-[94vh] overflow-y-auto relative my-auto shadow-2xl">
        {/* Sticky close button */}
        <button
          onClick={onClose}
          aria-label="Close product detail"
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-zinc-100 text-zinc-600 hover:text-black rounded-full backdrop-blur-md border border-zinc-200 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
          {/* Left Column: Gallery (7 cols on desktop) */}
          <div className="md:col-span-6 lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 border border-zinc-200 rounded-xl">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-900 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold font-mono shadow-xs">
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
                    className={`relative w-20 aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === img ? 'border-zinc-900 shadow-sm' : 'border-zinc-200 opacity-60 hover:opacity-100'
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
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                <span className="uppercase tracking-widest text-emerald-700 font-bold">{product.category}</span>
                <span className="text-zinc-500">{product.articleCode || `BBW-${product.id.toUpperCase()}`}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-sans font-bold text-zinc-950 mb-2 leading-snug">
                {product.name}
              </h1>

              {/* Garment Weight & Atelier In-Stock badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-mono">
                {product.weightGsm && (
                  <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-800 font-medium">
                    {product.weightGsm}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{product.stockKapasHera || 4} in stock at Kapas Hera</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl sm:text-3xl font-bold text-zinc-950 font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-zinc-400 line-through font-mono tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-emerald-700 font-mono font-semibold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              {/* Color Selector */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase tracking-wider text-zinc-500">Color:</span>
                  <span className="text-zinc-900 font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-mono ${
                        selectedColor === color.name
                          ? 'border-zinc-900 bg-zinc-50 text-zinc-950 font-bold ring-1 ring-zinc-900'
                          : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
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
                  <span className="uppercase tracking-wider text-zinc-500">Select Size:</span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-emerald-700 hover:text-emerald-800 font-medium underline flex items-center gap-1"
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
                      className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all border ${
                        selectedSize === sz
                          ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-zinc-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-500 pt-1 font-mono">
                  Calibrated fit: {product.fit}
                </p>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-500">Qty:</span>
                <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-100"
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
                    className="flex-1 py-3.5 bg-zinc-900 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
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
                    className={`p-3.5 rounded-full border transition-all ${
                      isWishlisted
                        ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm'
                        : 'border-zinc-300 text-zinc-600 hover:text-black hover:border-zinc-400 bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Instant Checkout · Cash on Delivery / UPI</span>
                </button>
              </div>

              {/* Service & Trust Markers */}
              <div className="mt-6 pt-6 border-t border-zinc-200 space-y-2.5 text-xs text-zinc-600 font-light">
                <div className="flex items-center gap-2 text-zinc-800">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Free Express Delivery across Delhi NCR & India on orders &gt; ₹2,500</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Complimentary in-store hem adjustments at Kapas Hera Flagship</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-800">
                  <RefreshCw className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>7-Day Easy Exchange Policy & Instant Store Fitting Guarantee</span>
                </div>
              </div>

              {/* Fabric & Description Details */}
              <div className="mt-6 pt-6 border-t border-zinc-200 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-zinc-900 font-bold font-mono">
                  Article Details & Fabric
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs space-y-1">
                  <p className="text-zinc-900">
                    <strong className="font-semibold">Fabrication:</strong> {product.fabric}
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 text-[11px] pt-1 space-y-0.5">
                    {product.details.map((dt, i) => (
                      <li key={i}>{dt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related products */}
            <div className="pt-6 border-t border-zinc-200">
              <h4 className="text-xs uppercase tracking-wider text-zinc-900 font-bold font-mono mb-3">
                Style It With
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {fallbackRelated.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group cursor-pointer p-2 bg-white border border-zinc-200 rounded-lg hover:border-zinc-400 hover:shadow-sm transition-all"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-zinc-100 mb-1.5">
                      <img
                        src={rel.primaryImage}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[11px] font-medium text-zinc-900 truncate group-hover:text-emerald-700">
                      {rel.name}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500 font-semibold">
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
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
              <h3 className="text-base font-serif text-zinc-950 font-bold">Size Measurement Chart (Inches)</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-1 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-zinc-600 mb-4 font-light">
              All Big Bear Wear pieces are cut with consistent proportions. Need a custom fit? Visit our Kapas Hera store for complimentary alterations.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-zinc-700">
                <thead className="bg-zinc-100 uppercase font-mono text-[10px] text-zinc-500">
                  <tr>
                    <th className="p-2.5 rounded-l-md">Size</th>
                    <th className="p-2.5">Chest (In)</th>
                    <th className="p-2.5">Length (In)</th>
                    <th className="p-2.5 rounded-r-md">Shoulder (In)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-bold text-zinc-950">S</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">27.5"</td>
                    <td className="p-2.5">19.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-zinc-950">M</td>
                    <td className="p-2.5">42"</td>
                    <td className="p-2.5">28.5"</td>
                    <td className="p-2.5">20.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-zinc-950">L</td>
                    <td className="p-2.5">44"</td>
                    <td className="p-2.5">29.5"</td>
                    <td className="p-2.5">21.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-zinc-950">XL</td>
                    <td className="p-2.5">46"</td>
                    <td className="p-2.5">30.5"</td>
                    <td className="p-2.5">22.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-zinc-950">XXL</td>
                    <td className="p-2.5">48"</td>
                    <td className="p-2.5">31.5"</td>
                    <td className="p-2.5">23.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2.5 bg-zinc-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
