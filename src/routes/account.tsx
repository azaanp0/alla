import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { formatPriceWithCurrency, formatDate } from "@/lib/format";
import { LogOut, Package, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "حسابي — متجر سحر" }] }),
  component: AccountPage,
});

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

function AccountPage() {
  const { user, isAuthenticated, logout } = useUserStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;
    // Mock orders
    setOrders([
      {
        id: "1",
        order_number: "ORD-9283",
        status: "processing",
        total: 1200,
        created_at: new Date().toISOString(),
      },
    ]);
  }, [user]);

  if (!user) return null;
  const statusLabels: Record<string, string> = {
    pending: "قيد المراجعة",
    processing: "قيد التجهيز",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي",
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl">مرحبًا، {user?.name || "عميلتنا الكريمة"}</h1>
          <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
        </div>
        <button
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
          className="flex items-center gap-2 text-sm border border-border rounded-full px-4 py-2 hover:bg-destructive hover:text-destructive-foreground transition"
        >
          <LogOut className="h-4 w-4" /> تسجيل الخروج
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 space-y-3">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <UserIcon className="h-4 w-4" /> الملف الشخصي
            </h3>
            <div className="text-sm space-y-1 text-muted-foreground">
              <div>الاسم: {user?.name || "-"}</div>
              <div>البريد: {user?.email || "-"}</div>
            </div>
          </div>
        </aside>

        <section className="md:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" /> طلباتي
          </h2>
          {orders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>لا توجد طلبات بعد</p>
              <Link to="/" className="inline-block mt-4 text-primary hover:underline">
                ابدئي التسوق
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {orders.map((o) => (
                <div key={o.id} className="py-4 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="font-bold">{o.order_number}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(o.created_at)}</div>
                  </div>
                  <span className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">
                    {statusLabels[o.status] || o.status}
                  </span>
                  <div className="font-bold text-primary">{formatPriceWithCurrency(o.total)}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
