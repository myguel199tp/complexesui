"use client";
import {
  FC,
  HTMLAttributes,
  ElementType,
  useEffect,
  useState,
  forwardRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const flagStyle = cva("font-bold", {
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

interface FlagProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof flagStyle> {
  as?: ElementType;
  disappearTime?: number;
  colVariant?: "default" | "primary" | "success" | "warning" | "danger";
  font?: "bold" | "semi" | "normal";
  background?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg" | "xs";
  padding?: "sm" | "md" | "default";
  rounded?: "basic" | "sm" | "md" | "lg";
  tKey?: string;
  language?: "es" | "en" | "pt";
}

const Flag: FC<FlagProps> = forwardRef<HTMLElement, FlagProps>(
  (
    {
      children,
      className,
      colVariant,
      size,
      font,
      background,
      padding,
      rounded,
      disappearTime,
      as: Tag = "div",
      tKey,
      language,
      ...props
    },
    ref,
  ) => {
    const [opacity, setOpacity] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);

    useEffect(() => {
      if (disappearTime) {
        const interval = disappearTime / 100;
        const step = 1 / 100;

        const timer = setInterval(() => {
          setOpacity((prev) => Math.max(prev - step, 0));
        }, interval);

        return () => clearInterval(timer);
      }
    }, [disappearTime]);

    if (opacity === 0) {
      return null;
    }

    return (
      <Tag
        ref={ref}
        className={cn(
          flagStyle({
            colVariant,
            size,
            font,
            background,
            padding,
            rounded,
          }),
          className,
        )}
        style={{ opacity }}
        {...props}
      >
        <div> {tKey ? t(tKey) : children}</div>
      </Tag>
    );
  },
);

Flag.displayName = "Flag";

export { Flag };
