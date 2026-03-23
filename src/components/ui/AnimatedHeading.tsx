import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "words" | "chars";
  once?: boolean;
}

const AnimatedHeading = ({
  text,
  className = "",
  delay = 0,
  splitBy = "words",
  once = true,
}: AnimatedHeadingProps) => {
  const items = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
          initial={{ opacity: 0, y: "100%", skewY: 3 }}
          whileInView={{ opacity: 1, y: "0%", skewY: 0 }}
          viewport={{ once }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedHeading;
