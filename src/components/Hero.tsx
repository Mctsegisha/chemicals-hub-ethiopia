
import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-[-10%] w-[30%] h-[30%] bg-blue-400/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-brand-dark/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/40">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] mb-6 text-brand-dark">
              {language === 'en' ? (
                <>
                  Chemical Supplier in Ethiopia.<br />
                  <span className="text-brand-blue">Industrial & Lab Raw Materials.</span>
                </>
              ) : (
                <>
                  የኬሚካል ጥሬ ዕቃዎች አቅራቢ በኢትዮጵያ።<br />
                  <span className="text-brand-blue">የኢንዱስትሪና ላቦራቶሪ ግብዓቶች።</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-brand-dark/50 mb-8 max-w-xl leading-relaxed">
              {t('hero.desc')}
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-light border border-gray-150 mb-8 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">
                {language === 'en' ? 'Currently' : 'አሁን በኢትዮጵያ'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                {language === 'en' ? 'Leading Supply Network in Addis Ababa' : 'ዋነኛ የኬሚካል አቅራቢ'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#products" 
                title={language === 'en' ? 'Explore our chemical raw materials catalog' : 'የኬሚካል ካታሎግ ይመልከቱ'}
                className="bg-brand-blue text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/10 text-center cursor-pointer"
              >
                {t('hero.btnExplore')}
              </a>
              <a 
                href="#contact" 
                title={language === 'en' ? 'Request a quote for chemical supplies' : 'የዋጋ መጠየቂያ ይላኩ'}
                className="bg-white text-brand-dark border border-gray-200 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all text-center cursor-pointer"
              >
                {t('hero.btnContact')}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Processing & Lab Facilities Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7 flex justify-center items-center w-full"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-brand-dark/15 hidden md:block">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
