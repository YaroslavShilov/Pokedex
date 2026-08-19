import { Fragment, useEffect, useState } from "react";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { Button } from "../../components/button/Button.tsx";
import { Link } from "react-router-dom";
import styles from "./favorites.module.css";
import { Card } from "../../components/card/Card.tsx";
import { Empty } from "../../components/empty/Empty.tsx";

const initialQuery = { takeCount: 24, offset: 0 };

export const Favorites = () => {
  const [query, setQuery] = useState(initialQuery);

  const { isLoading, pokemons, morePossible, fetchPokemons } =
    usePokemonsStore();

  useEffect(() => {
    fetchPokemons(initialQuery);
  }, [fetchPokemons]);

  return (
    <Fragment>
      <h2 className={styles.title}>Favorites</h2>

      <Empty title={`Your favorite pokemons`} desc="Not Found" />

      {isLoading ? (
        <Spinner center />
      ) : (
        <div className={styles.list}>
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} {...pokemon} />
          ))}
        </div>
      )}
    </Fragment>
  );
};
