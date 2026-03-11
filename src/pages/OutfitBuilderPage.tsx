import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import { getProductsByCategory, formatPrice, type Product } from "@/data/products";
import { useCartStore } from "@/stores/useCartStore";

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

  const handleAddAll = () => {
    selectedItems.forEach((p) => {
      addItem({ sku: p.sku, name: p.name, price: p.promotionalPrice || p.price, color: p.colors[0] });
    });
    setCartOpen(true);
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
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean">MONTE SEU LOOK</h1>
            <p className="font-body text-ocean-700">Escolha peça por peça e monte o conjunto perfeito</p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-sm font-bold transition-all ${
                    selections[i] ? "bg-teal text-ocean" : i === currentStep ? "bg-ocean text-sand" : "bg-sand-200 text-ocean/40"
                  }`}
                >
                  {selections[i] ? <Check size={18} /> : step.emoji}
                </button>
                {i < steps.length - 1 && <div className={`w-8 lg:w-16 h-0.5 ${i < currentStep ? "bg-teal" : "bg-sand-200"}`} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-lg font-bold text-ocean mb-4">
                {steps[currentStep].emoji} ESCOLHA SUA {steps[currentStep].label}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => {
                  const isSelected = selections[currentStep]?.sku === product.sku;
                  return (
                    <motion.button
                      key={product.sku}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(product)}
                      className={`text-left bg-card rounded-lg overflow-hidden border-2 transition-all ${
                        isSelected ? "border-teal" : "border-transparent hover:border-sand-200"
                      }`}
                      style={{ boxShadow: "var(--al-shadow-card)" }}
                    >
                      <div className="aspect-square bg-sand-100 relative">
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-teal rounded-full flex items-center justify-center">
                            <Check size={14} className="text-ocean" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-heading text-sm font-semibold text-ocean mb-1 line-clamp-1">{product.name}</p>
                        <p className="font-price text-coral font-semibold">{formatPrice(product.promotionalPrice || product.price)}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Nav buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-2 bg-sand-100 rounded-lg font-heading text-xs font-bold uppercase text-ocean disabled:opacity-30"
                >
                  ← ANTERIOR
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="px-6 py-2 bg-ocean rounded-lg font-heading text-xs font-bold uppercase text-sand disabled:opacity-30"
                >
                  PRÓXIMO →
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-lg p-6 self-start lg:sticky lg:top-24" style={{ boxShadow: "var(--al-shadow-card)" }}>
              <h3 className="font-heading text-lg font-bold text-ocean mb-4">SEU LOOK</h3>

              <div className="space-y-3 mb-4">
                {steps.map((step, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${selections[i] ? "bg-teal/5" : "bg-sand-100"}`}>
                    <span className="text-lg">{step.emoji}</span>
                    {selections[i] ? (
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-ocean truncate">{selections[i]!.name}</p>
                        <p className="font-price text-xs text-coral font-semibold">{formatPrice(selections[i]!.promotionalPrice || selections[i]!.price)}</p>
                      </div>
                    ) : (
                      <p className="font-body text-sm text-ocean/30">Escolha {step.label.toLowerCase()}</p>
                    )}
                  </div>
                ))}
              </div>

              {isComplete && (
                <div className="mb-4 px-3 py-2 bg-teal/10 border border-teal/30 rounded-lg">
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
                <div className="flex justify-between">
                  <span className="font-body text-ocean font-medium">Total</span>
                  <span className="font-price text-xl text-coral font-bold">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleAddAll}
                disabled={selectedItems.length === 0}
                className="w-full py-3.5 bg-coral rounded-lg font-heading text-sm font-bold uppercase text-sand hover:bg-coral-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ADICIONAR CONJUNTO
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitBuilderPage;
