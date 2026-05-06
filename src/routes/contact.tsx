import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصلي معنا — متجر سحر" },
      { name: "description", content: "تواصلي مع فريق خدمة العملاء في متجر سحر" },
    ],
  }),
  component: () => (
    <div className="container mx-auto px-4 py-12 max-w-2xl animate-fade-in">
      <h1 className="font-display text-4xl text-center mb-8">تواصلي معنا</h1>
      <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <div className="font-bold">الهاتف</div>
            <div className="text-muted-foreground">920000000</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Mail className="h-6 w-6 text-primary" />
          <div>
            <div className="font-bold">البريد</div>
            <div className="text-muted-foreground">hello@sahar.sa</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <div className="font-bold">الموقع</div>
            <div className="text-muted-foreground">الرياض، المملكة العربية السعودية</div>
          </div>
        </div>
      </div>
    </div>
  ),
});
