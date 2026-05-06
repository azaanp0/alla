import { Product, Category } from "../lib/types";
import { mockProducts, mockCategories } from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(500);
      return mockProducts;
    },
    getBySlug: async (slug: string): Promise<Product | undefined> => {
      await delay(300);
      return mockProducts.find((p) => p.slug === slug);
    },
    getFeatured: async (): Promise<Product[]> => {
      await delay(400);
      return mockProducts.filter((p) => p.is_featured);
    },
    getByCategory: async (categoryId: string): Promise<Product[]> => {
      await delay(400);
      return mockProducts.filter((p) => p.category_id === categoryId);
    },
    search: async (query: string): Promise<Product[]> => {
      await delay(500);
      const lowerQuery = query.toLowerCase();
      return mockProducts.filter(
        (p) =>
          p.name_ar.toLowerCase().includes(lowerQuery) ||
          (p.description_ar && p.description_ar.toLowerCase().includes(lowerQuery)) ||
          (p.brand && p.brand.toLowerCase().includes(lowerQuery)),
      );
    },
  },
  categories: {
    getAll: async (): Promise<Category[]> => {
      await delay(300);
      return mockCategories;
    },
    getBySlug: async (slug: string): Promise<Category | undefined> => {
      await delay(200);
      return mockCategories.find((c) => c.slug === slug);
    },
  },
  auth: {
    // Mock Auth
    login: async (email: string, password: string) => {
      await delay(800);
      if (email === "test@example.com" && password === "password") {
        return {
          id: "user_1",
          email,
          name: "Ahmed",
        };
      }
      throw new Error("Invalid credentials");
    },
    register: async (email: string, password: string, name: string) => {
      await delay(800);
      return {
        id: "user_2",
        email,
        name,
      };
    },
  },
  orders: {
    create: async (orderData: any) => {
      await delay(1500);
      return {
        success: true,
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        message: "تم استلام طلبك بنجاح",
      };
    },
  },
};
