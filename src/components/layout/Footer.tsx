import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-burgundy text-burgundy-foreground mt-20">
      {/* Trust strip */}
      <div className="border-b border-burgundy-foreground/10">
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Truck className="h-8 w-8 text-primary-glow" />
            <div className="text-right">
              <div className="font-bold">شحن مجاني</div>
              <div className="text-xs opacity-80">للطلبات فوق ١٩٩ ر.س</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-primary-glow" />
            <div className="text-right">
              <div className="font-bold">منتجات أصلية</div>
              <div className="text-xs opacity-80">ضمان الجودة 100%</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CreditCard className="h-8 w-8 text-primary-glow" />
            <div className="text-right">
              <div className="font-bold">دفع آمن</div>
              <div className="text-xs opacity-80">عند الاستلام أو إلكتروني</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-3xl text-primary-glow mb-3">سحر</div>
          <p className="text-sm opacity-80 leading-relaxed">
            وجهتك الأولى للعطور الفاخرة ومستحضرات التجميل الراقية في المملكة العربية السعودية.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="انستغرام" className="hover:text-primary-glow transition">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="تويتر" className="hover:text-primary-glow transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="فيسبوك" className="hover:text-primary-glow transition">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">المتجر</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "womens-perfume" }}
                className="hover:text-primary-glow"
              >
                عطور نسائية
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "mens-perfume" }}
                className="hover:text-primary-glow"
              >
                عطور رجالية
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "skincare" }}
                className="hover:text-primary-glow"
              >
                العناية بالبشرة
              </Link>
            </li>
            <li>
              <Link
                to="/category/$slug"
                params={{ slug: "makeup" }}
                className="hover:text-primary-glow"
              >
                المكياج
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">معلومات</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <Link to="/about" className="hover:text-primary-glow">
                من نحن
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary-glow">
                تواصلي معنا
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary-glow">
                سياسة الشحن
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary-glow">
                الاستبدال والإرجاع
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary-glow">
                سياسة الخصوصية
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">تواصلي معنا</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 920000000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> hello@sahar.sa
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" /> الرياض، المملكة العربية السعودية
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-burgundy-foreground/10">
        <div className="container mx-auto px-4 py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} سحر — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
