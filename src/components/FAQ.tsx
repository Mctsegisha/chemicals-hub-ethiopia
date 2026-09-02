import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldCheck, FileCheck2, Truck, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';

interface FAQItem {
  questionEn: string;
  questionAm: string;
  answerEn: string;
  answerAm: string;
  icon: React.ElementType;
}

const FAQ_DATA: FAQItem[] = [
  {
    questionEn: 'Where can I buy industrial chemical raw materials in Addis Ababa, Ethiopia?',
    questionAm: 'በአዲስ አበባ እና በኢትዮጵያ የኢንዱስትሪ ኬሚካል ጥሬ ዕቃዎችን ከየት መግዛት እችላለሁ?',
    answerEn: 'Chemicals Hub Ethiopia supplies verified, laboratory-tested chemical raw materials directly in Addis Ababa. We provide bulk sourcing for detergent manufacturers (LABSA 96%, SLES 70%, Caustic Soda), cosmetics producers (Glycerin USP, Stearic Acid), food processors (Citric Acid, Sodium Benzoate), and industrial facilities with warehouse dispatch in Kaliti and direct delivery across Ethiopia.',
    answerAm: 'ኬሚካልስ ሐብ ኢትዮጵያ በአዲስ አበባና በመላው አገሪቱ ለሚገኙ አምራቾች የላቦራቶሪ ምርመራ የተደረገባቸውን የሳሙና፣ ኮስሞቲክስ፣ የምግብ እና የኢንዱስትሪ ኬሚካሎችን በታማኝነት ያቀርባል። በቃሊቲ ከሚገኘው ማዕከላዊ መጋዘን ፈጣን ስርጭት ይከናወናል።',
    icon: HelpCircle,
  },
  {
    questionEn: 'Do you provide Certificate of Analysis (COA) and MSDS for chemical shipments?',
    questionAm: 'ለሚቀርቡት ኬሚካሎች የጥራት ማረጋገጫ (COA) እና MSDS ይሰጣሉ?',
    answerEn: 'Yes. Every chemical batch supplied by Chemicals Hub Ethiopia is accompanied by an authentic Manufacturer Certificate of Analysis (COA) and Material Safety Data Sheet (MSDS). Active matter content and purity specifications are pre-tested to ensure regulatory compliance with Ethiopian standards (ECAE) and international quality benchmarks.',
    answerAm: 'አዎ፤ በኬሚካልስ ሐብ ኢትዮጵያ የሚቀርብ እያንዳንዱ ባች ትክክለኛ የፋብሪካ የትንተና ሰርተፊኬት (COA) እና የደህንነት መረጃ (MSDS) አብሮት ይቀርባል፤ የይዘት ንጽህናቸውም አስቀድሞ በላቦራቶሪ ይረጋገጣል።',
    icon: FileCheck2,
  },
  {
    questionEn: 'What are the minimum order quantities (MOQ) and packaging formats available?',
    questionAm: 'ዝቅተኛው የትዕዛዝ መጠን (MOQ) እና የማሸጊያ ዓይነቶች ምን ምን ናቸው?',
    answerEn: 'We support small, medium, and industrial-scale manufacturing enterprises. Standard packaging formats include 25kg multi-wall bags, 210kg/215kg sealed HDPE drums, 1,000kg IBC totes, and full container loads (FCL). Sourcing can be dispatched directly to regional industrial parks including Bole Lemi, Dukem, Kilinto, Adama, and Hawassa.',
    answerAm: 'ከ25 ኪ.ግ ከረጢትና 215 ኪ.ግ በርሜል ጀምሮ እስከ 1000 ኪ.ግ አይቢሲ ታንከሮች እና ሙሉ ኮንቴይነር (FCL) ድረስ ለትናንሽም ሆኑ ለትላልቅ አምራች ፋብሪካዎች በተመጣጣኝ ዋጋ እናቀርባለን።',
    icon: Truck,
  },
  {
    questionEn: 'How can I request a quote or confirm chemical pricing in Ethiopia?',
    questionAm: 'በኢትዮጵያ ውስጥ የኬሚካል ዋጋ ዝርዝር (Quotation) እንዴት መጠየቅ እችላለሁ?',
    answerEn: 'You can submit an immediate Request for Quote (RFQ) through our online catalog, reach our sourcing engineers directly on WhatsApp/Phone at +251 972 691 911, or email info@chemicalshubethiopia.com. Our sourcing desk provides prompt quotes, CIF/FOB terms, or local ETB warehouse pricing.',
    answerAm: 'በድረ-ገጻችን ካታሎግ ላይ "Request Quote" የሚለውን በመጫን፣ ወይም በቀጥታ በስልክና በዋትስአፕ በ +251 972 691 911 በመደወል ፈጣን የዋጋ ዝርዝር ማግኘት ይችላሉ።',
    icon: PhoneCall,
  },
  {
    questionEn: 'Which chemical categories and formulation bases do you specialize in?',
    questionAm: 'በየትኞቹ የኬሚካል ዘርፎችና የማምረቻ ግብዓቶች ላይ በዋነኝነት ትሰራላችሁ?',
    answerEn: 'We specialize in surfactants and detergent chemicals (LABSA 96%, SLES 70%, CDEA, SLS), cosmetic and personal care ingredients (Glycerin USP, Stearic Acid, Paraffin Wax, Petrolatum), industrial bases (Caustic Soda Flakes, Hydrogen Peroxide 50%, Soda Ash Light/Dense), and food-grade acidulants and preservatives (Citric Acid, Sodium Benzoate).',
    answerAm: 'በሳሙናና ማጽጃ ኬሚካሎች (LABSA 96%, SLES 70%, CDEA)፣ የኮስሞቲክስ ግብዓቶች (Glycerin USP, Stearic Acid)፣ የኢንዱስትሪ ኬሚካሎች (ካስቲክ ሶዳ፣ ሃይድሮጅን ፐሮክሳይድ) እና የምግብ ኬሚካሎች (ሲትሪክ አሲድ) ላይ በልዩነት እንሰራለን።',
    icon: ShieldCheck,
  },
];

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isEn = language === 'en';

  return (
    <section id="faq" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proper H2 Hierarchy */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-blue/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">
              {isEn ? 'Frequently Asked Questions' : 'ተደጋግመው የሚጠየቁ ጥያቄዎች'}
            </span>
            <div className="h-[1px] w-8 bg-brand-blue/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
            {isEn ? 'Chemical Sourcing & Supply FAQ' : 'የኬሚካል አቅርቦት ተደጋጋሚ ጥያቄዎች'}
          </h2>
          <p className="text-brand-dark/50 text-base max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Find quick answers regarding chemical grades, minimum order quantities, delivery across Ethiopia, and technical documentation.'
              : 'ስለ ኬሚካል ደረጃዎች፣ የትዕዛዝ መጠን፣ ስርጭት እና የጥራት ሰነዶች ዝርዝር መረጃዎችን እዚህ ያግኙ።'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;
            const question = isEn ? item.questionEn : item.questionAm;
            const answer = isEn ? item.answerEn : item.answerAm;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-blue/30 bg-blue-50/20 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-brand-blue text-white' : 'bg-brand-light text-brand-blue'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark leading-snug">
                      {question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-brand-blue text-white border-brand-blue'
                        : 'border-gray-200 text-brand-dark/40'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm text-brand-dark/70 leading-relaxed border-t border-gray-150/60 ml-14">
                        <p>{answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Assistance Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-brand-light border border-gray-150">
          <p className="text-xs text-brand-dark/60">
            {isEn
              ? 'Have a specific formulation requirement or require a bulk proforma invoice?'
              : 'ልዩ የኬሚካል ቀመር ወይም ፕሮፎርማ ኢንቮይስ ይፈልጋሉ?'}
            {' '}
            <a
              href={CONTACT_INFO.getWhatsAppUrl('Hello, I have a specific chemical inquiry for Chemicals Hub Ethiopia.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue font-bold hover:underline inline-flex items-center gap-1"
            >
              {isEn ? 'Speak with our sourcing desk on WhatsApp' : 'በዋትስአፕ በቀጥታ ያነጋግሩን'}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
