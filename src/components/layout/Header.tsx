import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  GitCompareArrows,
  Sparkles,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { api } from "@/services/api";
import type { Product } from "@/lib/types";

// key = either "home" or a category slug. Routes are typed in TanStack
// Router so category links must use to="/category/$slug" + params.
type NavLink = { key: string; slug?: string; label: string };
const NAV_LINKS: NavLink[] = [
  { key: "home", label: "الرئيسية" },
  { key: "womens-perfume", slug: "womens-perfume", label: "عطور نسائية" },
  { key: "mens-perfume", slug: "mens-perfume", label: "عطور رجالية" },
  { key: "skincare", slug: "skincare", label: "العناية بالبشرة" },
  { key: "makeup", slug: "makeup", label: "المكياج" },
  { key: "luxury-gifts", slug: "luxury-gifts", label: "هدايا فاخرة" },
];

function NavLinkItem({
  link,
  onClick,
  className,
  activeProps,
}: {
  link: NavLink;
  onClick?: () => void;
  className?: string;
  activeProps?: { className?: string };
}) {
  if (link.slug) {
    return (
      <Link
        to="/category/$slug"
        params={{ slug: link.slug }}
        onClick={onClick}
        className={className}
        activeProps={activeProps}
      >
        {link.label}
      </Link>
    );
  }
  return (
    <Link to="/" onClick={onClick} className={className} activeProps={activeProps}>
      {link.label}
    </Link>
  );
}

type MegaLink = { slug: string; label: string };
const MEGA_DATA: Record<string, { title: string; links: MegaLink[]; image: string }> = {
  "womens-perfume": {
    title: "عطور نسائية",
    image: "/store/creamy_banner_perfumes_1777682428754.png",
    links: [
      { slug: "womens-perfume", label: "كل العطور النسائية" },
      { slug: "womens-perfume", label: "عطور شرقية" },
      { slug: "womens-perfume", label: "عطور زهرية" },
      { slug: "womens-perfume", label: "عطور فواكه" },
      { slug: "luxury-gifts", label: "هدايا للعروس" },
    ],
  },
  "mens-perfume": {
    title: "عطور رجالية",
    image: "/store/creamy_banner_skincare_1777682451392.png",
    links: [
      { slug: "mens-perfume", label: "كل العطور الرجالية" },
      { slug: "mens-perfume", label: "عطور خشبية" },
      { slug: "mens-perfume", label: "عطور عود" },
      { slug: "mens-perfume", label: "عطور رياضية" },
    ],
  },
  skincare: {
    title: "العناية بالبشرة",
    image: "/store/creamy_gift_boxes_1777682551722.png",
    links: [
      { slug: "skincare", label: "كل منتجات العناية" },
      { slug: "skincare", label: "كريمات الترطيب" },
      { slug: "skincare", label: "السيروم" },
      { slug: "skincare", label: "ماسكات الوجه" },
    ],
  },
  makeup: {
    title: "المكياج",
    image: "/store/creamy_banner_perfumes_1777682428754.png",
    links: [
      { slug: "makeup", label: "كل المكياج" },
      { slug: "makeup", label: "أحمر شفاه" },
      { slug: "makeup", label: "مسكرة" },
      { slug: "makeup", label: "كحل ومحدد" },
    ],
  },
};

export function Header() {
  const count = useCartStore((state: any) => state.items.length);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen || q.trim().length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      const data = await api.products.search(q.trim());
      setResults(data.slice(0, 6));
    }, 200);
    return () => clearTimeout(t);
  }, [q, searchOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate({ to: "/search", search: { q: q.trim() } as never });
    setSearchOpen(false);
    setQ("");
    setResults([]);
  };

  return (
    <>
      {/* Promo strip */}
      <div className="bg-secondary text-secondary-foreground text-xs md:text-sm py-2 text-center overflow-hidden">
        <div className="animate-fade-in flex items-center justify-center gap-2 px-3">
          <Sparkles className="h-3 w-3" /> توصيل مجاني فوق ١٩٩ ر.س — كود{" "}
          <strong className="font-bold border-b border-dashed border-primary">SAHARA10</strong> لخصم
          ١٠٪
          <span className="hidden md:inline-flex items-center gap-1 ms-4 opacity-80">
            <Phone className="h-3 w-3" /> 920000000
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all ${scrolled ? "glass shadow-soft" : "bg-background"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 -ms-2"
              aria-label="فتح القائمة"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-3xl md:text-4xl text-gradient-luxury">سحر</span>
              <span className="hidden md:inline text-xs text-muted-foreground border-r border-border pr-2 mr-2">
                للعطور والتجميل
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((l) => (
                <div key={l.key} className="relative">
                  <NavLinkItem
                    link={l}
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                    activeProps={{ className: "text-primary" }}
                  />
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="بحث"
                className="p-2 hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                to="/wishlist"
                aria-label="المفضلة"
                className="p-2 hover:text-primary transition-colors hidden sm:inline-flex"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link
                to={user ? "/account" : "/login"}
                aria-label="حسابي"
                className="p-2 hover:text-primary transition-colors hidden sm:inline-flex"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                to="/cart"
                aria-label="السلة"
                className="relative p-2 hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -start-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1 animate-scale-in">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] animate-fade-in">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative bg-background shadow-luxury max-w-2xl mx-auto mt-16 mx-4 rounded-3xl p-6 animate-scale-in">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحثي عن منتج، عطر، ماركة..."
                className="flex-1 bg-transparent text-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="إغلاق"
                className="p-2 hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
            {results.length > 0 && (
              <div className="mt-5 border-t border-border pt-4 space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition"
                  >
                    <img
                      src={p.product_images?.[0]?.url}
                      alt={p.name_ar}
                      className="h-14 w-14 rounded-lg object-cover bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{p.name_ar}</div>
                      {p.brand && <div className="text-xs text-muted-foreground">{p.brand}</div>}
                    </div>
                    <div className="text-sm font-bold text-primary">
                      {Number(p.price).toFixed(0)} ر.س
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {q.length >= 2 && results.length === 0 && (
              <div className="mt-5 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                لا توجد نتائج لـ "{q}"
              </div>
            )}
            {q.length < 2 && (
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-xs text-muted-foreground mb-2">بحث شائع</div>
                <div className="flex flex-wrap gap-2">
                  {["عطر عود", "كريم وجه", "أحمر شفاه", "هدايا", "مسكرة"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQ(s)}
                      className="text-xs bg-accent px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-luxury animate-slide-in-right p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-2xl text-gradient-luxury">سحر</span>
              <button onClick={() => setOpen(false)} aria-label="إغلاق">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <NavLinkItem
                  key={l.key}
                  link={l}
                  onClick={() => setOpen(false)}
                  className="py-3 px-3 rounded-md text-base hover:bg-accent transition-colors"
                />
              ))}
              <hr className="my-3" />
              <Link
                to="/wishlist"
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-md hover:bg-accent"
              >
                المفضلة
              </Link>
              <Link
                to={user ? "/account" : "/login"}
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-md hover:bg-accent"
              >
                {user ? "حسابي" : "تسجيل الدخول"}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
