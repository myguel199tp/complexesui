import { FC } from "react";
import { ButtonProps } from "./ButtonProps";

export const Button: FC<ButtonProps> = ({
  children,
  primary = false,
  label,
}) => {
  const className = primary
    ? "inline-block rounded-md p-4 bg-blue-400 px-5 py-3 font-semibold text-white"
    : "inline-block rounded-md p-4 bg-gray-400 px-5 py-3 font-semibold text-black";

  return <button className={className}>{label ? label : children}</button>;
};
