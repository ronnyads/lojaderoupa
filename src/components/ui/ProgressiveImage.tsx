import { useState, ImgHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ProgressiveImage = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  ...props
}: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-void-900 animate-shimmer rounded-inherit" />
      )}

      <motion.img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        {...(props as object)}
      />
    </div>
  );
};

export default ProgressiveImage;
