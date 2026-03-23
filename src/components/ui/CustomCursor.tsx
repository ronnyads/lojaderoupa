import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 2000, damping: 60, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 2000, damping: 60, mass: 0.1 });

  // Ring follows with inertia
  const ringX = useSpring(rawX, { stiffness: 200, damping: 28, mass: 0.5 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 28, mass: 0.5 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only activate on desktop with fine pointer
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || prefersReducedMotion) return;

    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      });

      const target = e.target as HTMLElement;
      const hoverable = target.closest("a, button, [data-cursor], [role='button']");
      setIsHovering(!!hoverable);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "hsl(163 100% 42%)" }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{
            border: "1px solid hsl(163 100% 42% / 0.6)",
            backgroundColor: isHovering ? "hsl(163 100% 42% / 0.08)" : "transparent",
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
