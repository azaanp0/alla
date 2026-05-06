import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "./LuxuryButton";

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: "s1",
    image: "/store/creamy_banner_perfumes_1777682428754.png",
    title: "جاذبية لا تقاوم",
    subtitle: "اكتشف مجموعة العطور الملكية الجديدة حصرياً",
    ctaText: "تسوق الآن",
    ctaLink: "/search?category=fragrances",
  },
  {
    id: "s2",
    image: "/store/creamy_banner_skincare_1777682451392.png",
    title: "مكياج يخطف الأنظار",
    subtitle: "تألقي بإطلالة ساحرة من أشهر الماركات العالمية",
    ctaText: "اكتشفي المجموعة",
    ctaLink: "/search?category=makeup",
  },
  {
    id: "s3",
    image: "/store/creamy_gift_boxes_1777682551722.png",
    title: "هدايا تنبض بالفخامة",
    subtitle: "أرقى المجموعات لمن تحب في كل المناسبات",
    ctaText: "اكتشف الهدايا",
    ctaLink: "/search?category=gifts",
  },
];

export const HeroSlider = () => {
  const plugin = React.useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "rtl" }, [plugin.current]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-background overflow-hidden group">
      <div className="embla w-full h-full" ref={emblaRef} dir="rtl">
        <div className="embla__container h-full flex">
          {slides.map((slide, index) => (
            <div key={slide.id} className="embla__slide relative flex-[0_0_100%] min-w-0 h-full">
              {/* Opulent dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-secondary/40 z-10" />

              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: selectedIndex === index ? "scale(1.1)" : "scale(1)",
                  transition: "transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      key={`content-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -30 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "4rem" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-px bg-primary mb-6"
                      />
                      <p className="text-primary uppercase tracking-[0.3em] mb-4 text-xs md:text-sm font-bold shadow-sm">
                        {slide.subtitle}
                      </p>

                      <h1 className="text-5xl md:text-7xl lg:text-8xl text-secondary-foreground font-display mb-10 text-balance leading-tight drop-shadow-2xl">
                        {slide.title}
                      </h1>

                      <a href={slide.ctaLink} className="mt-4 inline-block">
                        <LuxuryButton
                          size="lg"
                          className="bg-primary/90 text-primary-foreground font-bold hover:bg-primary shadow-[0_0_20px_rgba(201,162,101,0.4)] border border-primary/50 backdrop-blur-sm"
                        >
                          {slide.ctaText}
                        </LuxuryButton>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-secondary/20 text-secondary-foreground backdrop-blur-xl border border-secondary-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary/80 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-secondary/20 text-secondary-foreground backdrop-blur-xl border border-secondary-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary/80 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Elegant Progress Dots */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-500 ${
              selectedIndex === index
                ? "w-12 h-1 bg-primary"
                : "w-2 h-1 bg-secondary-foreground/30 hover:bg-secondary-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
