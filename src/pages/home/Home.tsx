import { Fragment, useEffect, useState } from "react";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { Button } from "../../components/button/Button.tsx";
import { Link } from "react-router-dom";
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
        {pokemons.map(({ name, id, image }) => (
          <Link className={styles.card} to={`/pokemon/${id}`} key={id}>
            <span className={styles.card__name}>{name}</span>
            <span className={styles.card__id}>#{id}</span>
            <span className={styles.card__img}>
              <img src={image} alt={name} />
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.btn}>
        {isLoading && <Spinner center />}
        {!isLoading && morePossible && (
          <Button onClick={loadMore}>Show more</Button>
        )}
      </div>
    </Fragment>
  );
};
