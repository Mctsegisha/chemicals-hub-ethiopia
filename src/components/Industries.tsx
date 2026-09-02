
import React from 'react';
import { motion } from 'motion/react';
import { INDUSTRIES } from '../constants';
import { Droplets, Sparkles, Utensils, Paintbrush, Pickaxe, FlaskConical, Box } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Droplets,
  Sparkles,
  Utensils,
  Paintbrush,
  Pickaxe,
  FlaskConical,
};

export default function Industries() {
  const { t } = useLanguage();

  return (
    <section id="industries" className="py-32 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-brand-blue/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
              {t('industries.badge')}
            </span>
            <div className="h-[1px] w-8 bg-brand-blue/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-brand-dark">
            {t('industries.title')}
          </h2>
          <p className="text-brand-dark/40 max-w-2xl mx-auto leading-relaxed">
            {t('industries.desc')}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry, idx) => {
            const IconComponent = ICON_MAP[industry.icon] || Box;

            // Resolve dynamic translation keys
            let titleKey = '';
            let descKey = '';
            const lowerTitle = industry.title.toLowerCase();
            if (lowerTitle.includes('soap')) {
              titleKey = 'ind.soap';
              descKey = 'ind.soap.desc';
            } else if (lowerTitle.includes('cosmetic')) {
              titleKey = 'ind.cosm';
              descKey = 'ind.cosm.desc';
            } else if (lowerTitle.includes('food')) {
              titleKey = 'ind.food';
              descKey = 'ind.food.desc';
            } else if (lowerTitle.includes('paint')) {
              titleKey = 'ind.paint';
              descKey = 'ind.paint.desc';
            } else if (lowerTitle.includes('mining')) {
              titleKey = 'ind.mining';
              descKey = 'ind.mining.desc';
            } else if (lowerTitle.includes('lab')) {
              titleKey = 'ind.lab';
              descKey = 'ind.lab.desc';
            }

            const title = titleKey ? t(titleKey) : industry.title;
            const description = descKey ? t(descKey) : industry.description;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 hover:border-brand-blue/30 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-brand-light rounded-2xl border border-gray-100 flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="font-bold text-lg text-brand-dark mb-4 leading-tight">{title}</h3>
                <p className="text-sm text-brand-dark/40 leading-relaxed">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
