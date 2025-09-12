"use client";

import { FC, HTMLAttributes, forwardRef, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { Text } from "../main";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const field = cva(
  "inline-block bg-gray-200 px-5 py-3 font-thin border-none w-full focus:outline-none",
  {
    variants: {
      rounded: {
        basic: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-2xl",
      },
      inputSize: {
        sm: "py-1 px-2 text-xs",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
        full: "py-3 px-6 text-lg w-full",
      },
    },
    defaultVariants: {
      inputSize: "md",
      rounded: "md",
    },
  }
);

interface Option {
  value: string;
  label: string;
  tKeyLabel?: string;
}

interface MultiSelectProps
  extends HTMLAttributes<HTMLDivElement>, // 🔹 corregido
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  errorMessage?: string;
  helpText?: string;
  options: Option[];
  defaultOption?: string;
  required?: boolean;
  rounded?: "sm" | "md" | "lg" | "basic";
  inputSize?: "sm" | "md" | "lg" | "full";

  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyDefaultOption?: string;
  language?: "es" | "en" | "pt";
  disabled: boolean;

  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
}

const MultiSelect: FC<MultiSelectProps> = forwardRef<
  HTMLDivElement,
  MultiSelectProps
>(
  (
    {
      className,
      inputSize,
      rounded,
      disabled,
      label,
      hasError = false,
      errorMessage = "There was an error",
      helpText,
      options,
      defaultOption = "Seleccione opciones",
      required = false,
      tKeyLabel,
      tKeyHelpText,
      tKeyError,
      tKeyDefaultOption,
      language,
      sizeHelp,
      hidden,
      id,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);

    const toggleOption = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    };

    if (hidden) {
      return <div ref={ref} hidden {...props} />; // 🔹 cambiado a div
    }

    return (
      <div ref={ref} {...props}>
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-700" htmlFor={id}>
            {tKeyLabel ? t(tKeyLabel) : label}{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Contenedor principal */}
        <div
          className={cn(
            field({ inputSize, rounded }),
            className, // 🔹 ya se usa className
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            hasError ? "bg-red-100 border border-red-500" : ""
          )}
          onClick={() => !disabled && setOpen(!open)}
        >
          <span className="truncate">
            {selected.length > 0
              ? `${selected.length} ${t("selected")}`
              : tKeyDefaultOption
              ? t(tKeyDefaultOption)
              : defaultOption}
          </span>
        </div>

        {/* Dropdown */}
        {open && !disabled && (
          <div className="bg-gray-200 border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt.value)}
                  onChange={() => toggleOption(opt.value)}
                  className="mr-2"
                />
                {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
              </label>
            ))}
          </div>
        )}

        {/* Mensajes */}
        {(helpText || tKeyHelpText) && !hasError && (
          <Text id={`${id}-help`} size={sizeHelp ?? "xxs"} colVariant="default">
            {tKeyHelpText ? t(tKeyHelpText) : helpText}
          </Text>
        )}

        {hasError && (
          <Text id={`${id}-error`} colVariant="danger" size="xs">
            {tKeyError ? t(tKeyError) : errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
export { MultiSelect };
