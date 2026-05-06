import { Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, Sparkles } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import hero1 from "@/assets/store/hero-1.jpg";
import hero2 from "@/assets/store/hero-2.jpg";
import hero3 from "@/assets/store/hero-3.jpg";

const SLIDES = [
  {
    eyebrow: "مجموعة محدودة",
    title: "سحر",
    subtitle: "العطر الذي يحكي قصتك",
    accent: "خصومات حتى ٥٠٪",
    cta: "تسوقي الآن",
    href: "/category/womens-perfume",
    image: hero1,
    align: "right" as const,
  },
  {
    eyebrow: "وصل حديثًا",
    title: "روتين الجمال",
    subtitle: "مكياج وعناية فاخرة",
    accent: "تشكيلة ربيع ٢٠٢٦",
    cta: "اكتشفي الجديد",
    href: "/category/makeup",
    image: hero2,
    align: "right" as const,
  },
  {
    eyebrow: "مجموعة العروس",
    title: "بريق ذهبي",
    subtitle: "هدايا تليق بأحبائك",
    accent: "تغليف فاخر مجاني",
    cta: "تسوقي الهدايا",
    href: "/category/luxury-gifts",
    image: hero3,
    align: "right" as const,
  },
];

export function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-gradient-cream">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "sahar-bullet",
          bulletActiveClass: "sahar-bullet-active",
        }}
        className="h-[78vh] min-h-[520px] md:h-[88vh] md:min-h-[640px]"
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <img
                src={s.image}
                alt={s.title}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Cinematic gradient overlay (RTL aware) */}
              <div className="absolute inset-0 bg-gradient-to-l from-burgundy/85 via-burgundy/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating golden particles */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 14 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="absolute h-1.5 w-1.5 rounded-full bg-primary-glow/70"
                    style={{
                      top: `${(idx * 37) % 100}%`,
                      left: `${(idx * 53) % 100}%`,
                      animation: `float ${4 + (idx % 5)}s ease-in-out ${idx * 0.3}s infinite`,
                      filter: "blur(0.5px)",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 container mx-auto h-full px-4 md:px-8 flex items-center">
                <motion.div
                  key={`slide-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className="max-w-xl text-burgundy-foreground text-right"
                >
                  <div className="inline-flex items-center gap-2 glass border border-burgundy-foreground/20 rounded-full px-4 py-1.5 text-[11px] tracking-widest mb-5">
                    <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
                    {s.eyebrow}
                  </div>
                  <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-3">
                    {s.title}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-95 mb-5 font-light">{s.subtitle}</p>
                  <div className="text-base md:text-lg font-bold text-primary-glow mb-7 tracking-wide">
                    {s.accent}
                  </div>
                  <Link
                    to={s.href}
                    className="inline-flex items-center gap-2 bg-burgundy-foreground text-burgundy px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-primary-foreground transition-all shadow-luxury group"
                  >
                    {s.cta}
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .sahar-bullet {
          display: inline-block;
          width: 8px; height: 8px;
          margin: 0 4px;
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .sahar-bullet-active {
          width: 28px;
          background: var(--color-primary-glow);
        }
        .swiper-pagination {
          position: absolute;
          bottom: 28px !important;
          z-index: 20;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
