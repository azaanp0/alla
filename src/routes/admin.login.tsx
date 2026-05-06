import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [pin, setPin] = useState("");
  const { login } = useAdminStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pin)) {
      toast.success("أهلاً بك في بوابة سحر للإدارة");
      navigate({ to: "/admin" });
    } else {
      toast.error("رمز الدخول غير صحيح");
      setPin("");
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden text-foreground">
      {/* Background Aesthetics */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618365908648-e71bf5716b02?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Admin Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        <div className="backdrop-blur-xl bg-card border border-border p-10 rounded-3xl shadow-luxury flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
            <LockKeyhole className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl font-display font-bold mb-2">سحر للإدارة</h1>
          <p className="text-sm text-muted-foreground mb-8 text-center">
            قم بإدخال رمز الدخول السري للوصول إلى مركز القيادة. (admin)
          </p>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="رمز الدخول"
                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-center tracking-widest text-lg font-mono focus:outline-none focus:border-primary transition-colors text-foreground shadow-inner"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-luxury transition-all uppercase tracking-widest text-sm hover:scale-105"
            >
              تأكيد الدخول
            </button>
          </form>

          <p className="mt-8 text-xs text-muted-foreground/60 text-center uppercase tracking-widest">
            Sahara Royal Store © 2026
            <br />
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
