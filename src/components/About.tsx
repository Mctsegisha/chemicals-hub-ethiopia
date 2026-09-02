
import React from 'react';
import { motion } from 'motion/react';
import { User, Search, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { language, t } = useLanguage();

  const roles = [
    { title: t('about.role1.title'), icon: User, desc: t('about.role1.desc') },
    { title: t('about.role2.title'), icon: Search, desc: t('about.role2.desc') },
    { title: t('about.role3.title'), icon: Settings, desc: t('about.role3.desc') },
  ];

  return (
    <section id="about" className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-brand-blue/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
                {t('about.badge')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-brand-dark leading-tight">
              {t('about.title')}
            </h2>
            <p className="text-lg text-brand-dark/40 mb-12 leading-relaxed">
              {t('about.desc')}
            </p>
            <div className="space-y-10">
              {roles.map((role, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-brand-light border border-gray-100 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                    <role.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-dark mb-1">{role.title}</h3>
                    <p className="text-brand-dark/40 text-sm leading-relaxed">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Industrial chemical manufacturing and raw material testing in Addis Ababa, Ethiopia" 
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-blue text-white p-12 rounded-[40px] shadow-2xl hidden md:block">
              <div className="text-6xl font-display font-bold mb-2 tracking-tighter">10+</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                {language === 'en' ? 'Years of Industry' : 'የዓመታት የኢንዱስትሪ'}<br />
                {language === 'en' ? 'Leadership' : 'ልምድና ብቃት'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
