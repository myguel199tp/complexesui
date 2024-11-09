import { FC, InputHTMLAttributes, forwardRef } from "react";
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

const InputField: FC<FieldProps> = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className,
      inputSize,
      rounded,
      disabled,
      placeholder,
      label,
      hasError = false,
      errorMessage = "There was an error",
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

    return (
      <div ref={ref}>
        {label && <label className="block mb-1 text-gray-700">{label}</label>}
        <input
          placeholder={placeholder}
          className={`${fieldClass} ${disabledClass}`}
          disabled={disabled}
          {...props}
        />
        {hasError && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
