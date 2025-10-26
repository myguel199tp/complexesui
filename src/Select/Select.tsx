"use client";

import {
  FC,
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { Text } from "../main";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const field = cva(
  "inline-flex items-center gap-2 bg-gray-200 font-thin w-full focus:outline-none transition-all",
  {
    variants: {
      rounded: {
        basic: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-2xl",
      },
      inputSize: {
        xxs: "px-1 py-0.5 text-xxs",
        xs: "px-1.5 py-1 text-xs",
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        full: "px-6 py-3 text-lg w-full",
      },
    },
    defaultVariants: {
      rounded: "md",
      inputSize: "md",
    },
  }
);

// Mapa de padding/texto para opciones
const optionSizeClassMap = {
  xxs: "px-1 py-0.5 text-xxs",
  xs: "px-1.5 py-1 text-xs",
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  full: "px-6 py-3 text-lg",
};

interface Option {
  value: string;
  label: string;
  tKeyLabel?: string;
  icon?: ReactNode;
  image?: string;
}

interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  errorMessage?: string;
  helpText?: string;
  tkeySearch?: string;
  options: Option[];
  defaultOption?: string;
  required?: boolean;
  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyDefaultOption?: string;
  language?: "es" | "en" | "pt";
  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
  searchable?: boolean;
  inputSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "full";
  rounded?: "basic" | "sm" | "md" | "lg";
  prefixElement?: ReactNode;
  prefixImage?: string;
}

const SelectField: FC<SelectFieldProps> = forwardRef<
  HTMLSelectElement,
  SelectFieldProps
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
      defaultOption = "Seleccione una opción",
      required = false,
      tKeyLabel,
      tKeyHelpText,
      tKeyError,
      tKeyDefaultOption,
      language,
      sizeHelp,
      hidden,
      searchable = false,
      prefixElement,
      prefixImage,
      id,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    useEffect(() => {
      if (language) i18n.changeLanguage(language);
    }, [language]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string>(
      (typeof value === "string" && value) ||
        (typeof defaultValue === "string" && defaultValue) ||
        ""
    );

    useEffect(() => {
      if (typeof value === "string") setSelected(value);
    }, [value]);

    useEffect(() => {
      const onDocClick = (e: MouseEvent) => {
        if (!containerRef.current) return;
        if (!containerRef.current.contains(e.target as Node)) setIsOpen(false);
      };
      if (isOpen) document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }, [isOpen]);

    const filteredOptions = searchable
      ? options.filter((opt) =>
          (opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label)
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : options;

    const emitNativeChange = (val: string) => {
      if (onChange) {
        const fakeEvent = {
          target: { value: val },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange(fakeEvent);
      }
    };
    const handleSelect = (valueSelected: string) => {
      const opt = options.find((o) => o.value === valueSelected);
      setSelected(valueSelected);
      setSearch(opt ? (opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label) : ""); // completa el texto con la opción
      setIsOpen(false);
      emitNativeChange(valueSelected);
    };
    if (hidden) return <select ref={ref} hidden {...props} />;

    const selectedOption = options.find((o) => o.value === selected);

    const fieldClass = cn(
      field({ inputSize, rounded }),
      className,
      hasError && "bg-red-100 border border-red-500",
      disabled && "opacity-50 cursor-not-allowed"
    );

    return (
      <div className="w-full" ref={containerRef}>
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-500" htmlFor={id}>
            {tKeyLabel ? t(tKeyLabel) : label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className={fieldClass}>
          {prefixImage && (
            <img
              src={prefixImage}
              alt="prefix"
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          {prefixElement && (
            <div className="flex-shrink-0">{prefixElement}</div>
          )}

          <div className={fieldClass}>
            <div className="relative flex flex-col w-full">
              {/* helpText dentro del recuadro gris */}

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
              {searchable ? (
                <div className="flex items-center gap-2 relative w-full">
                  {prefixImage && (
                    <img
                      src={prefixImage}
                      alt="prefix"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  {prefixElement && (
                    <div className="flex-shrink-0">{prefixElement}</div>
                  )}

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearch(val);
                      if (val.trim() === "") {
                        setSelected(""); // limpia selección al borrar manualmente
                        emitNativeChange("");
                      }
                      setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={
                      tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption
                    }
                    className={cn(
                      "w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 cursor-pointer pr-6",
                      optionSizeClassMap[inputSize ?? "md"]
                    )}
                  />

                  {/* Botón X para limpiar */}
                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSelected("");
                        emitNativeChange("");
                      }}
                      className="absolute right-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  onClick={() => !disabled && setIsOpen((s) => !s)}
                  className="w-full text-left bg-transparent flex flex-col text-gray-700"
                >
                  {selectedOption ? (
                    <div className="flex items-center gap-2">
                      {selectedOption.image && (
                        <img
                          src={selectedOption.image}
                          alt={selectedOption.label}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      {selectedOption.icon && (
                        <div className="flex-shrink-0">
                          {selectedOption.icon}
                        </div>
                      )}
                      <span className="truncate">
                        {selectedOption.tKeyLabel
                          ? t(selectedOption.tKeyLabel)
                          : selectedOption.label}
                      </span>
                    </div>
                  ) : (
                    <span className="truncate text-gray-500">
                      {tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption}
                    </span>
                  )}
                </button>
              )}

              {/* Dropdown */}
              {isOpen && !disabled && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-72 overflow-auto">
                  <ul
                    role="listbox"
                    aria-activedescendant={selected}
                    className="divide-y"
                  >
                    {(search.trim() === "" ? options : filteredOptions) // 🔥 si no busca, muestra todas
                      .map((opt) => {
                        const isSelected = opt.value === selected;
                        return (
                          <li
                            key={opt.value}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelect(opt.value)}
                            className={cn(
                              "flex items-center gap-3 cursor-pointer hover:bg-gray-100",
                              optionSizeClassMap[inputSize ?? "md"],
                              isSelected && "bg-gray-100"
                            )}
                          >
                            {opt.image && (
                              <img
                                src={opt.image}
                                alt={opt.label}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            )}
                            {opt.icon && (
                              <div className="flex-shrink-0">{opt.icon}</div>
                            )}
                            <div className="truncate">
                              {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                            </div>
                          </li>
                        );
                      })}

                    {search.trim() !== "" && filteredOptions.length === 0 && (
                      <li className="px-3 py-2 text-gray-500">
                        {t("No hay opciones")}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {hasError && (
          <Text
            id={`${id}-error`}
            colVariant="danger"
            size="xs"
            className="mt-1"
          >
            {tKeyError ? t(tKeyError) : errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export { SelectField };
