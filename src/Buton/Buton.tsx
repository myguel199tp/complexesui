import { ButtonHTMLAttributes, FC, forwardRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const button = cva(
  "inline-block border-2 px-5 py-3 font-bold transition-all duration-200",
  {
    variants: {
      colVariant: {
        default: "border-slate-400",
        primary: "border-blue-400 bg-blue-50 hover:bg-blue-100 text-blue-600",
        success:
          "border-green-400 bg-green-50 hover:bg-green-100 text-green-600",
        warning:
          "border-orange-400 bg-orange-50 hover:bg-orange-100 text-orange-600",
        danger: "border-red-400 bg-red-50 hover:bg-red-100 text-red-600",
        none: "border-none bg-transparent text-inherit",
      },
      rounded: {
        basic: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-2xl",
      },
      size: {
        xs: "py-0.5 px-1 text-[10px]",
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
      borderWidth: {
        none: "border-0",
        thin: "border-2",
        semi: "border-4",
        bold: "border-8",
      },
    },
    defaultVariants: {
      colVariant: "default",
      size: "md",
      rounded: "md",
      fonts: "semi",
      borderWidth: "semi",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  colVariant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "none";
  rounded?: "basic" | "sm" | "md" | "lg";
  size?: "xs" | "sm" | "md" | "lg" | "full";
  fonts?: "bold" | "semi" | "thin";
  borderWidth?: "bold" | "semi" | "thin";
  tKey?: string;
  language?: "es" | "en" | "pt";
}

const Buton: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      colVariant,
      size,
      fonts,
      rounded,
      disabled,
      borderWidth,
      tKey,
      language,
      ...props
    },
    ref
  ) => {
    const buttonClass = cn(
      button({ colVariant, fonts, borderWidth, size, rounded, className })
    );

    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
    const { t } = useTranslation();

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);
    return (
      <button
        ref={ref}
        className={`${buttonClass} ${disabledClass}`}
        disabled={disabled}
        {...props}
      >
        {tKey ? t(tKey) : children}
      </button>
    );
  }
);

Buton.displayName = "Button";

export { Buton };
