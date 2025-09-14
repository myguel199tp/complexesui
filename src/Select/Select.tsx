import {
  FC,
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
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
  }
);

interface Option {
  value: string;
  label: string;
  tKeyLabel?: string;
}

interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  errorMessage?: string;
  helpText?: string;
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
  inputSize?: "sm" | "md" | "lg" | "full";
  rounded?: "basic" | "sm" | "md" | "lg";
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
      ...props
    },
    ref
  ) => {
    const fieldClass = cn(
      field({ inputSize, rounded }),
      className,
      hasError ? "bg-red-100 border border-red-500" : ""
    );
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("");

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);

    const filteredOptions = searchable
      ? options.filter((opt) =>
          (opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label)
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : options;

    const handleSelect = (value: string) => {
      setSelected(value);
      setIsOpen(false);
      if (props.onChange) {
        // simular evento nativo de <select>
        const event = {
          target: { value },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        props.onChange(event);
      }
    };

    if (hidden) {
      return <select ref={ref} hidden {...props} />;
    }

    return (
      <div>
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-500" htmlFor={props.id}>
            {tKeyLabel ? t(tKeyLabel) : label}{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Contenedor gris */}
        <div
          className={cn(
            "bg-gray-200 rounded-md px-4 py-2 relative",
            hasError && "bg-red-100 border border-red-500"
          )}
        >
          {(helpText || tKeyHelpText) && !hasError && (
            <Text
              id={`${props.id}-help`}
              size={sizeHelp ?? "xxs"}
              colVariant="default"
            >
              {tKeyHelpText ? t(tKeyHelpText) : helpText}
            </Text>
          )}

          {/* Caso 1: Select normal */}
          {!searchable && (
            <select
              ref={ref}
              id={props.id}
              className={`w-full bg-gray-200 rounded-md focus:outline-none ${fieldClass} ${disabledClass}`}
              disabled={disabled}
              aria-required={required}
              aria-invalid={hasError}
              aria-describedby={
                hasError
                  ? `${props.id}-error`
                  : helpText
                  ? `${props.id}-help`
                  : undefined
              }
              defaultValue=""
              {...props}
            >
              {defaultOption && (
                <option value="" disabled hidden>
                  {/* {tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption} */}
                  <span className="text-gray-500 whitespace-nowrap">
                    {tKeyDefaultOption
                      ? t(tKeyDefaultOption)
                      : defaultOption ?? "Seleccione opciones"}
                    {required && <span className="text-gray-500 ml-1">*</span>}
                  </span>
                </option>
              )}
              {options.map((option) => (
                <option
                  key={option.value}
                  className="bg-gray-200 my-2 w-full"
                  value={option.value}
                >
                  {option.tKeyLabel ? t(option.tKeyLabel) : option.label}
                </option>
              ))}
            </select>
          )}

          {searchable && (
            <div
              className={cn(
                "relative w-full", // 🔹 relative aquí para posicionar el dropdown debajo
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Campo seleccionado */}
              <div
                className={cn(
                  "w-full px-3 py-2 border rounded-md bg-gray-200 cursor-pointer",
                  disabled && "cursor-not-allowed"
                )}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
              >
                {selected
                  ? options.find((o) => o.value === selected)?.label
                  : tKeyDefaultOption
                  ? t(tKeyDefaultOption)
                  : defaultOption}
              </div>

              {/* Dropdown */}
              {isOpen && !disabled && (
                <div className="absolute left-0 top-full mt-1 w-full bg-gray-200 border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {/* Input de búsqueda */}
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("Buscar...")}
                    className="w-full bg-gray-200 h-10 p-2 py-1 text-sm border-b focus:outline-none"
                  />

                  {/* Opciones */}
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        // 🔹 siempre gris claro, y hover más oscuro
                      >
                        {opt.tKeyLabel ? t(opt.tKeyLabel) : opt.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      {t("No hay opciones")}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {hasError && (
          <Text id={`${props.id}-error`} colVariant="danger" size="xs">
            {tKeyError ? t(tKeyError) : errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export { SelectField };
