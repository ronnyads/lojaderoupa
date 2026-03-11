import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroLook from "@/assets/hero-look.jpg";
import poloImg from "@/assets/products/polo-navy.jpg";
import bermudaImg from "@/assets/products/bermuda-navy.jpg";
import boneImg from "@/assets/products/bone-navy.jpg";

const lookItems = [
  { name: "Polo Piquet Navy Premium", price: "R$ 189,90", img: poloImg },
  { name: "Bermuda Sarja Premium Navy", price: "R$ 149,90", img: bermudaImg },
  { name: "Boné Strapback Aloha Logo", price: "R$ 79,90", img: boneImg },
];

const HeroSection = () => {
  return (
    <section className="min-h-screen lg:min-h-[100vh] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left panel - Dark with Look */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 25 }}
        className="relative lg:w-[55%] min-h-[60vh] lg:min-h-full bg-ocean-gradient noise-texture flex items-center justify-center p-8"
      >
        {/* Badge */}
        <div className="absolute top-6 left-6 z-10">
          <span className="px-4 py-1.5 rounded-pill border border-teal bg-teal/10 font-heading text-xs text-teal-400 uppercase font-bold tracking-wider">
            LOOK DO DIA
          </span>
        </div>

        {/* Look image */}
        <img
          src={heroLook}
          alt="Look do dia Aloha Surf Conceito - Polo Navy com Bermuda e Boné"
          className="w-full max-w-lg object-contain relative z-[1] rounded-lg"
          loading="eager"
        />

        {/* Micro-copy */}
        <p className="absolute bottom-6 left-6 text-sand/40 font-body text-sm italic z-10">
          Salve o look →
        </p>
      </motion.div>

      {/* Right panel - Sand CTA */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 25, delay: 0.2 }}
        className="lg:w-[45%] bg-sand flex flex-col justify-center p-8 lg:p-14"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-xs uppercase tracking-widest text-teal font-bold mb-4"
        >
          NOVA COLEÇÃO • 2025
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] text-ocean mb-4"
        >
          CHEGA COM ESTILO.
          <br />
          SAI COM O CONJUNTO.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-ocean-700 text-base lg:text-lg mb-8 max-w-md"
        >
          Polos, bermudas, bonés e óculos selecionados para você montar o look perfeito — e entregar na sua porta em Manaus.
        </motion.p>

        {/* Look items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 mb-8"
        >
          {lookItems.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <img src={item.img} alt={item.name} className="w-12 h-14 object-cover rounded-md bg-sand-100" />
              <div className="flex-1">
                <p className="font-body text-sm text-ocean font-medium">{item.name}</p>
                <p className="font-price text-sm text-coral font-semibold">{item.price}</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-coral flex items-center justify-center text-sand text-lg hover:bg-coral-400 transition-colors">
                +
              </button>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/montar-look"
            className="px-8 py-4 bg-coral rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-sand hover:bg-coral-400 transition-colors text-center"
          >
            MONTAR MEU LOOK
          </Link>
          <a
            href="https://wa.me/5592934503860?text=Salve!%20Vi%20o%20look%20do%20dia%20na%20loja%20🤙"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-ocean rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-ocean hover:bg-ocean hover:text-sand transition-colors text-center flex items-center justify-center gap-2"
          >
            💬 VER NO WHATSAPP
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
