import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Sparkles, Building2, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * ProductCardSkeleton: Single product card skeleton loader with shimmer pulse
 * Perfectly mirrors the exact layout, geometry, and button hierarchy of ProductCard.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-brand-light p-7 sm:p-8 rounded-[40px] border border-gray-150 flex flex-col h-full relative overflow-hidden shadow-xs">
      {/* Top row: Shopping Cart Icon Box & Category Pill Tag */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-xs">
          <div className="w-5 h-5 rounded-lg bg-blue-100/80 animate-pulse" />
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 flex items-center">
          <div className="h-2.5 w-16 bg-brand-blue/25 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Product Title Bars */}
      <div className="space-y-2 mb-3">
        <div className="h-5 w-4/5 bg-gray-200/90 rounded-lg animate-pulse" />
        <div className="h-5 w-3/5 bg-gray-200/70 rounded-lg animate-pulse" />
      </div>

      {/* Primary Specification with Sparkles Placeholder */}
      <div className="mb-3.5 flex items-center gap-2">
        <div className="w-3.5 h-3.5 rounded-md bg-blue-200/70 flex-shrink-0 animate-pulse" />
        <div className="h-3.5 w-44 bg-blue-100/70 border border-blue-200/40 rounded-md animate-pulse" />
      </div>

      {/* Description Paragraph lines */}
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-3 w-full bg-gray-200/70 rounded-md animate-pulse" />
        <div className="h-3 w-11/12 bg-gray-200/60 rounded-md animate-pulse" />
        <div className="h-3 w-3/4 bg-gray-200/50 rounded-md animate-pulse" />
      </div>

      {/* Actions Section: Primary Quote Button & Secondary RFQ Button */}
      <div className="mt-auto space-y-2.5 pt-2">
        {/* Primary Action Button: Request a Quote */}
        <div className="w-full h-[46px] rounded-2xl bg-brand-blue/15 border border-brand-blue/20 flex items-center justify-center gap-2 shadow-xs">
          <div className="w-3.5 h-3.5 rounded bg-brand-blue/30 animate-pulse" />
          <div className="h-3 w-28 bg-brand-blue/30 rounded-full animate-pulse" />
        </div>

        {/* Secondary Action Button: Add to RFQ List */}
        <div className="w-full h-[38px] rounded-xl bg-white border border-gray-200 flex items-center justify-center gap-1.5 shadow-xs">
          <div className="w-3 h-3 rounded bg-gray-300/80 animate-pulse" />
          <div className="h-2.5 w-24 bg-gray-300/70 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Shimmer Sweep Animation Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
    </div>
  );
}

/**
 * ProductCatalogSkeletonGrid: Renders a responsive grid of skeleton cards matching the 4-col layout
 */
export function ProductCatalogSkeletonGrid({ count = 8 }: { count?: number }) {
  const { language, t } = useLanguage();

  return (
    <div className="w-full space-y-6">
      {/* Subtle Synchronizing Pill Indicator */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-xs font-semibold text-brand-blue shadow-xs animate-pulse">
          <Loader2 size={14} className="animate-spin text-brand-blue" />
          <span>{language === 'en' ? 'Fetching raw chemical materials...' : t('loader.fetchingProducts')}</span>
        </div>
      </div>

      {/* Responsive Grid matching main catalog grid: sm:2, lg:3, xl:4 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCardSkeleton key={`skeleton-card-${idx}`} />
        ))}
      </div>
    </div>
  );
}

/**
 * HeroCarouselSkeleton: Skeleton loader for the hero facilities carousel
 */
export function HeroCarouselSkeleton() {
  const { t } = useLanguage();

  return (
    <div 
      id="hero-facility-carousel-skeleton"
      className="relative w-full max-w-[620px] mx-auto animate-pulse"
    >
      {/* Outer Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/20 via-blue-400/10 to-brand-blue/10 rounded-[36px] blur-xl opacity-40 pointer-events-none" />

      <div className="relative bg-white border border-gray-150 rounded-[32px] overflow-hidden shadow-xl">
        {/* Media Window Aspect */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          {/* Centered Loading Spinner with Badge */}
          <div className="flex flex-col items-center gap-3 p-6 z-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue">
              <Loader2 size={24} className="animate-spin text-white" />
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
              <FlaskConical size={14} className="text-brand-blue" />
              <span>{t('loader.loadingFacilities')}</span>
            </div>
          </div>

          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Info & Specs Placeholder */}
        <div className="p-5 sm:p-6 bg-white space-y-4">
          {/* Progress bar placeholder */}
          <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-brand-blue/30" />
          </div>

          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-gray-200/80 rounded-md" />
            <div className="h-3.5 w-4/5 bg-gray-200/60 rounded-md" />
          </div>

          {/* Spec chips placeholders */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="h-6 w-28 bg-gray-100 rounded-xl border border-gray-200/60" />
            <div className="h-6 w-32 bg-gray-100 rounded-xl border border-gray-200/60" />
            <div className="h-6 w-24 bg-gray-100 rounded-xl border border-gray-200/60" />
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl p-1.5 bg-gray-50 border border-gray-100">
                <div className="aspect-video w-full rounded-lg bg-gray-200/80 mb-1.5" />
                <div className="h-2 w-10 bg-gray-200/80 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
