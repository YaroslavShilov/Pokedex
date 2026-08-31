import { Fragment, useEffect } from "react";
// import { Spinner } from "../../components/spinner/Spinner.tsx";
import { Card } from "../../components/card/Card.tsx";
import { Empty } from "../../components/empty/Empty.tsx";
import { useFavoritesStore } from "../../store/favorites.ts";
import styles from "./favorites.module.css";

export const Favorites = () => {
  const { isLoading, favorites, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const pokemons = Object.entries(favorites);

  return (
    <Fragment>
      <h2 className={styles.title}>Favorites</h2>

      {/*{isLoading && <Spinner center />}*/}
      {!isLoading && pokemons.length === 0 && (
        <Empty title={`Your favorite pokemons`} desc="Not Found" />
      )}
      {pokemons.length > 0 && (
        <div className={styles.list}>
          {pokemons.map(([id, pokemon]) => (
            <Card isFavorite={true} key={id} {...pokemon} />
          ))}
        </div>
      )}
    </Fragment>
  );
};
