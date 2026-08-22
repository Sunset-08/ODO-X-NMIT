import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      // Primary: DayFlow maroon — for key CTAs
      primary:
        "bg-primary text-white hover:bg-primary-dark shadow-sm",
      // Secondary: Subtle white with border — for secondary actions
      secondary:
        "bg-surface text-text border border-border hover:bg-background",
      // Outline: Ghost-like but with border — tertiary actions
      outline:
        "border border-border bg-transparent hover:bg-background text-text",
      // Ghost: No border, no background — nav items, inline actions
      ghost:
        "hover:bg-accent-light text-text hover:text-primary",
      // Destructive: Error red — for delete / danger actions
      destructive:
        "bg-error text-white hover:opacity-90",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 py-2 text-sm gap-2",
      lg: "h-10 px-6 text-sm gap-2",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
