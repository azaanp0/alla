import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft, Crown } from "lucide-react";
import bannerBoutique from "@/assets/store/banner-boutique.jpg";

export function PromoWideBanner() {
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/8] shadow-luxury group"
      >
        <img
          src={bannerBoutique}
          alt="بوتيك سحر"
          loading="lazy"
          width={1920}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-burgundy/90 via-burgundy/50 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-lg text-burgundy-foreground">
              <div className="inline-flex items-center gap-2 glass border border-primary-glow/40 rounded-full px-4 py-1.5 text-[11px] tracking-widest mb-4">
                <Crown className="h-3.5 w-3.5 text-primary-glow" />
                تجربة فاخرة
              </div>
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">
                ادخلي عالم سحر
              </h3>
              <p className="text-sm md:text-base opacity-90 mb-6 max-w-md font-light">
                بوتيك إلكتروني صُمم بأناقة ليقدم لكِ تجربة تسوق راقية لا تقل عن زيارة أعرق دور
                العطور حول العالم.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-burgundy-foreground text-burgundy px-7 py-3.5 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                تعرفي على قصتنا <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
