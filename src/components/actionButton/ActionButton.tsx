import type { ComponentProps } from "react";
import { Link, type LinkProps } from "react-router-dom";
import styles from "./actionButton.module.css";

type Link = LinkProps & {
  type: "link";
};

type Button = ComponentProps<"button"> & {
  type: "button";
};

export const ActionButton = (props: Link | Button) => {
  if (props.type === "link") {
    return <Link className={styles.button} {...props} />;
  }

  return <button className={styles.button} {...props} />;
};
