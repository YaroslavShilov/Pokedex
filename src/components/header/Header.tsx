import { Search } from "../search/Search.tsx";
import { HeartIcon, HomeIcon } from "lucide-react";
import { Container } from "../container/Container.tsx";
import { Button } from "../button/Button.tsx";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <Container>
      <div className={styles.header}>
        <Button elType={"link"} to={"/"} size={"s"}>
          <HomeIcon />
        </Button>

        <div className={styles.search}>
          <Search />
        </div>

        <Button elType={"link"} size={"s"} type="link" to={"/favorite"}>
          <HeartIcon />
        </Button>
      </div>
    </Container>
  );
};
