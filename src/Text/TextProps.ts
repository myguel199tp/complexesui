import { PropsWithChildren } from "react"

export interface TextProps extends PropsWithChildren {
  sizeClass: "xss" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  children: React.ReactNode;
}



