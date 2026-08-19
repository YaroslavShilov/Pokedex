import { PsyDuckIcon } from "../PsyDuckIcon.tsx";
import styles from "./empty.module.css";

type Empty = {
  title: string;
  desc: string;
};

export const Empty = ({ title, desc }: Empty) => {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <PsyDuckIcon />
    </div>
  );
};
