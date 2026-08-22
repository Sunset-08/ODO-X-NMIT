import * as React from "react";
import { Input, InputProps } from "./input";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={`pr-10 ${className}`}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1.5 text-xs font-medium text-secondary hover:text-primary focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
