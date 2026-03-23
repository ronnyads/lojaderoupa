import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const CountUpItem = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const { count, ref } = useCountUp(target, 1800);
  return <span ref={ref}>{count.toLocaleString("pt-BR")}{suffix}</span>;
};

const items = [
  { icon: "🏄", text: <><CountUpItem target={35} />K+ SEGUIDORES</> },
  { icon: "📦", text: "ENTREGA EM TODO MANAUS" },
  { icon: "💳", text: "PIX E CARTÃO" },
  { icon: "🔁", text: "TROCA FÁCIL" },
  { icon: "💬", text: "ATENDIMENTO NO WHATSAPP" },
];

const TrustBar = () => {
  return (
    <div className="bg-void-900 py-4 overflow-x-auto border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-start lg:justify-center gap-8 px-6 min-w-max"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
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
            <span className="font-mono text-xs tracking-wider text-text-secondary uppercase">
              {item.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustBar;
