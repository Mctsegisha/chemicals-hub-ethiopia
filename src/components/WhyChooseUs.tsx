
import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Zap, Award, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const reasons = [
    { title: 'Reliable Supply Chain', icon: ShieldCheck, desc: 'Consistent availability of essential raw materials.' },
    { title: 'Competitive Pricing', icon: Zap, desc: 'Direct sourcing to ensure the best value for your business.' },
    { title: 'Industry Expertise', icon: Award, desc: 'Technical support from experienced chemical engineers.' },
    { title: 'Fast Delivery', icon: CheckCircle2, desc: 'Efficient logistics across Addis Ababa and beyond.' },
    { title: 'Global Sourcing', icon: Globe, desc: 'Access to premium chemicals from international markets.' },
  ];

  return (
    <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 skew-x-[-20deg] translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">
            {t('why.badge')}
          </div>
          <h2 className="text-4xl font-display font-bold">
            {t('why.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reasons.map((reason, idx) => {
            // Resolve dynamic translation keys
            let titleKey = '';
            let descKey = '';
            const lowerTitle = reason.title.toLowerCase();
            if (lowerTitle.includes('reliable')) {
              titleKey = 'why.reason1.title';
              descKey = 'why.reason1.desc';
            } else if (lowerTitle.includes('competitive') || lowerTitle.includes('pricing')) {
              titleKey = 'why.reason2.title';
              descKey = 'why.reason2.desc';
            } else if (lowerTitle.includes('industry') || lowerTitle.includes('expertise')) {
              titleKey = 'why.reason3.title';
              descKey = 'why.reason3.desc';
            } else if (lowerTitle.includes('fast') || lowerTitle.includes('delivery')) {
              titleKey = 'why.reason4.title';
              descKey = 'why.reason4.desc';
            } else if (lowerTitle.includes('global') || lowerTitle.includes('sourcing')) {
              titleKey = 'why.reason5.title';
              descKey = 'why.reason5.desc';
            }

            const title = titleKey ? t(titleKey) : reason.title;
            const description = descKey ? t(descKey) : reason.desc;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-6 backdrop-blur-sm">
                  <reason.icon size={32} />
                </div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
