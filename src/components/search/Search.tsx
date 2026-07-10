import { type ChangeEvent, type FormEventHandler, useState } from "react";
import { Button } from "../button/Button.tsx";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";

export const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/pokemon/${search}`);
    }
  };

  return (
    <form className={styles.root} onSubmit={submitHandler}>
      <input
        value={search}
        className={styles.field}
        placeholder="Search by name or number"
        type="text"
        onChange={searchHandler}
      />
      <div className={styles.btn}>
        <Button type={"submit"} size={"m"} disabled={!search.trim()}>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};
