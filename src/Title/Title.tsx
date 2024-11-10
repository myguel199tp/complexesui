import { ElementType, FC, HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const titleStyle = cva("font-bold", {
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
      xs: "text-2xl",
      sm: "text-3xl",
      md: "text-5xl",
      lg: "text-7xl",
    },
  },
  defaultVariants: {
    colVariant: "default",
    size: "md",
    font: "normal",
  },
});

interface TitleProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof titleStyle> {
  as?: ElementType;
  colVariant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  font?: "bold" | "semi" | "normal";
}

const Title: FC<TitleProps> = forwardRef<HTMLParagraphElement, TitleProps>(
  (
    {
      as: Component = "h1",
      children,
      className,
      colVariant,
      size,
      font,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(titleStyle({ colVariant, size, font, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Title.displayName = "Title";
export { Title };
