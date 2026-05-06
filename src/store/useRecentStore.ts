import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../lib/types";

interface RecentState {
  items: Product[];
  addRecent: (product: Product) => void;
  clearRecent: () => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      items: [],
      addRecent: (product) => {
        set((state) => {
          // Remove if it exists to push it to the top
          const filtered = state.items.filter((item) => item.id !== product.id);
          const updated = [product, ...filtered];
          // Keep only the most recent 10 items
          if (updated.length > 10) updated.pop();
          return { items: updated };
        });
      },
      clearRecent: () => set({ items: [] }),
    }),
    {
      name: "sahara-recent-storage",
    },
  ),
);
