import * as React from "react";
import styles from "./button.module.css";

type Button = {
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = ({ onClick, children }: Button) => (
  <button className={styles.btn} onClick={onClick}>
    {children}
  </button>
);
