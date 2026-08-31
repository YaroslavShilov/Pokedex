import { Search } from "../search/Search.tsx";
import { HeartIcon, HomeIcon } from "lucide-react";
import { Container } from "../container/Container.tsx";
import { Button } from "../button/Button.tsx";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <Container>
      <div className={styles.header}>
        <div className={styles.btn}>
          <Button as={"link"} to={"/"} size={"s"}>
            <HomeIcon />
          </Button>
        </div>

        <div className={styles.search}>
          <Search />
        </div>

        <div className={styles.btn}>
          <Button as={"link"} size={"s"} type="link" to={"/favorites"}>
            <HeartIcon />
          </Button>
        </div>
      </div>
    </Container>
  );
};
