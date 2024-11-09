import { FC, HTMLAttributes, ElementType, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const textStyle = cva("font-bold", {
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
  },
  defaultVariants: {
    colVariant: "default",
    size: "md",
    font: "normal",
  },
});

interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textStyle> {
  as?: ElementType;
}

const Text: FC<TextProps> = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "p",
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
        className={cn(textStyle({ colVariant, size, font, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
export { Text };
