import { Product } from "../lib/types";

/**
 * Returns a list of frequently bought together products.
 * In a real backend, this would check historical order data.
 * Here we randomly pick 2 products from the same category or overall catalog.
 */
export const getFrequentlyBoughtTogether = (
  product: Product,
  allProducts: Product[],
  limit: number = 2,
): Product[] => {
  return allProducts
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

/**
 * Returns a list of generic recommended products.
 */
export const getRecommendedProducts = (allProducts: Product[], limit: number = 4): Product[] => {
  return allProducts
    .filter((p) => p.is_featured)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};
