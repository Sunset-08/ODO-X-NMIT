import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", src, alt, initials, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-16 h-16 text-lg",
    };

    return (
      <div
        ref={ref}
        className={`relative flex shrink-0 overflow-hidden bg-surface border border-border flex-center ${sizes[size]} ${className}`}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span className="font-medium text-primary">
            {initials || "??"}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
