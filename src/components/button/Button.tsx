import * as React from "react";
import styles from "./button.module.css";
import { clsx } from "clsx";

type Button = {
  size?: "l" | "m";
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = ({ onClick, disabled, size = "l", children }: Button) => (
  <button
    className={clsx(styles.btn, {
      [styles.btn_l]: size === "l",
      [styles.btn_m]: size === "m",
      [styles.btn_disabled]: disabled,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);
