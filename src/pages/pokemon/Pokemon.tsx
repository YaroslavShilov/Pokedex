import { useParams } from "react-router-dom";
import { PageTemplate } from "../pageTemplate/PageTemplate.tsx";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Fragment, useEffect, useState } from "react";
import { usePokemonStore } from "../../store/pokemon.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";

export const Pokemon = () => {
  const { id } = useParams<{ id: string }>();

  const { pokemon, isLoading, fetchPokemon } = usePokemonStore();

  useEffect(() => {
    if (id) {
      fetchPokemon(id);
    }
  }, [id, fetchPokemon]);

  console.log("pokemon: ", pokemon);
  /*
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
   */

  return (
    <PageTemplate>
      {isLoading || !pokemon ? (
        <Spinner center />
      ) : (
        <Fragment>Pokemon</Fragment>
      )}
    </PageTemplate>
  );
};
