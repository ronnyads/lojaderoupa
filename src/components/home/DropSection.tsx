import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dropProduct, formatPrice } from "@/data/products";
import { Link } from "react-router-dom";

const DropSection = () => {
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

  const stockPercent = (dropProduct.remainingUnits / dropProduct.totalUnits) * 100;

  return (
    <section className="bg-ocean-dark noise-texture py-16 lg:py-24 relative overflow-hidden">
      {/* Subtle teal glow edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-teal-900/20 pointer-events-none" />

      <div className="container relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-6 py-2 bg-coral rounded-pill font-display text-lg text-sand tracking-wider animate-pulse-glow">
            DROP EXCLUSIVO
          </span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 lg:gap-4 mb-12"
        >
          {[
            { value: timeLeft.days, label: "DIAS" },
            { value: timeLeft.hours, label: "HRS" },
            { value: timeLeft.minutes, label: "MIN" },
            { value: timeLeft.seconds, label: "SEG" },
          ].map((block, i) => (
            <div key={block.label} className="flex flex-col items-center">
              <div className="bg-ocean-800 rounded-lg w-16 h-20 lg:w-20 lg:h-24 flex items-center justify-center">
                <span className="font-display text-3xl lg:text-5xl text-sand">
                  {String(block.value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-body text-[10px] text-teal-400 mt-1.5 tracking-wider">{block.label}</span>
              {i < 3 && <span className="hidden" />}
            </div>
          ))}
        </motion.div>

        {/* Product */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-sand mb-2">
            {dropProduct.name}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-price text-2xl lg:text-3xl text-coral font-bold">
              {formatPrice(dropProduct.price)}
            </span>
            {dropProduct.originalPrice && (
              <span className="font-body text-sand/40 line-through text-lg">
                {formatPrice(dropProduct.originalPrice)}
              </span>
            )}
          </div>

          <p className="font-body text-sand/60 text-sm mb-6">
            Apenas {dropProduct.remainingUnits} unidades disponíveis
          </p>

          {/* Stock bar */}
          <div className="max-w-xs mx-auto mb-8">
            <div className="h-2 bg-ocean-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stockPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-full rounded-full ${stockPercent > 50 ? 'bg-teal' : 'bg-coral'}`}
              />
            </div>
            <p className="font-body text-xs text-sand/40 mt-1.5">
              {dropProduct.remainingUnits}/{dropProduct.totalUnits} disponíveis
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/drop"
              className="px-8 py-4 bg-teal rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-ocean hover:brightness-110 transition animate-pulse-glow text-center"
            >
              GARANTIR AGORA
            </Link>
            <button className="px-8 py-4 border border-sand/30 rounded-lg font-heading text-sm font-semibold uppercase tracking-wider text-sand/80 hover:border-sand hover:text-sand transition-colors">
              AVISAR QUANDO SAIR
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DropSection;
