export interface Category {
  id: string;
  slug: string;
  name_ar: string;
  description_ar: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  name_ar: string;
  price_delta: number;
  stock: number;
  sort_order: number;
}

export interface Product {
  id: string;
  slug: string;
  name_ar: string;
  description_ar: string | null;
  ingredients_ar: string | null;
  brand: string | null;
  price: number;
  compare_price: number | null;
  stock: number;
  category_id: string | null;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_new: boolean;
  is_active: boolean;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
  categories?: { slug: string; name_ar: string } | null;
}

export interface CartItem {
  id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  product: Product;
  variant?: ProductVariant | null;
}

export interface LocalCartItem {
  product_id: string;
  variant_id: string | null;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  min_cart_value?: number;
  is_active: boolean;
}

export interface ShippingZone {
  id: string;
  name_ar: string;
  cost: number;
  estimated_days: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  variant_id: string | null;
  product_name_ar: string;
  variant_name_ar?: string;
  quantity: number;
  price_at_purchase: number;
}

export interface Order {
  id: string;
  user_id?: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Canceled" | "Returned";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total: number;
  shipping_address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district?: string;
  };
  created_at: string;
}
