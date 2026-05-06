import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Sparkles, Award, Truck, Gift, ShieldCheck } from "lucide-react";
import { api } from "@/services/api";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { CategoryMosaic } from "@/components/storefront/CategoryMosaic";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { FlashSaleSection } from "@/components/storefront/FlashSaleSection";
import { ReviewsSection } from "@/components/storefront/ReviewsSection";
import { NewsletterSection } from "@/components/storefront/NewsletterSection";
import { CollectionsDuo } from "@/components/storefront/CollectionsDuo";
import { GiftSection } from "@/components/storefront/GiftSection";
import { LifestyleGallery } from "@/components/storefront/LifestyleGallery";
import { PromoWideBanner } from "@/components/storefront/PromoWideBanner";
import Antigravity from "@/components/ui/Antigravity";
import type { Product, Category } from "@/lib/types";

import bannerPerfumes from "@/assets/store/banner-perfumes.jpg";
import bannerSkincare from "@/assets/store/banner-skincare.jpg";
import lifestyle1 from "@/assets/store/lifestyle-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "سحر — متجر العطور والتجميل الفاخر | شحن مجاني للطلبات فوق ١٩٩ ر.س" },
      {
        name: "description",
        content:
          "اكتشفي تشكيلة سحر الفاخرة من العطور النسائية والرجالية، العناية بالبشرة، المكياج، والهدايا الراقية. خصومات حتى ٥٠٪ وشحن مجاني.",
      },
      { property: "og:title", content: "سحر — متجر العطور والتجميل الفاخر" },
      { property: "og:description", content: "تشكيلة فاخرة من العطور والمنتجات التجميلية الراقية" },
    ],
  }),
  component: HomePage,
});

function SectionHeader({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10px] tracking-[0.3em] text-primary uppercase">{eyebrow}</span>
        <h2 className="font-display text-3xl md:text-5xl mt-2">{title}</h2>
        <div className="mt-3 h-px w-16 bg-gradient-to-l from-primary to-transparent" />
      </motion.div>
      {href && (
        <Link
          to={href}
          className="text-sm text-primary hover:underline flex items-center gap-1 pb-2"
        >
          عرض الكل <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);

  useEffect(() => {
    api.categories.getAll().then(setCategories);
    api.products.getFeatured().then(setBestSellers);
    api.products.getAll().then((data) => setNewArrivals(data.slice(0, 12)));
    api.products.getAll().then((data) => setTrending(data.slice(0, 12)));
  }, []);

  return (
    <div>
      {/* HERO */}
      <HeroSlider />

      {/* USP Marquee strip */}
      <div className="bg-burgundy text-burgundy-foreground py-3 overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs md:text-sm">
          {[
            { Icon: Truck, label: "شحن مجاني فوق ١٩٩ ر.س" },
            { Icon: ShieldCheck, label: "منتجات أصلية ١٠٠٪" },
            { Icon: Gift, label: "تغليف فاخر مجاني" },
            { Icon: Award, label: "خدمة ٢٤/٧" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 opacity-90">
              <Icon className="h-4 w-4 text-primary-glow" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES MOSAIC */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] text-primary uppercase">تسوقي حسب</span>
          <h2 className="font-display text-3xl md:text-5xl mt-2">عوالم سحر</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
            رحلة في أرقى تشكيلات العطر والجمال، اخترنا لكِ ما يليق بأناقتك.
          </p>
        </div>
        <CategoryMosaic categories={categories} />
      </section>

      {/* BEST SELLERS CAROUSEL */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader eyebrow="الأكثر طلبًا" title="الأكثر مبيعًا" href="/search" />
        <ProductCarousel products={bestSellers} />
      </section>

      {/* MEN & WOMEN COLLECTIONS DUO */}
      <CollectionsDuo />

      {/* FLASH SALE */}
      <FlashSaleSection />

      {/* GIFTS LUXURY SECTION */}
      <GiftSection />

      {/* EDITORIAL SPLIT BANNER */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 relative rounded-3xl overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[480px] group"
          >
            <img
              src={bannerPerfumes}
              alt="عطور فاخرة"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-burgundy-foreground">
              <span className="text-[10px] tracking-[0.3em] opacity-80 mb-2">قطع نادرة</span>
              <h3 className="font-display text-3xl md:text-5xl mb-3 max-w-md">
                عطور تكتب اسمك في الذاكرة
              </h3>
              <p className="text-sm opacity-85 max-w-sm mb-5">
                روائح صنعت بحرفية لتبقى علامتك المميزة في كل لقاء.
              </p>
              <Link
                to="/category/$slug"
                params={{ slug: "womens-perfume" }}
                className="self-start bg-burgundy-foreground text-burgundy px-6 py-3 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              >
                تسوقي العطور <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5 grid gap-6"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
              <img
                src={bannerSkincare}
                alt="العناية بالبشرة"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-[10px] tracking-[0.3em] text-primary">العناية</span>
                <h3 className="font-display text-2xl mt-1 mb-2">طقوس الجمال</h3>
                <Link
                  to="/category/$slug"
                  params={{ slug: "skincare" }}
                  className="text-sm text-burgundy font-bold underline"
                >
                  اكتشفي المزيد →
                </Link>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group bg-gradient-rose flex items-center justify-center text-burgundy-foreground p-8 text-center">
              <div>
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary-glow animate-pulse" />
                <h3 className="font-display text-2xl mb-2">عضوية سحر</h3>
                <p className="text-sm opacity-90 mb-4">اشتركي واحصلي على ١٥٪ خصم على أول طلب</p>
                <Link
                  to="/register"
                  className="inline-block bg-burgundy-foreground text-burgundy px-5 py-2.5 rounded-full text-xs font-bold hover:scale-105 transition-transform"
                >
                  انضمي الآن
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW ARRIVALS CAROUSEL */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader eyebrow="حصري" title="وصل حديثًا" href="/search" />
        <ProductCarousel products={newArrivals} />
      </section>

      {/* LIFESTYLE EDITORIAL */}
      <section className="bg-gradient-cream py-20 md:py-28 my-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-full" />
            <img
              src={lifestyle1}
              alt="سحر العطر"
              loading="lazy"
              className="relative rounded-3xl shadow-luxury aspect-[4/5] object-cover w-full"
            />
            <div className="absolute -bottom-6 -end-6 bg-card rounded-2xl p-4 shadow-luxury hidden md:block max-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-3 w-3 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">"عطر يأسر القلب من أول نفحة"</p>
              <p className="text-[10px] text-primary font-bold mt-1">— نورة، الرياض</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <span className="text-[10px] tracking-[0.3em] text-primary uppercase">قصة سحر</span>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              جمالٌ يُحاك
              <br />
              بحرفية الذواقة
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              منذ تأسيسنا، آمنّا أن العطر والجمال ليس مجرد منتج، بل توقيع شخصي وذاكرة لا تُنسى. كل
              قطعة في سحر اخترناها بعناية من أعرق دور العطور والجمال حول العالم.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { n: "+٥٠٠", l: "منتج فاخر" },
                { n: "+٢٠٠ك", l: "عميلة سعيدة" },
                { n: "٤.٩★", l: "تقييم العملاء" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl md:text-3xl font-display text-primary">{s.n}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wide mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-burgundy border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              تعرفي على قصتنا <ChevronLeft className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TRENDING CAROUSEL */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader eyebrow="رائج هذا الموسم" title="الأعلى تقييمًا" href="/search" />
        <ProductCarousel products={trending} />
      </section>

      {/* INTERACTIVE EXPERIENCE */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-[#2A2522] border border-primary/20 aspect-[16/10] md:aspect-[21/9] flex items-center justify-center group shadow-luxury">
          <div className="absolute inset-0 z-0">
            <Antigravity
              count={120}
              magnetRadius={8}
              ringRadius={6}
              waveSpeed={0.2}
              waveAmplitude={1}
              particleSize={1.5}
              lerpSpeed={0.05}
              color="#C29B57" /* Store Primary Color */
              autoAnimate={true}
              particleVariance={0.5}
              rotationSpeed={0.2}
              depthFactor={1.5}
              pulseSpeed={2}
              particleShape="box"
              fieldStrength={8}
            />
          </div>
          <div className="relative z-10 text-center pointer-events-none p-8 glass rounded-2xl mx-4 transition-transform duration-700 group-hover:scale-105 border border-primary/10">
            <span className="text-[10px] tracking-[0.3em] text-primary uppercase drop-shadow-md">
              تجربة تفاعلية
            </span>
            <h2 className="font-display text-4xl md:text-6xl mt-2 text-white drop-shadow-lg">
              جاذبية سحر
            </h2>
            <p className="mt-4 text-sm text-white/90 max-w-sm mx-auto drop-shadow-md">
              حرّكي الماوس لاستكشاف جزيئات العطر المتناثرة في فضاء سحر، حيث تلتقي الفخامة بالخيال.
            </p>
          </div>
        </div>
      </section>

      {/* PROMO WIDE BANNER */}
      <PromoWideBanner />

      {/* LIFESTYLE GALLERY MOSAIC */}
      <LifestyleGallery />

      {/* REVIEWS */}
      <ReviewsSection />

      {/* NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
