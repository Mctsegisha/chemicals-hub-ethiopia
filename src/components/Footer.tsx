
import React from 'react';
import { Beaker, Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO, openTelegramApp } from '../constants';

export default function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-brand-dark pt-32 pb-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-brand-blue p-2.5 rounded-xl text-white shadow-lg shadow-brand-blue/20">
                <Beaker size={24} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">
                CHEMICALS HUB <span className="text-brand-blue">ETHIOPIA</span>
              </span>
            </div>
            <p className="text-brand-dark/40 text-sm leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3">
              <a 
                href={CONTACT_INFO.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+251 972 691 911)"
                className="w-11 h-11 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
              >
                <MessageCircle size={18} />
              </a>
              <button 
                type="button"
                onClick={() => openTelegramApp()}
                title="Launch Telegram App (+251 972 691 911)"
                className="w-11 h-11 rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/30 flex items-center justify-center text-[#229ED9] hover:bg-[#229ED9] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Send size={18} />
              </button>
              <a 
                href="https://www.linkedin.com/company/chemicalshubethiopia" 
                target="_blank"
                rel="noopener noreferrer"
                title="Chemicals Hub Ethiopia on LinkedIn"
                className="w-11 h-11 rounded-2xl bg-brand-light border border-gray-100 flex items-center justify-center text-brand-dark/40 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 shadow-sm"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://www.facebook.com/chemicalshubethiopia" 
                target="_blank"
                rel="noopener noreferrer"
                title="Chemicals Hub Ethiopia on Facebook"
                className="w-11 h-11 rounded-2xl bg-brand-light border border-gray-100 flex items-center justify-center text-brand-dark/40 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 shadow-sm"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-10">
              {t('footer.links')}
            </h3>
            <ul className="space-y-5 text-brand-dark/40 text-[11px] font-bold uppercase tracking-[0.1em]">
              <li><a href="/" className="hover:text-brand-blue transition-colors">{t('nav.home')}</a></li>
              <li><a href="#about" className="hover:text-brand-blue transition-colors">{t('nav.about')}</a></li>
              <li><a href="#products" className="hover:text-brand-blue transition-colors">{t('nav.products')}</a></li>
              <li><a href="#services" className="hover:text-brand-blue transition-colors">{t('nav.services')}</a></li>
              <li><a href="#faq" className="hover:text-brand-blue transition-colors">{language === 'en' ? 'FAQ' : 'ጥያቄዎች'}</a></li>
              <li><a href="#contact" className="hover:text-brand-blue transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-10">
              {t('footer.industries')}
            </h3>
            <ul className="space-y-5 text-brand-dark/40 text-[11px] font-bold uppercase tracking-[0.1em]">
              <li><a href="/category/detergent-chemicals-ethiopia" className="hover:text-brand-blue transition-colors">{t('ind.soap')}</a></li>
              <li><a href="/category/cosmetic-ingredients-addis-ababa" className="hover:text-brand-blue transition-colors">{t('ind.cosm')}</a></li>
              <li><a href="/category/food-additives-supplier-ethiopia" className="hover:text-brand-blue transition-colors">{t('ind.food')}</a></li>
              <li><a href="/category/industrial-chemicals-supplier-ethiopia" className="hover:text-brand-blue transition-colors">{t('ind.paint')} & {t('ind.mining')}</a></li>
              <li><a href="/category/laboratory-chemicals-supplier-ethiopia" className="hover:text-brand-blue transition-colors">{t('cat.laboratory')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-10">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-6 text-brand-dark/40 text-sm">
              <li>
                <a 
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-light border border-gray-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                    <Phone size={18} />
                  </div>
                  <span className="group-hover:text-brand-blue transition-colors">{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-light border border-gray-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <span className="group-hover:text-brand-blue transition-colors">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-brand-light border border-gray-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                  <MapPin size={18} />
                </div>
                <span className="group-hover:text-brand-dark transition-colors">
                  {language === 'en' ? CONTACT_INFO.addressEn : CONTACT_INFO.addressAm}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-dark/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {currentYear} {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-brand-dark/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href="#contact" title="Privacy policy and data handling information" className="hover:text-brand-dark transition-colors">{t('footer.privacy')}</a>
            <a href="#contact" title="Terms of supply and delivery conditions" className="hover:text-brand-dark transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
