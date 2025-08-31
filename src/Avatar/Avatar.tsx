import { FC, HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const avatarStyle = cva("object-cover", {
  variants: {
    size: {
      xs: "w-[24px] h-[24px]",
      sm: "w-[32px] h-[32px]",
      md: "w-[48px] h-[48px]",
      lg: "w-[64px] h-[64px]",
      xl: "w-[96px] h-[96px]",
      xxl: "w-[150px] h-[150px]",
    },
    shape: {
      round: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-md",
    },
    border: {
      none: "",
      thin: "border border-gray-300",
      thick: "border-2 border-gray-500",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "round",
    border: "none",
  },
});

interface AvatarProps
  extends HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarStyle> {
  src: string;
  alt: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  shape: "round" | "square" | "rounded";
  border: "none" | "thin" | "thick";
}

const Avatar: FC<AvatarProps> = forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, alt, size, shape, border, className, ...props }, ref) => {
    return (
      <picture>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(avatarStyle({ size, shape, border, className }))}
          {...props}
        />
      </picture>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
