import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductVariant, Coupon } from "../lib/types";

export interface CartItem {
  id: string; // unique combo of product_id + variant_id
  product_id: string;
  variant_id: string | null;
  quantity: number;
  product: Product;
  variant?: ProductVariant | null;
}

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  addItem: (product: Product, quantity: number, variant?: ProductVariant | null) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => { success: boolean; message: string };
  removeCoupon: () => void;
  getCartTotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getFinalTotal: () => number;
  getCartItemsCount: () => number;
  mergeCart: (userItems: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      addItem: (product, quantity, variant = null) => {
        set((state) => {
          const id = `${product.id}-${variant?.id || "default"}`;
          const existingItemIndex = state.items.findIndex((item) => item.id === id);

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          }

          return {
            items: [
              ...state.items,
              {
                id,
                product_id: product.id,
                variant_id: variant?.id || null,
                quantity,
                product,
                variant,
              },
            ],
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { items: newItems };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        }));
      },
      clearCart: () => set({ items: [], appliedCoupon: null }),
      applyCoupon: (coupon) => {
        const subtotal = get().getCartTotal();
        if (coupon.min_cart_value && subtotal < coupon.min_cart_value) {
          return {
            success: false,
            message: `يجب أن يكون الحد الأدنى للسلة ${coupon.min_cart_value} ر.س`,
          };
        }
        set({ appliedCoupon: coupon });
        return { success: true, message: "تم تفعيل الكوبون بنجاح" };
      },
      removeCoupon: () => set({ appliedCoupon: null }),
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const basePrice = item.product.price;
          const variantPrice = item.variant?.price_delta || 0;
          return total + (basePrice + variantPrice) * item.quantity;
        }, 0);
      },
      getDiscount: () => {
        const { appliedCoupon } = get();
        if (!appliedCoupon) return 0;
        const subtotal = get().getCartTotal();
        if (appliedCoupon.type === "percentage") {
          return (subtotal * appliedCoupon.value) / 100;
        } else {
          return Math.min(subtotal, appliedCoupon.value);
        }
      },
      getTax: () => {
        // 15% Inclusive VAT calculation
        const finalTotal = get().getFinalTotal();
        return finalTotal - finalTotal / 1.15;
      },
      getFinalTotal: () => {
        const subtotal = get().getCartTotal();
        const discount = get().getDiscount();
        return Math.max(0, subtotal - discount);
      },
      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
      mergeCart: (userItems) => {
        set((state) => {
          const newItems = [...state.items];
          userItems.forEach((userItem) => {
            const existing = newItems.find((i) => i.id === userItem.id);
            if (existing) {
              existing.quantity = Math.max(existing.quantity, userItem.quantity);
            } else {
              newItems.push(userItem);
            }
          });
          return { items: newItems };
        });
      },
    }),
    {
      name: "sahara-cart-storage",
    },
  ),
);
