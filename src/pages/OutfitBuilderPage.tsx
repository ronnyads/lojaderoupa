import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, X, Share2, ShoppingBag } from "lucide-react";
import { getProductsByCategory, formatPrice, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

const steps = [
  { label: "POLO", emoji: "👔", category: "polos" as const },
  { label: "BERMUDA", emoji: "🩳", category: "bermudas" as const },
  { label: "BONÉ", emoji: "🧢", category: "bones" as const },
  { label: "ÓCULOS", emoji: "🕶", category: "oculos" as const },
];

const OutfitBuilderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<(Product | null)[]>([null, null, null, null]);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const currentProducts = getProductsByCategory(steps[currentStep].category);
  const selectedItems = selections.filter(Boolean) as Product[];
  const subtotal = selectedItems.reduce((s, p) => s + (p.promotionalPrice || p.price), 0);
  const isComplete = selectedItems.length >= 3;
  const discount = isComplete ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleSelect = (product: Product) => {
    const newSelections = [...selections];
    newSelections[currentStep] = product;
    setSelections(newSelections);
  };

  const handleRemove = (index: number) => {
    const newSelections = [...selections];
    newSelections[index] = null;
    setSelections(newSelections);
  };

  const handleAddAll = () => {
    selectedItems.forEach((p) => {
      addItem({ sku: p.sku, name: p.name, price: p.promotionalPrice || p.price, color: p.colors[0] });
    });
    setCartOpen(true);
  };

  const handleShare = () => {
    const skus = selectedItems.map(p => p.sku).join(",");
    const names = selectedItems.map(p => p.name).join("\n👕 ");
    const msg = `Salve! Olha o look que eu montei na Aloha Surf:\n👕 ${names}\n💰 Total: ${formatPrice(total)}\n\nConfere: ${window.location.origin}/montar-look?items=${skus}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Montador de Looks | Aloha Surf Conceito — Manaus</title>
        <meta name="description" content="Monte seu look completo com polo, bermuda, boné e óculos. Ganhe 10% de desconto no conjunto!" />
      </Helmet>

      <div className="bg-sand min-h-screen pb-24 lg:pb-12">
        <div className="container py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean leading-[0.9]">MONTE SEU LOOK</h1>
            <p className="font-body text-ocean-700 mt-2">Escolha peça por peça e monte o conjunto perfeito</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isDone = !!selections[i];
              return (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep(i)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-heading text-sm font-bold transition-all border-2 ${
                      isDone
                        ? "bg-teal border-teal text-ocean-950"
                        : isActive
                        ? "bg-coral border-coral text-sand"
                        : "bg-sand-200 border-sand-200 text-ocean/40"
                    }`}
                  >
                    {isDone ? <Check size={18} /> : step.emoji}
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`w-8 lg:w-16 h-0.5 transition-colors ${i < currentStep || isDone ? "bg-teal" : "bg-sand-200"}`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Grid */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-lg font-bold text-ocean mb-4">
                {steps[currentStep].emoji} ESCOLHA SUA {steps[currentStep].label}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => {
                  const isSelected = selections[currentStep]?.sku === product.sku;
                  const image = getProductImage(product.sku);
                  return (
                    <motion.button
                      key={product.sku}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(product)}
                      className={`text-left rounded-2xl overflow-hidden transition-all ${
                        isSelected
                          ? "border-2 border-coral scale-[1.02] shadow-lg"
                          : "border-2 border-transparent hover:border-teal/30"
                      }`}
                      style={{ boxShadow: isSelected ? undefined : "var(--al-shadow-card)" }}
                    >
                      <div className="aspect-square bg-ocean-900 relative overflow-hidden">
                        {image ? (
                          <img src={image} alt={product.name} className="w-full h-full object-contain" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-ocean-800 to-ocean-900" />
                        )}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-7 h-7 bg-coral rounded-full flex items-center justify-center">
                            <Check size={14} className="text-sand" />
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-card">
                        <p className="font-heading text-sm font-semibold text-ocean mb-1 line-clamp-1">{product.name}</p>
                        <p className="font-price text-coral font-semibold">{formatPrice(product.promotionalPrice || product.price)}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Nav */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-2 bg-sand-100 rounded-lg font-display text-sm uppercase tracking-wider text-ocean disabled:opacity-30"
                >
                  ← ANTERIOR
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="px-6 py-2 bg-ocean rounded-lg font-display text-sm uppercase tracking-wider text-sand disabled:opacity-30"
                >
                  PRÓXIMO →
                </button>
              </div>
            </div>

            {/* Sidebar — SEU LOOK */}
            <div className="bg-card rounded-2xl p-6 self-start lg:sticky lg:top-24" style={{ boxShadow: "var(--al-shadow-card)" }}>
              <h3 className="font-display text-xl text-ocean mb-5">SEU LOOK</h3>

              <div className="space-y-3 mb-4">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                      selections[i] ? "bg-teal/5 border border-teal/20" : "bg-sand-100 border border-transparent"
                    }`}
                  >
                    {selections[i] ? (
                      <>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-ocean-900 flex-shrink-0">
                          {getProductImage(selections[i]!.sku) ? (
                            <img
                              src={getProductImage(selections[i]!.sku)}
                              alt={selections[i]!.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-ocean-800" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-ocean truncate">{selections[i]!.name}</p>
                          <p className="font-price text-sm text-coral font-semibold">
                            {formatPrice(selections[i]!.promotionalPrice || selections[i]!.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(i)}
                          className="w-6 h-6 rounded-full bg-sand-200 flex items-center justify-center hover:bg-coral/20 transition-colors flex-shrink-0"
                        >
                          <X size={12} className="text-ocean/60" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-lg bg-sand-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl opacity-30">{step.emoji}</span>
                        </div>
                        <p className="font-body text-sm text-ocean/30">Escolha {step.label.toLowerCase()}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {isComplete && (
                <div className="mb-4 px-3 py-2 bg-teal/10 border border-teal/30 rounded-xl">
                  <span className="font-heading text-xs text-teal font-bold uppercase">CONJUNTO COMPLETO — 10% OFF 🔥</span>
                </div>
              )}

              <div className="border-t border-sand-200 pt-3 mb-4">
                {discount > 0 && (
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-body text-ocean/60">Desconto</span>
                    <span className="font-price text-teal font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-body text-ocean font-medium">Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="font-price text-xl text-coral font-bold"
                  >
                    {formatPrice(total)}
                  </motion.span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleAddAll}
                  disabled={selectedItems.length === 0}
                  className="w-full h-[52px] bg-coral rounded-lg font-display text-base uppercase tracking-wider text-sand hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} /> ADICIONAR CONJUNTO
                </button>
                {selectedItems.length > 0 && (
                  <button
                    onClick={handleShare}
                    className="w-full h-11 border border-ocean/20 rounded-lg font-heading text-xs font-bold uppercase tracking-wider text-ocean/70 hover:bg-ocean/5 transition flex items-center justify-center gap-2"
                  >
                    <Share2 size={14} /> COMPARTILHAR LOOK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitBuilderPage;
