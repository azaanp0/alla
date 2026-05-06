import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star, GitCompareArrows, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPriceWithCurrency, discountPercent } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const addWishlist = useWishlistStore((state) => state.addItem);
  const removeWishlist = useWishlistStore((state) => state.removeItem);

  const isInCompare = useCompareStore((state) => state.isInCompare);
  const addCompare = useCompareStore((state) => state.addItem);
  const removeCompare = useCompareStore((state) => state.removeItem);

  const img = product.product_images?.[0]?.url || "/store/creamy_banner_perfumes_1777682428754.png";
  const img2 = product.product_images?.[1]?.url || img;
  const discount = discountPercent(
    Number(product.price),
    product.compare_price ? Number(product.compare_price) : null,
  );

  const liked = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, null);
    toast.success("تمت الإضافة إلى السلة", { description: product.name_ar });
  };
  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) removeWishlist(product.id);
    else addWishlist(product);
    toast.success(liked ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة");
  };
  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) removeCompare(product.id);
    else addCompare(product);
    toast.success(inCompare ? "تمت إزالته من المقارنة" : "تمت إضافته للمقارنة");
  };

  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative bg-card rounded-2xl overflow-hidden card-3d border border-border">
        <div className="relative aspect-square bg-gradient-cream overflow-hidden">
          {/* Layered images for hover swap */}
          <img
            src={img}
            alt={product.name_ar}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover card-3d-img group-hover:opacity-0 transition-opacity duration-500"
          />
          <img
            src={img2}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Shine sweep */}
          <div className="shine-overlay" />

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
            {product.is_new && (
              <span className="bg-burgundy text-burgundy-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-soft">
                جديد
              </span>
            )}
            {discount > 0 && (
              <span className="gradient-rose text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-soft">
                خصم {discount}%
              </span>
            )}
            {product.stock <= 3 && product.stock > 0 && (
              <span className="bg-foreground/90 text-background text-[10px] font-bold px-2.5 py-1 rounded-full">
                آخر القطع
              </span>
            )}
          </div>

          {/* Action stack */}
          <div className="absolute top-3 end-3 flex flex-col gap-2 z-10">
            <button
              onClick={handleWish}
              aria-label="المفضلة"
              className={`h-9 w-9 rounded-full glass flex items-center justify-center transition-all hover:scale-110 ${liked ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleCompare}
              aria-label="مقارنة"
              className={`h-9 w-9 rounded-full glass flex items-center justify-center transition-all hover:scale-110 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300 ${inCompare ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
            >
              <GitCompareArrows className="h-4 w-4" />
            </button>
            <span className="h-9 w-9 rounded-full glass flex items-center justify-center text-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <Eye className="h-4 w-4" />
            </span>
          </div>

          {/* Add to cart slide-up */}
          <button
            onClick={handleAdd}
            aria-label="أضف للسلة"
            className="absolute bottom-3 inset-x-3 bg-foreground text-background text-sm py-2.5 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:bg-primary z-10"
          >
            <ShoppingBag className="h-4 w-4" /> أضف للسلة
          </button>
        </div>
        <div className="p-4 space-y-1.5">
          <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
            {product.name_ar}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span>{Number(product.rating).toFixed(1)}</span>
            <span className="opacity-60">({product.review_count})</span>
            {product.brand && <span className="ms-auto truncate">{product.brand}</span>}
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-bold text-primary">{formatPriceWithCurrency(product.price)}</span>
            {product.compare_price && Number(product.compare_price) > Number(product.price) && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPriceWithCurrency(product.compare_price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
