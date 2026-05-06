import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول — متجر سحر" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login } = useUserStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/account" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await api.auth.login(email, password);
      login(userData);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate({ to: "/account" });
    } catch (error: any) {
      toast.error(error.message || "بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl mb-2">مرحبًا بعودتك</h1>
        <p className="text-muted-foreground text-sm">سجلي دخولك إلى حسابك في سحر</p>
      </div>
      <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">كلمة المرور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "جارِ الدخول..." : "تسجيل الدخول"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          ليس لديكِ حساب؟{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </form>
    </div>
  );
}
