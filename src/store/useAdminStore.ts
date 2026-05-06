import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  isAdminLoggedIn: boolean;
  adminName: string | null;
  login: (pin: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdminLoggedIn: false,
      adminName: null,
      login: (pin) => {
        // Mock PIN for the demo portal: '2026' or 'admin'
        if (pin === "2026" || pin.toLowerCase() === "admin") {
          set({ isAdminLoggedIn: true, adminName: "المدير العام" });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdminLoggedIn: false, adminName: null }),
    }),
    {
      name: "sahara-admin-storage",
    },
  ),
);
