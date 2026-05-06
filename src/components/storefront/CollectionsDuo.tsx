import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import collectionWomen from "@/assets/store/collection-women.jpg";

const COLLECTIONS = [
  {
    eyebrow: "لها",
    title: "تشكيلة المرأة",
    subtitle: "أنوثة تُروى بنفحات من الياسمين والورد",
    cta: "اكتشفي المجموعة",
    slug: "womens-perfume",
    image: collectionWomen,
    align: "right" as const,
    imgPos: "object-center",
  },
  {
    eyebrow: "له",
    title: "تشكيلة الرجل",
    subtitle: "حضور قوي بنفحات العود والمسك الأصيل",
    cta: "تسوق المجموعة",
    slug: "mens-perfume",
    image: "/store/mens-hero.png",
    align: "left" as const,
    imgPos: "object-[center_35%]", // Adjusted to center the face, specifically tailored for portrait/car photos
  },
];

export function CollectionsDuo() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-5 md:gap-7">
        {COLLECTIONS.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="relative aspect-[4/5] md:aspect-[5/6] rounded-3xl overflow-hidden group shadow-luxury"
          >
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              width={1536}
              height={1024}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${c.imgPos}`}
            />
            {/* Elegant overlay so the face stays bright but text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 h-1/2 mt-auto" />

            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10 text-white z-10">
              <span className="text-[11px] tracking-[0.4em] text-primary uppercase mb-3">
                {c.eyebrow}
              </span>
              <h3 className="font-display text-3xl md:text-5xl mb-3 leading-tight">{c.title}</h3>
              <p className="text-sm md:text-base opacity-90 max-w-xs mb-6 font-light">
                {c.subtitle}
              </p>
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="self-start inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all group/cta"
              >
                {c.cta}
                <ChevronLeft className="h-4 w-4 group-hover/cta:-translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Decorative corner badge */}
            <div className="absolute top-5 end-5 glass border border-white/30 rounded-full px-3 py-1.5 text-[10px] tracking-widest text-white shadow-sm font-medium bg-black/20 backdrop-blur-md">
              مجموعة ٢٠٢٦
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
