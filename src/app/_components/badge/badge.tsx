import { ReactNode } from "react";
import { ComponentBase } from "../types/component-base.type";
import classNames from "classnames";
import { Size } from "../types/size.type";

export type BadgeProps = Omit<ComponentBase, "isDisabled"> & {
  children: ReactNode;
};

const sizeClasses: Record<Size, string> = {
  tiny: "badge-xs",
  small: "badge-s",
  normal: "badge-md",
  large: "badge-lg",
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  className,
  size = "tiny",
  children,
}: BadgeProps) => {
  const classes = classNames([
    "badge",
    className,
    { [`badge-${variant}`]: variant },
    { [`${sizeClasses[size]}`]: size },
  ]);
  return <span className={classes}>{children}</span>;
};
