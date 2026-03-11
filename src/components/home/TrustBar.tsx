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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-ocean-900 py-4 overflow-x-auto"
    >
      <div className="flex items-center justify-start lg:justify-center gap-8 px-6 min-w-max">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-lg">{item.icon}</span>
            <span className="font-body text-xs tracking-wider text-sand/80 uppercase">{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustBar;
