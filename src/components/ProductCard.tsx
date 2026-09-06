import * as React from "react";
import { Plus, Beaker } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { cn } from "../lib/utils";

export interface ProductCardProps {
  id: string;
  name: string;
  category: 'detergent-chemicals' | 'food-additives' | string;
  imageUrl?: string;
  specs: { label: string; value: string }[]; // e.g. { label: "Assay", value: "99.0-100.5%" }
  description: string;
  onRequestQuote: (id: string) => void;
  onAddToRFQ: (id: string) => void;
  onSelectProduct?: (id: string) => void;
}

/**
 * Typed category color map defining distinct accent badge styles.
 * Violet for detergent-chemicals, Indigo for food-additives, with support
 * for other core chemical industrial sectors.
 */
export const categoryColorMap: Record<string, string> = {
  'detergent-chemicals': 'bg-violet-600 text-white hover:bg-violet-700 border-transparent',
  'food-additives': 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent',
  'industrial-chemicals': 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
  'cosmetic-ingredients': 'bg-fuchsia-600 text-white hover:bg-fuchsia-700 border-transparent',
  'laboratory-chemicals': 'bg-emerald-600 text-white hover:bg-emerald-700 border-transparent',
};

const DEFAULT_CATEGORY_STYLE = 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent';

/**
 * Human-readable label formatter for category slugs
 */
function formatCategoryLabel(category: string): string {
  const customLabels: Record<string, string> = {
    'detergent-chemicals': 'Detergent Chemicals',
    'food-additives': 'Food Additives',
    'industrial-chemicals': 'Industrial Chemicals',
    'cosmetic-ingredients': 'Cosmetic Ingredients',
    'laboratory-chemicals': 'Laboratory Chemicals',
  };

  if (customLabels[category]) return customLabels[category];

  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Image container with strict 4:3 aspect ratio, unified rounded-xl top corners,
 * and graceful fallback to shadcn Skeleton.
 */
function ProductImage({
  imageUrl,
  name,
  category,
}: {
  imageUrl?: string;
  name: string;
  category: string;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const categoryStyle = categoryColorMap[category] || DEFAULT_CATEGORY_STYLE;
  const categoryLabel = formatCategoryLabel(category);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-slate-100">
      {/* Category Badge positioned absolute top-left over image */}
      <Badge
        className={cn(
          "absolute top-3 left-3 z-10 text-xs font-medium shadow-xs transition-colors pointer-events-none",
          categoryStyle
        )}
      >
        {categoryLabel}
      </Badge>

      {/* Image with graceful Skeleton placeholder */}
      {imageUrl && !hasError ? (
        <>
          {isLoading && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-t-xl rounded-b-none" />
          )}
          <img
            src={imageUrl}
            alt={`${name} - B2B Chemical Specification`}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </>
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-slate-100 text-slate-400">
          <Skeleton className="absolute inset-0 h-full w-full rounded-t-xl rounded-b-none opacity-50" />
          <div className="relative z-10 flex flex-col items-center gap-1.5 p-4 text-center">
            <Beaker className="h-8 w-8 stroke-[1.5] text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Technical Spec Grade</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Reusable B2B Chemical Product Card component in React 19 + TypeScript.
 * Features Plus Jakarta Sans typography, New York style shadcn/ui components,
 * indigo/violet accents, and strict accessibility.
 */
export function ProductCard({
  id,
  name,
  category,
  imageUrl,
  specs,
  description,
  onRequestQuote,
  onAddToRFQ,
  onSelectProduct,
}: ProductCardProps) {
  return (
    <Card 
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden flex flex-col h-full font-['Plus_Jakarta_Sans',sans-serif] hover:border-slate-300 transition-colors",
        onSelectProduct && "cursor-pointer"
      )}
      onClick={(e: React.MouseEvent) => {
        if (!onSelectProduct) return;
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input') || target.closest('select')) return;
        onSelectProduct(id);
      }}
    >
      {/* Image Section (4:3 aspect ratio with rounded-t-xl) */}
      <ProductImage imageUrl={imageUrl} name={name} category={category} />

      {/* Card Content Shell */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 gap-3">
        {/* Product Title */}
        <CardHeader className="p-0 space-y-0">
          <CardTitle 
            className={cn(
              "text-base font-medium text-slate-900 tracking-tight leading-snug line-clamp-1",
              onSelectProduct && "hover:text-indigo-600 cursor-pointer"
            )} 
            title={name}
            onClick={() => onSelectProduct && onSelectProduct(id)}
          >
            {name}
          </CardTitle>
        </CardHeader>

        {/* Specs Pill Badges (flex-wrap row) */}
        {specs && specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specs.map((spec, index) => (
              <Badge
                key={`${spec.label}-${index}`}
                variant="secondary"
                className="text-xs font-normal bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
              >
                <span className="font-semibold text-slate-900 mr-1">{spec.label}:</span>
                <span>{spec.value}</span>
              </Badge>
            ))}
          </div>
        )}

        {/* Description truncated to 2 lines via line-clamp-2 */}
        <CardContent className="p-0">
          <p className="line-clamp-2 text-sm text-slate-500 leading-relaxed">
            {description}
          </p>
        </CardContent>

        {/* Action CTAs */}
        <CardFooter className="p-0 pt-1 mt-auto flex items-center gap-2">
          {/* Primary Action: Request a Quote (Full-width, Indigo default variant) */}
          <Button
            variant="default"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm h-9 shadow-xs"
            onClick={() => onRequestQuote(id)}
          >
            Request a quote
          </Button>

          {/* Secondary Action: Icon-only Add to RFQ Button (Outline variant) */}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 shrink-0"
            onClick={() => onAddToRFQ(id)}
            aria-label={`Add ${name} to RFQ`}
            title={`Add ${name} to RFQ`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

/**
 * Responsive CSS Grid wrapper for B2B Chemical Product Cards
 * grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
 */
export interface ProductGridProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function ProductGrid({ className, children, ...props }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ProductCard;
