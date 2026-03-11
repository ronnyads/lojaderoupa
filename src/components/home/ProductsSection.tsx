import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatPrice, colorMap, getStockNumber, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useCartStore } from "@/stores/useCartStore";

const tabs = [
  { label: "MAIS VENDIDOS", filter: (p: Product) => p.badge === "MAIS PEDIDO" },
  { label: "NOVIDADES", filter: (p: Product) => p.badge === "NOVO" || p.badge === "NOVO DROP" },
  { label: "POLOS", filter: (p: Product) => p.category === "polos" },
  { label: "PROMOÇÕES", filter: (p: Product) => !!p.promotionalPrice },
];

const badgeStyles: Record<string, string> = {
  "MAIS PEDIDO": "bg-ocean-500 text-sand",
  "NOVO DROP": "bg-teal text-ocean",
  "PROMOÇÃO": "bg-coral text-sand",
  "DROP EXCLUSIVO": "bg-coral text-sand",
  "NOVO": "bg-teal text-ocean",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const fav = isFavorite(product.sku);
  const stock = getStockNumber(product);
  const displayPrice = product.promotionalPrice || product.price;
  const image = getProductImage(product.sku);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-lg overflow-hidden card-hover"
      style={{ boxShadow: "var(--al-shadow-card)" }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-sand-100 overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-sand-100 to-sand-200" />
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-pill text-[10px] font-heading font-bold uppercase tracking-wider ${badgeStyles[product.badge] || "bg-ocean text-sand"}`}>
            {product.badge}
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={() => toggleFavorite(product.sku)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart size={16} className={fav ? "fill-coral text-coral" : "text-ocean/40"} />
        </button>

        {/* Stock warning */}
        {stock <= 5 && stock > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-coral-100 rounded text-coral text-[10px] font-price font-semibold animate-pulse-coral">
            ⚡ {stock} peças
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/60 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => addItem({ sku: product.sku, name: product.name, price: displayPrice, color: product.colors[0] })}
            className="px-4 py-2 bg-coral rounded-lg font-heading text-xs font-bold uppercase text-sand hover:bg-coral-400 transition-colors"
          >
            ADICIONAR
          </button>
          <Link
            to={`/produto/${product.slug}`}
            className="px-4 py-2 border border-sand rounded-lg font-heading text-xs font-bold uppercase text-sand hover:bg-sand/10 transition-colors"
          >
            VER
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-body text-[10px] uppercase tracking-wider text-ocean-500 mb-1">
          {product.category === "polos" ? "POLO" : product.category === "bermudas" ? "BERMUDA" : product.category === "bones" ? "BONÉ" : "ÓCULOS"}
        </p>
        <p className="font-heading text-sm font-semibold text-ocean leading-tight mb-1 line-clamp-2">
          {product.name}
        </p>

        {/* Color swatches */}
        <div className="flex gap-1.5 mb-2">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="w-4 h-4 rounded-full border border-sand-200"
              style={{ backgroundColor: colorMap[color] || "#ccc" }}
              title={color}
            />
          ))}
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
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean text-center mb-2">
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
              className={`px-5 py-2 rounded-pill font-heading text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                i === activeTab
                  ? "bg-ocean text-sand"
                  : "bg-sand-100 text-ocean/60 hover:text-ocean"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
