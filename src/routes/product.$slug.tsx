import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Zoom, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { api } from "@/services/api";

import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPriceWithCurrency, discountPercent } from "@/lib/format";
import type { Product, ProductVariant } from "@/lib/types";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  ChevronLeft,
  Minus,
  Plus,
  ZoomIn,
} from "lucide-react";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "swiper/css/pagination";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — متجر سحر` },
      { name: "description", content: "اكتشفي تفاصيل المنتج في متجر سحر" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "ingredients" | "shipping">("desc");

  useEffect(() => {
    setQty(1);
    (async () => {
      const data = await api.products.getBySlug(slug);
      setProduct(data || null);
      if (data && data.product_variants && data.product_variants.length > 0) {
        setSelectedVariant(data.product_variants[0]);
      }
      if (data?.category_id) {
        const rel = await api.products.getByCategory(data.category_id);
        setRelated(rel.filter((r) => r.id !== data.id).slice(0, 5));
      }
    })();
  }, [slug]);

  if (!product)
    return (
      <div className="container mx-auto p-12 text-center text-muted-foreground">
        جارِ التحميل...
      </div>
    );

  const images = product.product_images?.length
    ? product.product_images
    : [
        {
          id: "ph",
          url: "/store/creamy_banner_perfumes_1777682428754.png",
          alt_text: null,
          sort_order: 0,
        },
      ];
  const discount = discountPercent(
    Number(product.price),
    product.compare_price ? Number(product.compare_price) : null,
  );
  const liked = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    if (liked) removeWishlist(product.id);
    else addWishlist(product);
  };

  const handleAdd = () => {
    addItem(product, qty, product.product_variants?.[0] || null);
    toast.success("تمت الإضافة إلى السلة", { description: `${qty} × ${product.name_ar}` });
  };
  const buyNow = () => {
    addItem(product, qty, product.product_variants?.[0] || null);
    navigate({ to: "/cart" });
  };

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ChevronLeft className="h-3 w-3" />
        {product.categories && (
          <>
            <Link
              to="/category/$slug"
              params={{ slug: product.categories.slug }}
              className="hover:text-primary"
            >
              {product.categories.name_ar}
            </Link>
            <ChevronLeft className="h-3 w-3" />
          </>
        )}
        <span className="text-foreground line-clamp-1">{product.name_ar}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-cream shadow-luxury">
            <Swiper
              modules={[Thumbs, Zoom, Pagination]}
              thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
              zoom={{ maxRatio: 2.5 }}
              pagination={{ clickable: true, dynamicBullets: true }}
              spaceBetween={10}
              dir="rtl"
              className="aspect-square"
            >
              {images.map((im) => (
                <SwiperSlide key={im.id}>
                  <div className="swiper-zoom-container">
                    <img
                      src={im.url}
                      alt={product.name_ar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {discount > 0 && (
              <span className="absolute top-4 start-4 z-10 bg-primary text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-full shadow-soft">
                خصم {discount}%
              </span>
            )}
            <div className="absolute top-4 end-4 z-10 bg-card/80 backdrop-blur rounded-full p-2 text-muted-foreground pointer-events-none">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>
          {images.length > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbs}
              watchSlidesProgress
              slidesPerView={5}
              spaceBetween={8}
              dir="rtl"
            >
              {images.map((im) => (
                <SwiperSlide key={`t-${im.id}`} className="cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden border-2 border-transparent [.swiper-slide-thumb-active_&]:border-primary transition-colors">
                    <img src={im.url} alt="" className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 md:py-8"
        >
          <div>
            {product.brand && (
              <span className="text-xs text-primary font-bold tracking-widest uppercase mb-2 block">
                {product.brand}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground">
              {product.name_ar}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-sm border-b border-border pb-4">
            <div className="flex bg-primary/5 rounded-full px-3 py-1.5 items-center gap-1">
              <span className="font-bold text-primary">{Number(product.rating).toFixed(1)}</span>
              <Star className="h-4 w-4 fill-primary text-primary" />
            </div>
            <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors underline decoration-border underline-offset-4">
              قراءة التقييمات ({product.review_count})
            </span>
          </div>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-4xl font-display font-bold text-primary">
              {formatPriceWithCurrency(product.price + (selectedVariant?.price_delta ?? 0))}
            </span>
            {product.compare_price && Number(product.compare_price) > Number(product.price) && (
              <span className="text-xl text-muted-foreground line-through decoration-red-500/50">
                {formatPriceWithCurrency(product.compare_price)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">{product.description_ar}</p>

          {/* Variants Selection */}
          {product.product_variants && product.product_variants.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm font-bold mb-3 flex justify-between">
                <span>الحجم / السعة</span>
                <span className="text-primary cursor-pointer hover:underline">دليل المقاسات</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.product_variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-3 rounded-2xl border-2 transition-all font-medium text-sm overflow-hidden relative ${selectedVariant?.id === variant.id ? "border-primary bg-primary/5 text-primary shadow-soft scale-105" : "border-border hover:border-primary/50 hover:bg-muted"}`}
                  >
                    {selectedVariant?.id === variant.id && (
                      <span className="absolute top-0 end-0 w-8 h-8 bg-primary rounded-bl-3xl z-0" />
                    )}
                    <span className="relative z-10">{variant.name_ar}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <span className="text-sm font-bold">الكمية:</span>
            <div className="flex items-center border-2 border-border rounded-full bg-card overflow-hidden h-12">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="نقص"
                className="w-12 h-full hover:bg-primary/10 hover:text-primary transition flex items-center justify-center"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 h-full flex items-center justify-center font-bold text-lg bg-muted/30">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                aria-label="زيادة"
                className="w-12 h-full hover:bg-primary/10 hover:text-primary transition flex items-center justify-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full ${product.stock > 10 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {product.stock > 0 ? `الكمية المتوفرة: ${product.stock}` : "نفذت الكمية"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-2">
            <button
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className="flex-1 bg-foreground text-background py-4 px-8 rounded-full font-bold hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-105 shadow-luxury"
            >
              <ShoppingBag className="h-5 w-5" /> إضافة إلى الحقيبة
            </button>
            <button
              onClick={handleToggleWishlist}
              aria-label="مفضلة"
              className={`p-4 rounded-full border-2 transition-all group hover:scale-110 flex items-center justify-center w-14 ${liked ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
            >
              <Heart
                className={`h-5 w-5 transition-transform group-hover:scale-110 ${liked ? "fill-primary text-primary scale-110" : "text-muted-foreground group-hover:text-primary"}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
            <div className="flex items-center gap-3 bg-muted/30 rounded-2xl p-4 transition hover:bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-sm mb-0.5">شحن فاخر ومجاني</div>
                <div className="text-muted-foreground">للطلبيات فوق 199 ر.س</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted/30 rounded-2xl p-4 transition hover:bg-muted/50">
              <div className="w-10 h-10 rounded-full inset-0 bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-sm mb-0.5">ضمان الأصالة</div>
                <div className="text-muted-foreground">منتجات أصلية 100%</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-border pt-8 mt-8">
            <div className="flex gap-6 border-b border-border px-2">
              {[
                { k: "desc", l: "تفاصيل المنتج" },
                { k: "ingredients", l: "المكونات الرئيسية" },
                { k: "shipping", l: "سياسة التوصيل" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as typeof tab)}
                  className={`py-3 text-sm font-bold border-b-2 -mb-px transition-all duration-300 relative ${tab === t.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
                >
                  {t.l}
                </button>
              ))}
            </div>
            <div className="py-6 text-sm text-muted-foreground/90 leading-loose">
              {tab === "desc" && (
                <div className="animate-fade-in">
                  <p>{product.description_ar}</p>
                </div>
              )}
              {tab === "ingredients" && (
                <div className="animate-fade-in">
                  <p>
                    {product.ingredients_ar ||
                      "تركيبة سرية فاخرة تجمع بين أرقى المكونات الطبيعية والزيوت العطرية النادرة التي تم استخلاصها بعناية فائقة لتدوم طويلاً وتترك أثراً لا يُنسى."}
                  </p>
                </div>
              )}
              {tab === "shipping" && (
                <div className="animate-fade-in">
                  <p>
                    نقدم خدمة توصيل فاخرة (White-glove) للطلبيات المختارة. التوصيل مجاني للطلبيات
                    فوق 199 ر.س. مدة التوصيل المتوقعة هي 1-3 أيام عمل داخل المملكة العربية السعودية.
                    جميع منتجاتنا تغلف بعناية فائقة لضمان وصولها بحالة مثالية تعكس فخامة سحر.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Customer reviews */}
      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl mb-6">آراء العميلات</h2>
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="bg-gradient-cream rounded-2xl p-6 text-center h-fit">
            <div className="text-5xl font-bold text-primary">
              {Number(product.rating).toFixed(1)}
            </div>
            <div className="flex justify-center gap-0.5 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(Number(product.rating)) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              بناءً على {product.review_count} تقييم
            </div>
            <div className="space-y-1.5 mt-5 text-start">
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct =
                  stars === 5 ? 78 : stars === 4 ? 16 : stars === 3 ? 4 : stars === 2 ? 1 : 1;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <span className="w-4">{stars}</span>
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-rose rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-end">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "أمل ع.",
                text: "ثبات العطر ممتاز وفواحه بشكل لطيف. أنصح به بشدة!",
                days: 3,
                rating: 5,
              },
              {
                name: "ليان م.",
                text: "تغليف مرتب جدًا والمنتج وصل بحالة ممتازة. تجربة راقية.",
                days: 12,
                rating: 5,
              },
              {
                name: "هدى س.",
                text: "الرائحة جذابة لكني توقعت ثبات أطول قليلًا. عمومًا منتج جيد.",
                days: 28,
                rating: 4,
              },
            ].map((r, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full gradient-rose flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{r.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        قبل {r.days} يوم • مشتري موثّق
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3 w-3 ${j < r.rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl mb-6">منتجات مشابهة</h2>
          <ProductCarousel products={related} />
        </section>
      )}
    </div>
  );
}
