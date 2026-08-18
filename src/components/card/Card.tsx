import { Link } from "react-router-dom";
import type { Pokemon } from "../../store/pokemons.ts";
import styles from "./card.module.css";

export const Card = ({ name, id, image, favorite }: Pokemon) => {
  return (
    <Link className={styles.card} to={`/pokemon/${id}`} key={id}>
      <span className={styles.card__name}>{name}</span>
      <span className={styles.card__id}>#{id}</span>
      <span className={styles.card__img}>
        <img src={image} alt={name} />
      </span>
      {favorite ? "t" : "f"}
    </Link>
  );
};
