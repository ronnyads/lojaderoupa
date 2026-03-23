import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function useTilt(intensity = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawRotateX.set(-y * intensity);
      rawRotateY.set(x * intensity);
    },
    [rawRotateX, rawRotateY, intensity]
  );

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }, [rawRotateX, rawRotateY]);

  return {
    ref,
    rotateX: canHover ? rotateX : rawRotateX,
    rotateY: canHover ? rotateY : rawRotateY,
    handleMouseMove: canHover ? handleMouseMove : undefined,
    handleMouseLeave: canHover ? handleMouseLeave : undefined,
  };
}
