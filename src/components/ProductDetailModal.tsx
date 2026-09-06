import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Package, 
  Layers, 
  ShieldCheck, 
  Building2, 
  ArrowLeft, 
  ExternalLink,
  Camera,
  Loader2
} from 'lucide-react';
import { Product, Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { CONTACT_INFO, openTelegramApp } from '../constants';
import { SEO, buildProductSchema } from './SEO';

interface ProductDetailModalProps {
  product: Product;
  category?: Category;
  allProducts: Product[];
  onClose: () => void;
  onOpenQuoteModal: (product: Product) => void;
  onSelectRelatedProduct: (productSlug: string) => void;
}

export default function ProductDetailModal({
  product,
  category,
  allProducts,
  onClose,
  onOpenQuoteModal,
  onSelectRelatedProduct,
}: ProductDetailModalProps) {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const { updateProduct } = useProducts();
  const [displayImage, setDisplayImage] = useState(product.image);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  useEffect(() => {
    setDisplayImage(product.image);
  }, [product.image]);

  const handleModalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert(isEn ? 'File size must be under 15MB' : 'የፋይሉ መጠን ከ15MB ማነስ አለበት');
      return;
    }

    setIsUploading(true);

    try {
      let finalImageUrl: string | null = null;

      if (supabase && isSupabaseConfigured) {
        try {
          const fileExt = file.name.split('.').pop() || 'jpg';
          const fileName = `${product.id}-${Date.now()}.${fileExt}`;
          const filePath = `products/${fileName}`;

          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, { upsert: true });

          if (!uploadErr && uploadData) {
            const { data: urlData } = supabase.storage
              .from('product-images')
              .getPublicUrl(filePath);
            if (urlData?.publicUrl) {
              finalImageUrl = urlData.publicUrl;
            }
          }
        } catch (storageErr) {
          console.warn('Storage upload skipped, falling back to canvas compression', storageErr);
        }
      }

      if (!finalImageUrl) {
        finalImageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 1200;
              const MAX_HEIGHT = 900;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.82));
              } else {
                resolve(event.target?.result as string);
              }
            };
            img.onerror = () => resolve(event.target?.result as string);
            img.src = event.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      setDisplayImage(finalImageUrl);
      await updateProduct(product.id, { image: finalImageUrl });
      setUploadToast(isEn ? 'Image updated!' : 'ፎቶው ተቀይሯል!');
      setTimeout(() => setUploadToast(null), 3000);
    } catch (err: any) {
      console.error('Failed to upload modal image:', err);
      alert(isEn ? 'Failed to upload image. Please try again.' : 'ፎቶውን መጫን አልተቻለም።');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const catName = category?.name || product.category;
  const catSlug = category?.slug || `${product.category}-chemicals-ethiopia`;

  // Find related products
  const relatedProducts = allProducts.filter(p => {
    if (p.id === product.id) return false;
    if (product.relatedProductSlugs && product.relatedProductSlugs.includes(p.slug)) return true;
    return p.category === product.category;
  }).slice(0, 3);

  const productSchema = buildProductSchema(product, category, language);

  const pageTitle = isEn
    ? `Buy ${product.name} in Ethiopia - Supplier & Price`
    : `${product.name} በኢትዮጵያ - አቅራቢና ዋጋ ዝርዝር`;

  const pageDesc = isEn
    ? `Source high-purity ${product.name} in Addis Ababa, Ethiopia. CAS: ${product.casNumber || 'N/A'}. Grade: ${product.grade || 'Industrial'}. Warehouse dispatch in Kaliti with COA and MSDS.`
    : `በአዲስ አበባ እና በኢትዮጵያ ከፍተኛ ጥራት ያለው ${product.name} በታማኝነት ያግኙ። የጥራት ማረጋገጫ COA እና MSDS አብሮት ይቀርባል።`;

  const whatsAppMsg = isEn
    ? `Hello Chemicals Hub Ethiopia, I would like to inquire about pricing, stock availability, and specifications for ${product.name} (CAS: ${product.casNumber || 'N/A'}).`
    : `ሰላም ኬሚካልስ ሐብ ኢትዮጵያ፣ ስለ ${product.name} ዋጋ፣ የክምችት መጠን እና የጥራት መረጃ ማወቅ እፈልጋለሁ።`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-brand-dark/85 backdrop-blur-md overflow-y-auto">
        <SEO 
          title={pageTitle}
          description={pageDesc}
          canonical={`/product/${product.slug}`}
          ogType="product"
          ogImage={product.image}
          schema={productSchema}
          language={language}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-gray-200 my-auto"
        >
          {/* Top Bar: Breadcrumb + Close Button */}
          <div className="px-6 py-4 bg-brand-light border-b border-gray-150 flex items-center justify-between gap-4">
            {/* Breadcrumb links */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-dark/50 overflow-x-auto whitespace-nowrap">
              <a 
                href="/" 
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className="hover:text-brand-blue transition-colors font-medium"
              >
                {t('breadcrumb.home')}
              </a>
              <ChevronRight size={12} className="text-brand-dark/30 flex-shrink-0" />
              <a 
                href="#products" 
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className="hover:text-brand-blue transition-colors font-medium"
              >
                {t('breadcrumb.products')}
              </a>
              <ChevronRight size={12} className="text-brand-dark/30 flex-shrink-0" />
              <a 
                href={`/category/${catSlug}`}
                onClick={(e) => { 
                  e.preventDefault(); 
                  window.history.pushState(null, '', `/category/${catSlug}`);
                  window.dispatchEvent(new Event('popstate'));
                }}
                className="hover:text-brand-blue transition-colors font-medium text-brand-blue"
              >
                {catName}
              </a>
            </nav>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-brand-dark/70 hover:text-brand-dark flex items-center justify-center transition-all cursor-pointer shadow-xs flex-shrink-0"
              aria-label="Close chemical details"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Main Header & Image Grid */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Product Visual */}
              <div className="md:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden bg-brand-light border border-gray-150 shadow-sm group/modalimg">
                <img 
                  src={displayImage || product.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'}
                  alt={`${product.name} - Chemical raw materials supplier in Addis Ababa, Ethiopia`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/modalimg:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  {catName}
                </div>

                {uploadToast && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-md">
                    {uploadToast}
                  </div>
                )}

                {/* Upload / Change Image button */}
                <label 
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 shadow-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 z-10"
                  title={isEn ? "Upload chemical photo" : "የምርት ፎቶ ጫን"}
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={13} className="animate-spin text-white" />
                      <span>{isEn ? 'Uploading...' : 'በመጫን ላይ...'}</span>
                    </>
                  ) : (
                    <>
                      <Camera size={13} className="text-white" />
                      <span>{isEn ? 'Upload Photo' : 'ፎቶ ቀይር'}</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleModalImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Product Key Metadata */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {product.casNumber && (
                      <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200/80 text-[10px] font-bold text-brand-blue tracking-wider">
                        CAS: {product.casNumber}
                      </span>
                    )}
                    {product.grade && (
                      <span className="px-3 py-1 rounded-xl bg-gray-100 border border-gray-200 text-[10px] font-bold text-brand-dark/70 tracking-wider">
                        {product.grade}
                      </span>
                    )}
                    {product.purity && (
                      <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 tracking-wider">
                        {product.purity}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark leading-tight mb-3">
                    {product.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-brand-dark/60 leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(product)}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>{t('productDetail.requestRfq')}</span>
                  </button>

                  <a
                    href={CONTACT_INFO.getWhatsAppUrl(whatsAppMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-green-500/15"
                  >
                    <MessageCircle size={16} />
                    <span>{t('productDetail.inquireWhatsapp')}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openTelegramApp(whatsAppMsg)}
                    title="Inquire on Telegram (+251 972 691 911)"
                    className="py-3.5 px-4 rounded-2xl bg-[#229ED9] hover:bg-[#1e8cc1] text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-sky-500/15"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications & Parameters */}
            <div className="bg-brand-light p-6 rounded-3xl border border-gray-150">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue mb-4 flex items-center gap-2">
                <Sparkles size={14} />
                <span>{t('productDetail.specs')}</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {product.specifications && product.specifications.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-brand-dark/80 bg-white p-3 rounded-xl border border-gray-150">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{spec}</span>
                  </div>
                ))}
                {product.formula && (
                  <div className="flex items-start gap-2 text-xs text-brand-dark/80 bg-white p-3 rounded-xl border border-gray-150">
                    <Layers size={15} className="text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong className="text-brand-dark">{t('productDetail.formula')}:</strong> {product.formula}</span>
                  </div>
                )}
                {product.packaging && (
                  <div className="flex items-start gap-2 text-xs text-brand-dark/80 bg-white p-3 rounded-xl border border-gray-150">
                    <Package size={15} className="text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong className="text-brand-dark">{t('productDetail.packaging')}:</strong> {product.packaging}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Industrial Usage & Key Advantages */}
            <div className="grid md:grid-cols-2 gap-6">
              {product.usage && (
                <div className="p-6 rounded-3xl border border-gray-150 bg-white shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/50 mb-3 flex items-center gap-2">
                    <Building2 size={14} className="text-brand-blue" />
                    <span>{t('productDetail.usage')}</span>
                  </h3>
                  <p className="text-xs text-brand-dark/70 leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              )}

              {product.benefits && (
                <div className="p-6 rounded-3xl border border-gray-150 bg-white shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/50 mb-3 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>{t('productDetail.benefits')}</span>
                  </h3>
                  <p className="text-xs text-brand-dark/70 leading-relaxed">
                    {product.benefits}
                  </p>
                </div>
              )}
            </div>

            {/* Related Raw Materials Section (Internal Linking) */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 border-t border-gray-150">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/40 mb-4">
                  {t('productDetail.related')}
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {relatedProducts.map((rel) => (
                    <a
                      key={rel.id}
                      href={`/product/${rel.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectRelatedProduct(rel.slug);
                      }}
                      className="p-4 rounded-2xl bg-brand-light border border-gray-150 hover:border-brand-blue/40 hover:bg-white hover:shadow-md transition-all group block text-left"
                    >
                      <div className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                        {rel.casNumber ? `CAS ${rel.casNumber}` : rel.category}
                      </div>
                      <div className="text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2">
                        {rel.name}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

