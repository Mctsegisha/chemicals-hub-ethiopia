import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  SendHorizontal,
  Check, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Package, 
  FileCheck2, 
  Sparkles, 
  MessageSquare, 
  Clipboard, 
  ShoppingCart, 
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO, openTelegramApp } from '../constants';

interface ProductQuoteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (productId: string, quantity: number, unit: string) => void;
}

export default function ProductQuoteModal({
  product,
  isOpen,
  onClose,
  onAddToCart
}: ProductQuoteModalProps) {
  const { language, t } = useLanguage();

  // Form State
  const [quantity, setQuantity] = useState<number>(500);
  const [unit, setUnit] = useState<string>('kg');
  const [packaging, setPackaging] = useState<string>('drums');
  const [grade, setGrade] = useState<string>('industrial');
  const [location, setLocation] = useState<string>('Addis Ababa - Central Warehouse / Kaliti');
  const [timeline, setTimeline] = useState<string>('urgent');
  
  // Document and sample requests
  const [requireCoa, setRequireCoa] = useState<boolean>(true);
  const [requireMsds, setRequireMsds] = useState<boolean>(true);
  const [requestSample, setRequestSample] = useState<boolean>(false);

  // Contact Info
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // UI state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [rfqSummary, setRfqSummary] = useState<string>('');
  const [rfqRefNumber, setRfqRefNumber] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  // Preset quantity increment helper
  const handleQuickQty = (qty: number, targetUnit: string) => {
    setQuantity(qty);
    setUnit(targetUnit);
  };

  const generateRFQText = () => {
    const ref = rfqRefNumber || `ETH-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const text = `=========================================
OFFICIAL CHEMICAL QUOTATION REQUEST (RFQ)
Reference No: ${ref}
Platform: Chemicals Hub Ethiopia (Addis Ababa)
Date: ${new Date().toLocaleDateString('en-GB')}
=========================================

1. PRODUCT & SPECIFICATION REQUIREMENTS:
- Chemical Name: ${product.name}
- Category: ${product.category.toUpperCase()}
- Required Quantity: ${quantity} ${unit}
- Packaging Format: ${packaging}
- Intended Application / Grade: ${grade}
- Technical Documents: ${requireCoa ? '[✓] COA Required' : ''} ${requireMsds ? '[✓] MSDS Required' : ''} ${requestSample ? '[✓] Lab Sample Requested' : ''}

2. DELIVERY & DESTINATION (ETHIOPIA):
- Delivery Destination: ${location}
- Target Timeline: ${timeline}

3. PROCUREMENT CONTACT DETAILS:
- Contact Person: ${name}
- Company / Factory: ${company}
- Business Email: ${email}
- Phone / WhatsApp: ${phone}

4. ADDITIONAL FORMULATION & LOGISTICS NOTES:
${notes || 'Standard industrial specifications as per catalog.'}

=========================================
Generated via Chemicals Hub Ethiopia Portal
Web: chemicalshubethiopia.com | Email: info@chemicalshubethiopia.com
=========================================`;
    return { text, ref };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email || !phone) {
      alert(language === 'en' ? 'Please complete all required contact fields.' : 'እባክዎ ሁሉንም የግዴታ የመገናኛ መስኮች ይሙሉ');
      return;
    }

    const { text, ref } = generateRFQText();
    setRfqRefNumber(ref);
    setRfqSummary(text);

    // Launch mailto
    const mailtoSubject = encodeURIComponent(`Industrial Quote Request [${ref}] - ${product.name} - ${company}`);
    const mailtoBody = encodeURIComponent(text);
    const mailtoUrl = `mailto:info@chemicalshubethiopia.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const { text, ref } = generateRFQText();
    setRfqRefNumber(ref);
    setRfqSummary(text);
    // Open verified Ethiopian WhatsApp sourcing hotline +251972691911
    const whatsappUrl = CONTACT_INFO.getWhatsAppUrl(text);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramSend = () => {
    const { text, ref } = generateRFQText();
    setRfqRefNumber(ref);
    setRfqSummary(text);
    // Auto-copy RFQ requirements so customer can easily paste in chat if desired
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    // Launch installed Telegram application directly via native deep link (+251972691911)
    openTelegramApp(text);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(rfqSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddCartAndClose = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity, unit);
      setAddedToCartSuccess(true);
      setTimeout(() => {
        setAddedToCartSuccess(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      id="product-quote-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-brand-dark/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl border border-gray-150 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="relative px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-100 bg-brand-light flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 pr-6">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Package size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-[9px] font-bold uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest hidden sm:inline-block">
                  {t('modal.quoteTitle')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-brand-dark leading-tight">
                {product.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 text-brand-dark/50 hover:text-brand-dark hover:bg-gray-50 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-xs"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow p-6 sm:p-8 space-y-8">
            
            {/* Product Quick Specs Chips */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="bg-blue-50/40 border border-blue-100/60 rounded-2xl p-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-blue block mb-2">
                  {t('modal.specs')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.specifications.map((spec, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-blue-100 text-xs font-semibold text-brand-dark/80 shadow-xs"
                    >
                      <Sparkles size={11} className="text-brand-blue" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section 1: Requirement Parameters */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark/60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  1. {language === 'en' ? 'Volume & Packaging Requirements' : 'የመጠንና የማሸጊያ ፍላጎት'}
                </h4>
                <span className="text-[10px] text-brand-dark/40 font-bold">
                  {language === 'en' ? 'Quick Quantity Presets' : 'ፈጣን የመጠን አማራጮች'}
                </span>
              </div>

              {/* Quantity Input + Unit + Quick Preset Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 relative">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 mb-1.5">
                      {t('modal.qty')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-3 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                    />
                  </div>

                  <div className="sm:col-span-4 relative">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 mb-1.5">
                      {t('modal.unit')}
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                    >
                      <option value="kg">kg (Kilograms)</option>
                      <option value="tons">Tons (Metric Tons)</option>
                      <option value="L">L (Liters)</option>
                      <option value="drums">Drums (200L / 220kg)</option>
                      <option value="ibc">IBC Totes (1,000L)</option>
                      <option value="bags">Bags (25kg standard)</option>
                      <option value="fcl">20ft FCL Container</option>
                    </select>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleQuickQty(250, 'kg')}
                    className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-brand-blue border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 transition-colors cursor-pointer"
                  >
                    +250 kg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQty(500, 'kg')}
                    className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-brand-blue border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 transition-colors cursor-pointer"
                  >
                    +500 kg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQty(1, 'tons')}
                    className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-brand-blue border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 transition-colors cursor-pointer"
                  >
                    +1 Metric Ton
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQty(5, 'tons')}
                    className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-brand-blue border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 transition-colors cursor-pointer"
                  >
                    +5 Metric Tons
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQty(1, 'fcl')}
                    className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-brand-blue border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 transition-colors cursor-pointer"
                  >
                    1x 20ft FCL Container
                  </button>
                </div>
              </div>

              {/* Packaging & Grade Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 mb-1.5">
                    {t('modal.packaging')}
                  </label>
                  <select
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                  >
                    <option value="drums">{t('modal.packaging.drums')}</option>
                    <option value="bags">{t('modal.packaging.bags')}</option>
                    <option value="ibc">{t('modal.packaging.ibc')}</option>
                    <option value="tanker">{t('modal.packaging.tanker')}</option>
                    <option value="custom">{t('modal.packaging.custom')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 mb-1.5">
                    {t('modal.grade')}
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                  >
                    <option value="industrial">{t('modal.grade.industrial')}</option>
                    <option value="cosmetic">{t('modal.grade.cosmetic')}</option>
                    <option value="detergent">{t('modal.grade.detergent')}</option>
                    <option value="food">{t('modal.grade.food')}</option>
                    <option value="pharma">{t('modal.grade.pharma')}</option>
                  </select>
                </div>
              </div>

              {/* Delivery Location & Timeline Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 mb-1.5">
                    {t('modal.location')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4 pointer-events-none" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                    >
                      <option value="Addis Ababa - Central Warehouse / Kaliti">Addis Ababa - Central / Kaliti Hub</option>
                      <option value="Bole Lemi Industrial Park">Bole Lemi Industrial Park (Addis Ababa)</option>
                      <option value="Dukem / Eastern Industrial Zone">Dukem / Eastern Industrial Zone</option>
                      <option value="Hawassa Industrial Park">Hawassa Industrial Park</option>
                      <option value="Adama Industrial Park">Adama Industrial Park</option>
                      <option value="Dire Dawa Free Trade Zone">Dire Dawa Free Trade Zone</option>
                      <option value="Kilinto Pharma Industrial Park">Kilinto Pharma Industrial Park</option>
                      <option value="Bahir Dar / Amhara Region">Bahir Dar / Amhara Region</option>
                      <option value="Mekelle / Tigray Region">Mekelle / Tigray Region</option>
                      <option value="Other Ethiopian Industrial Location">Other Ethiopian Industrial Location</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 mb-1.5">
                    {t('modal.timeline')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4 pointer-events-none" />
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                    >
                      <option value="urgent">{t('modal.timeline.urgent')}</option>
                      <option value="weeks">{t('modal.timeline.weeks')}</option>
                      <option value="month">{t('modal.timeline.month')}</option>
                      <option value="recurring">{t('modal.timeline.recurring')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Technical Certifications / Document Toggles */}
              <div className="mt-4 p-4 rounded-2xl bg-brand-light/60 border border-gray-150 space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/50 block mb-2">
                  {t('modal.docs')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-brand-dark cursor-pointer hover:border-brand-blue/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={requireCoa}
                      onChange={(e) => setRequireCoa(e.target.checked)}
                      className="rounded text-brand-blue focus:ring-brand-blue"
                    />
                    <span>{t('modal.docCoa')}</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-brand-dark cursor-pointer hover:border-brand-blue/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={requireMsds}
                      onChange={(e) => setRequireMsds(e.target.checked)}
                      className="rounded text-brand-blue focus:ring-brand-blue"
                    />
                    <span>{t('modal.docMsds')}</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-brand-dark cursor-pointer hover:border-brand-blue/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={requestSample}
                      onChange={(e) => setRequestSample(e.target.checked)}
                      className="rounded text-brand-blue focus:ring-brand-blue"
                    />
                    <span>{t('modal.docSample')}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Company Info */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark/60 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                2. {t('modal.contact')}
              </h4>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                    <input
                      type="text"
                      required
                      placeholder={t('modal.name')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                    <input
                      type="text"
                      required
                      placeholder={t('modal.company')}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                    <input
                      type="email"
                      required
                      placeholder={t('modal.email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-4 h-4" />
                    <input
                      type="tel"
                      required
                      placeholder={t('modal.phone')}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder={t('modal.notesPlaceholder')}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-brand-light border border-gray-200 text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Optional multi-product cart helper */}
              {onAddToCart && (
                <button
                  type="button"
                  onClick={handleAddCartAndClose}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-brand-dark/70 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {addedToCartSuccess ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      {t('modal.addedToCart')}
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      {t('modal.addToCart')}
                    </>
                  )}
                </button>
              )}

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto ml-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="px-3.5 sm:px-4 py-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Direct WhatsApp Quote Inquiry (+251 972 691 911)"
                >
                  <MessageSquare size={14} className="text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleTelegramSend}
                  className="px-3.5 sm:px-4 py-3.5 rounded-2xl border border-sky-500/30 bg-sky-50/50 hover:bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Direct Telegram Quote Inquiry (+251 972 691 911)"
                >
                  <Send size={14} className="text-sky-600" />
                  <span>Telegram</span>
                </button>

                <button
                  type="submit"
                  className="flex-grow sm:flex-grow-0 px-6 sm:px-8 py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <SendHorizontal size={15} />
                  {t('modal.submit')}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-6 sm:p-10 flex flex-col items-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mb-5 shadow-lg">
              <Check size={32} className="stroke-[3]" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">
              {rfqRefNumber}
            </span>
            <h4 className="text-2xl font-display font-bold text-brand-dark mb-2">
              {t('modal.successTitle')}
            </h4>
            <p className="text-xs text-brand-dark/50 max-w-md mb-6 leading-relaxed">
              {t('modal.successSubtitle')}
            </p>

            {/* Compiled RFQ Box */}
            <div className="w-full bg-brand-light border border-gray-200 rounded-2xl p-4 text-left relative overflow-hidden mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono font-bold text-brand-blue uppercase tracking-widest">
                  {t('rfq.draftReview')}
                </span>
                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-blue text-[10px] font-bold text-brand-dark/70 hover:text-brand-blue shadow-xs transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={11} className="text-emerald-500" />
                      {t('rfq.copied')}
                    </>
                  ) : (
                    <>
                      <Clipboard size={11} />
                      {t('modal.copyBrief')}
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-brand-dark/70 whitespace-pre-wrap max-h-48 overflow-y-auto bg-white/60 p-3 rounded-xl border border-gray-150">
                {rfqSummary}
              </pre>
            </div>

            {/* Next actions */}
            <div className="flex flex-wrap gap-3 w-full justify-center">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="px-5 sm:px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
              >
                <MessageSquare size={14} />
                {t('modal.whatsapp')}
              </button>

              <button
                type="button"
                onClick={handleTelegramSend}
                className="px-5 sm:px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-sky-600/20"
              >
                <Send size={14} />
                {t('modal.telegram')}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 sm:px-8 py-3 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                {t('modal.close')}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
