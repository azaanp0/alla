import { MessageCircle } from "lucide-react";

const PHONE = "966500000000"; // dummy WhatsApp number
const MSG = "السلام عليكم، أرغب في الاستفسار عن منتج من متجر سحر";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MSG)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصلي عبر واتساب"
      className="fixed bottom-24 md:bottom-6 end-4 md:end-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-luxury hover:scale-110 transition-transform animate-pulse-glow"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
    </a>
  );
}
