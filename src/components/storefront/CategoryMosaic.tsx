import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

export function CategoryMosaic({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {categories.slice(0, 8).map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <Link
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="group block relative overflow-hidden rounded-2xl aspect-[3/4] shadow-soft"
          >
            <img
              src={c.image_url ?? ""}
              alt={c.name_ar}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-burgundy-foreground">
              <div className="text-[10px] tracking-widest opacity-75 mb-1">تسوقي</div>
              <h3 className="font-display text-lg md:text-2xl mb-2 group-hover:text-primary-glow transition-colors">
                {c.name_ar}
              </h3>
              <span className="inline-block text-xs border-b border-burgundy-foreground/40 group-hover:border-primary-glow transition-colors pb-0.5">
                اكتشفي المجموعة ←
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
