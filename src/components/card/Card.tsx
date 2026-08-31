import * as React from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../../store/pokemons.ts";
import { useFavoritesStore } from "../../store/favorites.ts";
import { FavoriteButton } from "../favoriteButton/FavoriteButton.tsx";
import styles from "./card.module.css";

type Card = Pokemon & {
  size?: "l" | "m";
  isFavorite: boolean;
};

export const Card = ({ name, id, image, isFavorite, size = "l" }: Card) => {
  const { isLoading, removeFavorite, addFavorite } = useFavoritesStore();
  // const navigate = useNavigate();
  const favoriteWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const link = `/pokemon/${id}`;

  return (
    <div
      className={styles[`card_${size}`]}
      // onClick={() => navigate(`/pokemon/${id}`)}
    >
      <Link className={styles.name} to={link}>
        {name}
      </Link>
      <br />
      <Link className={styles.id} to={link}>
        #{id}
      </Link>
      <Link className={styles.img} to={link}>
        <img src={image} alt={name} />
      </Link>

      <div className={styles.favorite} onClick={favoriteWrapper}>
        <FavoriteButton
          size="l"
          isFavorite={isFavorite}
          isLoading={isLoading}
          removeFavorite={() => removeFavorite(id)}
          addFavorite={() => addFavorite({ name, id, image })}
        />
      </div>
    </div>
  );
};
