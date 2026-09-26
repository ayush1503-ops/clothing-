import React, { useState, useEffect } from 'react';
import { PRODUCTS, REVIEWS, STORE_INFO } from './data/storeData';
import { Product, CartItem, Review } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCollection } from './components/FeaturedCollection';
import { EditorialSection } from './components/EditorialSection';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { StoreExperience } from './components/StoreExperience';
import { LookbookSection } from './components/LookbookSection';
import { FabricCraftSection } from './components/FabricCraftSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  // State: Cart with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bbw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: Wishlist with persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bbw_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: Reviews with default seed
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bbw_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bbw_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });

    showToast(`Added ${product.name} (${size}) to Bag`);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = quantity;
        return updated;
      });
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from Bag');
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setAppliedDiscount(discount);
    setAppliedPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ) => {
    handleAddToCart(product, size, color, quantity);
    setActiveProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    showToast('Your order has been placed with Big Bear Wear!');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from saved`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard', 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Reviews operation
  const handleAddReview = (newRevData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your store review has been published.');
  };

  const handleShopLookItem = (itemTitle: string) => {
    const matched = PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(itemTitle.toLowerCase())
    );
    if (matched) {
      setActiveProduct(matched);
    } else {
      setSelectedCategory('All');
      const collectionEl = document.getElementById('collection');
      collectionEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0e11] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#c5a880] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-zinc-950 font-medium text-xs sm:text-sm px-4 py-3 shadow-2xl border border-black/10 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onVisitStoreClick={() => {
            const el = document.getElementById('store');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Featured Product Collection */}
        <FeaturedCollection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuickView={(p) => setActiveProduct(p)}
          onAddToCart={(p, size, color) => handleAddToCart(p, size, color, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist.map((w) => w.id)}
        />

        {/* Textile Engineering & GSM Standards */}
        <div id="craft" className="scroll-mt-20">
          <FabricCraftSection
            onExploreArticles={() => {
              setSelectedCategory('All');
              const el = document.getElementById('collection');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* Editorial Fashion Feature */}
        <EditorialSection
          onDiscoverClick={() => {
            setSelectedCategory('All');
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Brand Narrative / About Section */}
        <BrandStory />

        {/* Asymmetric Living Lookbook */}
        <LookbookSection onShopItem={handleShopLookItem} />

        {/* Customer Reviews Grounded in Real Data (4.8★ / 77 Reviews) */}
        <CustomerReviews
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Physical Store Experience (Kapas Hera Flagship) */}
        <StoreExperience />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={activeProduct ? wishlist.some((p) => p.id === activeProduct.id) : false}
        onSelectRelated={(p) => setActiveProduct(p)}
        allProducts={PRODUCTS}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountMultiplier={appliedDiscount}
        promoCode={appliedPromoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setActiveProduct(p)}
      />
    </div>
  );
}
