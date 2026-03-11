import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, MessageCircle, Shield, Package, RotateCcw, Star } from "lucide-react";
import { getProductBySlug, formatPrice, colorMap, getStockNumber, products } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useCartStore } from "@/stores/useCartStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

const ProductPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[1] || "");
  const [activeTab, setActiveTab] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.setCartOpen);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-ocean mb-4">PRODUTO NÃO ENCONTRADO</h1>
          <Link to="/" className="text-teal font-heading text-sm uppercase">← Voltar à loja</Link>
        </div>
      </div>
    );
  }

  const displayPrice = product.promotionalPrice || product.price;
  const stock = getStockNumber(product, selectedColor);
  const fav = isFavorite(product.sku);

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, price: displayPrice, color: selectedColor, size: selectedSize });
    toggleCart(true);
  };

  const whatsappMsg = `Salve! Passei pela loja de vocês e quero:\n👕 ${product.name}\n🎨 Cor: ${selectedColor}\n📏 Tamanho: ${selectedSize}\n💰 ${formatPrice(displayPrice)}\nPode me ajudar? 🤙`;

  const related = products.filter(p => p.category !== product.category && p.sku !== product.sku).slice(0, 3);

  const tabs = ["DESCRIÇÃO", "MEDIDAS", "COMPOSIÇÃO", "ENTREGA MANAUS"];

  return (
    <>
      <Helmet>
        <title>{product.name} | Aloha Surf Conceito — Manaus</title>
        <meta name="description" content={`${product.name} - ${product.shortDescription || "Moda masculina estilo jogador"} - Aloha Surf Conceito Manaus`} />
      </Helmet>

      <div className="bg-sand min-h-screen">
        {/* Breadcrumbs */}
        <div className="container py-4">
          <div className="flex gap-2 text-xs font-body text-ocean/50">
            <Link to="/" className="hover:text-ocean">Home</Link>
            <span>/</span>
            <Link to={`/colecao/${product.category}`} className="hover:text-ocean capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-ocean">{product.name}</span>
          </div>
        </div>

        {/* Product */}
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-sand-100 rounded-lg overflow-hidden">
              {getProductImage(product.sku) ? (
                <img src={getProductImage(product.sku)} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-sand-100 to-sand-200 flex items-center justify-center">
                  <span className="font-display text-6xl text-ocean/10">ALOHA</span>
                </div>
              )}
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-pill bg-coral text-sand font-heading text-xs font-bold uppercase">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="font-heading text-xs uppercase tracking-widest text-teal font-bold mb-2">
              {product.category === "polos" ? "POLO" : product.category.toUpperCase()} • ALOHA SURF CONCEITO
            </span>

            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-ocean mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-sand-400 text-sand-400" />)}
              </div>
              <span className="font-body text-xs text-ocean/50">32 avaliações</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="font-price text-3xl font-bold text-coral">{formatPrice(displayPrice)}</span>
                {product.promotionalPrice && (
                  <>
                    <span className="font-body text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                    <span className="px-2 py-0.5 rounded-pill bg-coral text-sand font-price text-xs font-semibold">
                      -{Math.round(((product.price - product.promotionalPrice) / product.price) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="font-body text-sm text-ocean/50 mt-1">ou 3x de {formatPrice(displayPrice / 3)} sem juros</p>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <p className="font-body text-sm text-ocean font-medium mb-2">Cor: <span className="capitalize">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c ? "border-teal scale-110" : "border-sand-200"}`}
                    style={{ backgroundColor: colorMap[c] || "#ccc" }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-6">
                <p className="font-body text-sm text-ocean font-medium mb-2">Tamanho</p>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 rounded-lg font-heading text-sm font-bold transition-all ${
                        selectedSize === s ? "bg-ocean text-sand" : "bg-sand-100 text-ocean hover:bg-sand-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mb-6">
              {stock <= 5 && stock > 0 ? (
                <p className="font-body text-sm text-coral font-semibold animate-pulse-coral">⚡ Últimas {stock} peças</p>
              ) : (
                <p className="font-body text-sm text-teal">✓ Em estoque — Entrega Manaus em 1–2 dias</p>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAdd}
                className="w-full h-14 bg-coral rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-sand hover:bg-coral-400 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> ADICIONAR NA SACOLA
              </button>
              <Link
                to="/montar-look"
                className="w-full h-12 border-2 border-ocean rounded-lg font-heading text-xs font-bold uppercase tracking-wider text-ocean hover:bg-ocean hover:text-sand transition-colors flex items-center justify-center"
              >
                MONTAR LOOK COM ESSA PEÇA →
              </Link>
              <a
                href={`https://wa.me/5592934503860?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 flex items-center justify-center gap-2 font-heading text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/10 rounded-lg transition-colors"
              >
                <MessageCircle size={18} /> PEDIR NO WHATSAPP
              </a>
            </div>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(product.sku)}
              className="flex items-center gap-2 font-body text-sm text-ocean/60 hover:text-coral transition-colors mb-6"
            >
              <Heart size={16} className={fav ? "fill-coral text-coral" : ""} />
              {fav ? "Salvo nos favoritos" : "Salvar nos favoritos"}
            </button>

            {/* Trust icons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: "Compra segura" },
                { icon: Package, text: "Entrega rápida Manaus" },
                { icon: RotateCcw, text: "Troca em 7 dias" },
                { icon: MessageCircle, text: "Suporte no WhatsApp" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 p-2 bg-sand-100 rounded-lg">
                  <Icon size={16} className="text-teal flex-shrink-0" />
                  <span className="font-body text-xs text-ocean/70">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="container pb-12">
          <div className="flex gap-1 overflow-x-auto mb-6">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-pill font-heading text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  i === activeTab ? "bg-ocean text-sand" : "bg-sand-100 text-ocean/60 hover:text-ocean"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-card rounded-lg p-6" style={{ boxShadow: "var(--al-shadow-card)" }}>
            {activeTab === 0 && (
              <p className="font-body text-ocean/80 leading-relaxed">
                {product.shortDescription || `${product.name} da Aloha Surf Conceito. Peça premium com acabamento de alta qualidade, perfeita para o estilo jogador. Disponível em várias cores e tamanhos.`}
              </p>
            )}
            {activeTab === 1 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-sand-200">
                    <th className="text-left py-2 font-heading text-ocean">Tamanho</th>
                    <th className="text-left py-2 font-heading text-ocean">Peito</th>
                    <th className="text-left py-2 font-heading text-ocean">Cintura</th>
                    <th className="text-left py-2 font-heading text-ocean">Comprimento</th>
                  </tr></thead>
                  <tbody className="font-body text-ocean/70">
                    <tr className="border-b border-sand-100"><td className="py-2">P</td><td>96cm</td><td>88cm</td><td>68cm</td></tr>
                    <tr className="border-b border-sand-100"><td className="py-2">M</td><td>100cm</td><td>92cm</td><td>70cm</td></tr>
                    <tr className="border-b border-sand-100"><td className="py-2">G</td><td>106cm</td><td>98cm</td><td>72cm</td></tr>
                    <tr><td className="py-2">GG</td><td>112cm</td><td>104cm</td><td>74cm</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 2 && (
              <p className="font-body text-ocean/80">{product.material || "100% Algodão Premium"}</p>
            )}
            {activeTab === 3 && (
              <div className="space-y-2 font-body text-sm text-ocean/80">
                <p>📍 <strong>Centro:</strong> 24h — R$ 15</p>
                <p>📍 <strong>Zona Norte:</strong> 1-2 dias — R$ 20</p>
                <p>📍 <strong>Zona Sul:</strong> 1-2 dias — R$ 20</p>
                <p>📍 <strong>Zona Leste:</strong> 2-3 dias — R$ 25</p>
                <p>📍 <strong>Zona Oeste:</strong> 1-2 dias — R$ 20</p>
                <p className="text-teal font-semibold mt-3">🏄 Frete grátis acima de R$ 350!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <div className="container pb-16">
          <h3 className="font-display text-2xl text-ocean mb-6">MONTE O LOOK COM ESSA PEÇA</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.sku} to={`/produto/${p.slug}`} className="bg-card rounded-lg overflow-hidden card-hover" style={{ boxShadow: "var(--al-shadow-card)" }}>
                <div className="aspect-square bg-sand-100 overflow-hidden">
                  {getProductImage(p.sku) ? (
                    <img src={getProductImage(p.sku)} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-sand-100" />
                  )}
                </div>
                <div className="p-3">
                  <p className="font-body text-xs text-ocean/50 uppercase">{p.category}</p>
                  <p className="font-heading text-sm font-semibold text-ocean">{p.name}</p>
                  <p className="font-price text-coral font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
