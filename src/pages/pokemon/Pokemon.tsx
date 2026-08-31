import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import {
  type Pokemon as PokemonType,
  usePokemonStore,
} from "../../store/pokemon.ts";
import { Spinner } from "../../components/spinner/Spinner.tsx";
import { MoveRightIcon } from "lucide-react";
import { Card } from "../../components/card/Card.tsx";
import { Empty } from "../../components/empty/Empty.tsx";
import {
  type FavoritesState,
  useFavoritesStore,
} from "../../store/favorites.ts";
import { FavoriteButton } from "../../components/favoriteButton/FavoriteButton.tsx";
import styles from "./pokemon.module.css";

export const Pokemon = () => {
  const { id } = useParams<{ id: string }>();

  const {
    pokemon,
    isLoading: pokemonLoading,
    fetchPokemon,
  } = usePokemonStore();
  const {
    favorites,
    isLoading: favoritesLoading,
    fetchFavorites,
    addFavorite,
    removeFavorite,
  } = useFavoritesStore();

  useEffect(() => {
    if (id) {
      fetchPokemon(id);
      fetchFavorites();
    }
  }, [id, fetchPokemon, fetchFavorites]);

  const isLoading = pokemonLoading;

  return (
    <div className={styles.root}>
      {isLoading && <Spinner center />}
      {!isLoading && !pokemon && (
        <Empty title={`Pokemon: ${id}`} desc="Not Found" />
      )}
      {!isLoading && pokemon && (
        <Fragment>
          <div className={styles.cont}>
            <div>
              <h2 className={styles.name}>{pokemon.name}</h2>
              <p className={styles.id}>#{pokemon.id}</p>
              <div className={styles.img}>
                <img src={pokemon.image} alt={pokemon.name} />
                <div className={styles.favorite}>
                  <FavoriteButton
                    isFavorite={!!favorites[pokemon.id]}
                    isLoading={favoritesLoading}
                    removeFavorite={() => removeFavorite(pokemon.id)}
                    addFavorite={() =>
                      addFavorite({
                        name: pokemon.name,
                        id: pokemon.id,
                        image: pokemon.image,
                      })
                    }
                  />
                </div>
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

          <div className={styles.evolutionWrapper}>
            <h3 className={styles.evolutionWrapper__title}>Evolution</h3>
            <div className={styles.evolutionWrapper__tree}>
              {pokemon.evolves_to.length > 0 && (
                <EvolutionTree
                  favorites={favorites}
                  evolute_to={pokemon.evolves_to}
                />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const EvolutionTree = ({
  evolute_to,
  favorites,
}: {
  favorites: FavoritesState["favorites"];
  evolute_to: PokemonType["evolves_to"];
}) => (
  <div className={styles.evolution}>
    {evolute_to.map((evolute) => (
      <div className={styles.evolution__section} key={evolute.id}>
        <Card
          size="m"
          id={evolute.id}
          name={evolute.name}
          image={evolute.image}
          isFavorite={!!favorites[evolute.id]}
        />

        {evolute.evolves_to.length > 0 && (
          <Fragment>
            <div className={styles.evolution__arrow}>
              <MoveRightIcon />
            </div>
            <div>
              <EvolutionTree
                favorites={favorites}
                evolute_to={evolute.evolves_to}
              />
            </div>
          </Fragment>
        )}
      </div>
    ))}
  </div>
);
