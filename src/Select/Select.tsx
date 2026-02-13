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
  // <-- FIX: usar layout vertical para que w-full funcione y label quede encima
  "flex flex-col gap-2 bg-transparent w-full focus:outline-none transition-all",
  {
    variants: {
      rounded: {
        basic: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-2xl",
      },
      inputSize: {
        xxs: " text-xxs",
        xs: " text-xs",
        sm: " text-xs",
        md: " text-base",
        lg: " text-lg",
        full: " text-lg w-full",
      },
    },
    defaultVariants: {
      rounded: "md",
      inputSize: "md",
    },
  },
);

const REGEX_MAP: Record<string, RegExp> = {
  number: /^[0-9]*$/,
  letters: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]*$/,
  alphanumeric: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9+\-() ]*$/,
  postal: /^[A-Za-z0-9 ]*$/,
  id: /^[A-Za-z0-9]*$/,
  uppercase: /^[A-ZÁÉÍÓÚÑ ]*$/,
  lowercase: /^[a-záéíóúñ ]*$/,
  decimal: /^[0-9]+(\.[0-9]*)?$/,
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.,\-+_]{8,}$/,
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
  hexColor: /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  currency: /^\$?\d+(,\d{3})*(\.\d{1,2})?$/,
  fullname: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,}$/,
  safeChars: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ.,;:!?\-() ]*$/,
};

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
  extends SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof field> {
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

  regexType?:
    | "number"
    | "letters"
    | "alphanumeric"
    | "custom"
    | "customRegex"
    | "email"
    | "phone"
    | "postal"
    | "uppercase"
    | "lowercase"
    | "decimal"
    | "time"
    | "strongPassword"
    | "url"
    | "hexColor"
    | "currency"
    | "fullname"
    | "safeChars";

  customRegex?: RegExp;
  onRegexError?: (value: string) => void;
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
      regexType,
      customRegex,
      onRegexError,
      ...props
    },
    ref,
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
        "",
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
            .includes(search.toLowerCase()),
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
      hasError && "bg-red-100 border border-red-500 block", // si hay error, sobreescribe
      disabled && "opacity-50 cursor-not-allowed block",
    );

    return (
      <div className={fieldClass} ref={containerRef}>
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-500" htmlFor={id}>
            {tKeyLabel ? t(tKeyLabel) : label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* prefixImage y prefixElement se mantienen pero los colocamos dentro del control */}
        <div className="relative flex flex-col w-full">
          {/* helpText dentro del recuadro gris */}

          {/* CONTROL (input o boton) */}
          {searchable ? (
            <div className="flex items-center gap-2 relative w-full border-2 border-cyan-800 px-3 py-2 rounded-md">
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
                onClick={() => {
                  if (!disabled) setIsOpen(true);
                }}
                onChange={(e) => {
                  const val = e.target.value;

                  let regex: RegExp | undefined;

                  if (
                    (regexType === "custom" || regexType === "customRegex") &&
                    customRegex
                  ) {
                    regex = customRegex;
                  } else if (regexType) {
                    regex = REGEX_MAP[regexType];
                  }

                  if (regex && !regex.test(val)) {
                    onRegexError?.(val);
                    return;
                  }

                  setSearch(val);

                  // Si queda vacío → se cierra
                  if (val.trim() === "") {
                    setIsOpen(false);
                    setSelected("");
                    emitNativeChange("");
                    return;
                  }

                  // Si está escribiendo → abre
                  setIsOpen(true);
                }}
                placeholder={
                  tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption
                }
                className={cn(
                  "w-full bg-transparent outline-none text-gray-500 placeholder-gray-500 cursor-pointer pr-6",
                  optionSizeClassMap[inputSize ?? "md"],
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
              className={cn(
                "w-full text-left border-2 border-cyan-800 px-3 py-2 rounded-md flex items-center gap-2 text-gray-500",
                optionSizeClassMap[inputSize ?? "md"],
              )}
            >
              {/* prefixImage/element dentro del botón */}
              {prefixImage && (
                <img
                  src={prefixImage}
                  alt="prefix"
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <div>
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

                {selectedOption ? (
                  <div className="flex items-center gap-2 w-full">
                    {selectedOption.image && (
                      <img
                        src={selectedOption.image}
                        alt={selectedOption.label}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    {selectedOption.icon && (
                      <div className="flex-shrink-0">{selectedOption.icon}</div>
                    )}
                    <span className="truncate">
                      {selectedOption.tKeyLabel
                        ? t(selectedOption.tKeyLabel)
                        : selectedOption.label}
                    </span>
                  </div>
                ) : (
                  <span
                    className={cn(
                      "truncate flex-1 bg-transparent outline-none font-semibold text-gray-500",
                      optionSizeClassMap[inputSize ?? "sm"],
                    )}
                  >
                    {" "}
                    {tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption}
                  </span>
                )}
              </div>
            </button>
          )}

          {/* Dropdown */}
          {isOpen && !disabled && (
            <ul
              role="listbox"
              aria-activedescendant={selected}
              // <-- FIX: positionar justo debajo con top-full y pequeño mt
              className="
                absolute top-full left-0 w-full bg-white divide-y
                max-h-56 overflow-y-auto  
                z-50                     
                mt-1                     
                rounded-md shadow-lg      
              "
            >
              {(search.trim() === "" ? options : filteredOptions).map((opt) => {
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
                      isSelected && "bg-gray-100",
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
          )}
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
  },
);

SelectField.displayName = "SelectField";
export { SelectField };
