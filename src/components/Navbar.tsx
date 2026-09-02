
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Beaker, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.services'), href: '#services' },
    { name: language === 'en' ? 'FAQ' : 'ጥያቄዎች', href: '#faq' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/') {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
        window.dispatchEvent(new Event('popstate'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', `/${href}`);
        window.dispatchEvent(new Event('popstate'));
      }
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 group" 
            title="Chemicals Hub Ethiopia - Chemical Raw Material Supplier in Addis Ababa" 
            aria-label="Chemicals Hub Ethiopia Homepage"
          >
            <div className="bg-brand-blue p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-brand-blue/20">
              <Beaker className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-brand-dark uppercase">
              CHEMICALS HUB <span className="text-brand-blue">ETHIOPIA</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark/60 hover:text-brand-blue transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Language Toggle Switcher */}
            <div className="flex items-center gap-1 bg-brand-light p-1 rounded-full border border-gray-150 relative">
              <Globe size={12} className="text-brand-dark/30 ml-2 mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  language === 'en'
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-brand-dark/50 hover:text-brand-dark'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-3 py-1.5 rounded-full text-[9px] font-bold transition-all duration-300 cursor-pointer ${
                  language === 'am'
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-brand-dark/50 hover:text-brand-dark'
                }`}
              >
                አማ
              </button>
            </div>

            <a
              href="#contact"
              className="bg-brand-blue text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-brand-blue/10"
            >
              {t('nav.getQuote')}
            </a>
          </div>

          {/* Mobile Menu Button + Lang Indicator */}
          <div className="md:hidden flex items-center gap-4">
            {/* Quick Toggle for Mobile */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
              className="flex items-center gap-1 bg-brand-light px-3 py-2 rounded-xl text-[10px] font-bold border border-gray-150 text-brand-dark/70 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <Globe size={12} />
              {language === 'en' ? 'አማ' : 'EN'}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none text-brand-dark/70 hover:text-brand-dark transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-10 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-[11px] font-bold uppercase tracking-[0.3em] text-brand-dark/60 hover:text-brand-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 space-y-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 flex items-center gap-1.5">
                    <Globe size={14} /> Language / ቋንቋ
                  </span>
                  
                  <div className="flex items-center bg-brand-light p-1 rounded-full border border-gray-150">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsOpen(false);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        language === 'en'
                          ? 'bg-brand-blue text-white shadow-md'
                          : 'text-brand-dark/50'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('am');
                        setIsOpen(false);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                        language === 'am'
                          ? 'bg-brand-blue text-white shadow-md'
                          : 'text-brand-dark/50'
                      }`}
                    >
                      አማርኛ
                    </button>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-brand-blue text-white px-5 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-brand-blue/10"
                >
                  {t('nav.getQuote')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
