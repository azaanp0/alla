import * as React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export interface LuxuryButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "ref"
> {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant = "solid", size = "md", isLoading, children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden";

    const variants = {
      solid:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury hover:shadow-lg hover:-translate-y-0.5",
      outline: "border border-primary text-primary bg-transparent hover:bg-primary/5",
      ghost: "bg-transparent text-foreground hover:bg-secondary",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs tracking-wider uppercase",
      md: "h-12 px-8 text-sm tracking-widest uppercase",
      lg: "h-14 px-10 text-base tracking-widest uppercase",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : null}
          {children}
        </span>
        {variant === "solid" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] hover:animate-shine pointer-events-none" />
        )}
      </motion.button>
    );
  },
);

LuxuryButton.displayName = "LuxuryButton";
