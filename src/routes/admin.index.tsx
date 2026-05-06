import { createFileRoute } from "@tanstack/react-router";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPriceWithCurrency } from "@/lib/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { mockProducts } from "@/services/mockData";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardOverview,
});

function AdminDashboardOverview() {
  const { orders } = useOrderStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = mockProducts.length;

  // Mock Data for charts based on Orders
  const salesData = [
    { name: "السبت", مبيعات: 4000 },
    { name: "الأحد", مبيعات: 3000 },
    { name: "الاثنين", مبيعات: 5000 },
    { name: "الثلاثاء", مبيعات: 7000 },
    { name: "الأربعاء", مبيعات: 4500 },
    { name: "الخميس", مبيعات: 8000 },
    { name: "الجمعة", مبيعات: 12000 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2 text-foreground">نظرة عامة</h1>
          <p className="text-muted-foreground">مرحباً بك في مركز الإدارة والتقارير</p>
        </div>
        <button className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full shadow-luxury transition-transform hover:scale-105">
          تصدير التقرير
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي المبيعات"
          value={formatPriceWithCurrency(totalRevenue + 85000)}
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatCard
          title="الطلبات النشطة"
          value={(totalOrders + 124).toString()}
          icon={ShoppingCart}
          trend="+5.2%"
        />
        <StatCard title="زوار الموقع" value="4,250" icon={TrendingUp} trend="+18.1%" />
        <StatCard
          title="إجمالي المنتجات"
          value={totalProducts.toString()}
          icon={Package}
          trend="+0.0%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-3xl p-8 border border-border shadow-soft">
          <h2 className="font-bold text-xl mb-6">المبيعات الأسبوعية (محاكاة)</h2>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v} SAR`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="مبيعات"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#D4AF37", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card rounded-3xl p-8 border border-border shadow-soft">
          <h2 className="font-bold text-xl mb-6">حالة الطلبات</h2>
          <div className="space-y-4">
            <StatusRow label="بانتظار التأكيد" count={12} color="bg-yellow-500" />
            <StatusRow label="قيد التجهيز" count={45} color="bg-blue-500" />
            <StatusRow label="في الطريق" count={28} color="bg-indigo-500" />
            <StatusRow label="مكتملة" count={142} color="bg-green-500" />
            <StatusRow label="مرتجعة" count={3} color="bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <div className="bg-card p-6 rounded-3xl border border-border shadow-soft transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          {trend}
        </span>
      </div>
      <div className="text-muted-foreground text-sm mb-1">{title}</div>
      <div className="text-2xl font-display font-bold">{value}</div>
    </div>
  );
}

function StatusRow({ label, count, color }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="font-medium text-sm">{label}</span>
      </div>
      <span className="font-bold">{count}</span>
    </div>
  );
}
