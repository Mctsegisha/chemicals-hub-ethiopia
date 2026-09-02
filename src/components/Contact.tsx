
import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Mail, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO, openTelegramApp } from '../constants';

export default function Contact() {
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements[0] as HTMLInputElement).value;
    const phone = (form.elements[1] as HTMLInputElement).value;
    const message = (form.elements[2] as HTMLTextAreaElement).value;
    
    if (!name || !message) return;
    
    const subject = `Message from ${name} via Chemicals Hub Portal`;
    const body = `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const defaultWhatsAppMsg = language === 'en'
    ? 'Hello Chemicals Hub Ethiopia, I would like to inquire about industrial chemical raw materials.'
    : 'ሰላም ኬሚካልስ ሐብ ኢትዮጵያ፣ ስለ ኬሚካል ጥሬ ዕቃዎች አቅርቦት መረጃ ማግኘት እፈልጋለሁ።';

  return (
    <section id="contact" className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-brand-blue/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
                {t('contact.badge')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-brand-dark leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-brand-dark/40 mb-12 leading-relaxed">
              {language === 'en' 
                ? "Have questions about our products or need a custom quote? Our sourcing team is ready to assist you directly via phone or WhatsApp."
                : "ስለ ምርቶቻችን ጥያቄ አለዎት ወይስ ልዩ የዋጋ መጠየቂያ ይፈልጋሉ? የኬሚካል ግዢ ቡድናችን በስልክ ወይም በዋትስአፕ በቀጥታ ሊረዳዎት ዝግጁ ነው።"}
            </p>

            <div className="space-y-10">
              <a 
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-start gap-6 group cursor-pointer block"
              >
                <div className="w-14 h-14 bg-brand-light border border-gray-100 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-[0.2em] mb-1">
                    {t('contact.phone')}
                  </div>
                  <div className="text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                    {CONTACT_INFO.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-brand-light border border-gray-100 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-[0.2em] mb-1">
                    {t('contact.visit')}
                  </div>
                  <div className="text-xl font-bold text-brand-dark">
                    {language === 'en' ? CONTACT_INFO.addressEn : CONTACT_INFO.addressAm}
                  </div>
                </div>
              </div>

              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-6 group cursor-pointer block"
              >
                <div className="w-14 h-14 bg-brand-light border border-gray-100 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-[0.2em] mb-1">
                    {t('contact.email')}
                  </div>
                  <div className="text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                    {CONTACT_INFO.email}
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-4 items-center">
              <a 
                href={CONTACT_INFO.getWhatsAppUrl(defaultWhatsAppMsg)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-green-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle size={18} />
                <span>{t('contact.chatBtn')} (+251 972 691 911)</span>
              </a>

              <button 
                type="button"
                onClick={() => openTelegramApp()} 
                className="inline-flex items-center gap-3 bg-[#229ED9] hover:bg-[#1e8cc1] text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-sky-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                title="Launch Telegram Application (+251 972 691 911)"
              >
                <Send size={18} />
                <span>{t('contact.telegramBtn')} (+251 972 691 911)</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-light p-12 rounded-[40px] border border-gray-100 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 ml-1">
                    {t('contact.formName')}
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 text-brand-dark placeholder:text-brand-dark/20 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/50 transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 ml-1">
                    {t('contact.formPhone')}
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+251..."
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 text-brand-dark placeholder:text-brand-dark/20 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 ml-1">
                  {t('contact.formMsg')}
                </label>
                <textarea 
                  rows={5}
                  required
                  placeholder={language === 'en' ? "How can we help you?" : "እንዴት ልንረዳዎ እንችላለን?"}
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 text-brand-dark placeholder:text-brand-dark/20 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/50 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-blue text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/10 cursor-pointer"
              >
                <Send size={18} />
                {t('contact.formSend')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
