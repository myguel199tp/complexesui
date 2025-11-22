import { VariantProps, cva } from "class-variance-authority";
import {
  forwardRef,
  TextareaHTMLAttributes,
  ReactNode,
  useEffect,
} from "react";
import { cn } from "../utils/utils";
import { useTranslation } from "react-i18next";
import { Text } from "../main";
import i18n from "../i18n";

// Definir variantes con cva
const textArea = cva(
  "border p-2 resize-none outline-none w-full transition-colors",
  {
    variants: {
      inputSize: {
        sm: "text-sm p-1",
        md: "text-base p-2",
        lg: "text-lg p-3",
        full: "w-full",
      },
      rounded: {
        basic: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      inputSize: "md",
      rounded: "md",
    },
  }
);

// Regex predefinidos
const REGEX_MAP: Record<string, RegExp> = {
  number: /^[0-9]*$/,
  letters: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]*$/,
  alphanumeric: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*$/,
  email: /^[A-Za-z0-9@._-]*$/,
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

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textArea> {
  hasError?: boolean;
  label?: string;
  helpText?: string;
  errorMessage?: string;
  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyPlaceholder?: string;
  language?: "es" | "en" | "pt";
  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
  prefixText?: string;
  prefixImage?: string;
  prefixElement?: ReactNode;
  rows?: number;

  regexType?:
    | "number"
    | "letters"
    | "alphanumeric"
    | "custom"
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
    | "safeChars"
    | "customRegex";

  customRegex?: RegExp;
  onRegexError?: (value: string) => void;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      sizeHelp,
      prefixText,
      prefixImage,
      prefixElement,
      rows = 4,
      regexType,
      customRegex,
      onRegexError,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    // Cambiar idioma
    useEffect(() => {
      if (language) i18n.changeLanguage(language);
    }, [language]);

    // 🔍 VALIDACIÓN REGEX
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      const selectedRegex =
        regexType === "customRegex"
          ? customRegex
          : regexType
          ? REGEX_MAP[regexType]
          : null;

      if (selectedRegex && !selectedRegex.test(value)) {
        if (onRegexError) onRegexError(value);
        return; // ❌ Evitamos actualizar si no cumple
      }

      if (props.onChange) props.onChange(e);
    };

    const fieldClass = cn(
      textArea({ inputSize, rounded }),
      className,
      hasError ? "bg-red-100 border border-red-500" : "",
      disabled ? "opacity-50 cursor-not-allowed" : ""
    );

    return (
      <div className="w-full">
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-500">
            {tKeyLabel ? t(tKeyLabel) : label}
          </label>
        )}

        {(helpText || tKeyHelpText) && !hasError && (
          <Text
            id={`${props.id}-help`}
            size={sizeHelp ?? "xxs"}
            colVariant="default"
            className="mb-1"
          >
            {tKeyHelpText ? t(tKeyHelpText) : helpText}
          </Text>
        )}

        <div className={`flex items-center gap-3 ${fieldClass}`}>
          {prefixElement && (
            <div className="flex-shrink-0">{prefixElement}</div>
          )}
          {prefixImage && (
            <img
              src={prefixImage}
              alt="prefix"
              className="w-8 h-8 object-cover rounded-md"
            />
          )}
          {prefixText && <div className="text-gray-700">{prefixText}</div>}

          <textarea
            ref={ref}
            placeholder={tKeyPlaceholder ? t(tKeyPlaceholder) : placeholder}
            className="bg-transparent outline-none flex-1"
            disabled={disabled}
            rows={rows}
            onChange={handleChange}
            {...props}
          />
        </div>

        {hasError && (
          <Text size="xs" colVariant="danger" className="mt-1">
            {tKeyError ? t(tKeyError) : errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";
export { TextAreaField };
