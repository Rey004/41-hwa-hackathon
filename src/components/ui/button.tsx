import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "editorial";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-[#0da162] hover:bg-[#0a8650] text-white shadow-md hover:shadow-lg active:scale-[0.98]",
      secondary:
        "bg-[#0a3824] hover:bg-[#062417] text-white shadow-sm active:scale-[0.98]",
      outline:
        "border-2 border-[#0a3824] text-[#0a3824] hover:bg-[#0a3824] hover:text-white transition-colors",
      ghost:
        "text-gray-700 hover:text-emerald-950 hover:bg-emerald-50",
      editorial:
        "bg-white hover:bg-emerald-50 text-[#0a3824] border-2 border-[#dbe7df] font-bold shadow-sm hover:border-emerald-400 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs rounded-full",
      md: "px-5 py-2.5 text-sm rounded-full",
      lg: "px-7 py-3.5 text-base rounded-full font-extrabold",
      icon: "w-10 h-10 p-2 rounded-full flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-heading font-bold transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
