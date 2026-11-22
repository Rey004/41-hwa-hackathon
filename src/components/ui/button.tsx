"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-forest-green text-white hover:bg-organic-green-dark active:scale-95 transition-all",
    outline:
      "border border-forest-green/20 text-forest-green hover:bg-forest-green/5 active:scale-95 transition-all",
    ghost: "text-forest-green hover:bg-forest-green/10 active:scale-95 transition-all",
    destructive:
      "bg-coral text-white hover:bg-coral/90 active:scale-95 transition-all",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonProps = {
    className: cn(
      "inline-flex items-center justify-center rounded-full font-heading font-semibold whitespace-nowrap",
      variants[variant],
      sizes[size],
      disabled && "opacity-50 cursor-not-allowed",
      className
    ),
    disabled: disabled || isLoading,
    ...props,
  };

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
    }>;
    return React.cloneElement(child, {
      ...buttonProps,
      className: cn(child.props.className, buttonProps.className),
    });
  }

  return (
    <button {...buttonProps}>
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
