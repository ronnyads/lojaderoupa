import { motion } from "framer-motion";
import { Heart, Instagram } from "lucide-react";

const photos = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80",
  "https://images.unsplash.com/photo-1629720872527-7b0a1a6a2b27?w=400&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4b0d1a?w=400&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
];

const InstagramSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-void-950">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-text-primary tracking-wide leading-[0.9]">
            A COMUNIDADE ALOHA
          </h2>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-neon-teal to-transparent mt-3 mb-4 max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="font-sans text-text-secondary mt-2 mb-3">
            +35 mil seguidores que chegam com estilo. Siga e mostre o seu look.
          </p>
          <a
            href="https://instagram.com/aloha_surf_conceito"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold text-neon-teal hover:underline"
          >
            <Instagram size={16} /> @aloha_surf_conceito
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {photos.map((photo, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/aloha_surf_conceito"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={photo}
                alt={`Aloha Surf Conceito Instagram #${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-void-950/0 group-hover:bg-void-950/70 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Heart size={28} className="text-text-primary" />
                <span className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">Ver no Instagram</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 space-y-3">
          <a
            href="https://instagram.com/aloha_surf_conceito"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2"
          >
            <Instagram size={18} /> SEGUIR @ALOHA_SURF_CONCEITO →
          </a>
          <p className="font-sans text-sm text-text-tertiary">
            Mostre seu look com <span className="font-mono font-bold text-neon-teal">#AlohaEstiloCerto</span> — pode aparecer aqui 🤙
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
