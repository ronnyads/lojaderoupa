import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function useMagnetic(strength = 0.3, radius = 80) {
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!canHover || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY, strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const magneticProps = canHover
    ? {
        onMouseMove: handleMouseMove as unknown as React.MouseEventHandler,
        onMouseLeave: handleMouseLeave as unknown as React.MouseEventHandler,
      }
    : {};

  return {
    ref,
    x: canHover ? x : rawX,
    y: canHover ? y : rawY,
    magneticProps,
  };
}
