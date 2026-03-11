import { motion } from "framer-motion";

const items = [
  { icon: "🏄", text: "+35 MIL SEGUIDORES" },
  { icon: "📦", text: "ENTREGA EM TODO MANAUS" },
  { icon: "💳", text: "PIX E CARTÃO" },
  { icon: "🔁", text: "TROCA FÁCIL" },
  { icon: "💬", text: "ATENDIMENTO NO WHATSAPP" },
];

const TrustBar = () => {
  return (
    <div className="bg-ocean-900 py-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-start lg:justify-center gap-8 px-6 min-w-max"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <motion.span
              className="text-lg"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              {item.icon}
            </motion.span>
            <span className="font-body text-xs tracking-wider text-sand/80 uppercase">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustBar;
