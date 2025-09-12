/* eslint-disable react-refresh/only-export-components */
import { FC, SelectHTMLAttributes, forwardRef, useEffect } from "react";
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
  rounded?: "sm" | "md" | "lg" | "basic";
  inputSize?: "sm" | "md" | "lg" | "full";

  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyDefaultOption?: string;
  language?: "es" | "en" | "pt";

  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
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

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
    }, [language]);

    if (hidden) {
      return <select ref={ref} hidden {...props} />;
    }

    return (
      <div>
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-700" htmlFor={props.id}>
            {tKeyLabel ? t(tKeyLabel) : label}{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Contenedor gris */}
        <div
          className={cn(
            "bg-gray-200 rounded-md px-4 py-2",
            hasError && "bg-red-100 border border-red-500"
          )}
        >
          {(helpText || tKeyHelpText) && !hasError && (
            <Text
              id={`${props.id}-help`}
              size={sizeHelp ?? "xxs"} // 👈 dinámico
              colVariant="default"
            >
              {tKeyHelpText ? t(tKeyHelpText) : helpText}
            </Text>
          )}
          <select
            ref={ref}
            id={props.id}
            className={`w-full bg-transparent focus:outline-none ${fieldClass} ${disabledClass}`}
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
                {tKeyDefaultOption ? t(tKeyDefaultOption) : defaultOption}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-red-200 px-4 py-2 w-full"
              >
                {option.tKeyLabel ? t(option.tKeyLabel) : option.label}
              </option>
            ))}
          </select>
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
