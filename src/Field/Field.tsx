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
  prefixText?: string;
  prefixImage?: string;
  prefixElement?: ReactNode;
  allowXML?: boolean;
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
      prefixText,
      prefixImage,
      prefixElement,
      allowXML = false,
      ...props
    },
    ref
  ) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fieldClass = cn(
      field({ inputSize, rounded }),
      className,
      hasError ? "bg-red-100 border border-red-500" : ""
    );
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
    const { t } = useTranslation();

    useEffect(() => {
      if (language) i18n.changeLanguage(language);
    }, [language]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setFileName(file.name);
    };

    if (type === "hidden") {
      return <input type="hidden" ref={ref} {...props} />;
    }

    const acceptTypes = allowXML ? ".xml,image/*" : undefined;

    return (
      <div className="w-full">
        {(label || tKeyLabel) && (
          <label className="block mb-1 text-gray-500">
            {tKeyLabel ? t(tKeyLabel) : label}
          </label>
        )}

        <div className={`${fieldClass} flex flex-col`}>
          {(helpText || tKeyHelpText) && !hasError && (
            <Text
              id={`${props.id}-help`}
              size={sizeHelp ?? "xxs"}
              colVariant="default"
              className="mt-1"
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
              className={`bg-transparent outline-none ${disabledClass} flex-1`}
              disabled={disabled}
              onChange={type === "file" ? handleFileChange : props.onChange}
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
