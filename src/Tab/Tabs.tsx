import { useState, ReactNode, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

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
  label: string;
  children: ReactNode;
}

interface TabsProps {
  defaultActiveIndex?: number;
  tabs: TabProps[];
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultActiveIndex = 0 }, ref) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    return (
      <div ref={ref}>
        <div className="flex space-x-4">
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
                })
              )}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {tabs[activeIndex] && <div>{tabs[activeIndex].children}</div>}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
