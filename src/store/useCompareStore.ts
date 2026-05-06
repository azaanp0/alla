import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../lib/types";

interface CompareState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          if (state.items.find((item) => item.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      isInCompare: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      clearCompare: () => set({ items: [] }),
    }),
    {
      name: "sahara-compare-storage",
    },
  ),
);
