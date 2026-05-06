import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "إنشاء حساب — متجر سحر" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { user, login } = useUserStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/account" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون ٨ أحرف على الأقل");
      return;
    }
    setLoading(true);
    try {
      const userData = await api.auth.register(form.email, form.password, form.full_name);
      login(userData);
      toast.success("تم إنشاء حسابك بنجاح");
      navigate({ to: "/account" });
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الإنشاء");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl mb-2">انضمي إلى عائلة سحر</h1>
        <p className="text-muted-foreground text-sm">أنشئي حسابك واستمتعي بعروض حصرية</p>
      </div>
      <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <Field
          label="الاسم الكامل"
          value={form.full_name}
          onChange={(v) => setForm({ ...form, full_name: v })}
          required
        />
        <Field
          label="البريد الإلكتروني"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
        <Field
          label="رقم الجوال"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <Field
          label="كلمة المرور (٨ أحرف على الأقل)"
          type="password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "جارِ الإنشاء..." : "إنشاء حسابي"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          لديكِ حساب؟{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({
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
      <label className="text-sm font-medium block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
      />
    </div>
  );
}
