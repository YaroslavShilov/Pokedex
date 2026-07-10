import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { buildURL } from "../tools/tools.ts";
import { BASE_URL, getImgUrl } from "./api.ts";

type FetchPokemonsParams = {
  takeCount: number;
  offset: number;
};

type Pokemon = {
  id: number | string;
  name: string;
  image: string;
};

type PokemonsState = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  morePossible: boolean;
};

type PokemonsActions = {
  fetchPokemons: (params: FetchPokemonsParams) => void;
};

const pokemonsSlice: StateCreator<PokemonsActions & PokemonsState> = (
  set,
  getState,
) => ({
  pokemons: [],
  isLoading: false,
  error: null,
  morePossible: false,
  fetchPokemons: async ({ takeCount, ...params }) => {
    try {
      set({ isLoading: true });

      const url = buildURL(BASE_URL + "/pokemon", {
        ...params,
        limit: takeCount,
      });
      const pokemonsData = await fetch(url)
        .then((r) => r.json())
        .then((r) => r.results as { name: string; url: string }[]);

      const pokemons = pokemonsData.map(({ name, url }) => {
        const id = url.split("/").at(-2)!;
        return {
          id,
          name,
          image: getImgUrl(id),
        };
      });

      set({
        pokemons: [...getState().pokemons, ...pokemons],
        morePossible: pokemons.length === takeCount,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ error: "fetchPokemons: something went wrong", isLoading: false });
    }
  },
});

export const usePokemonsStore = create<PokemonsActions & PokemonsState>()(
  devtools(pokemonsSlice),
);
