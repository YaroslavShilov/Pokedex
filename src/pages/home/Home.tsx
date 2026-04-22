import { useEffect, useState } from "react";
import {
  type FetchPokemonsParams,
  usePokemonsStore,
} from "../../store/pokemons.ts";
import { Container } from "../../components/container/Container.tsx";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import styles from "./home.module.css";
import { Button } from "../../components/button/Button.tsx";

export const Home = () => {
  const [query, setQuery] = useState<FetchPokemonsParams>({
    takeCount: 50,
    offset: 0,
  });

  const { isLoading, pokemons, fetchPokemons } = usePokemonsStore();

  useEffect(() => {
    fetchPokemons(query);
  }, []);

  const loadMore = () => {
    const newQuery = { ...query, offset: query.offset + query.takeCount };
    setQuery(newQuery);
    fetchPokemons(newQuery);
  };

  return (
    <Container>
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
      {!isLoading && (
        <div className={styles.btn}>
          <Button onClick={loadMore}>Show more</Button>
        </div>
      )}
      {isLoading && <Spinner space={"40px auto"} />}
    </Container>
  );
};
