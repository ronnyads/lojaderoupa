import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatPrice, getProductsByCategory, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

const KitBuilderSection = () => {
  const [selectedPolo, setSelectedPolo] = useState<Product | null>(null);
  const [selectedBermuda, setSelectedBermuda] = useState<Product | null>(null);
  const [selectedBone, setSelectedBone] = useState<Product | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const polos = getProductsByCategory("polos").slice(0, 4);
  const bermudas = getProductsByCategory("bermudas").slice(0, 4);
  const bones = getProductsByCategory("bones").slice(0, 3);

  const selectedItems = [selectedPolo, selectedBermuda, selectedBone].filter(Boolean) as Product[];
  const subtotal = selectedItems.reduce((s, p) => s + (p.promotionalPrice || p.price), 0);
  const isComplete = selectedItems.length >= 3;
  const discount = isComplete ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleAddKit = () => {
    selectedItems.forEach((p) => {
      addItem({ sku: p.sku, name: p.name, price: p.promotionalPrice || p.price, color: p.colors[0] });
    });
    toast.success(`Kit com ${selectedItems.length} peças adicionado à sacola!`);
  };

  const renderSelector = (title: string, items: Product[], selected: Product | null, onSelect: (p: Product) => void) => (
    <div>
      <h4 className="font-mono text-sm font-bold text-text-secondary uppercase mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {items.map((p) => {
          const isSelected = selected?.sku === p.sku;
          const img = getProductImage(p.sku);
          return (
            <button
              key={p.sku}
              onClick={() => onSelect(p)}
              className={`relative p-3 rounded-[14px] border-2 text-left transition-all ${
                isSelected
                  ? "border-neon-teal bg-neon-teal/5"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-neon-teal flex items-center justify-center z-10">
                  <Check size={12} className="text-void-950" />
                </div>
              )}
              <div className="aspect-square bg-void-800 rounded-md mb-2 overflow-hidden">
                {img && (
                  <img src={img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <p className="font-sans text-xs text-text-primary truncate">{p.name}</p>
              <p className="font-mono text-sm text-neon-orange font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="py-16 lg:py-24 bg-void-950">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-text-primary mb-2 tracking-wide">
            MONTE SEU CONJUNTO
          </h2>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-neon-teal to-transparent mb-3 max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="font-sans text-text-secondary">
            Polo + Bermuda + Boné = Look completo com <span className="text-neon-teal font-semibold">10% OFF</span> no kit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {renderSelector("POLO", polos, selectedPolo, setSelectedPolo)}
          {renderSelector("BERMUDA", bermudas, selectedBermuda, setSelectedBermuda)}
          {renderSelector("BONÉ", bones, selectedBone, setSelectedBone)}

          {/* Summary */}
          <div className="card-glass p-6 self-start sticky top-24">
            <h4 className="font-mono text-sm font-bold text-text-primary uppercase mb-4">SEU KIT</h4>

            {selectedItems.length === 0 ? (
              <p className="font-sans text-sm text-text-disabled">Selecione as peças ao lado</p>
            ) : (
              <div className="space-y-3 mb-4">
                {selectedItems.map((p) => {
                  const img = getProductImage(p.sku);
                  return (
                    <div key={p.sku} className="flex items-center gap-3">
                      {img && (
                        <img src={img} alt={p.name} className="w-12 h-12 rounded-md object-cover bg-void-800 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-sans text-xs text-text-primary truncate block">{p.name}</span>
                        <span className="font-mono text-sm text-text-primary font-semibold">{formatPrice(p.promotionalPrice || p.price)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {isComplete && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 px-3 py-2 bg-neon-teal/10 border border-neon-teal/30 rounded-lg animate-glow-pulse"
              >
                <span className="font-mono text-xs text-neon-teal font-bold uppercase">KIT COMPLETO — 10% OFF</span>
              </motion.div>
            )}

            <div className="border-t border-white/10 pt-3 mb-4">
              {discount > 0 && (
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-sans text-text-tertiary">Desconto</span>
                  <span className="font-mono text-neon-teal font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-sans text-text-primary font-medium">Total</span>
                <span className="font-mono text-xl text-neon-orange font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleAddKit}
              disabled={selectedItems.length === 0}
              className="btn-premium w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ minHeight: "52px" }}
            >
              ADICIONAR KIT NA SACOLA
            </button>

            <a
              href="https://wa.me/5592934503860?text=Salve!%20Quero%20montar%20um%20kit%20personalizado%20🤙"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-3 font-sans text-xs text-[#25D366] hover:underline"
            >
              💬 Prefere montar pelo WhatsApp?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitBuilderSection;
