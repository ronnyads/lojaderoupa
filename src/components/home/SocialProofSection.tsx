import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Matheus G.", city: "Manaus, AM", initials: "MG",
    avatarColor: "bg-teal",
    text: "Recebi minha polo navy em 24h. Qualidade absurda, cai perfeito. Já pedi mais 2 peças. Melhor loja de Manaus!",
    product: "Polo Piquet Navy Premium", rating: 5,
  },
  {
    name: "Rafael S.", city: "Manaus, AM", initials: "RS",
    avatarColor: "bg-ocean-dark",
    text: "O conjunto polo+bermuda ficou incrível. Vários elogios na rua. Vai chegar no delivery mais rápido que promete.",
    product: "Look Navy Total", rating: 5,
  },
  {
    name: "João P.", city: "Manaus, AM", initials: "JP",
    avatarColor: "bg-coral",
    text: "Salve Aloha! Outro nível de qualidade. O boné bordado é premium demais para o preço. Recomendo muito.",
    product: "Boné Bordado Premium", rating: 5,
  },
  {
    name: "Carlos B.", city: "Manaus, AM", initials: "CB",
    avatarColor: "bg-sand-400",
    text: "Comprei os óculos aviador e chegou no mesmo dia no meu bairro. Atendimento no Zap foi top demais.",
    product: "Óculos Piloto Aviador", rating: 5,
  },
  {
    name: "Lucas M.", city: "Novo Airão, AM", initials: "LM",
    avatarColor: "bg-teal-900",
    text: "Morei na Zona Norte anos e sempre comprei na Aloha. Agora tem loja online! Chegou pelo correio em 3 dias.",
    product: "Bermuda Surf Board Short", rating: 5,
  },
  {
    name: "Diego L.", city: "Manaus, AM", initials: "DL",
    avatarColor: "bg-ocean-700",
    text: "Drop exclusivo de polo absurdo. Só 5 peças disponíveis, garanti a minha rápido. O fit é perfeito demais.",
    product: "Polo Performance Drop", rating: 5,
  },
];

const SocialProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = reviews.length - 1;

  const next = useCallback(() => {
    setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = () => {
    setCurrentIndex(i => (i <= 0 ? maxIndex : i - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Show 3 cards on desktop, 1 on mobile via scroll snap
  const visibleReviews = [];
  for (let j = 0; j < 3; j++) {
    visibleReviews.push(reviews[(currentIndex + j) % reviews.length]);
  }

  return (
    <section className="py-16 lg:py-24 bg-sand">
      <div className="container">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean text-center mb-2 tracking-wide">
          QUEM ALOHA, CHEGA
        </h2>
        <p className="font-body text-ocean-700 text-center mb-10">
          Depoimentos reais dos nossos clientes
        </p>

        {/* Desktop carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-sand-200 flex items-center justify-center text-ocean hover:bg-sand-100 transition-colors hidden lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-sand-200 flex items-center justify-center text-ocean hover:bg-sand-100 transition-colors hidden lg:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Mobile: scroll snap / Desktop: 3 cards */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-4 lg:pb-0">
            {visibleReviews.map((review, i) => (
              <motion.div
                key={`${review.initials}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-80 lg:w-1/3 flex-shrink-0 snap-center bg-card rounded-[14px] p-5 border border-sand-200 border-l-[3px] border-l-coral"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${review.avatarColor} flex items-center justify-center font-heading text-sm font-bold text-sand`}>
                    {review.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-heading text-sm font-semibold text-ocean">{review.name}</p>
                    <p className="font-body text-xs text-ocean/50">{review.city}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-body text-sm text-ocean/80 leading-relaxed mb-3">{review.text}</p>
                <span className="inline-block px-2.5 py-1 rounded-pill bg-sand-100 border border-sand-200 font-body text-[10px] text-ocean/60">
                  📦 {review.product}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rating + WhatsApp CTA */}
        <div className="text-center mt-10 space-y-4">
          <p className="font-body text-sm text-ocean/60">
            ⭐ <span className="font-price font-bold text-ocean">4.9</span> — Baseado em 148 avaliações de clientes em Manaus
          </p>
          <a
            href="https://wa.me/5592934503860?text=Salve!%20Quero%20saber%20mais%20sobre%20a%20Aloha%20🤙"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] rounded-lg font-heading text-sm font-bold uppercase text-sand hover:brightness-110 transition"
          >
            💬 FALE COM A GENTE NO WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
