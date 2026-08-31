import { Fragment, useEffect, useEffectEvent, useState } from "react";
import { usePokemonsStore } from "../../store/pokemons.ts";
import { useFavoritesStore } from "../../store/favorites.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
// import { Button } from "../../components/button/Button.tsx";
import { Card } from "../../components/card/Card.tsx";
import styles from "./home.module.css";

const initialQuery = { takeCount: 24, offset: 0 };

export const Home = () => {
  const [query, setQuery] = useState(initialQuery);

  const { isLoading, pokemons, morePossible, fetchPokemons } =
    usePokemonsStore();

  const { favorites, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    fetchPokemons(query);
  }, [query, fetchPokemons]);

  const handleScroll = useEffectEvent(() => {
    if (
      !isLoading &&
      morePossible &&
      document.body.scrollHeight - 300 < window.scrollY + window.innerHeight
    ) {
      setQuery((query) => ({
        ...query,
        offset: query.offset + query.takeCount,
      }));
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <div className={styles.list}>
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            {...pokemon}
            isFavorite={!!favorites[pokemon.id]}
          />
        ))}
      </div>
      <div className={styles.btn}>
        {isLoading && <Spinner center />}
        {/* Changed to infinity scroll
        {!isLoading && morePossible && (
          <Button as={"button"} onClick={loadMore}>
            Show more
          </Button>
        )}
*/}
      </div>
    </Fragment>
  );
};
