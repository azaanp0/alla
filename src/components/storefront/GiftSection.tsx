import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Gift, ChevronLeft, Sparkles } from "lucide-react";
import giftCollection from "@/assets/store/gift-collection.jpg";

export function GiftSection() {
  return (
    <section className="relative py-16 md:py-24 my-10 overflow-hidden bg-gradient-to-br from-burgundy via-burgundy/95 to-burgundy/80">
      {/* Decorative golden particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary-glow/60"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animation: `float ${5 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full" />
            <img
              src={giftCollection}
              alt="هدايا فاخرة"
              loading="lazy"
              width={1536}
              height={1024}
              className="relative rounded-3xl shadow-luxury aspect-[4/3] object-cover w-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-5 -start-5 bg-card text-foreground rounded-2xl p-4 shadow-luxury hidden md:flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full gradient-rose flex items-center justify-center">
                <Gift className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">تغليف فاخر</div>
                <div className="text-sm font-bold">مجاني مع كل هدية</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-burgundy-foreground"
          >
            <div className="inline-flex items-center gap-2 glass border border-primary-glow/30 rounded-full px-4 py-1.5 text-[11px] tracking-widest mb-5">
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              مجموعة الهدايا
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight mb-5">
              هدية تليق
              <br />
              بمن تحبين
            </h2>
            <p className="opacity-90 leading-relaxed mb-7 max-w-md text-base font-light">
              اكتشفي تشكيلتنا الحصرية من الهدايا الفاخرة المغلفة بأناقة، مصممة لتترك أثرًا لا يُنسى
              في كل مناسبة — من العرس إلى المولود، ومن العيد إلى الذكرى.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "تغليف فاخر بألوان البرغندي والذهبي",
                "بطاقة إهداء مكتوبة بخط اليد",
                "اختيار حر للمحتويات",
                "توصيل في نفس اليوم داخل الرياض",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                  <span className="opacity-95">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/category/$slug"
              params={{ slug: "luxury-gifts" }}
              className="inline-flex items-center gap-2 bg-primary-glow text-burgundy px-8 py-4 rounded-full font-bold hover:bg-burgundy-foreground transition-all shadow-luxury group"
            >
              تسوقي الهدايا الفاخرة
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
