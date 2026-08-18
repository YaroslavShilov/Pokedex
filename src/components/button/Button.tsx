import styles from "./button.module.css";
import { clsx } from "clsx";
import { Link, type LinkProps } from "react-router-dom";
import type { ComponentProps } from "react";

type General = {
  size?: "l" | "m" | "s";
};

type Link = General &
  LinkProps & {
    as: "link";
  };

type Button = General &
  ComponentProps<"button"> & {
    as: "button";
  };

export const Button = ({ size = "l", ...props }: Link | Button) => {
  const className = clsx(styles.btn, styles[`btn_${size}`], {
    [styles.btn_disabled]: props.as === "button" && props.disabled,
  });

  if (props.as === "link") {
    return <Link className={className} {...props} />;
  }

  return <button className={className} {...props} />;
};
