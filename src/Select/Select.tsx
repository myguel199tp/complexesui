import { FC, SelectHTMLAttributes, forwardRef } from "react";
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

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof field> {
  hasError?: boolean;
  label?: string;
  errorMessage?: string;
  options: Option[];
  defaultOption?: string;
  required?: boolean;
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
      options,
      defaultOption = "Seleccione una opción",
      required = false,
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
      <div>
        {label && (
          <label className="block mb-1 text-gray-700" htmlFor={props.id}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={props.id}
          className={`${fieldClass} ${disabledClass}`}
          disabled={disabled}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${props.id}-error` : undefined}
          {...props}
        >
          {defaultOption && <option value="">{defaultOption}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hasError && (
          <p id={`${props.id}-error`} className="text-red-500 text-sm mt-1">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export { SelectField };
