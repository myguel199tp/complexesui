"use client";

import { FC, HTMLAttributes, forwardRef, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { Badge, Text } from "../main";
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
  extends HTMLAttributes<HTMLDivElement>,
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
  searchable?: boolean; // 🔹 nueva prop
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
      defaultOption,
      required = false,
      tKeyLabel,
      tKeyHelpText,
      tKeyError,
      tKeyDefaultOption,
      language,
      sizeHelp,
      hidden,
      id,
      searchable = false, // 🔹 por defecto false
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [search, setSearch] = useState(""); // 🔹 estado de búsqueda
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
      return <div ref={ref} hidden {...props} />;
    }

    const selectedOptions = options.filter((opt) =>
      selected.includes(opt.value)
    );

    // 🔹 Filtrar opciones si searchable
    const filteredOptions = searchable
      ? options.filter((opt) =>
          (opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label)
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : options;

    return (
      <div ref={ref} {...props} className="relative">
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-700" htmlFor={id}>
            {tKeyLabel ? t(tKeyLabel) : label}{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Input principal */}
        <div
          className={cn(
            field({ inputSize, rounded }),
            className,
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            hasError ? "bg-red-100 border border-red-500" : ""
          )}
          onClick={() => !disabled && setOpen(!open)}
        >
          {(helpText || tKeyHelpText) && !hasError && (
            <Text
              id={`${id}-help`}
              size={sizeHelp ?? "xxs"}
              colVariant="default"
              className="text-gray-500"
            >
              {tKeyHelpText ? t(tKeyHelpText) : helpText}
            </Text>
          )}

          <div className="flex flex-col w-full">
            <div className="flex space-x-2 overflow-x-auto max-w-full no-scrollbar">
              {selected.length === 0 ? (
                <span className="text-gray-500 whitespace-nowrap">
                  {tKeyDefaultOption
                    ? t(tKeyDefaultOption)
                    : defaultOption ?? "Seleccione opciones"}
                  {required && <span className="text-gray-500 ml-1">*</span>}
                </span>
              ) : (
                <>
                  {selectedOptions.slice(0, 3).map((opt) => (
                    <Badge
                      key={opt.value}
                      colVariant="primary"
                      rounded="lg"
                      size="xs"
                      background="primary"
                    >
                      {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                    </Badge>
                  ))}
                  {selected.length > 3 &&
                    (!showAll ? (
                      <span
                        className="text-gray-500 whitespace-nowrap cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAll(true);
                        }}
                      >
                        +{selected.length - 3}
                      </span>
                    ) : (
                      <div className="mt-2 bg-gray-100 rounded-md shadow-sm p-2 space-y-2">
                        {selectedOptions.slice(3).map((opt) => (
                          <div key={opt.value} className="flex items-center">
                            {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                          </div>
                        ))}
                        <span
                          className="text-gray-500 whitespace-nowrap cursor-pointer block text-right"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAll(false);
                          }}
                        >
                          Ver menos
                        </span>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {open && !disabled && (
          <div className="absolute left-0 top-full w-full bg-gray-200 border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto z-10">
            {/* 🔹 Input de búsqueda */}
            {searchable && (
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Buscar...")}
                className="w-full bg-gray-200 h-10 p-2 py-1 text-sm border-b focus:outline-none"
              />
            )}

            {/* Opciones */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center px-3 py-2 hover:bg-gray-300 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.value)}
                    onChange={() => toggleOption(opt.value)}
                    className="mr-2"
                  />
                  {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                </label>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">
                {t("No hay opciones")}
              </div>
            )}
          </div>
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
