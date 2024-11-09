import { FC, HTMLAttributes, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const badgeStyle = cva("font-bold", {
  variants: {
    colVariant: {
      default: "text-black-500",
      primary: "text-blue-500",
      success: "text-green-500",
      warning: "text-orange-500",
      danger: "text-red-500",
    },
    font: {
      bold: "font-bold",
      semi: "font-semibold",
      normal: "font-normal",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-xl",
      lg: "text-2xl",
    },
    background: {
      default: "bg-transparent",
      primary: "bg-blue-100",
      success: "bg-green-100",
      warning: "bg-orange-100",
      danger: "bg-red-100",
    },
    padding: {
      default: "p-0",
      sm: "p-1",
      md: "p-3",
    },
    rounded: {
      basic: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-2xl",
    },
  },
  defaultVariants: {
    colVariant: "default",
    size: "md",
    font: "normal",
    background: "default",
    padding: "md",
    rounded: "sm",
  },
});

interface BadgeProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof badgeStyle> {
  as?: ElementType;
}

export const Badge: FC<BadgeProps> = ({
  as: Component = "span",
  children,
  className,
  colVariant,
  size,
  font,
  background,
  padding,
  rounded,
  ...props
}) => {
  return (
    <Component
      className={cn(
        badgeStyle({
          colVariant,
          size,
          font,
          background,
          padding,
          rounded,
          className,
        })
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
