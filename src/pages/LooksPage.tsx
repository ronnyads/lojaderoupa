import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { looks, products, formatPrice } from "@/data/products";

const LooksPage = () => {
  return (
    <>
      <Helmet>
        <title>Looks e Conjuntos Masculinos | Aloha Surf Conceito Manaus</title>
        <meta name="description" content="Conjuntos prontos de moda masculina estilo jogador. Polo, bermuda, boné e óculos coordenados." />
      </Helmet>
      <div className="bg-sand min-h-screen pb-20">
        <div className="bg-ocean-dark noise-texture py-16 text-center">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4rem)] text-sand">LOOKS & INSPIRAÇÕES</h1>
          <p className="font-body text-sand/60 mt-2">Conjuntos prontos para quem sabe chegar</p>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {looks.map((look, i) => {
              const lookProducts = look.products.map(sku => products.find(p => p.sku === sku)!).filter(Boolean);
              const total = lookProducts.reduce((s, p) => s + (p.promotionalPrice || p.price), 0);

              return (
                <motion.div
                  key={look.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden"
                  style={{ boxShadow: "var(--al-shadow-card)" }}
                >
                  <div className="aspect-[4/3] bg-ocean-gradient flex items-center justify-center">
                    <span className="font-display text-3xl text-sand/20">LOOK</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-ocean mb-2">{look.name}</h3>
                    <p className="font-body text-sm text-ocean/60 mb-3">{look.description}</p>
                    <div className="space-y-2 mb-4">
                      {lookProducts.map(p => (
                        <div key={p.sku} className="flex justify-between text-sm">
                          <span className="font-body text-ocean/70">{p.name}</span>
                          <span className="font-price text-ocean font-semibold">{formatPrice(p.promotionalPrice || p.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center border-t border-sand-200 pt-3 mb-4">
                      <span className="font-body text-ocean">Total do look</span>
                      <span className="font-price text-xl text-coral font-bold">{formatPrice(total)}</span>
                    </div>
                    <Link
                      to="/montar-look"
                      className="block w-full py-3 bg-coral rounded-lg font-heading text-sm font-bold uppercase text-sand text-center hover:bg-coral-400 transition-colors"
                    >
                      COMPRAR ESSE LOOK
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LooksPage;
