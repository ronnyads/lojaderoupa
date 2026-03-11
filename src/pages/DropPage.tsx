import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dropProduct, formatPrice, getLowStockProducts } from "@/data/products";
import { useState, useEffect } from "react";

const DropPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const lowStock = getLowStockProducts();
  const stockPercent = (dropProduct.remainingUnits / dropProduct.totalUnits) * 100;

  return (
    <>
      <Helmet>
        <title>DROP Exclusivo | Aloha Surf Conceito — Manaus</title>
        <meta name="description" content="Drops exclusivos com peças limitadas. Garanta antes que acabe!" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero drop */}
        <section className="bg-ocean-dark noise-texture py-20 lg:py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-teal-900/20 pointer-events-none" />
          <div className="container relative z-10">
            <span className="inline-block px-6 py-2 bg-coral rounded-pill font-display text-lg text-sand tracking-wider animate-pulse-coral mb-8">
              DROP EM ANDAMENTO
            </span>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3 lg:gap-4 mb-12">
              {[
                { value: timeLeft.days, label: "DIAS" },
                { value: timeLeft.hours, label: "HRS" },
                { value: timeLeft.minutes, label: "MIN" },
                { value: timeLeft.seconds, label: "SEG" },
              ].map((block) => (
                <div key={block.label} className="flex flex-col items-center">
                  <div className="bg-ocean-800 rounded-lg w-16 h-20 lg:w-24 lg:h-28 flex items-center justify-center">
                    <span className="font-display text-3xl lg:text-6xl text-sand">
                      {String(block.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-body text-[10px] text-teal-400 mt-1.5 tracking-wider">{block.label}</span>
                </div>
              ))}
            </div>

            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] text-sand mb-4">{dropProduct.name}</h1>

            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="font-price text-3xl lg:text-4xl text-coral font-bold">{formatPrice(dropProduct.price)}</span>
              <span className="font-body text-sand/40 line-through text-xl">{formatPrice(dropProduct.originalPrice)}</span>
            </div>

            {/* Stock bar */}
            <div className="max-w-xs mx-auto mb-8">
              <div className="h-3 bg-ocean-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercent}%` }}
                  transition={{ duration: 1.5 }}
                  className={`h-full rounded-full ${stockPercent > 50 ? 'bg-teal' : 'bg-coral'}`}
                />
              </div>
              <p className="font-body text-sm text-sand/60 mt-2">
                {dropProduct.remainingUnits}/{dropProduct.totalUnits} unidades disponíveis
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-10 py-4 bg-teal rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-ocean hover:brightness-110 transition animate-pulse-glow">
                GARANTIR AGORA
              </button>
              <a
                href="https://wa.me/5592934503860?text=Salve!%20Quero%20garantir%20o%20DROP%20🔥"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border border-sand/30 rounded-lg font-heading text-sm font-semibold uppercase tracking-wider text-sand/80 hover:border-sand hover:text-sand transition-colors"
              >
                💬 CHAMAR NO WHATSAPP
              </a>
            </div>
          </div>
        </section>

        {/* Low stock */}
        <section className="bg-sand py-16">
          <div className="container">
            <h2 className="font-display text-3xl text-ocean text-center mb-8">ÚLTIMAS PEÇAS</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {lowStock.length > 0 ? lowStock.map((p) => (
                <Link key={p.sku} to={`/produto/${p.slug}`} className="bg-card rounded-lg overflow-hidden card-hover" style={{ boxShadow: "var(--al-shadow-card)" }}>
                  <div className="aspect-[3/4] bg-sand-100 relative">
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-coral text-sand rounded-pill text-[10px] font-heading font-bold">
                      ⚡ {typeof p.stock === 'number' ? p.stock : '?'} PEÇAS
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="font-heading text-sm font-semibold text-ocean">{p.name}</p>
                    <p className="font-price text-coral font-semibold">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              )) : (
                <p className="col-span-full text-center font-body text-ocean/50">Nenhum produto com estoque baixo no momento</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DropPage;
