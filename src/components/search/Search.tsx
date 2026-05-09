import styles from "./search.module.css";
import { type ChangeEvent, useState } from "react";
import { Button } from "../button/Button.tsx";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  const [search, setSearch] = useState("");

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className={styles.root}>
      <input
        value={search}
        className={styles.field}
        placeholder="Search by name or number"
        type="text"
        onChange={searchHandler}
      />
      <div className={styles.btn}>
        <Button onClick={() => {}} size={"m"} disabled={!search.trim()}>
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};
