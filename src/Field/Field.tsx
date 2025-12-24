/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
        xxs: "py-[1px] px-[3px] text-[9px]",
        xs: "py-0.5 px-1 text-[10px]",
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

// ✅ Regex que valida caracteres PERMITIDOS mientras se escribe
const EMAIL_ALLOWED = /^[A-Za-z0-9@._-]+$/;

// ✅ Regex que valida email COMPLETO
const EMAIL_FULL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REGEX_MAP: Record<string, RegExp> = {
  number: /^[0-9]*$/,
  letters: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]*$/,
  alphanumeric: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]*$/,
  email: EMAIL_ALLOWED,
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

interface FieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  helpText?: string;
  errorMessage?: string;
  rounded?: "basic" | "sm" | "md" | "lg";
  inputSize?: "full" | "xxs" | "xs" | "sm" | "md" | "lg";
  tKeyLabel?: string;
  tKeyHelpText?: string;
  tKeyError?: string;
  tKeyPlaceholder?: string;
  language?: "es" | "en" | "pt";
  sizeHelp?: "sm" | "md" | "lg" | "xxs" | "xs";
  prefixText?: string;
  prefixImage?: string;
  prefixElement?: ReactNode;
  allowXML?: boolean;

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

const InputField: FC<FieldProps> = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className,
      inputSize = "md",
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
      prefixText,
      prefixImage,
      prefixElement,
      allowXML = false,
      regexType,
      customRegex,
      onRegexError,
      ...props
    },
    ref
  ) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
      if (language) i18n.changeLanguage(language);
    }, [language]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setFileName(file.name);
    };

    if (type === "hidden") {
      return <input ref={ref} type="hidden" {...props} />;
    }

    /** ✅ Validación de caracteres mientras escribe */
    const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
      const data = (e as any).data;
      if (!data) return;

      let regex: RegExp | undefined;

      if (regexType === "email") regex = EMAIL_ALLOWED;
      else if (regexType === "custom" && customRegex) regex = customRegex;
      else if (regexType) regex = REGEX_MAP[regexType];

      if (regex && !regex.test(data)) {
        e.preventDefault();
        onRegexError?.(data);
      }
    };

    /** ✅ Validación del valor completo */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      let regex: RegExp | undefined;
      if (regexType === "email") regex = EMAIL_FULL;
      else if (regexType === "custom" && customRegex) regex = customRegex;
      else if (regexType) regex = REGEX_MAP[regexType];

      if (regex && !regex.test(value)) {
        onRegexError?.(value);
      }

      props.onChange?.(e);
    };

    const acceptTypes = allowXML ? ".xml,image/*" : undefined;

    const fieldClass = cn(
      field({ inputSize, rounded }),
      className,
      hasError ? "bg-red-100 border border-red-500" : ""
    );

    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

    const labelSizeMap: Record<NonNullable<FieldProps["inputSize"]>, string> = {
      xxs: "text-[10px]",
      xs: "text-[11px]",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      full: "text-base",
    };

    return (
      <div className="w-full">
        {(label || tKeyLabel) && (
          <label
            className={cn("block mb-1 text-gray-500", labelSizeMap[inputSize])}
          >
            {tKeyLabel ? t(tKeyLabel) : label}
          </label>
        )}

        <div className={`${fieldClass} flex flex-col`}>
          {(helpText || tKeyHelpText) && !hasError && (
            <Text
              id={`${props.id}-help`}
              size={sizeHelp ?? "xxs"}
              colVariant="default"
              className="text-gray-500"
            >
              {tKeyHelpText ? t(tKeyHelpText) : helpText}
            </Text>
          )}
          <div className="flex items-center gap-3">
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

            <input
              type={type}
              ref={ref}
              placeholder={tKeyPlaceholder ? t(tKeyPlaceholder) : placeholder}
              className={cn(
                "bg-transparent outline-none font-semibold text-xl flex-1 p-2 text-gray-800",
                disabledClass
              )}
              disabled={disabled}
              onBeforeInput={handleBeforeInput}
              onChange={type === "file" ? handleFileChange : handleChange}
              accept={acceptTypes}
              {...props}
            />
          </div>

          {fileName && (
            <Text size="xs" className="mt-1 text-gray-600 italic">
              Archivo: {fileName}
            </Text>
          )}
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

InputField.displayName = "InputField";
export { InputField };
