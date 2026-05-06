import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("يرجى إدخال بريد صحيح");
    toast.success("تم الاشتراك بنجاح!", { description: "ترقّبي كود خصم خاص ١٥٪ في بريدك" });
    setEmail("");
  };
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-cream border border-border p-8 md:p-12">
        <Sparkles className="absolute top-6 end-6 h-10 w-10 text-primary/20" />
        <Sparkles className="absolute bottom-6 start-6 h-8 w-8 text-burgundy/20" />
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs tracking-widest text-primary uppercase">عضوية سحر</span>
          <h2 className="font-display text-3xl md:text-4xl">انضمي لعالم سحر الفاخر</h2>
          <p className="text-sm text-muted-foreground">
            احصلي على ١٥٪ خصم على أول طلب + عروض حصرية وأسرار جمال أسبوعية
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <div className="relative flex-1">
              <Mail className="absolute top-1/2 -translate-y-1/2 start-4 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="w-full ps-11 pe-4 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:border-primary transition"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-bold hover:bg-burgundy transition shadow-soft"
            >
              اشتراك
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
