import { Link } from "react-router-dom";
import type { Pokemon } from "../../store/pokemons.ts";
import styles from "./card.module.css";

type Card = Pokemon & {
  size?: "l" | "m";
};

export const Card = ({ name, id, image, favorite, size = "l" }: Card) => (
  <Link className={styles[`card_${size}`]} to={`/pokemon/${id}`} key={id}>
    <span className={styles.card__name}>{name}</span>
    <span className={styles.card__id}>#{id}</span>
    <span className={styles.card__img}>
      <img src={image} alt={name} />
    </span>
    {favorite ? "t" : "f"}
  </Link>
);
