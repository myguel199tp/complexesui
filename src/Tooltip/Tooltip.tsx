import React, { useState, useRef, forwardRef, Ref } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  maxWidth?: string;
  maxHeight?: string;
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
            className={`absolute z-10 bg-gray-800 text-white text-sm rounded px-3 py-2 shadow-lg overflow-auto ${positionClasses[position]} ${className}`}
            style={{
              maxWidth,
              maxHeight,
              whiteSpace: "normal",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
