import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { products, formatPrice, getProductsByCategory, type Product } from "@/data/products";
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
    toast.success(`✅ Kit com ${selectedItems.length} peças adicionado à sacola!`);
  };

  const renderSelector = (title: string, items: Product[], selected: Product | null, onSelect: (p: Product) => void) => (
    <div>
      <h4 className="font-heading text-sm font-bold text-ocean uppercase mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {items.map((p) => {
          const isSelected = selected?.sku === p.sku;
          const img = getProductImage(p.sku);
          return (
            <button
              key={p.sku}
              onClick={() => onSelect(p)}
              className={`relative p-3 rounded-[14px] border-2 text-left transition-all ${
                isSelected ? "border-teal bg-teal/5" : "border-sand-200 hover:border-sand-400"
              }`}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-teal flex items-center justify-center z-10">
                  <Check size={12} className="text-ocean" />
                </div>
              )}
              <div className="aspect-square bg-sand-100 rounded-md mb-2 overflow-hidden">
                {img && (
                  <img src={img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <p className="font-body text-xs text-ocean truncate">{p.name}</p>
              <p className="font-price text-sm text-coral font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="py-16 lg:py-24 bg-sand-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ocean mb-2 tracking-wide">
            MONTE SEU CONJUNTO
          </h2>
          <p className="font-body text-ocean-700">
            Polo + Bermuda + Boné = Look completo com <span className="text-teal font-semibold">10% OFF</span> no kit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {renderSelector("👔 POLO", polos, selectedPolo, setSelectedPolo)}
          {renderSelector("🩳 BERMUDA", bermudas, selectedBermuda, setSelectedBermuda)}
          {renderSelector("🧢 BONÉ", bones, selectedBone, setSelectedBone)}

          {/* Summary */}
          <div className="bg-card rounded-[14px] p-6 self-start sticky top-24 border border-sand-200" style={{ boxShadow: "var(--al-shadow-card)" }}>
            <h4 className="font-heading text-sm font-bold text-ocean uppercase mb-4">SEU KIT</h4>

            {selectedItems.length === 0 ? (
              <p className="font-body text-sm text-ocean/40">Selecione as peças ao lado</p>
            ) : (
              <div className="space-y-3 mb-4">
                {selectedItems.map((p) => {
                  const img = getProductImage(p.sku);
                  return (
                    <div key={p.sku} className="flex items-center gap-3">
                      {img && (
                        <img src={img} alt={p.name} className="w-12 h-12 rounded-md object-cover bg-sand-100 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-body text-xs text-ocean truncate block">{p.name}</span>
                        <span className="font-price text-sm text-ocean font-semibold">{formatPrice(p.promotionalPrice || p.price)}</span>
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
                className="mb-4 px-3 py-2 bg-teal/10 border border-teal/30 rounded-lg animate-pulse-glow"
              >
                <span className="font-heading text-xs text-teal font-bold uppercase">KIT COMPLETO — 10% OFF</span>
              </motion.div>
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
              onClick={handleAddKit}
              disabled={selectedItems.length === 0}
              className="w-full py-3.5 bg-coral rounded-lg font-heading text-sm font-bold uppercase text-sand hover:bg-coral-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ minHeight: "52px" }}
            >
              ADICIONAR KIT NA SACOLA
            </button>

            <a
              href="https://wa.me/5592934503860?text=Salve!%20Quero%20montar%20um%20kit%20personalizado%20🤙"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-3 font-body text-xs text-[#25D366] hover:underline"
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
