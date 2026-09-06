
import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { 
  Droplets, 
  Sparkles, 
  Utensils, 
  Factory, 
  FlaskConical, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Factory,
  Droplets,
  Sparkles,
  Utensils,
  FlaskConical,
};

interface IndustriesProps {
  onSelectCategory?: (categoryId: string) => void;
}

export default function Industries({ onSelectCategory }: IndustriesProps = {}) {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // The 5 core chemical categories in Ethiopia
  const productCategories = CATEGORIES.filter(cat => cat.id !== 'all');

  const getCategoryTitle = (cat: Category) => {
    if (cat.id === 'industrial') return t('cat.industrial');
    if (cat.id === 'detergent') return t('cat.detergent');
    if (cat.id === 'cosmetic') return t('cat.cosmetic');
    if (cat.id === 'food') return t('cat.food');
    if (cat.id === 'laboratory') return t('cat.laboratory');
    return cat.name;
  };

  const getCategoryDescription = (cat: Category) => {
    if (!isEn) {
      if (cat.id === 'industrial') return 'ለቀለም፣ ጨርቃጨርቅ፣ ማዕድንና ውሃ ማከሚያ ፋብሪካዎች የሚቀርቡ ጥራት ያላቸው የኢንዱስትሪ ኬሚካሎች።';
      if (cat.id === 'detergent') return 'ለሳሙና፣ ፈሳሽ ሳሙና እና የዱቄት ሳሙና ማምረቻ የሚሆኑ ጥራት ያላቸው ጥሬ ዕቃዎች (LABSA፣ SLES)።';
      if (cat.id === 'cosmetic') return 'ለቆዳና ፀጉር እንክብካቤ ምርቶች የሚውሉ ከፍተኛ ጥራት ያላቸው የኮስሞቲክስ ጥሬ ዕቃዎች (Glycerin USP)።';
      if (cat.id === 'food') return 'በኢትዮጵያ ለሚገኙ የምግብና መጠጥ አምራቾች የጥራት ደረጃቸው የተረጋገጠ ሲትሪክ አሲድና ኬሚካሎች።';
      if (cat.id === 'laboratory') return 'ለዩኒቨርሲቲ ምርምር፣ ለጥራት መቆጣጠሪያና ለላቦራቶሪዎች የሚውሉ ከፍተኛ የንጽህና ደረጃ ያላቸው ሪኤጀንቶች።';
    }
    return cat.description || '';
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, cat: Category) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(cat.id);
    }
    const targetUrl = cat.slug ? `/category/${cat.slug}` : `/?category=${cat.id}`;
    window.history.pushState(null, '', targetUrl);
    window.dispatchEvent(new Event('popstate'));

    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 sm:py-32 bg-brand-light relative overflow-hidden">
      {/* Anchor for backward compatibility with #industries */}
      <div id="industries" className="absolute -top-12 pointer-events-none" />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-[1px] w-8 bg-brand-blue/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
                {isEn ? 'Product Categories' : 'የምርት ዘርፎች'}
              </span>
              <div className="h-[1px] w-8 bg-brand-blue/50" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6 leading-tight">
              {isEn ? (
                <>
                  Core Chemical Categories <br className="hidden sm:inline" />
                  <span className="text-brand-blue">Sourced in Ethiopia</span>
                </>
              ) : (
                <>
                  በኢትዮጵያ የሚቀርቡ <br className="hidden sm:inline" />
                  <span className="text-brand-blue">ዋና ዋና የኬሚካል ዘርፎች</span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-brand-dark/60 max-w-2xl mx-auto leading-relaxed">
              {isEn 
                ? 'Explore verified, laboratory-tested chemical raw materials across Ethiopia’s leading manufacturing sectors. Warehouse dispatch in Kaliti with authentic COA and MSDS.'
                : 'በአዲስ አበባ እና በኢትዮጵያ ለሚገኙ ፋብሪካዎችና ላቦራቶሪዎች የሚቀርቡ ጥራት ያላቸው የኬሚካል ጥሬ ዕቃዎች። ፈጣን ስርጭት ከቃሊቲ ማዕከላዊ መጋዘን።'}
            </p>
          </motion.div>
        </div>

        {/* Responsive Grid: 4 columns desktop (lg:grid-cols-4), 2 tablet (md:grid-cols-2), 1 mobile (grid-cols-1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {productCategories.map((cat, idx) => {
            const IconComponent = cat.icon ? ICON_MAP[cat.icon] || Factory : Factory;
            const title = getCategoryTitle(cat);
            const description = getCategoryDescription(cat);
            const categoryUrl = cat.slug ? `/category/${cat.slug}` : `/?category=${cat.id}`;
            const isFifthCard = idx === 4; // Laboratory Chemicals (5th card in 4-column grid)

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`flex flex-col ${
                  isFifthCard ? 'md:col-span-2 lg:col-span-2 lg:col-start-2' : 'col-span-1'
                }`}
              >
                <a
                  href={categoryUrl}
                  onClick={(e) => handleCategoryClick(e, cat)}
                  title={`${title} - Sourcing & Supply in Ethiopia`}
                  className="group flex flex-col h-full bg-white rounded-3xl border border-gray-150 overflow-hidden transition-all duration-300 hover:border-brand-blue/40 hover:shadow-2xl hover:shadow-brand-blue/10 cursor-pointer shadow-xs"
                >
                  {/* Card Visual Header with Image and Overlay Icon */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-brand-light">
                    <img 
                      src={cat.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                      alt={`${title} supplier in Addis Ababa, Ethiopia`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Floating Glassmorphism Category Icon */}
                    <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-md">
                      <IconComponent size={20} />
                    </div>

                    {/* Quality badge tag */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider border border-white/20">
                      {isEn ? 'Ex-Stock Kaliti' : 'በክምችት አለ'}
                    </div>

                    {/* Category Title Overlay at Bottom of Image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 block mb-0.5">
                        {isEn ? 'Category' : 'የኬሚካል ዘርፍ'}
                      </span>
                      <h3 className="text-lg font-display font-bold text-white leading-tight drop-shadow-sm group-hover:text-blue-200 transition-colors">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Short Description */}
                      <p className="text-xs text-brand-dark/60 leading-relaxed mb-4 line-clamp-3">
                        {description}
                      </p>

                      {/* Key Chemical Highlights */}
                      {cat.keyChemicals && cat.keyChemicals.length > 0 && (
                        <div className="mb-5 flex flex-wrap gap-1.5">
                          {cat.keyChemicals.map((chem, chemIdx) => (
                            <span 
                              key={chemIdx}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-light border border-gray-150 text-[10px] font-semibold text-brand-dark/75 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                              <span className="truncate max-w-[140px]">{chem}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Action Link */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-blue group-hover:text-brand-dark transition-colors mt-auto">
                      <span>{isEn ? 'Explore Products' : 'ምርቶችን ያስሱ'}</span>
                      <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Sourcing Assurance Bar */}
        <div className="mt-14 p-5 rounded-2xl bg-white border border-gray-150 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <span className="block text-xs font-bold text-brand-dark">
                {isEn ? 'Looking for a custom chemical grade or bulk import?' : 'ልዩ የኬሚካል ደረጃ ወይም የኮንቴይነር ግዢ ይፈልጋሉ?'}
              </span>
              <span className="text-[11px] text-brand-dark/50">
                {isEn 
                  ? 'We source specialized reagents and bulk container orders through direct manufacturer contracts.' 
                  : 'የፋብሪካ የትንተና ሰርተፊኬት (COA) እና የደህንነት መረጃ (MSDS) አብሮ ይቀርባል።'}
              </span>
            </div>
          </div>
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            {isEn ? 'Request Bulk Quote' : 'የጅምላ ዋጋ ይጠይቁ'}
          </a>
        </div>

      </div>
    </section>
  );
}

