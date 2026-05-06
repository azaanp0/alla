import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export function ProductCarousel({ products }: { products: Product[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!products?.length) return null;

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, FreeMode]}
        slidesPerView={2.2}
        spaceBetween={16}
        freeMode={{ enabled: true, momentum: true }}
        breakpoints={{
          640: { slidesPerView: 3.2, spaceBetween: 20 },
          1024: { slidesPerView: 4.2, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          // @ts-expect-error swiper types
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error swiper types
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        dir="rtl"
      >
        {products.map((p) => (
          <SwiperSlide key={p.id} className="h-auto">
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        aria-label="السابق"
        className="hidden md:flex items-center justify-center absolute -end-3 top-1/3 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-card shadow-luxury border border-border hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        ref={nextRef}
        aria-label="التالي"
        className="hidden md:flex items-center justify-center absolute -start-3 top-1/3 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-card shadow-luxury border border-border hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
  );
}
