import styles from "./button.module.css";
import { clsx } from "clsx";
import { Link, type LinkProps } from "react-router-dom";
import type { ComponentProps } from "react";

type General = {
  size?: "l" | "m" | "s";
};

type Link = General &
  LinkProps & {
    elType: "link";
  };

type Button = General &
  ComponentProps<"button"> & {
    elType: "button";
  };

export const Button = ({ size = "l", ...props }: Link | Button) => {
  const className = clsx(styles.btn, {
    [styles.btn_l]: size === "l",
    [styles.btn_m]: size === "m",
    [styles.btn_s]: size === "s",
    [styles.btn_disabled]: props.elType === "button" && props.disabled,
  });

  if (props.elType === "link") {
    return <Link className={className} {...props} />;
  }

  return <button className={className} {...props} />;
};
