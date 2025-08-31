import { FC, InputHTMLAttributes, forwardRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";
import { Text } from "../main";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const field = cva(
  "inline-block bg-gray-200 px-5 py-3 font-thin border-none w-full",
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

interface FieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  helpText?: string;
  errorMessage?: string;
  rounded?: "basic" | "sm" | "md" | "lg";
  inputSize?: "full" | "sm" | "md" | "lg";
  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyPlaceholder?: string;
  language?: "es" | "en" | "pt";
  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
}

const InputField: FC<FieldProps> = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className,
      inputSize,
      rounded,
      disabled,
      placeholder,
      label,
      helpText,
      hasError = false,
      errorMessage = "There was an error",
      tKeyLabel,
      tKeyHelpText,
      tKeyError,
      tKeyPlaceholder,
      language,
      type,
      sizeHelp,
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

    // 🚨 Si es hidden, no renderices nada extra
    if (type === "hidden") {
      return <input type="hidden" ref={ref} {...props} />;
    }

    return (
      <div className="w-full">
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-700">
            {tKeyLabel ? t(tKeyLabel) : label}
          </label>
        )}

        {/* CONTENEDOR GRIS */}
        <div className={`${fieldClass} flex flex-col`}>
          {(helpText || tKeyHelpText) && !hasError && (
            <Text
              id={`${props.id}-help`}
              size={sizeHelp ?? "xxs"} // 👈 valor por defecto dinámico
              colVariant="default"
              className="mt-1"
            >
              {tKeyHelpText ? t(tKeyHelpText) : helpText}
            </Text>
          )}
          <input
            type={type}
            ref={ref}
            placeholder={tKeyPlaceholder ? t(tKeyPlaceholder) : placeholder}
            className={`bg-transparent outline-none ${disabledClass}`}
            disabled={disabled}
            {...props}
          />
        </div>

        {hasError && (
          <p className="text-red-500 text-sm mt-1">
            {tKeyError ? t(tKeyError) : errorMessage}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
