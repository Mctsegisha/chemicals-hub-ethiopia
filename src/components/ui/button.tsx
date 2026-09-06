import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  title?: string;
  "aria-label"?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  disabled = false,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const variantStyles = {
    default: "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 active:bg-indigo-800",
    destructive: "bg-red-500 text-slate-50 shadow-xs hover:bg-red-600 active:bg-red-700",
    outline: "border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 shadow-xs hover:bg-slate-200/80",
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
    link: "text-indigo-600 underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8 text-base",
    icon: "h-9 w-9 p-0 flex items-center justify-center shrink-0",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
