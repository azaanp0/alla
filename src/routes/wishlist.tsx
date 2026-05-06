import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";
import { Heart, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "المفضلة — متجر سحر" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items: products } = useWishlistStore();

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Heart className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-display text-3xl mb-3">المفضلة فارغة</h1>
        <p className="text-muted-foreground mb-8">احفظي منتجاتك المفضلة هنا للرجوع إليها لاحقًا</p>
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
      <h1 className="font-display text-3xl md:text-4xl mb-8">المفضلة ({products.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
