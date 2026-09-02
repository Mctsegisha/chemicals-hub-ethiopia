
import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { Truck, Package, Globe, GraduationCap, UserCheck, ArrowRight, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Truck,
  Package,
  Globe,
  GraduationCap,
  UserCheck,
};

export default function Services() {
  const { language, t } = useLanguage();

  return (
    <section id="services" className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-brand-blue/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
                {t('services.badge')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-brand-dark leading-tight">
              {t('services.title')}
            </h2>
            <p className="text-brand-dark/40 mb-12 leading-relaxed">
              {language === 'en' 
                ? "Beyond just supplying chemicals, we offer a suite of services designed to help your business grow and operate efficiently in the Ethiopian market."
                : "ከኬሚካል አቅርቦት በተጨማሪ፣ ድርጅትዎ በኢትዮጵያ ገበያ ውስጥ እንዲያድግና ውጤታማ እንዲሆን የምናግዙባቸውን የተለያዩ ሙያዊ አገልግሎቶች እናቀርባለን።"}
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] hover:gap-5 transition-all"
            >
              {language === 'en' ? 'Learn more' : 'ተጨማሪ መረጃ'}
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            {SERVICES.map((service, idx) => {
              const IconComponent = ICON_MAP[service.icon] || Layers;

              // Resolve dynamic translation keys
              let titleKey = '';
              let descKey = '';
              const lowerTitle = service.title.toLowerCase();
              if (lowerTitle.includes('supply')) {
                titleKey = 'services.supply';
                descKey = 'services.supply.desc';
              } else if (lowerTitle.includes('pack')) {
                titleKey = 'services.pack';
                descKey = 'services.pack.desc';
              } else if (lowerTitle.includes('source') || lowerTitle.includes('logistic')) {
                titleKey = 'services.sourcing';
                descKey = 'services.sourcing.desc';
              } else if (lowerTitle.includes('train') || lowerTitle.includes('detergent production')) {
                titleKey = 'services.training';
                descKey = 'services.training.desc';
              } else if (lowerTitle.includes('consult')) {
                titleKey = 'services.consult';
                descKey = 'services.consult.desc';
              }

              const title = titleKey ? t(titleKey) : service.title;
              const description = descKey ? t(descKey) : service.description;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 rounded-[40px] bg-brand-light border border-gray-100 hover:border-brand-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="font-bold text-xl text-brand-dark mb-4 leading-tight">{title}</h3>
                  <p className="text-sm text-brand-dark/40 leading-relaxed">{description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
