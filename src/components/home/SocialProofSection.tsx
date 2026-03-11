import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Rodrigo M.", city: "Manaus, AM", text: "Salve! Chegou rápido demais, qualidade é de outro nível. Já pedi o segundo conjunto!", rating: 5 },
  { name: "Matheus S.", city: "Manaus, AM", text: "Melhor polo que já comprei. Material top, caimento perfeito. Recomendo demais! 🤙", rating: 5 },
  { name: "Gabriel L.", city: "Manaus, AM", text: "O boné bordado é chave. Qualidade premium, acabamento impecável.", rating: 5 },
  { name: "Caio R.", city: "Manaus, AM", text: "Montei o conjunto completo pelo site e chegou certinho. Estilo jogador garantido!", rating: 5 },
  { name: "Rafael P.", city: "Manaus, AM", text: "Bermuda sarja muito confortável, corte perfeito. Já virei cliente fiel.", rating: 5 },
  { name: "João V.", city: "Manaus, AM", text: "Atendimento no WhatsApp é nota 10. Tiraram todas as dúvidas rapidão.", rating: 5 },
];

const SocialProofSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-sand">
      <div className="container">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean text-center mb-2">
          QUEM ALOHA, CHEGA
        </h2>
        <p className="font-body text-ocean-700 text-center mb-10">
          Depoimentos reais dos nossos clientes
        </p>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="w-80 bg-card rounded-lg p-5 flex-shrink-0"
                style={{ boxShadow: "var(--al-shadow-card)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center font-heading text-sm font-bold text-teal">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-ocean">{review.name}</p>
                    <p className="font-body text-xs text-ocean/50">{review.city}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-sand-400 text-sand-400" />
                  ))}
                </div>
                <p className="font-body text-sm text-ocean/80 leading-relaxed">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://wa.me/5592934503860?text=Salve!%20Quero%20saber%20mais%20sobre%20a%20Aloha%20🤙"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] rounded-lg font-heading text-sm font-bold uppercase text-sand hover:brightness-110 transition"
          >
            💬 Fale com a gente no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
