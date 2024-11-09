import { ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const button = cva("inline-block bg-blue-400 px-5 py-3 font-bold", {
  variants: {
    colVariant: {
      default: "bg-slate-400 text-white",
      primary: "bg-blue-400 text-white",
      success: "bg-green-400 text-white",
      warning: "bg-orange-400 text-white",
      danger: "bg-red-400 text-white",
    },
    rounded: {
      basic: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-2xl",
    },
    size: {
      sm: "py-1 px-2 text-xs",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
      full: "py-3 px-6 text-lg w-full",
    },
    fonts: {
      bold: "font-bold",
      semi: "font-semibold",
      thin: "font-light",
    },
  },
  defaultVariants: {
    colVariant: "default",
    size: "md",
    rounded: "md",
    fonts: "semi",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  colVariant,
  size,
  rounded,
  fonts,
  disabled,
  ...props
}) => {
  const buttonClass = cn(
    button({ colVariant, size, fonts, rounded, className })
  );

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${buttonClass} ${disabledClass}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
