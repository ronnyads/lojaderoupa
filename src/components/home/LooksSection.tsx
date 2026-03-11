import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { looks, products, formatPrice } from "@/data/products";

const LooksSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-sand-100">
      <div className="container">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean text-center mb-2 tracking-wide">
          LOOKS DA SEMANA
        </h2>
        <p className="font-body text-ocean-700 text-center mb-10">
          Conjuntos prontos para você chegar com estilo
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {looks.map((look, i) => {
            const lookProducts = look.products
              .map(sku => products.find(p => p.sku === sku)!)
              .filter(Boolean);

            return (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative aspect-[3/4] rounded-[14px] overflow-hidden cursor-pointer ${
                  i === 0 ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                {/* Photo fullbleed */}
                <img
                  src={look.image}
                  alt={`Look ${look.name} — Aloha Surf Conceito`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,13,24,0.95)] via-[rgba(5,13,24,0.3)] to-transparent" />

                {/* Badge */}
                {look.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-coral rounded-pill font-heading text-[10px] font-bold uppercase tracking-wider text-sand z-10">
                    {look.badge}
                  </span>
                )}

                {/* Favorite */}
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center z-10 hover:scale-110 transition-transform">
                  <Heart size={16} className="text-sand/80" />
                </button>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                  <span className="font-display text-2xl lg:text-3xl text-sand tracking-wide">
                    {look.name.toUpperCase()}
                  </span>
                  <p className="font-body text-sand/60 text-xs mt-1 mb-3">
                    {look.description}
                  </p>

                  {/* Product pills - visible on hover */}
                  <div className="flex flex-wrap gap-1.5 mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {lookProducts.map(p => (
                      <span
                        key={p.sku}
                        className="px-2.5 py-1 rounded-pill bg-teal/20 border border-teal/30 text-teal-400 font-body text-[10px]"
                      >
                        {p.name.split(' ').slice(0, 2).join(' ')}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="font-price text-lg font-bold text-coral">
                      {formatPrice(look.totalPrice)}
                    </span>
                    {look.installment && (
                      <span className="font-body text-[10px] text-sand/50">
                        {look.installment}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 bg-ocean/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/looks/${look.slug}`}
                    className="px-6 py-3 bg-coral rounded-lg font-heading text-sm font-bold uppercase text-sand hover:bg-coral-400 transition-colors"
                  >
                    COMPRAR ESSE LOOK ▶
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/montar-look"
            className="inline-block px-8 py-4 bg-ocean-dark rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-sand hover:brightness-110 transition"
          >
            MONTE SEU LOOK →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LooksSection;
