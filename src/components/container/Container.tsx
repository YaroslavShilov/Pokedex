import type { ReactNode } from "react";
import styles from "./container.module.css";

export const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>{children}</div>
);
