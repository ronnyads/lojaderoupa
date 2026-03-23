import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroLook from "@/assets/hero-look.jpg";
import poloImg from "@/assets/products/polo-navy.jpg";
import bermudaImg from "@/assets/products/bermuda-navy.jpg";
import boneImg from "@/assets/products/bone-navy.jpg";
import HeroCanvas from "./HeroCanvas";
import { useMagnetic } from "@/hooks/useMagnetic";

const lookItems = [
  { name: "Polo Piquet Navy Premium", price: "R$ 189,90", img: poloImg },
  { name: "Bermuda Sarja Premium Navy", price: "R$ 149,90", img: bermudaImg },
  { name: "Boné Strapback Aloha Logo", price: "R$ 79,90", img: boneImg },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const magPrimary = useMagnetic(0.3, 80);
  const magSecondary = useMagnetic(0.3, 80);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.5]);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-void-950">
      {/* WebGL Canvas */}
      <HeroCanvas />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-neon-teal/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      {/* Left panel - Dark with Look + Parallax */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 25 }}
        className="relative lg:w-[55%] min-h-[60vh] lg:min-h-full flex items-center justify-center p-8 overflow-hidden"
      >
        {/* Badge */}
        <motion.div
          className="absolute top-6 left-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <span className="badge badge-teal flex items-center gap-2">
            <Sparkles size={12} />
            LOOK DO DIA
          </span>
        </motion.div>

        {/* Look image with parallax */}
        <motion.div
          className="relative z-[1]"
          style={{ y: imageY, scale: imageScale }}
        >
          <motion.img
            src={heroLook}
            alt="Look do dia Aloha Surf Concept"
            className="w-full max-w-lg object-contain rounded-2xl shadow-elevation-4"
            loading="eager"
          />
          {/* Glow behind image */}
          <div className="absolute inset-0 -z-10 bg-neon-teal/20 blur-[60px] rounded-full scale-75" />
        </motion.div>

        {/* Parallax dark overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-void-950 pointer-events-none z-[2]"
          style={{ opacity: overlayOpacity }}
        />

        {/* Terminal-style footer text */}
        <motion.p
          className="absolute bottom-6 left-6 text-text-tertiary font-mono text-xs z-10 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-neon-teal">&gt;</span>
          Salve o look para mais tarde
        </motion.p>
      </motion.div>

      {/* Right panel - Dark CTA */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 25, delay: 0.2 }}
        className="lg:w-[45%] flex flex-col justify-center p-8 lg:p-14 relative"
      >
        {/* Border line */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-border-default to-transparent hidden lg:block" />

        <motion.div style={{ y: textY }}>
          {/* Terminal indicator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
            <span className="font-mono text-xs text-neon-teal tracking-wider">
              NOVA COLEÇÃO // 2025
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
            }}
            className="font-sans text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.95] text-text-primary mb-4"
            style={{ perspective: "600px" }}
          >
            {[
              { text: "CHEGA COM", className: "text-gradient" },
              { text: "ESTILO.", className: "" },
              { text: "SAI COM O", className: "text-text-secondary" },
              { text: "CONJUNTO.", className: "text-neon-teal" },
            ].map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: "80%", rotateX: -40, skewY: 3 },
                  visible: {
                    opacity: 1, y: "0%", rotateX: 0, skewY: 0,
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className={`block overflow-hidden ${line.className}`}
                style={{ transformOrigin: "bottom left", display: "block" }}
              >
                {line.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-sans text-text-secondary text-base lg:text-lg mb-8 max-w-md leading-relaxed"
          >
            Polos, bermudas, bonés e óculos selecionados para você montar o look perfeito — entregamos em Manaus.
          </motion.p>

          {/* Look items - Frost Style */}
          <div className="space-y-3 mb-8">
            {lookItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-void-900/50 border border-border-subtle hover:border-neon-teal/30 transition-all group cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg bg-void-800"
                />
                <div className="flex-1">
                  <p className="font-sans text-sm text-text-primary font-medium">{item.name}</p>
                  <p className="font-mono text-sm text-neon-teal">{item.price}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg bg-void-800 border border-border-default flex items-center justify-center text-text-secondary group-hover:text-neon-teal group-hover:border-neon-teal/50 transition-all"
                >
                  +
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* CTAs - Frost Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.div
              ref={magPrimary.ref as React.RefObject<HTMLDivElement>}
              style={{ x: magPrimary.x, y: magPrimary.y }}
              {...magPrimary.magneticProps}
            >
              <Link
                to="/montar-look"
                className="btn-premium flex items-center justify-center gap-2"
              >
                MONTAR MEU LOOK
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
            </motion.div>

            <motion.div
              ref={magSecondary.ref as React.RefObject<HTMLDivElement>}
              style={{ x: magSecondary.x, y: magSecondary.y }}
              {...magSecondary.magneticProps}
            >
              <a
                href="https://wa.me/5592934503860?text=Salve!%20Vi%20o%20look%20do%20dia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center justify-center gap-2"
              >
                <span className="text-neon-green">💬</span>
                VER NO WHATSAPP
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
