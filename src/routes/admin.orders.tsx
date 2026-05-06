import { createFileRoute } from "@tanstack/react-router";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPriceWithCurrency } from "@/lib/format";
import { Eye, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrderStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const statusTranslations = {
    Pending: "قيد المراجعة",
    Processing: "جاري التجهيز",
    Shipped: "تم الشحن",
    Delivered: "مكتمل",
    Canceled: "ملغي",
    Returned: "مرتجع",
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">الطلبات</h1>
          <p className="text-muted-foreground">إدارة الطلبات الواردة وتحديث حالات الشحن</p>
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-muted/50 text-muted-foreground text-sm border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold">رقم الطلب</th>
                <th className="px-6 py-4 font-bold">العميل</th>
                <th className="px-6 py-4 font-bold">التاريخ</th>
                <th className="px-6 py-4 font-bold">الإجمالي</th>
                <th className="px-6 py-4 font-bold">الحالة</th>
                <th className="px-6 py-4 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    لا توجد طلبات مسجلة حتى الآن.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-5 font-bold font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-5 text-sm font-medium">{order.shipping_address.name}</td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-primary">
                      {formatPriceWithCurrency(order.total)}
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-transparent cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        {Object.entries(statusTranslations).map(([key, val]) => (
                          <option key={key} value={key} className="bg-background text-foreground">
                            {val}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition"
                          title="عرض التفاصيل"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-xl transition"
                          title="إلغاء الطلب"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
