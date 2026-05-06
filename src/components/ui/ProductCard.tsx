import * as React from "react";
import { cn } from "../../lib/utils";
import { Product } from "../../lib/types";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const addItemToCart = useCartStore((state) => state.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const images = product.product_images || [];
  const mainImage =
    images[0]?.url ||
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80";
  const hoverImage = images[1]?.url || mainImage;
  const inWishlist = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Default to adding the first variant if exists, else the base product
    const variant = product.product_variants?.[0] || null;
    addItemToCart(product, 1, variant);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn("group relative flex flex-col", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 cursor-pointer">
        {product.is_new && (
          <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 tracking-widest uppercase">
            جديد
          </div>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <Heart className={cn("w-4 h-4", inWishlist && "fill-current text-primary")} />
        </button>

        <a href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.name_ar}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              isHovered && images.length > 1 ? "opacity-0" : "opacity-100",
            )}
          />
          {images.length > 1 && (
            <img
              src={hoverImage}
              alt={`${product.name_ar} alternate`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105",
                isHovered ? "opacity-100 scale-100" : "opacity-0",
              )}
            />
          )}
        </a>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black h-10 flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-sm font-medium uppercase tracking-widest"
          >
            <ShoppingBag className="w-4 h-4" />
            أضف للسلة
          </button>
        </div>
      </div>

      <a href={`/product/${product.slug}`} className="flex flex-col flex-1">
        <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
          {product.name_ar}
        </h3>
        {product.brand && (
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
            {product.brand}
          </p>
        )}
        {/* Note: Formatting currency usually goes into a utility function */}
        <div className="mt-auto flex items-center gap-2">
          <span className="font-semibold text-lg">{product.price} ر.س</span>
          {product.compare_price && (
            <span className="text-sm text-muted-foreground line-through">
              {product.compare_price} ر.س
            </span>
          )}
        </div>
      </a>
    </motion.div>
  );
};
