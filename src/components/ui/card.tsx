import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  [key: string]: any;
}

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

export interface CardTitleProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export interface CardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

export interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white text-slate-950 shadow-xs transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-4 sm:p-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("font-medium text-base leading-snug tracking-tight text-slate-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-slate-500 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("p-4 sm:p-5 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center p-4 sm:p-5 pt-0 gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
