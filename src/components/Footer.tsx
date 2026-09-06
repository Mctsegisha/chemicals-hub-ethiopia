
import React, { useState } from 'react';
import { 
  Beaker, 
  Facebook, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  ChevronDown, 
  ArrowUp,
  ShieldCheck,
  ExternalLink,
  Droplets,
  Sparkles,
  Factory,
  Utensils,
  FlaskConical
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO, openTelegramApp } from '../constants';

export default function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isEn = language === 'en';

  // Mobile Accordion state (open/closed sections on mobile)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    links: false,
    categories: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Safe navigation handler for SPA deep routing
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/category/') || href.startsWith('/product/')) {
      e.preventDefault();
      window.history.pushState(null, '', href);
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '/') {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
        window.dispatchEvent(new Event('popstate'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href.startsWith('/#') || href.startsWith('#')) {
      e.preventDefault();
      const hash = href.includes('#') ? href.split('#')[1] : '';
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', `/#${hash}`);
        window.dispatchEvent(new Event('popstate'));
      }
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.products'), href: '/#products' },
    { name: t('nav.services'), href: '/#services' },
    { name: isEn ? 'Why Choose Us' : 'ለምን እኛ', href: '/#why' },
    { name: isEn ? 'FAQ' : 'ጥያቄዎች', href: '/#faq' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const categoryLinks = [
    { 
      name: t('cat.detergent'), 
      href: '/category/detergent-chemicals-ethiopia',
      icon: <Droplets size={13} className="text-brand-blue" />
    },
    { 
      name: t('cat.cosmetic'), 
      href: '/category/cosmetic-ingredients-addis-ababa',
      icon: <Sparkles size={13} className="text-brand-blue" />
    },
    { 
      name: t('cat.food'), 
      href: '/category/food-additives-supplier-ethiopia',
      icon: <Utensils size={13} className="text-brand-blue" />
    },
    { 
      name: t('cat.industrial'), 
      href: '/category/industrial-chemicals-supplier-ethiopia',
      icon: <Factory size={13} className="text-brand-blue" />
    },
    { 
      name: t('cat.laboratory'), 
      href: '/category/laboratory-chemicals-supplier-ethiopia',
      icon: <FlaskConical size={13} className="text-brand-blue" />
    },
  ];

  return (
    <footer className="bg-white text-brand-dark border-t border-gray-150 pt-20 pb-12 relative overflow-hidden">
      {/* Background subtle radial accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Multi-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-gray-100">
          
          {/* Column 1: Company Info & Branding (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center gap-3 group"
              title="Chemicals Hub Ethiopia - Homepage"
            >
              <div className="bg-brand-blue p-2.5 rounded-2xl text-white shadow-lg shadow-brand-blue/20 group-hover:scale-105 transition-transform">
                <Beaker size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight uppercase leading-none">
                  CHEMICALS HUB <span className="text-brand-blue">ETHIOPIA</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-brand-dark/40 mt-1">
                  {isEn ? 'Industrial Raw Material Sourcing' : 'የኢንዱስትሪ ኬሚካል ጥሬ ዕቃዎች'}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-brand-dark/60 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            {/* Sourcing & Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-[10px] font-semibold text-brand-blue">
              <ShieldCheck size={14} className="text-brand-blue flex-shrink-0" />
              <span>{isEn ? 'ECAE Quality Verified • Kaliti Dispatch' : 'በላቦራቶሪ የተረጋገጠ • ፈጣን ስርጭት ከቃሊቲ'}</span>
            </div>

            {/* Social Media & Instant Chat Links */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark/40 mb-3">
                {isEn ? 'Direct Channels & Social' : 'ማህበራዊ ገጾችና ቀጥታ መስመሮች'}
              </span>
              <div className="flex items-center gap-2.5">
                <a 
                  href={CONTACT_INFO.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp (+251 972 691 911)"
                  className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <MessageCircle size={18} />
                </a>
                <button 
                  type="button"
                  onClick={() => openTelegramApp()}
                  aria-label="Chat on Telegram"
                  title="Telegram (@chemicalshubethiopia)"
                  className="w-10 h-10 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/20 flex items-center justify-center text-[#229ED9] hover:bg-[#229ED9] hover:text-white transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <Send size={17} />
                </button>
                <a 
                  href="https://www.linkedin.com/company/chemicalshubethiopia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="Chemicals Hub Ethiopia on LinkedIn"
                  className="w-10 h-10 rounded-xl bg-brand-light border border-gray-150 flex items-center justify-center text-brand-dark/60 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <Linkedin size={17} />
                </a>
                <a 
                  href="https://www.facebook.com/chemicalshubethiopia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Chemicals Hub Ethiopia on Facebook"
                  className="w-10 h-10 rounded-xl bg-brand-light border border-gray-150 flex items-center justify-center text-brand-dark/60 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <Facebook size={17} />
                </a>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label="Send an Email"
                  title={`Email us: ${CONTACT_INFO.email}`}
                  className="w-10 h-10 rounded-xl bg-brand-light border border-gray-150 flex items-center justify-center text-brand-dark/60 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <Mail size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg: 2 cols) */}
          <div className="lg:col-span-2 border-t md:border-t-0 pt-5 md:pt-0 border-gray-100">
            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => toggleSection('links')}
              className="w-full flex items-center justify-between md:cursor-default text-left md:pointer-events-none group"
              aria-expanded={openSections.links}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue flex items-center gap-2">
                <span>{t('footer.links')}</span>
              </h3>
              <span className="md:hidden text-brand-dark/40 group-hover:text-brand-blue transition-transform duration-300">
                <ChevronDown size={16} className={openSections.links ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </span>
            </button>

            {/* Links List - Accordion on mobile, always visible on tablet/desktop */}
            <ul className={`mt-4 space-y-3.5 text-xs font-medium text-brand-dark/60 ${openSections.links ? 'block' : 'hidden'} md:block md:mt-6`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-brand-blue transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories (lg: 3 cols) */}
          <div className="lg:col-span-3 border-t md:border-t-0 pt-5 md:pt-0 border-gray-100">
            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between md:cursor-default text-left md:pointer-events-none group"
              aria-expanded={openSections.categories}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue flex items-center gap-2">
                <span>{t('footer.industries')}</span>
              </h3>
              <span className="md:hidden text-brand-dark/40 group-hover:text-brand-blue transition-transform duration-300">
                <ChevronDown size={16} className={openSections.categories ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </span>
            </button>

            {/* Category Links List */}
            <ul className={`mt-4 space-y-3 text-xs font-medium text-brand-dark/60 ${openSections.categories ? 'block' : 'hidden'} md:block md:mt-6`}>
              {categoryLinks.map((cat) => (
                <li key={cat.href}>
                  <a
                    href={cat.href}
                    onClick={(e) => handleLinkClick(e, cat.href)}
                    className="hover:text-brand-blue transition-colors flex items-center gap-2 py-0.5 group"
                  >
                    <span className="p-1 rounded-md bg-brand-light group-hover:bg-blue-50 transition-colors">
                      {cat.icon}
                    </span>
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Logistics (lg: 3 cols) */}
          <div className="lg:col-span-3 border-t md:border-t-0 pt-5 md:pt-0 border-gray-100">
            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between md:cursor-default text-left md:pointer-events-none group"
              aria-expanded={openSections.contact}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue flex items-center gap-2">
                <span>{t('footer.contact')}</span>
              </h3>
              <span className="md:hidden text-brand-dark/40 group-hover:text-brand-blue transition-transform duration-300">
                <ChevronDown size={16} className={openSections.contact ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </span>
            </button>

            {/* Contact Details List */}
            <ul className={`mt-4 space-y-4 text-xs text-brand-dark/70 ${openSections.contact ? 'block' : 'hidden'} md:block md:mt-6`}>
              <li>
                <a 
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-start gap-3 group"
                  title="Call Chemicals Hub Ethiopia"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {CONTACT_INFO.phone}
                    </span>
                    <span className="text-[10px] text-brand-dark/40">
                      {isEn ? 'Call or WhatsApp Desk' : 'ስልክና ዋትስአፕ'}
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-3 group"
                  title="Email Chemicals Hub Ethiopia"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-dark group-hover:text-brand-blue transition-colors truncate">
                      {CONTACT_INFO.email}
                    </span>
                    <span className="text-[10px] text-brand-dark/40">
                      {isEn ? 'Official RFQ Inquiries' : 'ኦፊሴላዊ የዋጋ ጥያቄ'}
                    </span>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light border border-gray-150 flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="block font-medium text-brand-dark/80">
                    {isEn ? 'Kaliti Logistics Corridor' : 'ቃሊቲ ማዕከላዊ ሎጂስቲክስ'}
                  </span>
                  <span className="text-[10px] text-brand-dark/40">
                    {isEn ? 'Addis Ababa, Ethiopia' : 'አዲስ አበባ፣ ኢትዮጵያ'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light border border-gray-150 flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5">
                  <Clock size={14} />
                </div>
                <div>
                  <span className="block font-medium text-brand-dark/80">
                    {t('contact.hours.detail')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isEn ? 'Open for Orders' : 'ክፍት ነው'}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links, and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-dark/50">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {t('footer.rights')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <a 
              href="/#contact" 
              onClick={(e) => handleLinkClick(e, '/#contact')}
              className="hover:text-brand-blue transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="/#contact" 
              onClick={(e) => handleLinkClick(e, '/#contact')}
              className="hover:text-brand-blue transition-colors"
            >
              {t('footer.terms')}
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors inline-flex items-center gap-1"
            >
              <span>{isEn ? 'Sitemap' : 'ሳይትማፕ'}</span>
              <ExternalLink size={10} />
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-light hover:bg-blue-50 border border-gray-150 hover:border-brand-blue/30 text-brand-dark/60 hover:text-brand-blue text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            title="Scroll back to top"
          >
            <span>{isEn ? 'Top' : 'ወደ ላይ'}</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}

