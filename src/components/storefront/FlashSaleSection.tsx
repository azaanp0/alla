import { useEffect, useState } from "react";
import { Flame, ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { api } from "@/services/api";
import type { Product } from "@/lib/types";

// Ends 36 hours from when the user first lands (persists in localStorage)
function getEndTs(): number {
  if (typeof window === "undefined") return Date.now() + 36 * 3600 * 1000;
  const KEY = "sahar_flash_end_v1";
  const stored = Number(localStorage.getItem(KEY));
  if (stored && stored > Date.now()) return stored;
  const next = Date.now() + 36 * 3600 * 1000;
  localStorage.setItem(KEY, String(next));
  return next;
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function FlashSaleSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [end, setEnd] = useState<number>(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setEnd(getEndTs());
  }, []);
  useEffect(() => {
    api.products.getAll().then((data) => setProducts(data.slice(0, 4)));
  }, []);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (products.length === 0) return null;

  const diff = Math.max(0, Math.floor((end - now) / 1000));
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="relative overflow-hidden rounded-3xl gradient-luxury p-6 md:p-10 text-burgundy-foreground">
        <div className="absolute -top-12 -end-12 h-48 w-48 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="absolute -bottom-12 -start-12 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-burgundy-foreground/15 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold mb-3">
              <Flame className="h-4 w-4 animate-pulse" /> عروض البرق
            </div>
            <h2 className="font-display text-3xl md:text-4xl">خصومات تنتهي قريبًا</h2>
            <p className="text-sm opacity-80 mt-1">أسرعي قبل نفاد الكمية</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {[
              { v: h, l: "ساعة" },
              { v: m, l: "دقيقة" },
              { v: s, l: "ثانية" },
            ].map((u) => (
              <div key={u.l} className="text-center">
                <div className="bg-burgundy-foreground text-burgundy font-bold text-xl md:text-2xl tabular-nums w-14 md:w-16 py-2 rounded-xl shadow-soft">
                  {pad(u.v)}
                </div>
                <div className="text-[10px] opacity-80 mt-1">{u.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="relative mt-6 text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-1 bg-burgundy-foreground text-burgundy px-6 py-3 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            عرض كل العروض <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
