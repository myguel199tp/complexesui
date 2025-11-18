import {
  FC,
  HTMLAttributes,
  ElementType,
  forwardRef,
  useEffect,
  ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const textStyle = cva("font-bold", {
  variants: {
    colVariant: {
      default: "text-black-500",
      primary: "text-blue-500",
      success: "text-green-500",
      warning: "text-orange-500",
      on: "text-white",
      danger: "text-red-500",
    },
    font: {
      bold: "font-bold",
      semi: "font-semibold",
      normal: "font-normal",
    },
    size: {
      xxs: "text-[10px]",
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
  colVariant?: "default" | "primary" | "success" | "warning" | "danger" | "on";
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  font?: "bold" | "semi" | "normal";
  tKey?: string;
  language?: "es" | "en" | "pt";
  children?: ReactNode;
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
      tKey,
      language,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    // Cambiar idioma si se pasa "language"
    useEffect(() => {
      if (language) i18n.changeLanguage(language);
    }, [language]);

    // Opción C implementada:
    // 1. Si viene tKey → se usa traducción
    // 2. Si NO viene tKey → se usa children
    const renderContent = tKey ? t(tKey) : children;

    return (
      <Component
        ref={ref}
        className={cn(textStyle({ colVariant, size, font }), className)}
        {...props}
      >
        {renderContent}
      </Component>
    );
  }
);

Text.displayName = "Text";
export { Text };
