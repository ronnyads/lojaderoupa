import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dropProduct, formatPrice, getLowStockProducts } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useState, useEffect } from "react";
import { Clock, Flame, Users, Zap } from "lucide-react";

const sizes = ["P", "M", "G", "GG"];

const pastDrops = [
  { name: "DROP #06 — Polo Verde Militar", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80" },
  { name: "DROP #05 — Bermuda Surf Ltd.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "DROP #04 — Boné Bordado Gold", image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&q=80" },
];

const DropPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const calc = () => {
      const diff = dropProduct.dropDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stockPercent = (dropProduct.remainingUnits / dropProduct.totalUnits) * 100;
  const lowStock = getLowStockProducts();

  return (
    <>
      <Helmet>
        <title>DROP Exclusivo #07 | Aloha Surf Conceito — Manaus</title>
        <meta name="description" content="Drop exclusivo Polo Navy #07. Apenas 15 unidades. Garanta antes que esgote!" />
      </Helmet>

      <div className="min-h-screen">
        {/* HERO SPLIT 50/50 */}
        <section className="flex flex-col lg:flex-row min-h-screen">
          {/* Left — Photo */}
          <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-screen">
            <img
              src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=90"
              alt="Polo Navy Drop #07 — Aloha Surf Conceito"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            {/* Badge top */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 right-6 z-10 px-5 py-2 bg-coral rounded-pill font-display text-lg text-sand tracking-wider animate-pulse-coral"
            >
              🔥 DROP EXCLUSIVO #07
            </motion.span>

            {/* Stock bar on photo */}
            <div className="absolute bottom-0 inset-x-0 z-10 p-6 bg-gradient-to-t from-ocean-950/90 to-transparent">
              <div className="flex items-center gap-3">
                <span className="font-display text-sand text-sm tracking-wider">
                  {dropProduct.remainingUnits}/{dropProduct.totalUnits} UNIDADES
                </span>
                <span className="font-body text-coral text-xs animate-pulse-coral">— ESGOTA HOJE</span>
              </div>
              <div className="h-2 bg-ocean-800 rounded-full overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercent}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full rounded-full bg-coral animate-pulse-coral"
                />
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div className="lg:w-1/2 bg-ocean-950 noise-texture flex flex-col justify-center p-8 lg:p-14 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-transparent to-coral/5 pointer-events-none" />
            <div className="relative z-10">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-xs uppercase tracking-[0.2em] text-teal font-bold mb-6 block"
              >
                NOVA COLEÇÃO 2025
              </motion.span>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3 lg:gap-4 mb-10"
              >
                {[
                  { value: timeLeft.days, label: "DIAS" },
                  { value: timeLeft.hours, label: "HRS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEG" },
                ].map((block) => (
                  <div key={block.label} className="flex flex-col items-center">
                    <div className="bg-ocean-800 rounded-lg w-[72px] h-[88px] lg:w-[100px] lg:h-[100px] flex items-center justify-center border border-ocean-700">
                      <span className="font-display text-5xl lg:text-7xl text-sand leading-none">
                        {String(block.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-body text-[10px] text-teal-400 mt-2 tracking-[0.15em]">{block.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Product name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-[clamp(2.5rem,5vw,3.5rem)] text-sand leading-[0.9] mb-4"
              >
                {dropProduct.name}
              </motion.h1>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="font-price text-3xl lg:text-4xl text-coral font-bold">{formatPrice(dropProduct.price)}</span>
                <span className="font-body text-sand/40 line-through text-lg">{formatPrice(dropProduct.originalPrice)}</span>
                <span className="px-2.5 py-1 rounded-pill bg-coral/20 text-coral font-price text-xs font-semibold">
                  -{Math.round(((dropProduct.originalPrice - dropProduct.price) / dropProduct.originalPrice) * 100)}%
                </span>
              </motion.div>

              {/* Scarcity bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mb-6"
              >
                <div className="h-3 bg-ocean-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stockPercent}%` }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className={`h-full rounded-full ${stockPercent > 50 ? "bg-teal" : "bg-coral"} animate-pulse-coral`}
                  />
                </div>
                <p className="font-body text-sm text-sand/50 mt-2">
                  {dropProduct.remainingUnits}/{dropProduct.totalUnits} unidades disponíveis
                </p>
              </motion.div>

              {/* Description */}
              <p className="font-body text-sand/60 text-sm mb-6 max-w-md leading-relaxed">
                Peça limitada. Uma vez esgotada, não volta ao estoque. Tecido piquet premium com corte slim adaptado ao calor de Manaus.
              </p>

              {/* Size selector */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <p className="font-body text-xs text-sand/50 uppercase tracking-wider mb-3">Tamanho</p>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-10 rounded-lg font-heading text-sm font-bold transition-all ${
                        selectedSize === s
                          ? "bg-teal text-ocean-950"
                          : "bg-ocean-800 text-sand/70 border border-ocean-700 hover:border-teal/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-3"
              >
                <button className="w-full h-14 bg-teal rounded-lg font-display text-lg uppercase tracking-wider text-ocean-950 hover:brightness-110 transition animate-pulse-glow">
                  GARANTIR AGORA
                </button>
                <a
                  href="https://wa.me/5592934503860?text=Salve!%20Quero%20garantir%20o%20DROP%20%2307%20🔥"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 border-2 border-sand/30 rounded-lg font-display text-base uppercase tracking-wider text-sand hover:border-sand hover:bg-sand/5 transition-colors flex items-center justify-center gap-2"
                >
                  💬 CHAMAR NO WHATSAPP
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY DROPS SELL OUT */}
        <section className="bg-ocean-950 noise-texture py-16 lg:py-24 border-t border-ocean-800">
          <div className="container">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-sand text-center mb-12 tracking-wide">
              POR QUE OS DROPS ESGOTAM TÃO RÁPIDO?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: Flame, title: "Produção Limitada", desc: "Máximo 15 unidades por Drop. Quando acaba, não volta." },
                { icon: Users, title: "Clientes VIP", desc: "Clientes VIP têm acesso 1h antes do lançamento público." },
                { icon: Zap, title: "Próximo Drop Em Breve", desc: "Fique ligado no WhatsApp para não perder o próximo." },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-ocean-800 rounded-2xl p-6 border border-ocean-700 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-coral" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-sand mb-2">{title}</h3>
                  <p className="font-body text-sm text-sand/50 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Past drops */}
            <h3 className="font-display text-2xl text-sand text-center mb-8">DROPS ANTERIORES QUE ESGOTARAM</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastDrops.map((drop) => (
                <div key={drop.name} className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={drop.image} alt={drop.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-ocean-950/70" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-4xl text-coral mb-2">ESGOTADO</span>
                    <span className="font-body text-sm text-sand/60">{drop.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Low stock products */}
        {lowStock.length > 0 && (
          <section className="bg-sand py-16">
            <div className="container">
              <h2 className="font-display text-3xl text-ocean text-center mb-8">ÚLTIMAS PEÇAS</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {lowStock.map((p) => (
                  <Link key={p.sku} to={`/produto/${p.slug}`} className="bg-card rounded-2xl overflow-hidden card-hover" style={{ boxShadow: "var(--al-shadow-card)" }}>
                    <div className="aspect-[3/4] bg-sand-100 relative overflow-hidden">
                      {getProductImage(p.sku) && (
                        <img src={getProductImage(p.sku)} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-coral text-sand rounded-pill text-[10px] font-heading font-bold">
                        ⚡ {typeof p.stock === "number" ? p.stock : "?"} PEÇAS
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="font-heading text-sm font-semibold text-ocean">{p.name}</p>
                      <p className="font-price text-coral font-semibold">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default DropPage;
