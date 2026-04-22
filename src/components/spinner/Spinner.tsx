import type { CSSProperties } from "react";
import { clsx } from "clsx";
import styles from "./spinner.module.css";

export type Spinner = {
  center?: boolean;
  space?: CSSProperties["margin"];
};

export const Spinner = ({ center, space }: Spinner) => {
  const margin = space ? { margin: space } : {};

  return (
    <div
      className={clsx(styles.spinner, {
        [styles.spinner_center]: center,
      })}
      style={{ ...margin }}
    />
  );
};
