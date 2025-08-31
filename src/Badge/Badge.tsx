import { FC, HTMLAttributes, ElementType, forwardRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

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
  colVariant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  background?: "default" | "primary" | "success" | "warning" | "danger";
  padding?: "default" | "sm" | "md";
  rounded?: "basic" | "sm" | "md" | "lg";
  tKey?: string;
  language?: "es" | "en" | "pt";
  font?: "bold" | "semi" | "normal";
}

const Badge: FC<BadgeProps> = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      as: Component = "span",
      children,
      className,
      colVariant,
      size,
      font,
      background,
      padding,
      rounded,
      tKey,
      language,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);
    return (
      <Component
        ref={ref}
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
        {tKey ? t(tKey) : children}
      </Component>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
