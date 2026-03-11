import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, total } = useCartStore();

  if (!isOpen) return null;

  const whatsappMsg = items.map(i =>
    `👕 ${i.name}\n🎨 Cor: ${i.color}${i.size ? `\n📏 Tam: ${i.size}` : ''}\n💰 ${formatPrice(i.price)} x${i.quantity}`
  ).join('\n\n');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ocean/40"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-sand shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sand-200">
              <h2 className="font-heading text-lg font-bold text-ocean">SUA SACOLA 🛍️</h2>
              <button onClick={() => setCartOpen(false)} className="p-1 text-ocean/60 hover:text-ocean">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-ocean/60">Sua sacola está vazia</p>
                  <p className="font-body text-sm text-ocean/40 mt-2">Bora montar um look? 🤙</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-card rounded-lg">
                      <div className="w-16 h-20 bg-sand-100 rounded-md flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm font-semibold text-ocean truncate">{item.name}</p>
                        <p className="font-body text-xs text-ocean/60">{item.color}{item.size ? ` • ${item.size}` : ''}</p>
                        <p className="font-price text-coral font-semibold mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.sku, item.color, item.size, item.quantity - 1)} className="w-6 h-6 rounded bg-sand-100 flex items-center justify-center text-ocean hover:bg-sand-200">
                            <Minus size={12} />
                          </button>
                          <span className="font-price text-sm w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.sku, item.color, item.size, item.quantity + 1)} className="w-6 h-6 rounded bg-sand-100 flex items-center justify-center text-ocean hover:bg-sand-200">
                            <Plus size={12} />
                          </button>
                          <button onClick={() => removeItem(item.sku, item.color, item.size)} className="ml-auto text-ocean/40 hover:text-coral">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-sand-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-ocean/60">Total</span>
                  <span className="font-price text-xl font-bold text-coral">{formatPrice(total())}</span>
                </div>
                <button className="w-full py-3.5 bg-coral rounded-lg font-heading text-sm font-bold uppercase tracking-wider text-sand hover:bg-coral-400 transition-colors">
                  FINALIZAR COMPRA
                </button>
                <a
                  href={`https://wa.me/5592934503860?text=${encodeURIComponent(`Salve! Quero finalizar meu pedido:\n\n${whatsappMsg}\n\n💰 Total: ${formatPrice(total())}\n\nPode me ajudar? 🤙`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-[#25D366] rounded-lg font-heading text-sm font-semibold uppercase tracking-wider text-[#25D366] flex items-center justify-center gap-2 hover:bg-[#25D366]/10 transition-colors"
                >
                  🤙 FINALIZAR NO WHATSAPP
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
