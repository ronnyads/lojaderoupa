import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // SKUs
  toggleFavorite: (sku: string) => void;
  isFavorite: (sku: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (sku) => {
        const favs = get().favorites;
        set({ favorites: favs.includes(sku) ? favs.filter(f => f !== sku) : [...favs, sku] });
      },
      isFavorite: (sku) => get().favorites.includes(sku),
    }),
    { name: "aloha-favorites" }
  )
);
