import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
  FileText, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Package, 
  Layers, 
  ShieldCheck, 
  Building2, 
  Truck, 
  FileCheck, 
  Share2, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Product, Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO, openTelegramApp, CATEGORIES } from '../constants';

export interface ProductDetailPageProps {
  product: Product;
  category?: Category;
  allProducts: Product[];
  onBack: () => void;
  onOpenQuoteModal: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductDetailPage({
  product,
  category,
  allProducts,
  onBack,
  onOpenQuoteModal,
  onSelectProduct,
  onAddToCart,
}: ProductDetailPageProps) {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [copiedLink, setCopiedLink] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryQty, setInquiryQty] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Scroll to top whenever product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setInquirySubmitted(false);
  }, [product.id, product.slug]);

  const catName = category?.name || product.category;
  const catSlug = category?.slug || `${product.category}-chemicals-ethiopia`;

  // Find related chemicals in the same category or explicit related slugs
  const relatedProducts = allProducts.filter(p => {
    if (p.id === product.id) return false;
    if (product.relatedProductSlugs && product.relatedProductSlugs.includes(p.slug)) return true;
    return p.category === product.category;
  }).slice(0, 4);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsAppMsg = isEn
    ? `Hello Chemicals Hub Ethiopia, I would like to inquire about pricing, stock availability, and specifications for ${product.name} (CAS: ${product.casNumber || 'N/A'}).`
    : `ሰላም ኬሚካልስ ሐብ ኢትዮጵያ፣ ስለ ${product.name} ዋጋ፣ የክምችት መጠን እና የጥራት መረጃ ማወቅ እፈልጋለሁ።`;

  const handleInlineInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    const summary = `*Direct Sourcing Inquiry: ${product.name}*
• Buyer: ${inquiryName}
• Phone: ${inquiryPhone}
• Company: ${inquiryCompany || 'N/A'}
• Quantity Needed: ${inquiryQty || 'Bulk Requirement'}
• Notes: ${inquiryNotes || 'Please send quotation and COA.'}`;

    // Open WhatsApp with compiled inquiry
    window.open(CONTACT_INFO.getWhatsAppUrl(summary), '_blank');
    setInquirySubmitted(true);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {/* Top Breadcrumbs & Back Navigation Bar */}
      <div className="bg-white border-b border-gray-200/80 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-dark text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>{isEn ? 'Back to Catalog' : 'ወደ ካታሎግ ተመለስ'}</span>
            </button>

            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-brand-dark/50">
              <a 
                href="/" 
                onClick={(e) => { e.preventDefault(); onBack(); }}
                className="hover:text-brand-blue transition-colors font-medium"
              >
                {t('breadcrumb.home')}
              </a>
              <ChevronRight size={12} className="text-brand-dark/30 flex-shrink-0" />
              <a 
                href="/#products" 
                onClick={(e) => { e.preventDefault(); onBack(); }}
                className="hover:text-brand-blue transition-colors font-medium"
              >
                {t('breadcrumb.products')}
              </a>
              <ChevronRight size={12} className="text-brand-dark/30 flex-shrink-0" />
              <span className="text-brand-blue font-semibold truncate max-w-[200px]">
                {catName}
              </span>
              <ChevronRight size={12} className="text-brand-dark/30 flex-shrink-0" />
              <span className="text-brand-dark/80 font-bold truncate max-w-[220px]">
                {product.name}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 text-brand-dark/70 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Copy link to product"
            >
              {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
              <span>{copiedLink ? (isEn ? 'Copied!' : 'ተቀድቷል!') : (isEn ? 'Share' : 'አጋራ')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Main Product Showcase (2 Columns) */}
        <section className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Visual Presentation */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md group">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85'}
                  alt={`${product.name} - Chemical raw materials supplier in Addis Ababa, Ethiopia`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-brand-blue shadow-xs">
                  {catName}
                </div>

                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isEn ? 'Ex-Stock Kaliti' : 'በቃሊቲ መጋዘን አለ'}</span>
                </div>
              </div>

              {/* Logistics & Trust Badges Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                  <Truck size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-brand-dark">
                      {isEn ? 'Kaliti Hub Dispatch' : 'ከቃሊቲ መጋዘን ፈጣን ስርጭት'}
                    </div>
                    <div className="text-[10px] text-brand-dark/60">
                      {isEn ? 'Same-day or next-day delivery' : 'በቀጣዩ ቀን ይደርሳል'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                  <FileCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-brand-dark">
                      {isEn ? 'COA & MSDS Included' : 'COA እና MSDS የተሟላ'}
                    </div>
                    <div className="text-[10px] text-brand-dark/60">
                      {isEn ? 'Verified batch certificates' : 'የላቦራቶሪ የጥራት ማረጋገጫ'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                  <Package size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-brand-dark">
                      {isEn ? 'Secure Packaging' : 'ደህንነቱ የተጠበቀ ማሸጊያ'}
                    </div>
                    <div className="text-[10px] text-brand-dark/60">
                      {product.packaging || (isEn ? 'Standard industrial packaging' : 'የኢንዱስትሪ ማሸጊያ')}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                  <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-brand-dark">
                      {isEn ? 'Direct Importer Pricing' : 'የቀጥታ አስመጪ ዋጋ'}
                    </div>
                    <div className="text-[10px] text-brand-dark/60">
                      {isEn ? 'Competitive bulk rates' : 'ተወዳዳሪ የጅምላ ዋጋ'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Commercial Overview & Sourcing CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Category Eyebrow */}
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue mb-2">
                  {catName}
                </div>

                {/* Main Product Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-dark leading-tight mb-4">
                  {product.name}
                </h1>

                {/* Primary Chemical Specification Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {product.casNumber && (
                    <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200/80 text-xs font-bold text-brand-blue">
                      CAS: {product.casNumber}
                    </span>
                  )}
                  {product.grade && (
                    <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-brand-dark/80">
                      {product.grade}
                    </span>
                  )}
                  {product.purity && (
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                      {product.purity}
                    </span>
                  )}
                  {product.formula && (
                    <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 font-mono">
                      {product.formula}
                    </span>
                  )}
                </div>

                {/* Detailed Chemical Description */}
                <div className="prose prose-slate max-w-none text-sm text-brand-dark/75 leading-relaxed space-y-3 mb-6">
                  <p>{product.description}</p>
                </div>

                {/* Sourcing Summary Box */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-3 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/60">
                      {isEn ? 'Commercial Terms' : 'የአቅርቦት ሁኔታዎች'}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {isEn ? 'Active Stock Available' : 'ክምችት ዝግጁ ነው'}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="text-brand-dark/50 block mb-0.5">{isEn ? 'Standard Packaging:' : 'መደበኛ ማሸጊያ:'}</span>
                      <strong className="text-brand-dark font-semibold">
                        {product.packaging || (isEn ? 'Factory Sealed Packaging' : 'ፋብሪካ የታሸገ')}
                      </strong>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 block mb-0.5">{isEn ? 'Dispatch Corridor:' : 'የስርጭት ቦታ:'}</span>
                      <strong className="text-brand-dark font-semibold">
                        {isEn ? 'Kaliti Logistics Corridor, Addis Ababa' : 'ቃሊቲ ሎጂስቲክስ ኮሪዶር፣ አዲስ አበባ'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 border-t border-slate-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary CTA: Official Quote Request */}
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(product)}
                    className="flex-1 py-4 px-6 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText size={16} />
                    <span>{t('productDetail.requestRfq')}</span>
                  </button>

                  {/* Add to Multi-Item RFQ Cart */}
                  {onAddToCart && (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product.id)}
                      className="py-4 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300/80 text-brand-dark text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      title={isEn ? "Add to RFQ List" : "ወደ መጠየቂያ ዝርዝር ጨምር"}
                    >
                      <Plus size={16} className="text-brand-blue" />
                      <span>{isEn ? 'Add to RFQ' : 'ወደ RFQ ጨምር'}</span>
                    </button>
                  )}
                </div>

                {/* Instant Social Channels */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={CONTACT_INFO.getWhatsAppUrl(whatsAppMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-green-500/15"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openTelegramApp(whatsAppMsg)}
                    className="py-3.5 px-4 rounded-2xl bg-[#229ED9] hover:bg-[#1e8cc1] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-sky-500/15"
                  >
                    <Send size={15} />
                    <span>Telegram</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications & Parameters Table */}
        <section className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue mb-1">
                {isEn ? 'Technical Data Sheet (TDS)' : 'የቴክኒክ መረጃ'}
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-dark">
                {t('productDetail.specs')}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onOpenQuoteModal(product)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue hover:bg-brand-blue hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <FileCheck size={14} />
              <span>{isEn ? 'Request Batch COA / MSDS' : 'የጥራት ሰርተፊኬት (COA) ጠይቅ'}</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Parameters from specifications array */}
            {product.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70"
                >
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold text-brand-dark">
                    {spec}
                  </div>
                </div>
              ))
            ) : null}

            {/* Standard parameter rows */}
            {product.casNumber && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <Sparkles size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-brand-dark/50 mr-1.5">{isEn ? 'CAS Registration:' : 'የ CAS ቁጥር:'}</span>
                  <strong className="text-brand-dark font-bold font-mono">{product.casNumber}</strong>
                </div>
              </div>
            )}

            {product.formula && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <Layers size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-brand-dark/50 mr-1.5">{t('productDetail.formula')}:</span>
                  <strong className="text-brand-dark font-bold font-mono">{product.formula}</strong>
                </div>
              </div>
            )}

            {product.grade && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <ShieldCheck size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-brand-dark/50 mr-1.5">{t('productDetail.grade')}:</span>
                  <strong className="text-brand-dark font-bold">{product.grade}</strong>
                </div>
              </div>
            )}

            {product.packaging && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <Package size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-brand-dark/50 mr-1.5">{t('productDetail.packaging')}:</span>
                  <strong className="text-brand-dark font-bold">{product.packaging}</strong>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Applications & Safe Handling Grid (2 Cards) */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Applications Card */}
          <section className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-blue">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-brand-dark">
                  {t('productDetail.usage')}
                </h3>
                <span className="text-[11px] text-brand-dark/50">
                  {isEn ? 'Formulation & Manufacturing Sectors' : 'የማምረቻ ዘርፎችና አጠቃቀም'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-dark/75 leading-relaxed">
              {product.usage || (isEn 
                ? 'Widely used across Ethiopian industrial manufacturing facilities, formulating household and institutional products with strict purity compliance.' 
                : 'በኢትዮጵያ የማምረቻ ኢንዱስትሪዎች ውስጥ ለተለያዩ ምርቶች ጥሬ ዕቃነት በስፋት የሚያገለግል።')}
            </p>
          </section>

          {/* Sourcing Benefits & Handling Card */}
          <section className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-brand-dark">
                  {t('productDetail.benefits')}
                </h3>
                <span className="text-[11px] text-brand-dark/50">
                  {isEn ? 'Quality Assurance & Stability' : 'የጥራት ዋስትና እና ጥቅሞች'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-dark/75 leading-relaxed">
              {product.benefits || (isEn 
                ? 'Consistent chemical formulation properties, superior shelf stability, and guaranteed compliance with Ethiopian Standards Agency (ESA) parameters.' 
                : 'ከፍተኛ ጥራት ያለው፣ የረጅም ጊዜ የመቆየት አቅም ያለው እና የተሟላ የጥራት ማረጋገጫ የተሰጠው።')}
            </p>
          </section>
        </div>

        {/* Instant Inquiry / Quick Lead Form on Page */}
        <section className="bg-gradient-to-br from-brand-dark via-slate-900 to-brand-blue/90 text-white rounded-3xl sm:rounded-[36px] p-6 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-brand-light mb-4">
              <FileText size={14} className="text-brand-blue" />
              <span>{isEn ? 'Direct Procurement Desk' : 'የቀጥታ ዋጋ መጠየቂያ'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
              {isEn ? `Request Pricing for ${product.name}` : `ለ${product.name} ፈጣን የዋጋ ዝርዝር ይጠይቁ`}
            </h2>

            <p className="text-xs sm:text-sm text-white/70 mb-8 leading-relaxed">
              {isEn 
                ? 'Submit your volume requirement below. Our chemical sourcing specialists in Addis Ababa will furnish an ex-stock and CIF quote within 24 hours.' 
                : 'የሚፈልጉትን መጠን እዚህ ይሙሉ፤ የአዲስ አበባ የኬሚካል ስፔሻሊስቶቻችን በ24 ሰዓታት ውስጥ ዝርዝር ዋጋ ይልካሉ።'}
            </p>

            {inquirySubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-white space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-300">
                  <CheckCircle2 size={20} />
                  <span>{isEn ? 'Inquiry Form Launched!' : 'ጥያቄዎ ተልኳል!'}</span>
                </div>
                <p className="text-xs text-white/80">
                  {isEn 
                    ? 'Your inquiry details have been forwarded to our WhatsApp sourcing desk. We will respond promptly.' 
                    : 'ጥያቄዎ ወደ ዋትስአፕ ተልኳል። ፈጣን ምላሽ እንሰጣለን።'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleInlineInquirySubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      {isEn ? 'Full Name *' : 'ሙሉ ስም *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={isEn ? "Abebe Kebede" : "አበበ ከበደ"}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      {isEn ? 'Phone / WhatsApp *' : 'ስልክ / ዋትስአፕ *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+251 9..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      {isEn ? 'Company / Factory Name' : 'የድርጅት ወይም የፋብሪካ ስም'}
                    </label>
                    <input
                      type="text"
                      value={inquiryCompany}
                      onChange={(e) => setInquiryCompany(e.target.value)}
                      placeholder={isEn ? "e.g. Addis Soap Manufacturing" : "ለምሳሌ፡ አዲስ ሳሙና ማምረቻ"}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      {isEn ? 'Quantity Needed' : 'የሚፈለገው መጠን'}
                    </label>
                    <input
                      type="text"
                      value={inquiryQty}
                      onChange={(e) => setInquiryQty(e.target.value)}
                      placeholder={isEn ? "e.g. 500 kg / 2 Metric Tons" : "ለምሳሌ፡ 500 ኪሎ / 2 ቶን"}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">
                    {isEn ? 'Notes / Delivery Destination' : 'ተጨማሪ ማስታወሻ ወይም የመድረሻ ቦታ'}
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder={isEn ? "Addis Ababa Kaliti, Dukem, Hawassa, or specific packaging preference..." : "የአቅርቦት ቦታ፣ ልዩ የማሸጊያ ምርጫ..."}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-white hover:text-brand-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Send size={15} />
                    <span>{isEn ? 'Send Quote Request via WhatsApp' : 'በዋትስአፕ የዋጋ ጥያቄ ላክ'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(product)}
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {isEn ? 'Open Full Quotation Builder' : 'ሙሉ የዋጋ ፎርም ክፈት'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Related Raw Materials Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue mb-1">
                  {isEn ? 'Complementary Inventory' : 'ተጨማሪ ተዛማጅ ምርቶች'}
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-dark">
                  {t('productDetail.related')}
                </h2>
              </div>

              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-brand-blue hover:text-brand-dark flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{isEn ? 'View All Catalog' : 'ሁሉንም ምርቶች ይመልከቱ'}</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="bg-white rounded-3xl border border-slate-200/80 hover:border-brand-blue/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={rel.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                      alt={`${rel.name} in Addis Ababa, Ethiopia`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-bold text-brand-blue uppercase">
                      {rel.casNumber ? `CAS ${rel.casNumber}` : rel.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-display text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 mb-2">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-brand-dark/60 line-clamp-2 mb-3">
                        {rel.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-blue font-bold">
                      <span>{isEn ? 'View Details' : 'ዝርዝር ይመልከቱ'}</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

