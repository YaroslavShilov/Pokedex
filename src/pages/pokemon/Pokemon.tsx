import { useNavigate, useParams } from "react-router-dom";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Fragment, useEffect, useState } from "react";
import { usePokemonStore } from "../../store/pokemon.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { NotFoundPage } from "../notFoundPage/NotFoundPage.tsx";
import styles from "./pokemon.module.css";
import { PsyDuckIcon } from "../../components/PsyDuckIcon.tsx";
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
    // id: number | string;
  // name: string;
  // image: string;
  // weight: number; // kg
  // height: number; // m
  // stats: { name: string; value: number; effort: number }[];
  // habitat: string;
  // about: string;
  // category: string;
  evolves_to: {
    evolves_to: Pokemon["evolves_to"];
    image: string;
    name: string;
    id: number | string;
  }[];
  // type: {
  //   primary: string;
  //   secondary?: string;
  // };
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
          <div className={styles.cont}>
            <div>
              <h2 className={styles.name}>{pokemon.name}</h2>
              <p className={styles.id}>#{pokemon.id}</p>
              <div className={styles.img}>
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
              <p className={styles.about}>{pokemon.about}</p>
            </div>
            <div>
              <div className={styles.cols}>
                <div className={styles.cols__head}>
                  <p>
                    <span>{pokemon.type.primary}</span>
                    {pokemon.type.secondary && (
                      <Fragment>
                        {" / "}
                        <span>{pokemon.type.secondary}</span>
                      </Fragment>
                    )}
                  </p>
                  <p>Type</p>
                </div>
                <div>
                  <p>{pokemon.height}m</p>
                  <p>Height</p>
                </div>

                <div>
                  <p>{pokemon.weight}kg</p>
                  <p>Weight</p>
                </div>

                <div>
                  <p>{pokemon.habitat}</p>
                  <p>Habitat</p>
                </div>

                <div>
                  <p>{pokemon.category}</p>
                  <p>Category</p>
                </div>
              </div>

              <div className={styles.cols}>
                <div className={styles.cols__head}>
                  <p>Stats</p>
                  <p />
                </div>

                {pokemon.stats.map(({ name, value }) => (
                  <div key={name}>
                    <p>{value}</p>
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
