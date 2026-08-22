import * as React from "react";
import { Card, CardContent } from "./card";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <Card className="w-full bg-background/50 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {icon && (
          <div className="mb-4 text-secondary/50 flex items-center justify-center">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-secondary max-w-md mx-auto mb-6">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
}
