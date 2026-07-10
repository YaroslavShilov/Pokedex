import { useEffect, useState } from "react";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { Button } from "../../components/button/Button.tsx";
import { PageTemplate } from "../pageTemplate/PageTemplate.tsx";
import styles from "./home.module.css";

export const Home = () => {
  const [query, setQuery] = useState({
    takeCount: 50,
    offset: 0,
  });

  const { isLoading, pokemons, morePossible, fetchPokemons } =
    usePokemonsStore();

  useEffect(() => {
    fetchPokemons(query);
  }, []);

  const loadMore = () => {
    const newQuery = { ...query, offset: query.offset + query.takeCount };
    setQuery(newQuery);
    fetchPokemons(newQuery);
  };

  return (
    <PageTemplate>
      <div className={styles.list}>
        {pokemons.map(({ name, id, image }) => (
          <div className={styles.card} key={id}>
            <p className={styles.card__name}>{name}</p>
            <p className={styles.card__id}>#{id}</p>
            <div className={styles.card__img}>
              <img src={image} alt={name} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btn}>
        {isLoading && <Spinner center />}
        {!isLoading && morePossible && (
          <Button onClick={loadMore}>Show more</Button>
        )}
      </div>
    </PageTemplate>
  );
};
