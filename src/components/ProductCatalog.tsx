import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronRight, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Mail, 
  Building, 
  Phone, 
  User, 
  MapPin, 
  Clipboard, 
  Check, 
  FileText, 
  Send, 
  Calendar, 
  ArrowLeft,
  Sparkles,
  Layers,
  Loader2,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, CONTACT_INFO, openTelegramApp } from '../constants';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import ProductQuoteModal from './ProductQuoteModal';
import { ProductCatalogSkeletonGrid } from './Skeletons';

interface RFQItem {
  id: string; // matches product.id
  quantity: number;
  unit: string; // 'kg' | 'tons' | 'L' | 'drums' | 'bags'
}

interface ProductCatalogProps {
  initialCategory?: string;
  onSelectProduct?: (product: Product) => void;
  onCategoryChangeExternal?: (categoryId: string) => void;
}

export default function ProductCatalog({
  initialCategory = 'all',
  onSelectProduct,
  onCategoryChangeExternal,
}: ProductCatalogProps = {}) {
  const { language, t } = useLanguage();
  const { products, loading, error, refreshProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync external category changes (e.g. from URL navigation)
  useEffect(() => {
    if (initialCategory && initialCategory !== activeCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Loading & skeleton states
  const [isFiltering, setIsFiltering] = useState(false);

  const isInitialLoading = loading;

  // Dedicated Product Quote Modal state
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // RFQ Cart State persisted in localStorage
  const [rfqCart, setRfqCart] = useState<RFQItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rfqCart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState(1); // 1 = review cart, 2 = contact form
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [rfqSummaryText, setRfqSummaryText] = useState('');
  const [copied, setCopied] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('rfqCart', JSON.stringify(rfqCart));
  }, [rfqCart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Category switch with skeleton transition
  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setIsFiltering(true);
    setActiveCategory(catId);
    if (onCategoryChangeExternal) {
      onCategoryChangeExternal(catId);
    }
    setTimeout(() => {
      setIsFiltering(false);
    }, 240);
  };

  const filteredProducts = products.filter(product => {
    const pCat = (product.category || '').toLowerCase().trim();
    const aCat = (activeCategory || '').toLowerCase().trim();
    
    const matchesCategory = 
      aCat === 'all' || 
      pCat === aCat || 
      pCat.includes(aCat) || 
      aCat.includes(pCat);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      product.name.toLowerCase().includes(q) || 
      (product.description && product.description.toLowerCase().includes(q)) ||
      (product.packaging && product.packaging.toLowerCase().includes(q)) ||
      (product.specifications && product.specifications.some(s => s.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  // Modal quote trigger
  const handleOpenQuoteModal = (product: Product) => {
    setSelectedProductForQuote(product);
    setIsQuoteModalOpen(true);
  };

  const handleAddToCartFromModal = (productId: string, quantity: number, unit: string) => {
    setRfqCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === productId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { id: productId, quantity, unit };
        return updated;
      }
      return [...prev, { id: productId, quantity, unit }];
    });
  };

  // Cart Management Functions
  const addToCart = (productId: string) => {
    setRfqCart(prev => {
      if (prev.some(item => item.id === productId)) return prev;
      return [...prev, { id: productId, quantity: 500, unit: 'kg' }];
    });
    setDrawerStep(1);
    setIsCartOpen(true);
  };

  const updateCartItemQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setRfqCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: qty } : item));
  };

  const updateCartItemUnit = (productId: string, unit: string) => {
    setRfqCart(prev => prev.map(item => item.id === productId ? { ...item, unit } : item));
  };

  const removeFromCart = (productId: string) => {
    setRfqCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(rfqSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formCompany || !formPhone) {
      alert(language === 'en' ? "Please fill in all required fields (Name, Company, Email, Phone)." : "እባክዎ ሁሉንም የሚፈለጉ መስኮችን ይሙሉ (ስም, ድርጅት, ኢሜይል, ስልክ)።");
      return;
    }

    // Build plain text RFQ summary
    const itemsText = rfqCart.map(item => {
      const prod = products.find(p => p.id === item.id) || PRODUCTS.find(p => p.id === item.id);
      return `- ${prod?.name || 'Chemical Item'}: ${item.quantity} ${item.unit}`;
    }).join('\n');

    const summary = `REQUEST FOR QUOTE (RFQ)
--------------------------------------
Company Details:
- Contact Person: ${formName}
- Company: ${formCompany}
- Email: ${formEmail}
- Phone: ${formPhone}
- Delivery Location: ${formLocation || 'Addis Ababa'}
- Preferred Delivery Timeline: ${formDate || 'Immediate'}

Requested Chemical Raw Materials:
${itemsText}

Additional Requirements / Logistics Notes:
${formNotes || 'None'}

Generated via Chemicals Hub Ethiopia Sourcing Portal (+251 972 691 911)
--------------------------------------`;

    setRfqSummaryText(summary);

    // Create mailto link pointing to direct company email
    const mailtoSubject = encodeURIComponent(`Industrial Chemicals RFQ - ${formCompany}`);
    const mailtoBody = encodeURIComponent(summary);
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Try opening the local mail handler
    window.location.href = mailtoUrl;

    // Transition state
    setIsSubmitSuccess(true);
  };

  const handleWhatsAppRFQ = () => {
    if (!rfqSummaryText) return;
    const whatsappUrl = CONTACT_INFO.getWhatsAppUrl(rfqSummaryText);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramRFQ = () => {
    if (!rfqSummaryText) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rfqSummaryText).catch(() => {});
    }
    openTelegramApp(rfqSummaryText);
  };

  const resetRFQ = () => {
    setRfqCart([]);
    setIsCartOpen(false);
    setIsSubmitSuccess(false);
    setDrawerStep(1);
    setFormName('');
    setFormCompany('');
    setFormEmail('');
    setFormPhone('');
    setFormLocation('');
    setFormDate('');
    setFormNotes('');
  };

  // Safe category resolver
  const resolveCategoryTabName = (catId: string, defaultName: string) => {
    if (catId === 'all') return t('cat.all');
    if (catId === 'detergent') return t('cat.detergent');
    if (catId === 'cosmetic' || catId === 'cosmetics') return t('cat.cosmetic');
    if (catId === 'industrial') return t('cat.industrial');
    if (catId === 'food') return t('cat.food');
    if (catId === 'laboratory' || catId === 'lab') return t('cat.laboratory');
    if (catId === 'watertreatment') return language === 'en' ? 'Water Treatment' : 'የውሃ ማከሚያ';
    if (catId === 'agriculture') return language === 'en' ? 'Agro Chemicals' : 'የግብርና ኬሚካሎች';
    return defaultName || catId.toUpperCase();
  };

  return (
    <section id="products" className="py-32 bg-white border-t border-gray-100 relative">
      {/* Toast notification banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-dark text-white px-6 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 text-xs font-semibold"
          >
            <Sparkles size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-brand-blue/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
                {t('cat.badge')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
              {t('cat.title')}
            </h2>
            <p className="text-brand-dark/40 leading-relaxed">
              {t('cat.desc')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
              <input 
                type="text" 
                placeholder={t('cat.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-150 text-xs text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2.5 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-6 sm:px-7 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15' 
                  : 'bg-brand-light text-brand-dark/50 hover:text-brand-dark hover:bg-gray-100 border border-gray-150'
              }`}
            >
              {resolveCategoryTabName(cat.id, cat.name)}
            </button>
          ))}
        </div>

        {/* Database Error Notice Banner */}
        {error && (
          <div className="mb-8 p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-amber-900">
                  {language === 'en' ? 'Database Notice' : 'የዳታቤዝ ማስታወሻ'}
                </p>
                <p className="text-[11px] text-amber-800/80 mt-0.5">
                  {error}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => refreshProducts()}
              className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0"
            >
              {language === 'en' ? 'Retry' : 'እንደገና ሞክር'}
            </button>
          </div>
        )}

        {/* Product Grid or Skeleton Loader */}
        {isInitialLoading || isFiltering ? (
          <ProductCatalogSkeletonGrid count={8} />
        ) : (
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isAdded = rfqCart.some(item => item.id === product.id);
                const cartItem = rfqCart.find(item => item.id === product.id);
                const primarySpec = (product.specifications && product.specifications[0]) || 'Active Matter: 96%';

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-brand-light p-7 sm:p-8 rounded-[40px] border transition-all duration-500 group flex flex-col h-full relative ${
                      isAdded ? 'border-brand-blue/40 bg-white shadow-lg' : 'border-gray-150 hover:border-brand-blue/30 hover:bg-white hover:shadow-2xl'
                    }`}
                  >
                    {/* Top Row: Cart icon & Category Pill Tag + Action icons */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm border ${
                        isAdded ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white border-gray-100 text-brand-blue group-hover:bg-brand-blue group-hover:text-white'
                      }`}>
                        <ShoppingCart size={20} />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-[9px] font-bold uppercase tracking-wider text-brand-blue">
                          {resolveCategoryTabName(product.category, '')}
                        </span>
                      </div>
                    </div>

                    {/* Product Name with Crawlable SEO Link */}
                    <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2.5 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      <a
                        href={`/product/${product.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (onSelectProduct) {
                            onSelectProduct(product);
                          }
                          window.history.pushState(null, '', `/product/${product.slug}`);
                          window.dispatchEvent(new Event('popstate'));
                        }}
                        className="hover:underline"
                        title={`${product.name} - Sourcing & Technical Specs in Addis Ababa, Ethiopia`}
                      >
                        {product.name}
                      </a>
                    </h3>

                    {/* Primary Specification with Sparkles icon */}
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-dark/70">
                      <Sparkles size={13} className="text-brand-blue flex-shrink-0" />
                      <span className="truncate">{primarySpec}</span>
                    </div>

                    {/* View Details / Specs button for SEO & UX */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(product);
                        window.history.pushState(null, '', `/product/${product.slug}`);
                        window.dispatchEvent(new Event('popstate'));
                      }}
                      className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-blue hover:text-brand-dark inline-flex items-center gap-1 cursor-pointer transition-colors text-left"
                    >
                      <span>{language === 'en' ? 'View Full Specs & COA →' : 'ዝርዝር መረጃና COA ይመልከቱ →'}</span>
                    </button>
                    
                    {/* Description Paragraph */}
                    <p className="text-xs text-brand-dark/50 mb-6 flex-grow leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Actions Section matching uploaded image */}
                    <div className="mt-auto space-y-2.5">
                      {/* Primary Action: Request a Quote Button */}
                      <button
                        id={`quote-btn-${product.id}`}
                        type="button"
                        onClick={() => handleOpenQuoteModal(product)}
                        className="w-full py-3.5 px-4 rounded-2xl bg-brand-blue text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-blue/15 group-hover:shadow-lg"
                      >
                        <FileText size={14} />
                        {t('modal.quoteTitle')}
                      </button>

                      {/* Secondary Action: Multi-item RFQ cart button */}
                      {!isAdded ? (
                        <button 
                          type="button"
                          onClick={() => addToCart(product.id)}
                          className="w-full py-2.5 px-3 rounded-xl border border-gray-200 hover:border-brand-blue/30 text-brand-dark/60 hover:text-brand-blue bg-white text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Plus size={12} />
                          {language === 'en' ? '+ Add to RFQ List' : '+ ወደ መጠየቂያ ዝርዝር ጨምር'}
                        </button>
                      ) : (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between bg-brand-light px-3 py-2 rounded-xl border border-gray-150">
                            <button 
                              type="button"
                              onClick={() => cartItem && updateCartItemQty(product.id, Math.max(0, cartItem.quantity - 100))}
                              className="p-1 hover:text-brand-blue text-brand-dark/40 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                min="1"
                                value={cartItem?.quantity || 500}
                                onChange={(e) => updateCartItemQty(product.id, parseInt(e.target.value) || 0)}
                                className="w-14 text-center bg-transparent border-none text-xs font-bold text-brand-dark focus:outline-none focus:ring-0 p-0"
                              />
                              
                              <select 
                                value={cartItem?.unit || 'kg'}
                                onChange={(e) => updateCartItemUnit(product.id, e.target.value)}
                                className="bg-transparent border-none text-[9px] font-bold text-brand-blue uppercase tracking-wider focus:outline-none focus:ring-0 p-0 cursor-pointer"
                              >
                                <option value="kg">kg</option>
                                <option value="tons">tons</option>
                                <option value="L">L</option>
                                <option value="drums">drums</option>
                                <option value="bags">bags</option>
                              </select>
                            </div>
   
                            <button 
                              type="button"
                              onClick={() => cartItem && updateCartItemQty(product.id, cartItem.quantity + 100)}
                              className="p-1 hover:text-brand-blue text-brand-dark/40 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
   
                          <button 
                            type="button"
                            onClick={() => setIsCartOpen(true)}
                            className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[9px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Check size={12} className="text-emerald-600" /> 
                            {t('cat.inRfq')} ({cartItem?.quantity} {cartItem?.unit})
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isInitialLoading && !isFiltering && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-brand-light rounded-[32px] border border-gray-200 p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-brand-blue mx-auto mb-4 shadow-sm">
              <Search size={22} />
            </div>
            <h4 className="text-base font-bold text-brand-dark mb-1">
              {language === 'en' ? 'No Chemicals Found' : 'ምንም የኬሚካል ምርት አልተገኘም'}
            </h4>
            <p className="text-xs text-brand-dark/60 mb-6">
              {searchQuery 
                ? (language === 'en' ? `No chemical products match "${searchQuery}". Try a different keyword or category.` : `ከ"${searchQuery}" ጋር የሚዛመድ ምርት አልተገኘም። እባክዎ ሌላ ቃል ይሞክሩ።`)
                : (language === 'en' ? 'No chemical products currently available in this category.' : 'በዚህ ዘርፍ ውስጥ በአሁኑ ጊዜ ምንም የኬሚካል ምርት የለም።')}
            </p>
            {(searchQuery || activeCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                {language === 'en' ? 'Reset Filters' : 'ማጣሪያውን አጽዳ'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Persistent Floating RFQ Checkout Button */}
      {rfqCart.length > 0 && !isCartOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-brand-blue hover:bg-brand-dark text-white px-8 py-5 rounded-full shadow-2xl hover:shadow-brand-blue/30 transition-all duration-500 group cursor-pointer border border-brand-blue/20"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {rfqCart.length}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              {t('cat.buildRfq')}
            </span>
          </button>
        </motion.div>
      )}

      {/* Slide-out RFQ Drawer & Modal Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm cursor-crosshair"
            />

            {/* Sliding Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white h-screen shadow-2xl flex flex-col z-10 border-l border-gray-100"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-medium text-lg text-brand-dark">
                    {t('rfq.title')}
                  </h3>
                  <p className="text-xs text-brand-dark/40 mt-1">
                    {rfqCart.length} {t('rfq.subtitle')}
                  </p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-brand-dark/40 hover:text-brand-dark hover:bg-brand-light transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {!isSubmitSuccess ? (
                <>
                  {/* Step Indicators */}
                  <div className="px-8 pt-6 grid grid-cols-2 gap-4">
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${drawerStep >= 1 ? 'bg-brand-blue' : 'bg-gray-100'}`} />
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${drawerStep >= 2 ? 'bg-brand-blue' : 'bg-gray-100'}`} />
                  </div>

                  {/* Body Content */}
                  <div className="flex-grow overflow-y-auto px-8 py-6">
                    {drawerStep === 1 ? (
                      /* STEP 1: Manage Selections */
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/40">
                            {t('rfq.review')}
                          </span>
                          {rfqCart.length > 0 && (
                            <button 
                              onClick={() => { if(confirm(language === 'en' ? "Clear selection?" : "ከመጠየቂያ ዝርዝር ውስጥ ሁሉንም ይሠርዙ?")) setRfqCart([]); }}
                              className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 hover:underline cursor-pointer"
                            >
                              {t('rfq.clearAll')}
                            </button>
                          )}
                        </div>

                        {rfqCart.length === 0 ? (
                          <div className="text-center py-20 bg-brand-light rounded-[32px] border border-dashed border-gray-200">
                            <ShoppingCart className="mx-auto text-brand-dark/20 mb-4" size={32} />
                            <p className="text-sm text-brand-dark/50 font-medium">
                              {t('rfq.empty')}
                            </p>
                            <p className="text-xs text-brand-dark/35 mt-1 max-w-xs mx-auto">
                              {t('rfq.emptyDesc')}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {rfqCart.map((item) => {
                              const prod = products.find(p => p.id === item.id) || PRODUCTS.find(p => p.id === item.id);
                              if (!prod) return null;
                              return (
                                <motion.div 
                                  layout
                                  key={item.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, x: -50 }}
                                  className="flex items-center justify-between bg-brand-light p-4 rounded-3xl border border-gray-100"
                                >
                                  <div className="flex-grow min-w-0 pr-4">
                                    <h5 className="font-bold text-sm text-brand-dark truncate">{prod.name}</h5>
                                    <span className="text-[10px] text-brand-blue font-medium uppercase tracking-wider">
                                      {resolveCategoryTabName(prod.category, '')}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="flex items-center bg-white border border-gray-100 rounded-xl px-2 py-1 shadow-sm">
                                      <input 
                                        type="number" 
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateCartItemQty(item.id, parseInt(e.target.value) || 0)}
                                        className="w-12 text-center bg-transparent border-none text-xs font-bold text-brand-dark focus:outline-none focus:ring-0 p-0"
                                      />
                                      <select 
                                        value={item.unit}
                                        onChange={(e) => updateCartItemUnit(item.id, e.target.value)}
                                        className="bg-transparent border-none text-[10px] font-bold text-brand-blue uppercase tracking-wider focus:outline-none focus:ring-0 p-0 cursor-pointer"
                                      >
                                        <option value="kg">kg</option>
                                        <option value="tons">tons</option>
                                        <option value="L">l</option>
                                        <option value="drums">drums</option>
                                        <option value="bags">bags</option>
                                      </select>
                                    </div>

                                    <button 
                                      onClick={() => removeFromCart(item.id)}
                                      className="p-2 text-brand-dark/30 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}

                        {rfqCart.length > 0 && (
                          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 text-xs text-blue-800 leading-relaxed">
                            {t('rfq.advisory')}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* STEP 2: Contact Details */
                      <form onSubmit={handleSubmitRFQ} className="space-y-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/40 block">
                          {t('rfq.contactHeader')}
                        </span>
                        
                        <div className="space-y-4">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                            <input 
                              type="text"
                              required
                              placeholder={t('rfq.formName')}
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                          </div>

                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                            <input 
                              type="text"
                              required
                              placeholder={t('rfq.formCompany')}
                              value={formCompany}
                              onChange={(e) => setFormCompany(e.target.value)}
                              className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                              <input 
                                type="email"
                                required
                                placeholder={t('rfq.formEmail')}
                                value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                                className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                              />
                            </div>

                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                              <input 
                                type="tel"
                                required
                                placeholder={t('rfq.formPhone')}
                                value={formPhone}
                                onChange={(e) => setFormPhone(e.target.value)}
                                className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                            <input 
                              type="text"
                              placeholder={t('rfq.formLocation')}
                              value={formLocation}
                              onChange={(e) => setFormLocation(e.target.value)}
                              className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                          </div>

                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                            <input 
                              type="text"
                              placeholder={t('rfq.formTimeline')}
                              value={formDate}
                              onChange={(e) => setFormDate(e.target.value)}
                              className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                            />
                          </div>

                          <div className="relative">
                            <FileText className="absolute left-4 top-4 text-brand-dark/30 w-4 h-4" />
                            <textarea 
                              rows={3}
                              placeholder={t('rfq.formNotes')}
                              value={formNotes}
                              onChange={(e) => setFormNotes(e.target.value)}
                              className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-brand-light border border-gray-100 text-brand-dark placeholder:text-brand-dark/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                            />
                          </div>
                        </div>

                        {/* Hidden submit trigger to let standard form submit work */}
                        <button type="submit" className="hidden" id="rfq-form-trigger" />
                      </form>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t border-gray-100 p-8 bg-brand-light mt-auto">
                    {drawerStep === 1 ? (
                      <button 
                        disabled={rfqCart.length === 0}
                        onClick={() => setDrawerStep(2)}
                        className="w-full py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl cursor-pointer bg-brand-blue text-white shadow-brand-blue/20 hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('rfq.btnProceed')}
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setDrawerStep(1)}
                          className="px-6 py-5 rounded-2xl border border-gray-200 text-brand-dark/60 hover:text-brand-dark text-[11px] font-bold uppercase tracking-[0.2em] bg-white hover:bg-gray-50 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <ArrowLeft size={16} />
                          {t('rfq.btnBack')}
                        </button>
                        
                        <button 
                          onClick={() => document.getElementById('rfq-form-trigger')?.click()}
                          className="flex-grow py-5 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-brand-blue/20 cursor-pointer"
                        >
                          <Send size={16} />
                          {t('rfq.btnSend')}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* STEP 3/SUCCESS: Compiled Quotation review & Clipboard action */
                <div className="flex-grow flex flex-col h-full bg-white">
                  <div className="flex-grow overflow-y-auto px-8 py-10 flex flex-col items-center justify-center text-center">
                    
                    {/* Animated Success Badge */}
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-xl border border-green-100 mb-6 scale-up">
                      <Check size={40} className="stroke-[3]" />
                    </div>

                    <h4 className="text-2xl font-display font-medium text-brand-dark mb-3">
                      {t('rfq.success')}
                    </h4>
                    <p className="text-sm text-brand-dark/40 max-w-sm mb-8 leading-relaxed">
                      {t('rfq.successDesc')}
                    </p>

                    {/* RFQ copy card */}
                    <div className="w-full bg-brand-light border border-gray-100 rounded-3xl p-6 text-left relative overflow-hidden shadow-inner">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          onClick={handleCopyClipboard}
                          className="flex items-center gap-1.5 bg-white border border-gray-100 hover:border-brand-blue px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 hover:text-brand-blue shadow-sm transition-all cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check size={12} className="text-green-500 stroke-[3]" />
                              {t('rfq.copied')}
                            </>
                          ) : (
                            <>
                              <Clipboard size={12} />
                              {t('rfq.copy')}
                            </>
                          )}
                        </button>
                      </div>

                      <span className="text-[9px] font-mono font-bold text-brand-blue uppercase tracking-widest block mb-4">
                        {t('rfq.draftReview')}
                      </span>
                      <pre className="text-[11px] font-mono text-brand-dark/60 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-56 bg-white/50 p-4 rounded-2xl border border-gray-150 shadow-inner">
                        {rfqSummaryText}
                      </pre>
                    </div>

                    {/* Quick copy instructions */}
                    <p className="text-[10px] text-brand-dark/35 tracking-wide leading-relaxed font-bold max-w-xs mt-6">
                      {t('rfq.warning')}
                    </p>
                  </div>

                  {/* Complete footer actions */}
                  <div className="border-t border-gray-100 p-6 sm:p-8 bg-brand-light mt-auto">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button 
                          onClick={handleWhatsAppRFQ}
                          className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <MessageSquare size={15} />
                          <span>{t('modal.whatsapp')}</span>
                        </button>

                        <button 
                          onClick={handleTelegramRFQ}
                          className="py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-600/20 cursor-pointer"
                        >
                          <Send size={15} />
                          <span>{t('modal.telegram')}</span>
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            window.location.href = `mailto:info@chemicalshubethiopia.com?subject=${encodeURIComponent(`Chemical RFQ - ${formCompany}`)}&body=${encodeURIComponent(rfqSummaryText)}`;
                          }}
                          className="flex-1 py-3.5 px-4 rounded-2xl border border-gray-200 bg-white text-brand-dark/70 hover:text-brand-dark text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Mail size={14} />
                          {t('rfq.btnRetry')}
                        </button>

                        <button 
                          onClick={resetRFQ}
                          className="flex-1 py-3.5 px-4 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-[10px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
                        >
                          <X size={14} />
                          {t('rfq.btnFinish')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dedicated Product Requirements Quote Modal */}
      <ProductQuoteModal
        product={selectedProductForQuote}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onAddToCart={handleAddToCartFromModal}
      />
    </section>
  );
}
