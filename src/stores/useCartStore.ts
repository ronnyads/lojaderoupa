import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  color: string;
  size?: string;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (sku: string, color: string, size?: string) => void;
  updateQuantity: (sku: string, color: string, size: string | undefined, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const items = get().items;
        const existing = items.find(i => i.sku === item.sku && i.color === item.color && i.size === item.size);
        if (existing) {
          set({ items: items.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (sku, color, size) => {
        set({ items: get().items.filter(i => !(i.sku === sku && i.color === color && i.size === size)) });
      },
      updateQuantity: (sku, color, size, qty) => {
        if (qty <= 0) {
          get().removeItem(sku, color, size);
          return;
        }
        set({ items: get().items.map(i => i.sku === sku && i.color === color && i.size === size ? { ...i, quantity: qty } : i) });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setCartOpen: (open) => set({ isOpen: open }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "aloha-cart" }
  )
);
