import { FC, ReactNode } from "react";

export const Title: FC<{ children?: ReactNode }> = ({ children }) => {
  const className = "text-black";

  return <h1 className={className}>{children}</h1>;
};
