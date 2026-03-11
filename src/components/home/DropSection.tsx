import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dropProduct, formatPrice } from "@/data/products";
import { Link } from "react-router-dom";

const revealVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

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
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-teal-900/20 pointer-events-none" />

      <div className="container relative z-10">
        {/* Badge */}
        <motion.div
          variants={revealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0}
          className="text-center mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block px-6 py-2 bg-coral rounded-pill font-display text-lg text-sand tracking-wider"
          >
            DROP EXCLUSIVO
          </motion.span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          variants={revealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={1}
          className="flex items-center justify-center gap-3 lg:gap-4 mb-12"
        >
          {[
            { value: timeLeft.days, label: "DIAS" },
            { value: timeLeft.hours, label: "HRS" },
            { value: timeLeft.minutes, label: "MIN" },
            { value: timeLeft.seconds, label: "SEG" },
          ].map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <motion.div
                className="bg-ocean-800 rounded-lg w-16 h-20 lg:w-20 lg:h-24 flex items-center justify-center"
                whileHover={{ scale: 1.08, borderColor: "hsl(var(--teal-500))" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-display text-3xl lg:text-5xl text-sand">
                  {String(block.value).padStart(2, "0")}
                </span>
              </motion.div>
              <span className="font-body text-[10px] text-teal-400 mt-1.5 tracking-wider">{block.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Product */}
        <motion.div
          variants={revealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={2}
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
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full rounded-full ${stockPercent > 50 ? 'bg-teal' : 'bg-coral'}`}
              />
            </div>
            <p className="font-body text-xs text-sand/40 mt-1.5">
              {dropProduct.remainingUnits}/{dropProduct.totalUnits} disponíveis
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/drop"
                className="block px-8 py-4 bg-teal rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-ocean hover:brightness-110 transition animate-pulse-glow text-center"
              >
                GARANTIR AGORA
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <button className="px-8 py-4 border-2 border-sand/60 rounded-lg font-heading text-sm font-semibold uppercase tracking-wider text-sand hover:bg-sand/10 hover:border-sand transition-colors">
                AVISAR QUANDO SAIR
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DropSection;
