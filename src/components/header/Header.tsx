import { Search } from "../search/Search.tsx";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div>
      <div className={styles.search}>
        <Search />
      </div>
    </div>
  );
};
