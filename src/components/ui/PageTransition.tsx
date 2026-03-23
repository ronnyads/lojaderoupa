import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
