import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const RippleButton = ({ children, className = "", onClick, ...props }: RippleButtonProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const ripples = useRef<{ id: number; x: number; y: number }[]>([]);
  const counter = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = counter.current++;
      ripples.current = [...ripples.current, { id, x, y }];
      setTimeout(() => {
        ripples.current = ripples.current.filter((r) => r.id !== id);
      }, 650);
    }
    onClick?.(e);
  };

  return (
    <button
      ref={containerRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.current.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 0, height: 0, opacity: 0.35 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

export default RippleButton;
