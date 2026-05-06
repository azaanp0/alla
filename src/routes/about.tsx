import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Droplet, Sparkles, Gem } from "lucide-react";
import lifestyle1 from "@/assets/store/lifestyle-1.jpg";
import bannerPerfumes from "@/assets/store/banner-perfumes.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن سحر — قصة الجمال الفاخر" },
      {
        name: "description",
        content: "تعرفي على قصة سحر، وفلسفتنا في تقديم أرقى عطور ومنتجات التجميل.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={bannerPerfumes}
          alt="سحر - قصة العطر"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-foreground z-10 px-4"
        >
          <span className="text-sm tracking-[0.5em] text-primary uppercase mb-4 block">
            نبذة عنا
          </span>
          <h1 className="font-display text-5xl md:text-7xl mb-6">قصة سحر</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed font-light">
            حيث يلتقي الشغف بالجمال ليرسم ملامح الفخامة في كل تفاصيلك.
          </p>
        </motion.div>
      </section>

      {/* The Story Section */}
      <section className="py-24 md:py-32 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] text-primary">البداية</span>
            <h2 className="font-display text-3xl md:text-5xl my-4">رحلة البحث عن الكمال</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
              <p>
                بدأت قصة "سحر" من يقين راسخ بأن الجمال ليس مجرد انعكاس خارجي، بل هو شعور داخلي يتوج
                به الإنسان حضوره. كنا نبحث عن تلك النفحات النادرة والتركيبات المثالية التي تخاطب
                الحواس وتترك أثراً لا يُنسى.
              </p>
              <p>
                عبر سنوات من الشغف والبحث، قمنا باختيار أرقى العلامات التجارية وأكثرها فخامة حول
                العالم، لنجمعها لكِ في وجهة واحدة، لتكون "سحر" بوابتك نحو عالم متفرد يعكس ذوقك
                الرفيع.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <img
              src={lifestyle1}
              alt="تجربة سحر"
              className="relative aspect-[4/5] object-cover rounded-3xl shadow-luxury w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs tracking-[0.3em] text-primary">قيمنا</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 mb-16">فلسفة سحر</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Gem,
                title: "فخامة الأصالة",
                desc: "ننتقي لكِ فقط المنتجات الأصلية ١٠٠٪ من مصادرها الموثوقة، لنضمن لكِ تجربة استثنائية.",
              },
              {
                icon: Droplet,
                title: "نقاء التفاصيل",
                desc: "من اختيار العطر وحتى تغليفه، نهتم بأدق التفاصيل لتصلك تحفة فنية تليق بکِ.",
              },
              {
                icon: Sparkles,
                title: "التفرّد والتميز",
                desc: "نسعى لتقديم أندر التركيبات العطرية وأفضل مستحضرات العناية التي تبرز جمالك الخاص.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <v.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-3">{v.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed max-w-sm">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Closing */}
      <section className="py-32 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto mb-8" />
          <h2 className="font-display text-4xl md:text-5xl text-primary/90 mb-6 font-light italic">
            "كوني استثنائية، كوني سحر."
          </h2>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <span className="w-8 h-px bg-border" />
            <span className="text-sm tracking-widest uppercase">الفريق المؤسس</span>
            <span className="w-8 h-px bg-border" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
