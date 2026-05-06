import { createFileRoute, Link } from "@tanstack/react-router";
import { useCartStore } from "@/store/useCartStore";
import { formatPriceWithCurrency } from "@/lib/format";
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "السلة — متجر سحر" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 199 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-display text-3xl mb-3">سلتك فارغة</h1>
        <p className="text-muted-foreground mb-8">ابدئي التسوق واكتشفي تشكيلتنا الفاخرة</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90"
        >
          تصفحي المنتجات <ChevronLeft className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl md:text-4xl mb-8">سلة التسوق ({items.length})</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-4">
          {items.map((it: any) => {
            const img = it.product.product_images?.[0]?.url;
            const unit = Number(it.product.price) + Number(it.variant?.price_delta ?? 0);
            return (
              <div key={it.id} className="bg-card rounded-2xl p-4 border border-border flex gap-4">
                <Link to="/product/$slug" params={{ slug: it.product.slug }} className="shrink-0">
                  <img
                    src={img}
                    alt={it.product.name_ar}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover bg-muted"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to="/product/$slug"
                    params={{ slug: it.product.slug }}
                    className="font-bold hover:text-primary line-clamp-2"
                  >
                    {it.product.name_ar}
                  </Link>
                  {it.variant && (
                    <div className="text-xs text-muted-foreground mt-1">{it.variant.name_ar}</div>
                  )}
                  <div className="text-primary font-bold mt-1">{formatPriceWithCurrency(unit)}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-full">
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity - 1)}
                        className="p-1.5 hover:text-primary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{it.quantity}</span>
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        className="p-1.5 hover:text-primary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(it.id)}
                      aria-label="حذف"
                      className="text-muted-foreground hover:text-destructive p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="bg-card rounded-2xl p-6 border border-border h-fit lg:sticky lg:top-28 space-y-4">
          <h2 className="font-bold text-lg">ملخص الطلب</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>المجموع الفرعي</span>
              <span>{formatPriceWithCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>الشحن</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-primary font-bold">مجاني</span>
                ) : (
                  formatPriceWithCurrency(shipping)
                )}
              </span>
            </div>
            {subtotal < 199 && (
              <div className="text-xs text-muted-foreground bg-accent/50 p-2 rounded-lg">
                أضيفي {formatPriceWithCurrency(199 - subtotal)} للحصول على شحن مجاني
              </div>
            )}
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>الإجمالي</span>
            <span className="text-primary">{formatPriceWithCurrency(total)}</span>
          </div>
          <Link
            to="/checkout"
            className="block text-center bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90"
          >
            إتمام الطلب
          </Link>
          <Link
            to="/"
            className="block text-center text-sm text-muted-foreground hover:text-primary"
          >
            متابعة التسوق
          </Link>
        </aside>
      </div>
    </div>
  );
}
