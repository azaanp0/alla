import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "نورة العتيبي",
    city: "الرياض",
    text: "تغليف فاخر وعطر يدوم طويلًا. تجربة شراء مميزة من ألفها لليائها.",
    rating: 5,
  },
  {
    name: "ريم القحطاني",
    city: "جدة",
    text: "وصلني الطلب بسرعة قياسية والمنتجات أصلية ١٠٠٪. صرت زبونة دائمة.",
    rating: 5,
  },
  {
    name: "هند الدوسري",
    city: "الدمام",
    text: "أحببت تشكيلة العناية بالبشرة، نتائج واضحة من أول أسبوع. شكرًا سحر!",
    rating: 5,
  },
  {
    name: "سارة المطيري",
    city: "مكة",
    text: "خدمة العملاء راقية جدًا وردهم سريع. التجربة تستحق التجربة.",
    rating: 5,
  },
];

export function ReviewsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="text-xs tracking-widest text-primary uppercase">قصص نجاح</span>
        <h2 className="font-display text-3xl md:text-4xl mt-2">آراء عميلاتنا الكريمات</h2>
        <p className="text-sm text-muted-foreground mt-2">أكثر من ٢٠٬٠٠٠ تقييم بمتوسط ٤.٩ نجوم</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <article
            key={i}
            className="relative bg-card border border-border rounded-2xl p-6 hover-lift"
          >
            <Quote className="absolute top-4 end-4 h-8 w-8 text-primary/15" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-foreground/85 mb-4">{t.text}</p>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <div className="h-10 w-10 rounded-full gradient-rose flex items-center justify-center text-primary-foreground font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.city}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
