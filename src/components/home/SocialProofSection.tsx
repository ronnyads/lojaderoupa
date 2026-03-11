import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "João V.", city: "Centro, Manaus", initials: "JV",
    text: "Polo + bermuda chegou no dia seguinte. Qualidade surreal, fiz sucesso na festa. Aloha demais! 🤙",
    product: "Polo Piquet Navy + Bermuda Sarja", rating: 5,
  },
  {
    name: "Felipe M.", city: "Flores, Manaus", initials: "FM",
    text: "Tropa chegou comentando no look. Boné + óculos completou o conjunto perfeito. Voltei pra comprar o Drop #06.",
    product: "Boné Strapback + Óculos Square", rating: 5,
  },
  {
    name: "Lucas R.", city: "Parque 10, Manaus", initials: "LR",
    text: "Garanti o Drop #05 e esgotou em 2 horas depois. Valeu ter avisado no WhatsApp!",
    product: "Drop Exclusivo #05", rating: 5,
  },
  {
    name: "André S.", city: "Adrianópolis, Manaus", initials: "AS",
    text: "Montei o look completo pela ferramenta do site e ficou exatamente como eu imaginei. Cheguei no jogo e todo mundo perguntou.",
    product: "Look Completo — R$ 549,70", rating: 5,
  },
  {
    name: "Bruno L.", city: "Compensa, Manaus", initials: "BL",
    text: "PIX 5% off e frete grátis acima de R$ 350. Peguei 3 peças e saiu um preço muito bom. Atendimento rápido.",
    product: "Polo Lisa Branca + Bermuda + Boné", rating: 5,
  },
  {
    name: "Mateus C.", city: "São Jorge, Manaus", initials: "MC",
    text: "A qualidade das peças da Aloha é outra. Nunca achei polo desse padrão aqui em Manaus.",
    product: "Polo Piquet Navy Premium", rating: 5,
  },
  {
    name: "Rafael S.", city: "Cidade Nova, Manaus", initials: "RS",
    text: "O conjunto polo+bermuda ficou incrível. Vários elogios na rua. Delivery mais rápido do que esperava.",
    product: "Look Navy Total", rating: 5,
  },
  {
    name: "Diego L.", city: "Zona Norte, Manaus", initials: "DL",
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
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const visibleReviews = [];
  for (let j = 0; j < 3; j++) {
    visibleReviews.push(reviews[(currentIndex + j) % reviews.length]);
  }

  return (
    <section className="py-16 lg:py-24 bg-ocean-950 noise-texture">
      <div className="container">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-sand text-center mb-2 tracking-wide">
          QUEM ALOHA, CHEGA 🤙
        </h2>
        <p className="font-body text-teal-400 text-center mb-10">
          A galera de Manaus que chegou com estilo
        </p>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-coral flex items-center justify-center text-sand hover:brightness-110 transition hidden lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-coral flex items-center justify-center text-sand hover:brightness-110 transition hidden lg:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-4 lg:pb-0">
            {visibleReviews.map((review, i) => (
              <motion.div
                key={`${review.initials}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-80 lg:w-1/3 flex-shrink-0 snap-center bg-ocean-800 rounded-2xl p-6 border border-coral/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-teal flex items-center justify-center font-heading text-sm font-bold text-ocean-950">
                    {review.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-heading text-sm font-semibold text-sand">{review.name}</p>
                    <p className="font-body text-xs text-sand/40">{review.city}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-body text-sm text-sand/70 leading-relaxed mb-4">{review.text}</p>
                <span className="inline-block px-3 py-1.5 rounded-pill bg-ocean-700 border border-ocean-500/20 font-body text-[10px] text-teal-400">
                  📦 {review.product}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-coral w-6" : "bg-ocean-700 hover:bg-ocean-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Rating + CTA */}
        <div className="text-center mt-10 space-y-4">
          <p className="font-body text-sm text-sand/50">
            ⭐ <span className="font-price font-bold text-sand">4.9</span> — 127 avaliações de clientes de Manaus
          </p>
          <a
            href="https://instagram.com/aloha_surf_conceito"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-coral rounded-lg font-display text-base uppercase tracking-wider text-sand hover:brightness-110 transition"
          >
            VER MAIS AVALIAÇÕES NO INSTAGRAM →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
