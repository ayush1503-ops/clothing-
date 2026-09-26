export interface Product {
  id: string;
  name: string;
  category: 'T-Shirts' | 'Shirts' | 'Jeans' | 'Jackets' | 'Hoodies' | 'Casual Wear';
  price: number;
  originalPrice?: number;
  badge?: string;
  articleCode?: string;
  weightGsm?: string;
  stockKapasHera?: number;
  primaryImage: string;
  secondaryImage: string;
  colors: { name: string; hex: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  description: string;
  fit: string;
  fabric: string;
  details: string[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  tag: 'Fit & Quality' | 'Customer Experience' | 'Pricing' | 'Collection';
  verifiedPurchase: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  itemsFeatured: string[];
  vibe: string;
}

export interface StoreInfo {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  area: string;
  city: string;
  pincode: string;
  phone: string;
  formattedPhone: string;
  hours: string;
  openStatus: string;
  googleMapsUrl: string;
}
