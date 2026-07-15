import { Search } from "../search/Search.tsx";
import { HeartIcon, HomeIcon } from "lucide-react";
import { Container } from "../container/Container.tsx";
import { ActionButton } from "../actionButton/ActionButton.tsx";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <Container>
      <div className={styles.header}>
        <ActionButton type="link" to={"/"}>
          <HomeIcon />
        </ActionButton>

        <div className={styles.search}>
          <Search />
        </div>

        <ActionButton type="link" to={"/favorite"}>
          <HeartIcon />
        </ActionButton>
      </div>
    </Container>
  );
};
