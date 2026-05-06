import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { useOrderStore } from "@/store/useOrderStore";
import { mockShippingZones, mockCoupons } from "@/services/mockData";
import { formatPriceWithCurrency } from "@/lib/format";
import { toast } from "sonner";
import { CheckCircle2, CreditCard, Truck, ShieldCheck, FileText } from "lucide-react";
import { OrderItem } from "@/lib/types";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "إتمام الطلب — متجر سحر" }] }),
  component: CheckoutWizard,
});

function CheckoutWizard() {
  const {
    items,
    getCartTotal,
    getDiscount,
    getTax,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCartStore();
  const subtotal = getCartTotal();
  const discount = getDiscount();
  const tax = getTax();
  const { user } = useUserStore();
  const { placeOrder } = useOrderStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState(appliedCoupon?.code || "");

  const [form, setForm] = useState({
    customer_name: user?.name ?? "",
    customer_phone: "",
    customer_email: user?.email ?? "",
    city: "",
    district: "",
    street: "",
    postal_code: "",
    notes: "",
    payment_method: "simulated_card" as "cash_on_delivery" | "simulated_card",
  });

  const activeZone = useMemo(() => {
    return (
      mockShippingZones.find((z) => z.name_ar.includes(form.city)) ||
      mockShippingZones.find((z) => z.id === "zone_3")
    );
  }, [form.city]);

  const shippingCost = activeZone ? activeZone.cost : 35;
  const isFreeShipping = subtotal >= 1000;
  const finalShipping = isFreeShipping ? 0 : shippingCost;

  const total = Math.max(0, subtotal + finalShipping - discount);

  const handleApplyCoupon = () => {
    const found = mockCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.is_active,
    );
    if (found) {
      const res = applyCoupon(found);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    } else {
      toast.error("كود الخصم غير صالح أو منتهي الصلاحية");
      removeCoupon();
    }
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.customer_name || !form.customer_phone || !form.city || !form.street) {
        toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
        return;
      }
      if (form.customer_phone.length < 9) {
        toast.error("رقم الجوال غير صحيح");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      submitOrder();
    }
  };

  const submitOrder = async () => {
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const orderItems: OrderItem[] = items.map((it) => ({
        id: `it-${Math.random().toString(36).substr(2, 9)}`,
        product_id: it.product_id,
        variant_id: it.variant_id,
        product_name_ar: it.product.name_ar,
        variant_name_ar: it.variant?.name_ar,
        quantity: it.quantity,
        price_at_purchase: Number(it.product.price) + Number(it.variant?.price_delta ?? 0),
      }));

      const newOrderId = placeOrder({
        user_id: user?.id,
        status: "Pending",
        items: orderItems,
        subtotal,
        shipping_cost: finalShipping,
        discount,
        tax,
        total,
        shipping_address: {
          name: form.customer_name,
          phone: form.customer_phone,
          address: form.street,
          city: form.city,
          district: form.district,
        },
      });

      await new Promise((res) => setTimeout(res, 1200));
      clearCart();
      setOrderNumber(newOrderId);
      setStep(3);
    } catch (err) {
      toast.error("حدث خطأ أثناء إتمام الطلب");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && step !== 3) {
    setTimeout(() => navigate({ to: "/cart" }), 0);
    return null;
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-10 w-full max-w-lg mx-auto">
      <div
        className={`flex flex-col items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground opacity-50"}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary/10" : "border-border"}`}
        >
          <Truck className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium">الشحن</span>
      </div>
      <div
        className={`h-0.5 w-16 md:w-24 -translate-y-3 ${step >= 2 ? "bg-primary" : "bg-border"}`}
      />
      <div
        className={`flex flex-col items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground opacity-50"}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary/10" : "border-border"}`}
        >
          <CreditCard className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium">الدفع</span>
      </div>
      <div
        className={`h-0.5 w-16 md:w-24 -translate-y-3 ${step >= 3 ? "bg-primary" : "bg-border"}`}
      />
      <div
        className={`flex flex-col items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground opacity-50"}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary/10" : "border-border"}`}
        >
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium">التأكيد</span>
      </div>
    </div>
  );

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <StepIndicator />
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-border text-center shadow-soft card-3d">
          <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 shine-overlay relative overflow-hidden">
            <div className="absolute inset-0 animate-spin-slow bg-gradient-to-tr from-primary/20 to-transparent rounded-full" />
            <CheckCircle2 className="h-10 w-10 text-primary relative z-10" />
          </div>
          <h1 className="font-display text-4xl mb-4">تم استلام طلبك بنجاح!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            شكراً لثقتك بسحر. جاري تجهيز طلبك الفاخر بكل عناية.
          </p>

          <div className="bg-background rounded-2xl p-6 border border-border inline-block text-start w-full md:w-auto min-w-[300px] mb-8">
            <div className="flex items-center gap-3 mb-4 text-primary font-bold">
              <FileText className="h-5 w-5" /> الفاتورة
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">رقم الطلب:</span>
                <span className="font-bold">{orderNumber}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">التاريخ:</span>
                <span>{new Date().toLocaleDateString("ar-SA")}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">الإجمالي:</span>
                <span className="font-bold text-primary">{formatPriceWithCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold transition-all shadow-luxury hover:scale-105"
            >
              مواصلة التسوق
            </Link>
            {user && (
              <Link
                to="/account"
                className="bg-secondary text-foreground px-8 py-4 rounded-full font-bold hover:bg-muted transition-all"
              >
                طلباتي
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <StepIndicator />

      <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start max-w-6xl mx-auto">
        {/* Left Side: Wizard Forms */}
        <form onSubmit={nextStep} className="space-y-8">
          {step === 1 && (
            <section className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft animate-slide-up">
              <h2 className="font-bold text-2xl mb-6 font-display flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" /> وجهة التوصيل
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="الاسم الكامل *"
                  value={form.customer_name}
                  onChange={(v) => setForm({ ...form, customer_name: v })}
                  required
                />
                <Input
                  label="رقم الجوال *"
                  value={form.customer_phone}
                  onChange={(v) => setForm({ ...form, customer_phone: v })}
                  required
                  type="tel"
                />
                <div className="sm:col-span-2">
                  <Input
                    label="البريد الإلكتروني (اختياري للإيصال)"
                    value={form.customer_email}
                    onChange={(v) => setForm({ ...form, customer_email: v })}
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">المدينة *</label>
                  <select
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="">اختر المدينة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="أخرى">مدن أخرى...</option>
                  </select>
                </div>
                <Input
                  label="الحي *"
                  value={form.district}
                  onChange={(v) => setForm({ ...form, district: v })}
                  required
                />
                <div className="sm:col-span-2">
                  <Input
                    label="الشارع ورقم المبنى *"
                    value={form.street}
                    onChange={(v) => setForm({ ...form, street: v })}
                    required
                  />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold shadow-luxury hover:scale-105 transition-all"
                >
                  التالي: خيارات الدفع
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6 animate-slide-up">
              <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-2xl font-display flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" /> خيارات الدفع
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-primary hover:underline"
                  >
                    العودة للشحن
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      v: "simulated_card",
                      l: "بطاقة ائتمان / مدى",
                      d: "دفع آمن — مجرد محاكاة للنموذج التجريبي",
                      icon: ShieldCheck,
                    },
                    {
                      v: "cash_on_delivery",
                      l: "الدفع عند الاستلام",
                      d: "ادفعي نقدًا عند توصيل طلبيتك (قد تضاف رسوم إضافية)",
                      icon: Truck,
                    },
                  ].map((p) => (
                    <label
                      key={p.v}
                      className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${form.payment_method === p.v ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={form.payment_method === p.v}
                        onChange={() =>
                          setForm({ ...form, payment_method: p.v as typeof form.payment_method })
                        }
                        className="mt-1.5 accent-primary w-5 h-5"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-lg flex items-center gap-2">
                          {p.l} <p.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{p.d}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {form.payment_method === "simulated_card" && (
                <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft animate-fade-in relative overflow-hidden">
                  <div className="absolute top-0 end-0 p-4 opacity-5 pointer-events-none">
                    <CreditCard className="h-32 w-32" />
                  </div>
                  <h3 className="font-bold mb-4 relative z-10">
                    بيانات البطاقة الوهمية (لا تقم بإدخال حقيقي)
                  </h3>
                  <div className="space-y-4 relative z-10">
                    <Input label="رقم البطاقة" value="4000 0000 0000 0000" onChange={() => {}} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="تاريخ الانتهاء" value="12/25" onChange={() => {}} />
                      <Input label="رمز التحقق (CVV)" value="123" onChange={() => {}} />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-12 py-4 rounded-full font-bold shadow-luxury hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-2 text-lg"
                >
                  {submitting && (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  تأكيد ودفع {formatPriceWithCurrency(total)}
                </button>
              </div>
            </section>
          )}
        </form>

        {/* Right Side: Order Summary */}
        <aside className="bg-card rounded-3xl p-6 md:p-8 border border-border h-fit lg:sticky lg:top-28 shadow-soft">
          <h2 className="font-bold text-xl font-display mb-6">ملخص الحقيبة</h2>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto pe-2 stylish-scrollbar mb-6">
            {items.map((it) => (
              <div key={it.id} className="flex gap-4 text-sm group">
                <div className="h-16 w-16 rounded-xl bg-muted overflow-hidden shrink-0 border border-border relative">
                  <img
                    src={it.product.product_images?.[0]?.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-0 end-0 bg-background/80 text-[10px] w-5 h-5 flex items-center justify-center font-bold backdrop-blur-md rounded-bl-lg">
                    {it.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="font-bold line-clamp-1">{it.product.name_ar}</div>
                  {it.variant && (
                    <div className="text-xs text-muted-foreground mt-0.5">{it.variant.name_ar}</div>
                  )}
                  <div className="font-bold text-primary mt-1">
                    {formatPriceWithCurrency(
                      (Number(it.product.price) + Number(it.variant?.price_delta ?? 0)) *
                        it.quantity,
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-border opacity-50 mb-6" />

          {/* Coupon Section */}
          <div className="mb-6">
            <label className="text-sm font-bold block mb-2">لديك كود خصم؟</label>
            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="أدخل الكود هنا"
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors uppercase"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-foreground text-background font-bold px-6 py-3 rounded-xl hover:bg-foreground/90 transition-colors"
              >
                تطبيق
              </button>
            </div>
            {appliedCoupon && (
              <div className="mt-3 text-sm flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                <CheckCircle2 className="h-4 w-4" /> تم تطبيق {appliedCoupon.code} بنجاح!
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="ms-auto text-xs underline hover:text-green-800"
                >
                  إزالة
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between text-muted-foreground">
              <span>المجموع الفرعي</span>
              <span className="font-medium text-foreground">
                {formatPriceWithCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>
                تكلفة الشحن {shippingCost > 0 && activeZone && `(${activeZone.estimated_days})`}
              </span>
              <span
                className={
                  finalShipping === 0 ? "text-green-600 font-bold" : "font-medium text-foreground"
                }
              >
                {finalShipping === 0 ? "مجاني" : formatPriceWithCurrency(finalShipping)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary font-bold">
                <span>مبلغ الخصم</span>
                <span>- {formatPriceWithCurrency(discount)}</span>
              </div>
            )}
          </div>

          <hr className="border-border opacity-50 mb-6" />

          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="font-bold text-xl block">الإجمالي المتبقي</span>
              <span className="text-xs text-muted-foreground">
                شامل ضريبة القيمة المضافة {tax.toFixed(2)} ر.س
              </span>
            </div>
            <span className="text-3xl font-display font-bold text-primary">
              {formatPriceWithCurrency(total)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-bold block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
