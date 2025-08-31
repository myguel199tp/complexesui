import React, { useState, useRef, forwardRef, Ref, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string; // 👉 permite cambiar colores, tamaños, etc.
  maxWidth?: string;
  maxHeight?: string;
  tKey?: string;
  language?: "es" | "en" | "pt";
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = "top",
      className = "",
      maxWidth = "16rem",
      maxHeight = "8rem",
      tKey,
      language,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const positionClasses = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    };

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => setIsVisible(false), 200);
    };

    const { t } = useTranslation();

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);

    return (
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >
        {children}
        {isVisible && (
          <div
            className={`
              absolute z-10 rounded px-3 py-2 shadow-lg overflow-auto
              text-sm
              ${positionClasses[position]}
              ${className}   // 👉 esto sobrescribe el default
            `}
            style={{
              maxWidth,
              maxHeight,
              whiteSpace: "normal",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {tKey ? t(tKey) : content}
          </div>
        )}
      </div>
    );
  }
);
