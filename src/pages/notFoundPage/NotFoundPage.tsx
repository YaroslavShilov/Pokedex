import { PsyDuckIcon } from "../../components/PsyDuckIcon.tsx";
import styles from "./notFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className={styles.root}>
      <h2>404</h2>

      <PsyDuckIcon />
    </div>
  );
};
