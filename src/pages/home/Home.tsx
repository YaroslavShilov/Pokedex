import { Fragment, useEffect, useState } from "react";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { Button } from "../../components/button/Button.tsx";
import { Card } from "../../components/card/Card.tsx";
import styles from "./home.module.css";

const initialQuery = { takeCount: 24, offset: 0 };

export const Home = () => {
  const [query, setQuery] = useState(initialQuery);

  const { isLoading, pokemons, morePossible, fetchPokemons } =
    usePokemonsStore();

  useEffect(() => {
    fetchPokemons(initialQuery);
  }, [fetchPokemons]);

  const loadMore = () => {
    const newQuery = { ...query, offset: query.offset + query.takeCount };
    setQuery(newQuery);
    fetchPokemons(newQuery);
  };

  return (
    <Fragment>
      <div className={styles.list}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} {...pokemon} />
        ))}
      </div>
      <div className={styles.btn}>
        {isLoading && <Spinner center />}
        {!isLoading && morePossible && (
          <Button as={"button"} onClick={loadMore}>
            Show more
          </Button>
        )}
      </div>
    </Fragment>
  );
};
