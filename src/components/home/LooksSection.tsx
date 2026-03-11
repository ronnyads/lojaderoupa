import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { looks, products, formatPrice } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const LooksSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-sand-100">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
          <div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean tracking-wide leading-[0.9]">
              LOOKS DA SEMANA
            </h2>
            <p className="font-body text-ocean-700 mt-2">
              Conjuntos completos prontos para você chegar com estilo
            </p>
          </div>
          <Link
            to="/looks"
            className="mt-4 lg:mt-0 font-heading text-sm font-bold uppercase tracking-wider text-coral hover:underline"
          >
            VER TODOS OS LOOKS →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {looks.slice(0, 6).map((look, i) => {
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
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Photo */}
                <img
                  src={look.image}
                  alt={`Look ${look.name} — Aloha Surf Conceito`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Default gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/20 to-transparent" />

                {/* Hover overlay — dark */}
                <div className="absolute inset-0 bg-ocean-950/0 group-hover:bg-ocean-950/75 transition-all duration-500" />

                {/* Badge price — top left */}
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-coral rounded-pill font-price text-sm font-bold text-sand">
                  {formatPrice(look.totalPrice)}
                </span>

                {/* Badge name — top right */}
                <span className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-ocean-800/80 backdrop-blur-sm rounded-pill font-heading text-[10px] font-bold text-sand uppercase tracking-wider">
                  {look.name}
                </span>

                {/* Default content */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                  <span className="font-display text-2xl lg:text-3xl text-sand tracking-wide">
                    {look.name.toUpperCase()}
                  </span>
                  <p className="font-body text-sand/60 text-xs mt-1">
                    {look.description}
                  </p>
                </div>

                {/* Hover content — piece list */}
                <div className="absolute inset-0 flex flex-col justify-center p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="space-y-3 mb-4">
                    {lookProducts.map((p, j) => (
                      <motion.div
                        key={p.sku}
                        className="flex items-center gap-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                        style={{ transitionDelay: `${j * 80 + 100}ms` }}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-ocean-800 flex-shrink-0">
                          {getProductImage(p.sku) ? (
                            <img src={getProductImage(p.sku)} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-ocean-700" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-xs text-sand/80 truncate">{p.name}</p>
                          <p className="font-price text-xs text-coral font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Separator + total */}
                  <div className="border-t border-sand/20 pt-3 mb-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: `${lookProducts.length * 80 + 150}ms` }}>
                    <div className="flex justify-between">
                      <span className="font-body text-xs text-sand/60">Total do Look</span>
                      <span className="font-price text-lg text-coral font-bold">{formatPrice(look.totalPrice)}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: `${lookProducts.length * 80 + 250}ms` }}>
                    <Link
                      to="/montar-look"
                      className="flex-1 py-2.5 bg-coral rounded-lg font-display text-sm uppercase tracking-wider text-sand text-center hover:brightness-110 transition"
                    >
                      MONTAR LOOK
                    </Link>
                    <Link
                      to={`/looks/${look.slug}`}
                      className="flex-1 py-2.5 border border-sand/40 rounded-lg font-display text-sm uppercase tracking-wider text-sand text-center hover:bg-sand/10 transition"
                    >
                      VER PEÇAS
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/montar-look"
            className="inline-block px-8 py-4 bg-ocean rounded-lg font-display text-base uppercase tracking-wider text-sand hover:brightness-110 transition"
          >
            MONTE SEU LOOK →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LooksSection;
