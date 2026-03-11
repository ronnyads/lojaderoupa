import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppCTASection = () => {
  return (
    <section className="bg-ocean-gradient noise-texture py-16 lg:py-24 relative overflow-hidden">
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-display text-[20rem] text-sand/[0.03] select-none">ALOHA</span>
      </div>

      {/* Wave decorations */}
      <svg className="absolute bottom-0 left-0 right-0 h-20 text-sand opacity-5" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 40c240-40 480 10 720-10s480 30 720 10v40H0z" fill="currentColor" />
      </svg>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
        >
          <MessageCircle size={40} className="text-sand" fill="currentColor" />
        </motion.div>

        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-sand mb-4">
          A ALOHA NO SEU ZAPP
        </h2>
        <p className="font-body text-sand/70 text-lg max-w-lg mx-auto mb-8">
          Tire dúvidas, monte seu look com nossa ajuda ou acompanhe seu pedido direto pelo WhatsApp.
        </p>

        <a
          href="https://wa.me/5592934503860?text=Salve!%20Vim%20pela%20loja%20online%20da%20Aloha%20🤙"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-[#25D366] rounded-pill font-heading text-base font-bold uppercase text-sand hover:brightness-110 transition"
        >
          CHAMAR AGORA (92) 93450-386
        </a>
        <p className="font-body text-sand/40 text-sm mt-4">
          Atendemos Seg–Sáb 9h–18h
        </p>
      </div>
    </section>
  );
};

export default WhatsAppCTASection;
