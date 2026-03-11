import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatPrice, colorMap, getStockNumber, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

const tabs = [
  { label: "MAIS VENDIDOS", filter: (p: Product) => p.badge === "MAIS PEDIDO" },
  { label: "NOVIDADES", filter: (p: Product) => p.badge === "NOVO" || p.badge === "NOVO DROP" },
  { label: "POLOS", filter: (p: Product) => p.category === "polos" },
  { label: "PROMOÇÕES", filter: (p: Product) => !!p.promotionalPrice },
];

const badgeStyles: Record<string, string> = {
  "MAIS PEDIDO": "bg-teal text-ocean-950",
  "NOVO DROP": "bg-teal-900 text-teal-400",
  "PROMOÇÃO": "bg-coral-100 text-coral",
  "DROP EXCLUSIVO": "bg-coral text-sand animate-pulse-coral",
  "NOVO": "bg-amber-500 text-ocean-950",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const fav = isFavorite(product.sku);
  const stock = getStockNumber(product);
  const displayPrice = product.promotionalPrice || product.price;
  const image = getProductImage(product.sku);
  const isOculos = product.category === "oculos";

  const categoryLabel = product.category === "polos" ? "POLO" : product.category === "bermudas" ? "BERMUDA" : product.category === "bones" ? "BONÉ" : "ÓCULOS";

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, price: displayPrice, color: product.colors[0] });
    toast.success(`✅ ${product.name} adicionada à sacola!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-sand-200 transition-all duration-300 hover:-translate-y-1.5"
      style={{ boxShadow: "var(--al-shadow-card)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(10,15,30,0.18)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--al-shadow-card)"; }}
    >
      {/* Image */}
      <div className={`relative aspect-square overflow-hidden ${isOculos ? "bg-sand-100" : "bg-ocean-900"}`}>
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-ocean-800 to-ocean-900" />
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-pill text-[10px] font-display uppercase tracking-wider ${badgeStyles[product.badge] || "bg-ocean text-sand"}`}>
            {product.badge}
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={() => toggleFavorite(product.sku)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            fav ? "bg-coral scale-110" : "bg-card/60 backdrop-blur-sm hover:scale-110"
          }`}
        >
          <Heart size={16} className={fav ? "fill-sand text-sand" : "text-sand/60"} />
        </button>

        {/* Stock warning */}
        {stock <= 5 && stock > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-coral/90 rounded text-sand text-[10px] font-price font-semibold animate-pulse-coral">
            ⚡ {stock} peças
          </span>
        )}

        {/* Hover CTAs */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-card via-card/95 to-transparent pt-8">
          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-ocean rounded-lg font-display text-xs uppercase tracking-wider text-sand hover:brightness-110 transition"
          >
            ADICIONAR À SACOLA
          </button>
          <Link
            to="/montar-look"
            className="w-full py-2 bg-coral/10 border border-coral/30 rounded-lg font-heading text-[10px] font-bold uppercase tracking-wider text-coral hover:bg-coral/20 transition text-center block"
          >
            ++ MONTAR LOOK
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-display text-[10px] uppercase tracking-[0.15em] text-teal mb-1">
          {categoryLabel}
        </p>
        <p className="font-heading text-sm font-semibold text-ocean leading-tight mb-1.5 line-clamp-2">
          {product.name}
        </p>

        {/* Swatches */}
        <div className="flex gap-1.5 mb-2 items-center">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="w-3.5 h-3.5 rounded-full border border-sand-200 cursor-pointer hover:scale-125 transition-transform"
              style={{ backgroundColor: colorMap[color] || "#ccc" }}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="font-body text-[10px] text-ocean/40">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-price text-lg font-bold text-coral">{formatPrice(displayPrice)}</span>
          {product.promotionalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="font-body text-[10px] text-muted-foreground mt-0.5">
          3x de {formatPrice(displayPrice / 3)} s/ juros
        </p>

        {/* Mobile add */}
        <button
          onClick={handleAdd}
          className="lg:hidden w-full mt-3 py-2.5 bg-coral rounded-lg font-display text-xs uppercase tracking-wider text-sand hover:brightness-110 transition"
        >
          ADICIONAR
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
    <section className="py-16 lg:py-24 bg-sand">
      <div className="container">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean text-center mb-2 tracking-wide leading-[0.9]">
          COLEÇÃO ALOHA
        </h2>
        <p className="font-body text-ocean-700 text-center mb-8">
          Peças selecionadas para quem sabe chegar com estilo
        </p>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-start lg:justify-center">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-pill font-display text-xs uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                i === activeTab
                  ? "bg-ocean text-sand border-coral"
                  : "bg-card text-ocean/60 hover:text-ocean border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {displayProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/colecao/polos" className="font-heading text-sm font-bold text-teal hover:underline uppercase tracking-wider">
            Ver todos →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
