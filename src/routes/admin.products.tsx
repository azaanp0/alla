import { createFileRoute } from "@tanstack/react-router";
import { mockProducts } from "@/services/mockData";
import { formatPriceWithCurrency } from "@/lib/format";
import { Edit, Trash2, Plus, Star } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">المنتجات</h1>
          <p className="text-muted-foreground">إضافة، تعديل وإدارة المخزون</p>
        </div>
        <button className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full shadow-luxury transition-transform hover:scale-105 flex items-center gap-2">
          <Plus size={18} /> منتج جديد
        </button>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-muted/50 text-muted-foreground text-sm border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold">المنتج</th>
                <th className="px-6 py-4 font-bold">السعر</th>
                <th className="px-6 py-4 font-bold">المخزون المتوفر</th>
                <th className="px-6 py-4 font-bold">التقييم</th>
                <th className="px-6 py-4 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.product_images?.[0]?.url}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-muted border border-border"
                      />
                      <div>
                        <p className="font-bold text-sm line-clamp-1">{product.name_ar}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {product.brand || "---"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-primary">
                    {formatPriceWithCurrency(product.price)}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${product.stock > 10 ? "bg-green-100 text-green-800" : product.stock > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {product.stock > 0 ? `${product.stock} قطعة` : "نفذ الكمية"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 font-bold text-sm">
                      <Star className="w-4 h-4 text-primary fill-primary" />{" "}
                      {product.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition"
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-xl transition"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
