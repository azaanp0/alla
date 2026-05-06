import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "../lib/types";
import { mockOrders } from "../services/mockData";

interface OrderState {
  orders: Order[];
  placeOrder: (orderData: Omit<Order, "id" | "created_at">) => string;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [...mockOrders],
      placeOrder: (orderData) => {
        const newOrderId = `ORD-${Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")}`;
        const newOrder: Order = {
          ...orderData,
          id: newOrderId,
          created_at: new Date().toISOString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
        return newOrderId;
      },
      getOrder: (orderId) => {
        return get().orders.find((o) => o.id === orderId);
      },
      getUserOrders: (userId) => {
        return get().orders.filter((o) => o.user_id === userId);
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "sahara-order-storage",
    },
  ),
);
