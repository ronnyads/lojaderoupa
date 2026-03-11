import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, MessageCircle, Shield, Package, RotateCcw, Star, Plus } from "lucide-react";
import { getProductBySlug, formatPrice, colorMap, getStockNumber, products } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useCartStore } from "@/stores/useCartStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { toast } from "sonner";

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
  const pixPrice = displayPrice * 0.95;
  const stock = getStockNumber(product, selectedColor);
  const fav = isFavorite(product.sku);
  const isOculos = product.category === "oculos";
  const image = getProductImage(product.sku);

  const badgeStyle = product.badge === "MAIS PEDIDO" ? "bg-teal text-ocean-950"
    : product.badge === "DROP EXCLUSIVO" ? "bg-coral text-sand animate-pulse-coral"
    : product.badge === "NOVO" || product.badge === "NOVO DROP" ? "bg-amber-500 text-ocean-950"
    : "bg-ocean text-sand";

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, price: displayPrice, color: selectedColor, size: selectedSize });
    toggleCart(true);
  };

  const handleAddRelated = (p: typeof product) => {
    addItem({ sku: p.sku, name: p.name, price: p.promotionalPrice || p.price, color: p.colors[0] });
    toast.success(`✅ ${p.name} adicionada à sacola!`);
  };

  const whatsappMsg = `Salve! Passei pela loja de vocês e quero:\n👕 ${product.name}\n🎨 Cor: ${selectedColor}\n📏 Tamanho: ${selectedSize}\n💰 ${formatPrice(displayPrice)}\nPode me ajudar? 🤙`;

  const related = products.filter(p => p.category !== product.category && p.sku !== product.sku).slice(0, 3);

  const tabs = ["DESCRIÇÃO", "ESPECIFICAÇÕES", "ENTREGA MANAUS"];

  const categoryLabel = product.category === "polos" ? "POLO" : product.category === "bermudas" ? "BERMUDA" : product.category === "bones" ? "BONÉ" : "ÓCULOS";

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

        {/* Product — 55/45 split */}
        <div className="container grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 pb-12">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className={`aspect-[4/5] rounded-2xl overflow-hidden ${isOculos ? "bg-sand-100" : "bg-ocean-900"}`}>
              {image ? (
                <img src={image} alt={product.name} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-6xl text-sand/10">ALOHA</span>
                </div>
              )}
            </div>
            {product.badge && (
              <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-pill font-display text-sm uppercase tracking-wider ${badgeStyle}`}>
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <span className="font-display text-sm uppercase tracking-[0.15em] text-teal mb-2">
              {categoryLabel} • ALOHA SURF CONCEITO
            </span>

            <h1 className="font-heading text-2xl lg:text-[2.8rem] font-bold text-ocean leading-tight mb-2">{product.name}</h1>

            <p className="font-price text-xs text-ocean/40 mb-4">{product.sku}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
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
              <p className="font-body text-sm text-teal font-semibold mt-1">💰 5% de desconto no PIX: {formatPrice(pixPrice)}</p>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <p className="font-body text-sm text-ocean font-medium mb-2">Cor: <span className="capitalize">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c ? "border-coral scale-110" : "border-sand-200"}`}
                    style={{ backgroundColor: colorMap[c] || "#ccc" }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-sm text-ocean font-medium">Tamanho</p>
                  <button className="font-body text-xs text-teal hover:underline">Ver tabela de tamanhos →</button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-10 rounded-lg font-heading text-sm font-bold transition-all ${
                        selectedSize === s ? "bg-ocean text-sand" : "bg-ocean-800 text-sand/70 hover:bg-ocean-700"
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
                className="w-full h-[52px] bg-ocean rounded-lg font-display text-base uppercase tracking-wider text-sand hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> ADICIONAR À SACOLA
              </button>
              <a
                href={`https://wa.me/5592934503860?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 border-2 border-coral rounded-lg font-display text-sm uppercase tracking-wider text-coral hover:bg-coral hover:text-sand transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} /> COMPRAR VIA WHATSAPP
              </a>
            </div>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(product.sku)}
              className="flex items-center gap-2 font-body text-sm text-ocean/60 hover:text-coral transition-colors mb-6"
            >
              <Heart size={16} className={fav ? "fill-coral text-coral" : ""} />
              {fav ? "Salvo nos favoritos" : "🤍 Salvar nos favoritos"}
            </button>

            {/* Trust */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: "Compra segura" },
                { icon: Package, text: "Entrega rápida Manaus" },
                { icon: RotateCcw, text: "Troca em 7 dias" },
                { icon: MessageCircle, text: "Suporte no WhatsApp" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 p-2 bg-sand-100 rounded-xl">
                  <Icon size={16} className="text-teal flex-shrink-0" />
                  <span className="font-body text-xs text-ocean/70">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* COMBINE COM */}
        <div className="container pb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl text-ocean tracking-wide">COMBINE COM</h3>
            <Link to="/montar-look" className="font-heading text-xs font-bold text-coral uppercase hover:underline">
              MONTAR LOOK COMPLETO →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {related.map((p) => {
              const relImage = getProductImage(p.sku);
              return (
                <div key={p.sku} className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "var(--al-shadow-card)" }}>
                  <Link to={`/produto/${p.slug}`}>
                    <div className={`aspect-square overflow-hidden ${p.category === "oculos" ? "bg-sand-100" : "bg-ocean-900"}`}>
                      {relImage ? (
                        <img src={relImage} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-ocean-800" />
                      )}
                    </div>
                  </Link>
                  <div className="p-3 flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs text-ocean/50 uppercase">{p.category}</p>
                      <p className="font-heading text-sm font-semibold text-ocean truncate">{p.name}</p>
                      <p className="font-price text-coral font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
                    </div>
                    <button
                      onClick={() => handleAddRelated(p)}
                      className="w-9 h-9 rounded-full bg-coral flex items-center justify-center text-sand hover:brightness-110 transition flex-shrink-0"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="container pb-12">
          <div className="flex gap-1 overflow-x-auto mb-6">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-pill font-display text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                  i === activeTab ? "bg-ocean text-sand" : "bg-sand-100 text-ocean/60 hover:text-ocean"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--al-shadow-card)" }}>
            {activeTab === 0 && (
              <p className="font-body text-ocean/80 leading-relaxed">
                {product.name}. Peça assinada Aloha Surf para quem chega com estilo. Tecido de alta qualidade, modelagem slim adaptada ao calor de Manaus. Para os que entendem que o detalhe faz a diferença. {product.shortDescription}
              </p>
            )}
            {activeTab === 1 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="font-body text-ocean/70">
                    <tr className="border-b border-sand-100"><td className="py-3 font-heading text-ocean w-1/3">Material</td><td>{product.material || "100% Algodão Premium"}</td></tr>
                    <tr className="border-b border-sand-100"><td className="py-3 font-heading text-ocean">Modelagem</td><td>Slim Fit</td></tr>
                    <tr className="border-b border-sand-100"><td className="py-3 font-heading text-ocean">Lavagem</td><td>À máquina, água fria</td></tr>
                    <tr className="border-b border-sand-100"><td className="py-3 font-heading text-ocean">Origem</td><td>Nacional</td></tr>
                    <tr className="border-b border-sand-100"><td className="py-3 font-heading text-ocean">SKU</td><td className="font-price text-ocean/50">{product.sku}</td></tr>
                    <tr><td className="py-3 font-heading text-ocean">Coleção</td><td>Aloha 2025</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 2 && (
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
      </div>

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-ocean-950 border-t border-ocean-800 px-4 py-3 flex items-center gap-3">
        <span className="font-price text-lg text-coral font-bold flex-shrink-0">{formatPrice(displayPrice)}</span>
        <button
          onClick={handleAdd}
          className="flex-1 h-11 bg-ocean-800 rounded-lg font-display text-sm uppercase tracking-wider text-sand hover:brightness-110 transition"
        >
          ADICIONAR
        </button>
        <a
          href={`https://wa.me/5592934503860?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <MessageCircle size={18} className="text-white" />
        </a>
      </div>
    </>
  );
};

export default ProductPage;
