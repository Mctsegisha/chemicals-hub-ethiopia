import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';

export default function FloatingWhatsApp() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickPrompts = [
    {
      en: 'I would like to request a price quote for chemical raw materials.',
      am: 'ስለ ኬሚካል ጥሬ ዕቃዎች የዋጋ ዝርዝር መጠየቅ እፈልጋለሁ።'
    },
    {
      en: 'Inquiring about LABSA 96% and SLES 70% availability in Addis Ababa.',
      am: 'ስለ LABSA 96% እና SLES 70% ክምችት በአዲስ አበባ ማወቅ እፈልጋለሁ።'
    },
    {
      en: 'I need Technical Datasheets (TDS) and Certificate of Analysis (COA).',
      am: 'የቴክኒክ መረጃ (TDS) እና የጥራት ሰርተፊኬት (COA) እፈልጋለሁ።'
    },
    {
      en: 'Looking for cosmetic ingredients (Glycerin, CDEA, CAPB, Fragrances).',
      am: 'የኮስሞቲክስ ጥሬ ዕቃዎች (ግሊሰሪን፣ CDEA፣ CAPB፣ ሽቶዎች) እፈልጋለሁ።'
    }
  ];

  const handleSendPrompt = (promptText: string) => {
    const url = CONTACT_INFO.getWhatsAppUrl(promptText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = customMessage.trim() || (language === 'en' 
      ? 'Hello Chemicals Hub Ethiopia, I would like to inquire about chemical supplies.' 
      : 'ሰላም ኬሚካልስ ሐብ ኢትዮጵያ፣ ስለ ኬሚካል ጥሬ ዕቃዎች አቅርቦት መጠየቅ እፈልጋለሁ።');
    
    const url = CONTACT_INFO.getWhatsAppUrl(textToSend);
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMessage('');
    setIsOpen(false);
  };

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-4 w-[92vw] sm:w-96 max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-150 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-[#128C7E] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <MessageCircle size={22} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">Chemicals Hub Ethiopia</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                    <span>{language === 'en' ? 'Online • Sourcing Hotline' : 'በመስመር ላይ • የኬሚካል ግዢ'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 bg-[#ECE5DD]/30">
              {/* Chat Bubble Message */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-500/10 mb-4 text-left">
                <p className="text-xs text-brand-dark leading-relaxed">
                  {language === 'en' ? (
                    <>
                      👋 <strong>Hello!</strong> Welcome to Chemicals Hub Ethiopia. How can our chemical engineers assist your factory or workshop today?
                    </>
                  ) : (
                    <>
                      👋 <strong>እንኳን ደህና መጡ!</strong> ወደ ኬሚካልስ ሐብ ኢትዮጵያ። ለፋብሪካዎ ወይም ለስራዎ በምን ልንረዳዎ እንችላለን?
                    </>
                  )}
                </p>
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-dark/40 block mt-2 text-right">
                  +251 972 691 911
                </span>
              </div>

              {/* Quick Prompt Chips */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark/40 block mb-2">
                  {language === 'en' ? 'Quick Inquiries:' : 'ፈጣን ጥያቄዎች፡'}
                </span>
                <div className="space-y-2">
                  {quickPrompts.map((item, idx) => {
                    const text = language === 'en' ? item.en : item.am;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendPrompt(text)}
                        className="w-full text-left text-[11px] p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-brand-dark/80 hover:text-emerald-800 border border-gray-150 hover:border-emerald-300 transition-all flex items-center justify-between gap-2 shadow-xs group cursor-pointer"
                      >
                        <span className="line-clamp-2 leading-snug">{text}</span>
                        <ChevronRight size={13} className="text-gray-300 group-hover:text-emerald-600 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Message Input */}
              <form onSubmit={handleCustomSubmit} className="relative flex items-center gap-2">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Type your inquiry...' : 'መልዕክትዎን እዚህ ይጻፉ...'}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-2xl bg-white border border-gray-200 text-xs text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                  title="Send to WhatsApp (+251 972 691 911)"
                >
                  <Send size={13} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 flex items-center gap-3 cursor-pointer border-2 border-white transition-all duration-300"
        aria-label="Direct WhatsApp Chat with +251 972 691 911"
      >
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-emerald-600"></span>
        </span>

        {isOpen ? (
          <X size={26} className="stroke-[2.5]" />
        ) : (
          <>
            <MessageCircle size={26} className="fill-white/10 stroke-[2.5]" />
            <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider pr-1">
              {language === 'en' ? 'WhatsApp' : 'ዋትስአፕ'}
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
