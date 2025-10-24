"use client";

import {
  FC,
  HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { Badge, Text } from "../main";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const field = cva(
  "inline-block bg-gray-200 font-thin border-none w-full focus:outline-none flex items-center gap-2",
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
      inputSize: "md",
      rounded: "md",
    },
  }
);

// map para checkbox según tamaño
const checkboxSizeMap = {
  xxs: "w-3 h-3",
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  full: "w-6 h-6",
};

interface Option {
  value: string;
  label: string;
  tKeyLabel?: string;
  icon?: ReactNode;
  image?: string;
}

interface MultiSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  errorMessage?: string;
  helpText?: string;
  options: Option[];
  defaultOption?: string;
  required?: boolean;
  tkeySearch?: string;
  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyDefaultOption?: string;
  language?: "es" | "en" | "pt";
  disabled?: boolean;
  rounded?: "sm" | "md" | "lg" | "basic";
  inputSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "full";
  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
  searchable?: boolean;

  value?: string[];
  onChange?: (value: string[]) => void;

  prefixElement?: ReactNode;
  prefixImage?: string;
  hidden?: boolean;
}

const MultiSelect: FC<MultiSelectProps> = forwardRef<
  HTMLDivElement,
  MultiSelectProps
>(function MultiSelect(
  {
    className,
    inputSize,
    rounded,
    disabled = false,
    label,
    hasError = false,
    errorMessage = "There was an error",
    helpText,
    options,
    defaultOption = "Seleccione opciones",
    required = false,
    tKeyLabel,
    tKeyHelpText,
    tkeySearch,
    tKeyError,
    tKeyDefaultOption,
    language,
    sizeHelp,
    hidden,
    id,
    searchable = false,
    value,
    onChange,
    prefixElement,
    prefixImage,
    ...props
  },
  ref
) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(value ?? []);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (language) i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const target = e.target as Node;
      const dropdown = document.querySelector(".multiselect-dropdown");
      if (
        containerRef.current.contains(target) ||
        (dropdown && dropdown.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const toggleOption = (val: string) => {
    const newValues = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    setSelected(newValues);
    onChange?.(newValues);
  };

  if (hidden) return <div ref={ref} hidden {...props} />;

  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  const filteredOptions = searchable
    ? options.filter((opt) =>
        (opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : options;

  const fieldClass = cn(
    field({ inputSize, rounded }), // ✅ inputSize y rounded
    hasError && "bg-red-100 border border-red-500",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <div className="w-full" ref={containerRef}>
      {(label || tKeyLabel) && (
        <label className="block mb-1 text-gray-500" htmlFor={id}>
          {tKeyLabel ? t(tKeyLabel) : label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={fieldClass}
        onClick={() => !disabled && setOpen((s) => !s)}
      >
        {prefixImage && (
          <img
            src={prefixImage}
            alt="prefix"
            className="w-6 h-6 rounded-full object-cover"
          />
        )}
        {prefixElement && <div className="flex-shrink-0">{prefixElement}</div>}

        <div className="relative flex-1">
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-1">
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
                        <Badge
                          background="primary"
                          colVariant="primary"
                          size="xs"
                        >
                          {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                        </Badge>
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
            </div>
          ) : (
            <div className="flex flex-col text-gray-500">
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
              <span className="truncate">
                {tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption}
              </span>
            </div>
          )}

          {open && !disabled && (
            <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-72 overflow-auto multiselect-dropdown">
              {searchable && (
                <div className="p-2 border-b bg-gray-50">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t(tkeySearch || "Buscar...")}
                    className="w-full bg-transparent outline-none p-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <ul className="divide-y">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => {
                    const isSelected = selected.includes(opt.value);
                    return (
                      <li
                        key={opt.value}
                        onClick={() => toggleOption(opt.value)}
                        className={cn(
                          "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100",
                          isSelected && "bg-gray-100",
                          inputSize // ✅ aplicamos tamaño al li
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
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOption(opt.value)}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "mr-4 accent-cyan-800 cursor-pointer border-gray-300 rounded-md",
                            checkboxSizeMap[inputSize ?? "md"]
                          )}
                        />
                        <span className="truncate">
                          {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                        </span>
                      </li>
                    );
                  })
                ) : (
                  <li className="px-3 py-2 text-gray-500">
                    {t("No hay opciones")}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {hasError && (
        <Text id={`${id}-error`} colVariant="danger" size="xs" className="mt-1">
          {tKeyError ? t(tKeyError) : errorMessage}
        </Text>
      )}
    </div>
  );
});

MultiSelect.displayName = "MultiSelect";
export { MultiSelect };
