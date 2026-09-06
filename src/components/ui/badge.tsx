import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-slate-900 text-slate-50 shadow-xs hover:bg-slate-900/80",
    secondary: "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80",
    destructive: "border-transparent bg-red-500 text-slate-50 shadow-xs hover:bg-red-500/80",
    outline: "text-slate-950 border-slate-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
