import { useNavigate, useParams } from "react-router-dom";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Fragment, useEffect, useState } from "react";
import { usePokemonStore } from "../../store/pokemon.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { NotFoundPage } from "../notFoundPage/NotFoundPage.tsx";
import styles from "./pokemon.module.css";
import { PsyDuckIcon } from "../../components/PsyDuckIcon.tsx";
import { ActionButton } from "../../components/actionButton/ActionButton.tsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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
  type: {
    primary: string;
    secondary?: string;
  };
   */

  return (
    <div className={styles.root}>
      {isLoading && <Spinner center />}
      {!isLoading && !pokemon && (
        <div className={styles.notFound}>
          <h2>Pokemon: {id}</h2>
          <p>Not Found</p>
          <PsyDuckIcon />
        </div>
      )}
      {!isLoading && pokemon && (
        <Fragment>
          <h2 className={styles.name}>{pokemon.name}</h2>
          <p className={styles.id}>#{pokemon.id}</p>
        </Fragment>
      )}
    </div>
  );
};
