import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { BASE_URL, getImgUrl } from "./api.ts";

type EvolutionResponse = {
  evolves_to: EvolutionResponse;
  species: {
    name: string;
    url: string;
  };
}[];

const getEvolution = (evolves_to: EvolutionResponse): Pokemon["evolves_to"] => {
  return evolves_to.map(({ evolves_to, species: { name, url } }) => {
    const id = url.split("/").at(-2)!;

    return {
      id,
      image: getImgUrl(id),
      name,
      evolves_to: getEvolution(evolves_to),
    };
  });
};

type Pokemon = {
  id: number | string;
  name: string;
  image: string;
  weight: number; // kg
  height: number; // m
  stats: { name: string; value: number; effort: number }[];
  habitat: string;
  about: string;
  category: string;
  evolves_to: {
    evolves_to: Pokemon["evolves_to"];
    image: string;
    name: string;
    id: number | string;
  }[];
};

type PokemonState = {
  pokemon: Pokemon | null;
  isLoading: boolean;
  error: string | null;
};

type PokemonActions = {
  fetchPokemon: (name: string | number) => void; // id or name
};

const pokemonSlice: StateCreator<PokemonActions & PokemonState> = (set) => ({
  pokemon: null,
  isLoading: false,
  error: null,
  fetchPokemon: async (name) => {
    try {
      set({ isLoading: true });

      const url = `${BASE_URL}/pokemon/${name}`;
      const pokemonData = await fetch(url).then((r) => r.json());
      const speciesData = await fetch(pokemonData.species.url).then((r) =>
        r.json(),
      );

      const evolutionChain = await fetch(speciesData.evolution_chain.url)
        .then((r) => r.json())
        .then((r) => r.chain.evolves_to);

      const pokemon: Pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        image: getImgUrl(pokemonData.id),
        height: pokemonData.height / 10,
        weight: pokemonData.weight / 10,
        stats: pokemonData.stats.map((obj: any) => ({
          name: obj.stat.name,
          value: obj.base_stat,
          effort: obj.effort,
        })),
        habitat: speciesData.habitat,
        about: speciesData.flavor_text_entries
          .find((entry: any) => entry.language.name === "en")
          ?.flavor_text.replace(/[\f\n]/g, " "),
        evolves_to: getEvolution(evolutionChain),
        category: speciesData.genera.find(
          (item: any) => item.language.name === "en",
        )?.genus,
      };

      set({
        pokemon,
        isLoading: false,
      });
    } catch {
      set({ error: "fetchPokemon: something went wrong", isLoading: false });
    }
  },
});

export const usePokemonStore = create<PokemonActions & PokemonState>()(
  devtools(pokemonSlice),
);
