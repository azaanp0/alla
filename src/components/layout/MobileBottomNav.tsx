import { Link } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";

export function MobileBottomNav() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const user = useUserStore((state) => state.user);
  const item =
    "flex flex-col items-center justify-center gap-0.5 text-[10px] flex-1 py-2 hover:text-primary transition-colors";
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border">
      <div className="flex">
        <Link
          to="/"
          className={item}
          activeProps={{ className: `${item} text-primary` }}
          activeOptions={{ exact: true }}
        >
          <Home className="h-5 w-5" /> الرئيسية
        </Link>
        <Link to="/search" className={item} activeProps={{ className: `${item} text-primary` }}>
          <Search className="h-5 w-5" /> بحث
        </Link>
        <Link
          to="/cart"
          className={item + " relative"}
          activeProps={{ className: `${item} text-primary relative` }}
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -start-2 bg-primary text-primary-foreground text-[9px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </span>
          السلة
        </Link>
        <Link to="/wishlist" className={item} activeProps={{ className: `${item} text-primary` }}>
          <Heart className="h-5 w-5" /> المفضلة
        </Link>
        <Link
          to={user ? "/account" : "/login"}
          className={item}
          activeProps={{ className: `${item} text-primary` }}
        >
          <User className="h-5 w-5" /> حسابي
        </Link>
      </div>
    </nav>
  );
}
