import { createFileRoute, Outlet, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useAdminStore } from "@/store/useAdminStore";
import { LogOut, LayoutDashboard, Package, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const { isAdminLoggedIn } = useAdminStore.getState();
    if (!isAdminLoggedIn && location.pathname !== "/admin/login") {
      throw redirect({ to: "/admin/login" });
    }
    if (isAdminLoggedIn && location.pathname === "/admin/login") {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { isAdminLoggedIn, adminName, logout } = useAdminStore();
  const navigate = useNavigate();

  if (!isAdminLoggedIn) {
    return <Outlet />; // If not logged in and on login route, just render the login page without the sidebar
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col md:flex-row text-foreground dark rounded-none"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-l border-border h-auto md:min-h-screen p-6 flex flex-col gap-8 shadow-luxury z-40 relative">
        <div className="font-display text-3xl font-bold text-primary flex items-center gap-2">
          <span className="text-foreground">سحر</span>{" "}
          <span className="text-primary text-sm tracking-widest uppercase relative -top-1">
            Pro
          </span>
        </div>
        <nav className="flex-1 space-y-2">
          <Link
            to="/admin"
            className="flex gap-3 items-center px-4 py-4 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors font-medium"
            activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-soft" }}
            activeOptions={{ exact: true }}
          >
            <LayoutDashboard size={20} /> لوحة الإدارة
          </Link>
          <Link
            to="/admin/orders"
            className="flex gap-3 items-center px-4 py-4 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors font-medium"
            activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-soft" }}
          >
            <ShoppingCart size={20} /> الطلبات والمبيعات
          </Link>
          <Link
            to="/admin/products"
            className="flex gap-3 items-center px-4 py-4 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors font-medium"
            activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-soft" }}
          >
            <Package size={20} /> المنتجات والمخزون
          </Link>
        </nav>
        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl ring-2 ring-primary/30">
              م
            </div>
            <div>
              <div className="font-bold">{adminName}</div>
              <div className="text-xs text-primary/80 mt-0.5">صلاحيات كاملة • متصل</div>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            className="w-full flex gap-3 justify-center items-center px-4 py-3 border border-red-500/20 text-red-500 font-medium rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto bg-muted/20">
        <Outlet />
      </main>
    </div>
  );
}
