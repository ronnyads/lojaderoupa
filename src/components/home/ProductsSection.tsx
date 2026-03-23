import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressiveImage from "@/components/ui/ProgressiveImage";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatPrice, colorMap, getStockNumber, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";
import { useTilt } from "@/hooks/useTilt";
import { getCategoryColor } from "@/lib/categoryColors";

const tabs = [
  { label: "MAIS VENDIDOS", filter: (p: Product) => p.badge === "MAIS PEDIDO" },
  { label: "NOVIDADES", filter: (p: Product) => p.badge === "NOVO" || p.badge === "NOVO DROP" },
  { label: "POLOS", filter: (p: Product) => p.category === "polos" },
  { label: "PROMOÇÕES", filter: (p: Product) => !!p.promotionalPrice },
];

// Frost-Snow Style Badges
const badgeStyles: Record<string, string> = {
  "MAIS PEDIDO": "badge badge-teal",
  "NOVO DROP": "badge badge-purple",
  "PROMOÇÃO": "badge badge-orange",
  "DROP EXCLUSIVO": "badge badge-orange animate-glow-pulse",
  "NOVO": "badge badge-teal",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const fav = isFavorite(product.sku);
  const stock = getStockNumber(product);
  const displayPrice = product.promotionalPrice || product.price;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const image = getProductImage(product.sku);
  const isOculos = product.category === "oculos";
  const catColor = getCategoryColor(product.category);
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(10);

  const categoryLabel = catColor.label;

  const handleAdd = () => {
    addItem({
      sku: product.sku,
      name: product.name,
      price: displayPrice,
      color: selectedColor,
    });
    toast.success(`${product.name} adicionada!`, {
      style: {
        background: "hsl(240 25% 8%)",
        border: "1px solid hsl(0 0% 100% / 0.12)",
        color: "white",
      },
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-void-900 rounded-xl overflow-hidden border border-border-subtle transition-[border-color,box-shadow] duration-300"
      whileHover={{
        boxShadow: `0 8px 32px rgb(${catColor.rgb} / 0.25), 0 0 0 1px rgb(${catColor.rgb} / 0.3)`,
      }}
    >
      {/* Image */}
      <div className={`relative aspect-square overflow-hidden ${isOculos ? "bg-void-800" : "bg-void-950"}`}>
        {image ? (
          <ProgressiveImage
            src={image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            containerClassName="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-void-800 to-void-950" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={badgeStyles[product.badge] || "badge badge-teal"}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={() => toggleFavorite(product.sku)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center transition-all border ${
            fav
              ? "bg-neon-purple border-neon-purple text-white"
              : "bg-void-900/80 border-border-subtle text-text-tertiary hover:border-neon-purple/50"
          }`}
        >
          <Heart size={16} className={fav ? "fill-current" : ""} />
        </button>

        {/* Stock warning */}
        {stock <= 5 && stock > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-neon-orange/20 border border-neon-orange/30 rounded text-neon-orange text-[10px] font-mono font-semibold">
            ⚡ {stock} RESTANTES
          </span>
        )}

        {/* Hover CTAs */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-neon-teal text-void-950 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider hover:bg-neon-teal-light transition-all flex items-center justify-center gap-2"
          >
            Adicionar
            <ArrowRight size={14} />
          </button>

          <Link
            to="/montar-look"
            className="w-full py-2 bg-void-800 border border-border-default rounded-lg font-mono text-[10px] font-medium uppercase tracking-wider text-text-secondary hover:border-neon-teal/30 hover:text-text-primary transition-all text-center"
          >
            + Montar Look
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: catColor.hex }}>
            {categoryLabel}
          </p>
        </div>

        <p className="font-sans text-sm font-medium text-text-primary leading-tight mb-2 line-clamp-2 group-hover:text-neon-teal transition-colors"
        >
          {product.name}
        </p>

        {/* Swatches */}
        <div className="flex gap-1.5 mb-3 items-center">
          {product.colors.slice(0, 4).map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-3.5 h-3.5 rounded-full transition-all ${
                selectedColor === color
                  ? "ring-2 ring-offset-1 ring-offset-void-900 scale-110"
                  : "border border-border-default hover:scale-125"
              }`}
              style={{
                backgroundColor: colorMap[color] || "#ccc",
                ringColor: colorMap[color] || "#ccc",
              }}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="font-mono text-[10px] text-text-tertiary">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-semibold text-neon-teal">
            {formatPrice(displayPrice)}
          </span>
          {product.promotionalPrice && (
            <span className="font-sans text-xs text-text-tertiary line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <p className="font-mono text-[10px] text-text-tertiary mt-1">
          3x de {formatPrice(displayPrice / 3)} s/juros
        </p>

        {/* Mobile add */}
        <button
          onClick={handleAdd}
          className="lg:hidden w-full mt-3 py-2.5 bg-neon-teal text-void-950 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider"
        >
          Adicionar à Sacola
        </button>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const filtered = products.filter(tabs[activeTab].filter);
  const displayProducts = filtered.length > 0 ? filtered : products.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-void-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles size={16} className="text-neon-teal" />
            <span className="font-mono text-xs text-neon-teal tracking-widest uppercase">
              Seleção Premium
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold text-text-primary text-center mb-2 tracking-tight"
          >
            COLEÇÃO <span className="text-gradient">ALOHA</span>
          </motion.h2>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-neon-teal to-transparent mb-4 max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-text-secondary text-center max-w-lg mx-auto"
          >
            Peças selecionadas para quem sabe chegar com estilo. Qualidade premium, entrega em Manaus.
          </motion.p>
        </div>

        {/* Tabs - Frost Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-10 justify-start lg:justify-center"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                i === activeTab
                  ? "bg-neon-teal text-void-950 border-neon-teal font-semibold"
                  : "bg-void-900 text-text-secondary border-border-subtle hover:border-border-default hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {displayProducts.map((product) => (
              <motion.div
                key={product.sku}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/colecao/polos"
            className="btn-ghost inline-flex items-center gap-2"
          >
            Ver Todos os Produtos
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
