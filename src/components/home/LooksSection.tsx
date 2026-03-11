import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { looks, products } from "@/data/products";

const LooksSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-sand-100">
      <div className="container">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean text-center mb-2">
          LOOKS DA SEMANA
        </h2>
        <p className="font-body text-ocean-700 text-center mb-10">
          Conjuntos prontos para você chegar com estilo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {looks.map((look, i) => {
            const lookProducts = look.products.map(sku => products.find(p => p.sku === sku)!).filter(Boolean);
            return (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] bg-ocean-gradient rounded-lg overflow-hidden cursor-pointer"
              >
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-ocean-800 to-ocean-950" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-display text-3xl text-sand mb-2">{look.name.toUpperCase()}</span>
                  <p className="font-body text-sand/60 text-sm mb-4">{look.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {lookProducts.map(p => (
                      <span key={p.sku} className="px-3 py-1 rounded-pill bg-teal/20 border border-teal/30 text-teal-400 font-body text-xs">
                        {p.name.split(' ').slice(0, 2).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ocean/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    to={`/looks/${look.slug}`}
                    className="px-6 py-3 bg-coral rounded-lg font-heading text-sm font-bold uppercase text-sand hover:bg-coral-400 transition-colors"
                  >
                    COMPRAR ESSE LOOK ▶
                  </Link>
                </div>

                {/* Favorite */}
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center z-10">
                  <Heart size={16} className="text-sand/80" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/montar-look"
            className="inline-block px-8 py-4 bg-ocean rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-sand hover:bg-ocean-800 transition-colors"
          >
            MONTE SEU LOOK →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LooksSection;
