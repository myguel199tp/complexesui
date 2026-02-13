"use client";
import { useState, ReactNode, forwardRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const tabStyle = cva("font-bold", {
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

interface TabProps extends VariantProps<typeof tabStyle> {
  label?: string;
  tKey?: string; // <-- para traducción
  children: ReactNode;
}

interface TabsProps {
  defaultActiveIndex?: number;
  tabs: TabProps[];
  language?: "es" | "en" | "pt"; // <-- idioma global
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultActiveIndex = 0, language }, ref) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const { t } = useTranslation();

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);

    return (
      <div ref={ref}>
        <div
          className={cn(
            "flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0",
          )}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                tabStyle({
                  colVariant: activeIndex === index ? "primary" : "default",
                  font: activeIndex === index ? "bold" : "normal",
                  size: tab.size,
                  background: tab.background,
                  padding: tab.padding,
                  rounded: tab.rounded,
                }),
              )}
              onClick={() => setActiveIndex(index)}
            >
              {tab.tKey ? t(tab.tKey) : tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tabs[activeIndex] && <div>{tabs[activeIndex].children}</div>}
        </div>
      </div>
    );
  },
);

Tabs.displayName = "Tabs";
