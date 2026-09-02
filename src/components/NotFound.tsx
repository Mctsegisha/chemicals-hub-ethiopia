import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Home, ArrowRight, AlertTriangle, Droplets, Sparkles, Factory, Utensils, FlaskConical, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, CONTACT_INFO } from '../constants';
import { SEO } from './SEO';

interface NotFoundProps {
  onNavigateHome: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export default function NotFound({ onNavigateHome, onSelectCategory }: NotFoundProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');

  const isEn = language === 'en';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.history.pushState(null, '', `/?search=${encodeURIComponent(query.trim())}`);
      window.dispatchEvent(new Event('popstate'));
    } else {
      onNavigateHome();
    }
  };

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets size={16} className="text-brand-blue" />;
      case 'Sparkles': return <Sparkles size={16} className="text-brand-blue" />;
      case 'Factory': return <Factory size={16} className="text-brand-blue" />;
      case 'Utensils': return <Utensils size={16} className="text-brand-blue" />;
      case 'FlaskConical': return <FlaskConical size={16} className="text-brand-blue" />;
      default: return <FlaskConical size={16} className="text-brand-blue" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between pt-28 pb-16">
      <SEO 
        title={isEn ? "Page Not Found (404)" : "ገጹ አልተገኘም (404)"}
        description={isEn ? "The requested chemical page could not be found. Explore our catalog of industrial, detergent, cosmetic, and laboratory raw materials in Ethiopia." : "የተጠየቀው የኬሚካል ገጽ አልተገኘም። የሳሙና፣ ኮስሞቲክስ፣ ምግብና ላቦራቶሪ ኬሚካል ካታሎጋችንን ያስሱ።"}
        canonical="/404"
        noIndex={true}
        language={language}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6">
            <AlertTriangle size={14} className="text-amber-600" />
            <span>{isEn ? "404 Error: Page Missing" : "ስህተት 404፡ ገጹ አልተገኘም"}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-brand-dark mb-4">
            {t('notFound.title')}
          </h1>

          <p className="text-base sm:text-lg text-brand-dark/50 max-w-xl mx-auto mb-10 leading-relaxed">
            {t('notFound.desc')}
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto mb-12 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-dark/30 w-5 h-5" />
            <input 
              type="text"
              placeholder={t('notFound.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-13 pr-32 py-4 rounded-full bg-brand-light border border-gray-200 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-blue hover:bg-brand-dark text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {isEn ? "Search" : "ፈልግ"}
            </button>
          </form>

          {/* Top Categories to navigate */}
          <div className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-dark/40 mb-6">
              {t('notFound.popular')}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-light border border-gray-150 hover:border-brand-blue/40 hover:bg-blue-50/50 text-xs font-bold text-brand-dark transition-all cursor-pointer shadow-xs group"
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                  <ArrowRight size={12} className="text-brand-dark/30 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-dark text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-brand-blue/15 cursor-pointer"
            >
              <Home size={15} />
              <span>{t('notFound.homeBtn')}</span>
            </button>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-brand-light hover:bg-gray-100 text-brand-dark border border-gray-200 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              <Phone size={15} className="text-brand-blue" />
              <span>{isEn ? "Call Sourcing Desk (+251 972 691 911)" : "በስልክ ያነጋግሩን (+251 972 691 911)"}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

