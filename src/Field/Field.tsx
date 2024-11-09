import { FC, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const field = cva("inline-block bg-gray-200 px-5 py-3 font-thin border-none", {
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
});

interface FieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  errorMessage?: string;
}

export const InputField: FC<FieldProps> = ({
  className,
  inputSize,
  rounded,
  disabled,
  placeholder,
  label,
  hasError = false,
  errorMessage = "There was an error",
  ...props
}) => {
  const fieldClass = cn(
    field({ inputSize, rounded }),
    className,
    hasError ? "bg-red-100 border border-red-500" : ""
  );
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div>
      {label && <label className="block mb-1 text-gray-700">{label}</label>}
      <input
        placeholder={placeholder}
        className={`${fieldClass} ${disabledClass}`}
        disabled={disabled}
        {...props}
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};
