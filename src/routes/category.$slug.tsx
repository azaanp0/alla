import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { ProductCard } from "@/components/storefront/ProductCard";
import type { Product, Category } from "@/lib/types";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — متجر سحر` },
      { name: "description", content: "تصفحي تشكيلة منتجات سحر الفاخرة" },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<"new" | "price_asc" | "price_desc">("new");
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const cat = await api.categories.getBySlug(slug);
      setCategory(cat || null);
      if (!cat) {
        setProducts([]);
        setLoading(false);
        return;
      }

      let data = await api.products.getByCategory(cat.id);

      // Client-side filtering & sorting for mock data
      data = data.filter((p) => Number(p.price) <= maxPrice);

      if (sort === "price_asc") data.sort((a, b) => Number(a.price) - Number(b.price));
      else if (sort === "price_desc") data.sort((a, b) => Number(b.price) - Number(a.price));
      else
        data.sort(
          (a, b) =>
            new Date((b as any).created_at || 0).getTime() -
            new Date((a as any).created_at || 0).getTime(),
        );

      setProducts(data);
      setLoading(false);
    })();
  }, [slug, sort, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="text-foreground">{category?.name_ar ?? slug}</span>
      </nav>

      <div className="text-center mb-10">
        <span className="text-xs tracking-widest text-primary uppercase">التصنيف</span>
        <h1 className="font-display text-3xl md:text-5xl mt-2">{category?.name_ar ?? "..."}</h1>
        {category?.description_ar && (
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{category.description_ar}</p>
        )}
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-bold mb-4">الترتيب</h3>
            <div className="space-y-2">
              {[
                { v: "new", l: "الأحدث" },
                { v: "price_asc", l: "السعر: من الأقل" },
                { v: "price_desc", l: "السعر: من الأعلى" },
              ].map((o) => (
                <label key={o.v} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="sort"
                    checked={sort === o.v}
                    onChange={() => setSort(o.v as typeof sort)}
                    className="accent-primary"
                  />
                  {o.l}
                </label>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-bold mb-4">
              السعر الأقصى: <span className="text-primary">{maxPrice} ر.س</span>
            </h3>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-muted animate-shimmer" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              لا توجد منتجات في هذا التصنيف حاليًا
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">{products.length} منتج</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
