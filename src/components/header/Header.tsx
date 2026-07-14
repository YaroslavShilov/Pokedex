import { Search } from "../search/Search.tsx";
import styles from "./header.module.css";
import { HeartIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../container/Container.tsx";

export const Header = () => {
  return (
    <Container>
      <div className={styles.header}>
        <Link className={styles.link} to={"/"}>
          <HomeIcon />
        </Link>

        <div className={styles.search}>
          <Search />
        </div>

        <Link className={styles.link} to={"/favorite"}>
          <HeartIcon />
        </Link>
      </div>
    </Container>
  );
};
