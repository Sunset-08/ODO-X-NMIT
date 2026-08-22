import * as React from "react";

// DayFlow card: border-based depth, no heavy shadows, 12px radius
export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface border border-border rounded-[12px] ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col space-y-1 p-5 border-b border-border ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-base font-semibold leading-tight text-text ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-secondary ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const hasPaddingOverride = /\b(p-|py-|pt-)/.test(className);
  return (
    <div className={`p-5 ${hasPaddingOverride ? "" : "pt-0"} ${className}`} {...props} />
  );
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center p-5 pt-0 ${className}`}
      {...props}
    />
  );
}
