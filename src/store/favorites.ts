import type { Pokemon } from "./pokemons.ts";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { fakeFetch } from "../tools/tools.ts";

export type FavoritesState = {
  favorites: Record<string | number, Pokemon>;
  isLoading: boolean;
  error: string | null;
};

type FavoritesActions = {
  fetchFavorites: () => void;
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: Pokemon["id"]) => void;
};

const favoritesSlice: StateCreator<FavoritesActions & FavoritesState> = (
  set,
  getState,
) => ({
  favorites: {},
  isLoading: false,
  error: null,
  fetchFavorites: async () => {
    try {
      set({ isLoading: true });

      // Fake fetch GET request, just for example
      const res = await fakeFetch<FavoritesState["favorites"]>(
        "favorites",
        "GET",
      );

      if (!res.ok) {
        const error = await res.json();
        console.error(res);
        return set({
          isLoading: false,
          error: error,
        });
      }

      const favorites = await res.json();

      set({
        favorites,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: "fetch favorites: something went wrong" });
    }
  },
  addFavorite: async (pokemon) => {
    try {
      set({ isLoading: true });

      // Fake fetch POST request, just for example
      const res = await fakeFetch<Pokemon>("favorites", "POST", pokemon);

      if (!res.ok) {
        const error = await res.json();
        console.error(res);
        return set({
          isLoading: false,
          error: error,
        });
      }

      set({
        favorites: { ...getState()["favorites"], [pokemon.id]: pokemon },
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: "add favorite: something went wrong" });
    }
  },
  removeFavorite: async (id: Pokemon["id"]) => {
    try {
      set({ isLoading: true });

      // Fake fetch DELETE request, just for example
      const res = await fakeFetch("favorites", "DELETE", { id });
      if (!res.ok) {
        const error = await res.json();
        console.error(res);
        return set({
          isLoading: false,
          error: error,
        });
      }

      const favorites = { ...getState()["favorites"] };
      delete favorites[id];

      set({
        favorites,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: "delete favorite: something went wrong" });
    }
  },
});

export const useFavoritesStore = create<FavoritesActions & FavoritesState>()(
  devtools(favoritesSlice),
);
