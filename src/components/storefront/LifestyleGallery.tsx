import { motion } from "framer-motion";
import lifestylePerfumes from "@/assets/store/lifestyle-perfumes.jpg";
import lifestyleBeauty from "@/assets/store/lifestyle-beauty.jpg";
import lifestyleBakhoor from "@/assets/store/lifestyle-bakhoor.jpg";
import lifestyleSkincare from "@/assets/store/lifestyle-skincare.jpg";

const TILES = [
  {
    src: lifestylePerfumes,
    label: "العطور",
    caption: "ذكرى تبقى",
    className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
  },
  { src: lifestyleBeauty, label: "الجمال", caption: "إطلالة لا تُنسى", className: "aspect-square" },
  { src: lifestyleBakhoor, label: "البخور", caption: "نفحات أصيلة", className: "aspect-square" },
  {
    src: lifestyleSkincare,
    label: "العناية",
    caption: "بشرة كالحرير",
    className: "md:col-span-2 aspect-[2/1]",
  },
];

export function LifestyleGallery() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <span className="text-[10px] tracking-[0.3em] text-primary uppercase">من سحر</span>
        <h2 className="font-display text-3xl md:text-5xl mt-2">لحظات من عالمنا</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
          صور تلهمكِ، وروائح تأسر القلب، وطقوس جمال تستحقينها كل يوم.
        </p>
        <div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {TILES.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`relative overflow-hidden rounded-2xl group shadow-soft ${t.className}`}
          >
            <img
              src={t.src}
              alt={t.label}
              loading="lazy"
              width={1536}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
              <div className="text-[10px] tracking-[0.3em] text-primary-glow opacity-90 mb-1">
                {t.label}
              </div>
              <div className="font-display text-lg md:text-2xl">{t.caption}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
