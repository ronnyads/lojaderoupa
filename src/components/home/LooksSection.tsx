import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { looks, products, formatPrice } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const LooksSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-void-950">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
          <div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-text-primary tracking-wide leading-[0.9]">
              LOOKS DA SEMANA
            </h2>
            <motion.div
              className="h-px bg-gradient-to-r from-neon-teal via-neon-purple to-transparent mt-3"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="font-sans text-text-secondary mt-2">
              Conjuntos completos prontos para você chegar com estilo
            </p>
          </div>
          <Link
            to="/looks"
            className="mt-4 lg:mt-0 font-mono text-sm font-bold uppercase tracking-wider text-neon-teal hover:underline"
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
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/90 via-void-950/20 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-void-950/0 group-hover:bg-void-950/75 transition-all duration-500" />

                {/* Badge price — top left */}
                <span className="absolute top-4 left-4 z-10 badge badge-orange">
                  {formatPrice(look.totalPrice)}
                </span>

                {/* Badge name — top right */}
                <span className="absolute top-4 right-4 z-10 bg-void-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 font-mono text-[10px] font-bold text-text-primary uppercase tracking-wider">
                  {look.name}
                </span>

                {/* Default content */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                  <span className="font-display text-2xl lg:text-3xl text-text-primary tracking-wide">
                    {look.name.toUpperCase()}
                  </span>
                  <p className="font-sans text-text-tertiary text-xs mt-1">
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
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-void-800 flex-shrink-0">
                          {getProductImage(p.sku) ? (
                            <img src={getProductImage(p.sku)} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-void-700" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-xs text-text-secondary truncate">{p.name}</p>
                          <p className="font-mono text-xs text-neon-orange font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Separator + total */}
                  <div
                    className="border-t border-white/20 pt-3 mb-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    style={{ transitionDelay: `${lookProducts.length * 80 + 150}ms` }}
                  >
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-text-tertiary">Total do Look</span>
                      <span className="font-mono text-lg text-neon-orange font-bold">{formatPrice(look.totalPrice)}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div
                    className="flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    style={{ transitionDelay: `${lookProducts.length * 80 + 250}ms` }}
                  >
                    <Link
                      to="/montar-look"
                      className="flex-1 py-2.5 btn-premium text-center text-sm"
                    >
                      MONTAR LOOK
                    </Link>
                    <Link
                      to={`/looks/${look.slug}`}
                      className="flex-1 py-2.5 btn-ghost text-center text-sm"
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
          <Link to="/montar-look" className="btn-premium">
            MONTE SEU LOOK →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LooksSection;
