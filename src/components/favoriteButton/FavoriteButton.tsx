import * as React from "react";
import { clsx } from "clsx";
import { HeartIcon } from "lucide-react";
import styles from "./favoriteButton.module.css";

export type FavoriteButton = {
  size?: "l" | "m";
  isFavorite: boolean;
  isLoading: boolean;
  removeFavorite: () => void;
  addFavorite: () => void;
};

export const FavoriteButton = ({
  size = "l",
  isFavorite,
  isLoading,
  removeFavorite,
  addFavorite,
}: FavoriteButton) => {
  const favoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isLoading) {
      if (isFavorite) {
        return removeFavorite();
      }

      addFavorite();
    }
  };

  return (
    <button
      type="button"
      className={clsx(styles[`favorite_${size}`], {
        [styles.favorite_active]: isFavorite,
      })}
      onClick={favoriteHandler}
    >
      <HeartIcon />
    </button>
  );
};
