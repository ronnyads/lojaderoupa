import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5592934503860?text=Salve!%20Vim%20pela%20loja%20online%20da%20Aloha%20🤙"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-6 right-4 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg animate-pulse-glow hover:scale-110 transition-transform"
    >
      <MessageCircle size={28} className="text-background" fill="currentColor" />
    </a>
  );
};

export default WhatsAppFloat;
