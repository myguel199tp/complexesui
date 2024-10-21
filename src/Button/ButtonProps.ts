import { PropsWithChildren } from "react";

export interface ButtonProps extends PropsWithChildren {
  primary?: boolean;
  label?: string;
}
