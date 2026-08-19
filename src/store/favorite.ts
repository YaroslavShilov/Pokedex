import type { Pokemon } from "./pokemons.ts";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type FavoritesState = {
  favorites: Record<string | number, Pokemon>;
  isLoading: boolean;
  error: string | null;
};

type FavoritesActions = {
  fetchFavorites: () => void;
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: Pokemon) => void;
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
      const res = await new Promise((res) => {
        setTimeout(res, 100);
      })
        .then(() => {
          return localStorage.getItem("favorites");
        })
        .then((res) => JSON.parse(res || "{}"));

      set({
        favorites: res,
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
      const res = await new Promise((res) => {
        setTimeout(res, 100);
      })
        .then(() => {
          return localStorage.getItem("favorites");
        })
        .then((res) => JSON.parse(res || "{}"));

      set({
        favorites: res,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: "fetch favorites: something went wrong" });
    }
  },
  removeFavorite: async () => {},
});

export const useFavoritesStore = create<FavoritesActions & FavoritesState>()(
  devtools(favoritesSlice),
);

const fakeFetch = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object,
) => {
  switch (method) {
    case "GET": {
      // Fake fetch behaviour for example
      return new Promise((res) => setTimeout(res, 100)).then(() => ({
        json: () => JSON.parse(localStorage.getItem(url) || "{}"),
      }));
    }
  }
};
