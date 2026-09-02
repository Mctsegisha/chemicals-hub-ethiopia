import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Building2, FlaskConical, Warehouse, ShieldCheck, Play, Pause, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HeroCarouselSkeleton } from './Skeletons';

// Facilities data showcasing Ethiopian chemical infrastructure
import labImg from '../assets/images/ethiopia_chemical_lab_1787252100305.jpg';
import plantImg from '../assets/images/chemical_factory_facility_1787252114621.jpg';
import logisticsImg from '../assets/images/chemical_logistics_hub_1787252126718.jpg';
import rAndDImg from '../assets/images/chemical_quality_control_1787252138596.jpg';

interface FacilitySlide {
  id: string;
  image: string;
  icon: React.ElementType;
  badgeEn: string;
  badgeAm: string;
  titleEn: string;
  titleAm: string;
  locationEn: string;
  locationAm: string;
  tagEn: string;
  tagAm: string;
  descEn: string;
  descAm: string;
  specsEn: string[];
  specsAm: string[];
}

const FACILITIES: FacilitySlide[] = [
  {
    id: 'lab-central',
    image: labImg,
    icon: FlaskConical,
    badgeEn: 'Quality Assurance & Testing',
    badgeAm: 'የጥራት መቆጣጠሪያና ምርመራ',
    titleEn: 'Central Analytical Chemical Testing Lab',
    titleAm: 'ማዕከላዊ የኬሚካል መመርመሪያ ላቦራቶሪ',
    locationEn: 'Addis Ababa Science & Tech Zone',
    locationAm: 'አዲስ አበባ፣ ሳይንስና ቴክኖሎጂ ቀጠና',
    tagEn: 'ISO 9001:2015 Verified Purity',
    tagAm: 'የተረጋገጠ 99.8% የጥራት ደረጃ',
    descEn: 'State-of-the-art spectrophotometric analysis and titration laboratory testing raw material purity standards for Ethiopian manufacturers.',
    descAm: 'የኬሚካል ጥሬ ዕቃዎችን ንጽህና እና ዓለም አቀፍ ደረጃ በከፍተኛ ትክክለኛነት የሚያረጋግጥ ዘመናዊ መመርመሪያ ላቦራቶሪ።',
    specsEn: ['Spectrophotometry', 'Assay Purity 99.8%+', 'Batch Certification'],
    specsAm: ['የስፔክትሮፎቶሜትሪ ምርመራ', 'የጥራት ንጽህና 99.8%+', 'የባች ሰርተፊኬት']
  },
  {
    id: 'factory-plant',
    image: plantImg,
    icon: Building2,
    badgeEn: 'Industrial Processing Plant',
    badgeAm: 'የኢንዱስትሪ ማቀነባበሪያ ፋብሪካ',
    titleEn: 'Continuous Formulation & Blending Unit',
    titleAm: 'ቀጣይነት ያለው የኬሚካል ማቀነባበሪያ ክፍል',
    locationEn: 'Bole Lemi & Dukem Industrial Hub',
    locationAm: 'ቦሌ ለሚ እና ዱከም የኢንዱስትሪ ፓርክ',
    tagEn: 'Heavy-Duty Reaction Vessels',
    tagAm: 'አውቶሜትድ የማደባለቂያ ታንከሮች',
    descEn: 'Modern automated reaction vessels and continuous blending lines supplying high-grade chemical bases to local soap and textile factories.',
    descAm: 'ለአገር ውስጥ የሳሙናና የጨርቃጨርቅ አምራቾች ከፍተኛ ጥራት ያላቸውን የኬሚካል ግብዓቶች የሚያዘጋጅ አውቶሜትድ ፋብሪካ።',
    specsEn: ['Continuous Reactor Lines', 'Surfactant Blending', 'Safety Compliant'],
    specsAm: ['ቀጣይነት ያለው የማምረቻ መስመር', 'የሰርፋክታንት ውህድ', 'የደህንነት ደረጃዎች']
  },
  {
    id: 'warehouse-hub',
    image: logisticsImg,
    icon: Warehouse,
    badgeEn: 'Bulk Logistics & Warehousing',
    badgeAm: 'ማዕከላዊ የኬሚካል ማከማቻና ስርጭት',
    titleEn: 'National Raw Materials Storage & Dispatch',
    titleAm: 'የአገር አቀፍ የጥሬ ዕቃዎች መጋዘንና ስርጭት',
    locationEn: 'Kaliti Logistics Corridor',
    locationAm: 'ቃሊቲ የሎጂስቲክስ መተላለፊያ',
    tagEn: '5,000+ Metric Ton Storage',
    tagAm: 'ከ5,000 ሜትሪክ ቶን በላይ የመያዝ አቅም',
    descEn: 'Extensive climate-controlled warehouse housing IBC totes, drums, and solid chemical bags for guaranteed supply stability.',
    descAm: 'በመላ ኢትዮጵያ ላሉ አምራቾች ያልተቋረጠ አመታዊ የኬሚካል አቅርቦት የሚያረጋግጥ ሰፊ የጥሬ ዕቃዎች ማከማቻ።',
    specsEn: ['Regulated Temperature', 'Palletized IBC Storage', 'Express Dispatch'],
    specsAm: ['የሙቀት ቁጥጥር ሥርዓት', 'ደህንነቱ የተጠበቀ ማከማቻ', 'ፈጣን ስርጭት']
  },
  {
    id: 'rnd-formulation',
    image: rAndDImg,
    icon: ShieldCheck,
    badgeEn: 'Formulation & R&D Center',
    badgeAm: 'የቀመር ማበልጸጊያና ጥናት ክፍል',
    titleEn: 'Cosmetic & Detergent Formulation Laboratory',
    titleAm: 'የኮስሞቲክስና ዲተርጀንት ቀመር ማበልጸጊያ',
    locationEn: 'Addis Ababa Technical Center',
    locationAm: 'አዲስ አበባ የቴክኒክ ማዕከል',
    tagEn: 'Custom Active Matter Tuning',
    tagAm: 'የቀመር ማስተካከያና ሙያዊ ድጋፍ',
    descEn: 'Dedicated chemists providing technical guidance, pH optimization, and active matter adjustment for high-performance domestic brands.',
    descAm: 'የአገር ውስጥ ምርቶች ከፍተኛ የገበያ ተወዳዳሪነት እንዲኖራቸው የቀመር ማሻሻያ እና የቴክኒክ ድጋፍ የሚሰጥ ላቦራቶሪ።',
    specsEn: ['Active Matter Calibration', 'pH Optimization', 'Viscosity Tuning'],
    specsAm: ['የአክቲቭ ማተር ልኬት', 'የፒኤች (pH) ማስተካከያ', 'የውፍረት ቁጥጥር']
  }
];

export default function HeroCarousel() {
  const { language, t } = useLanguage();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Initial loading delay for seamless hydration / asset verification
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % FACILITIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + FACILITIES.length) % FACILITIES.length);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setIsImageLoading(true);
    setCurrentIndex(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (isInitialLoading || !isAutoPlaying || isModalOpen) return;

    timerRef.current = setTimeout(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isAutoPlaying, isModalOpen, isInitialLoading]);

  if (isInitialLoading) {
    return <HeroCarouselSkeleton />;
  }

  const currentFacility = FACILITIES[currentIndex];
  const IconComponent = currentFacility.icon;

  return (
    <div 
      id="hero-facility-carousel"
      className="relative w-full max-w-[620px] mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Decorative Outer Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/30 via-blue-400/20 to-brand-blue/10 rounded-[36px] blur-xl opacity-60 pointer-events-none" />

      {/* Main Carousel Card */}
      <div className="relative bg-white border border-gray-150 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Media Window (Aspect 16:10 for hero harmony) */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-brand-dark/95">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentFacility.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -50, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={currentFacility.image}
                alt={`${language === 'en' ? currentFacility.titleEn : currentFacility.titleAm} - Chemicals Hub Ethiopia (${language === 'en' ? currentFacility.locationEn : currentFacility.locationAm})`}
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                onLoad={() => setIsImageLoading(false)}
                className={`w-full h-full object-cover select-none transition-opacity duration-300 ${
                  isImageLoading ? 'opacity-40 filter blur-xs' : 'opacity-100'
                }`}
              />

              {/* Gradient Overlays for readable text overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Per-Slide Loading Spinner */}
          {isImageLoading && (
            <div className="absolute inset-0 z-15 flex items-center justify-center bg-brand-dark/40 backdrop-blur-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                <Loader2 size={13} className="animate-spin text-brand-blue" />
                <span>{language === 'en' ? 'Buffering HD Asset...' : 'በመጫን ላይ...'}</span>
              </div>
            </div>
          )}

          {/* Top Bar inside Image */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            {/* Live Facility Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                {language === 'en' ? 'Facility In Ethiopia' : 'በኢትዮጵያ ውስጥ የሚገኝ'}
              </span>
            </div>

            {/* Controls right: Play/Pause & Fullscreen preview */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? "Pause carousel" : "Play carousel"}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                {isAutoPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                title="Expand facility view"
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          {/* Bottom Floating Info inside Image */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 rounded-md bg-brand-blue text-white shadow-sm">
                <IconComponent size={14} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                {language === 'en' ? currentFacility.badgeEn : currentFacility.badgeAm}
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-display font-bold text-white leading-tight drop-shadow-md">
              {language === 'en' ? currentFacility.titleEn : currentFacility.titleAm}
            </h4>
            
            <p className="text-[11px] text-gray-200/90 font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              {language === 'en' ? currentFacility.locationEn : currentFacility.locationAm}
            </p>
          </div>

          {/* Navigation Arrows on Left/Right of image */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous facility"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-brand-blue hover:text-white backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-md group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next facility"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-brand-blue hover:text-white backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-md group"
          >
            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Info & Specs Panel */}
        <div className="p-5 sm:p-6 bg-white">
          {/* Progress Bar for Current Slide */}
          <div className="w-full bg-gray-100 h-1 rounded-full mb-4 overflow-hidden">
            <motion.div
              key={`progress-${currentIndex}-${isAutoPlaying}`}
              initial={{ width: '0%' }}
              animate={{ width: isAutoPlaying ? '100%' : '100%' }}
              transition={{ 
                duration: isAutoPlaying ? SLIDE_DURATION / 1000 : 0, 
                ease: "linear" 
              }}
              className="h-full bg-brand-blue"
            />
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed mb-4">
            {language === 'en' ? currentFacility.descEn : currentFacility.descAm}
          </p>

          {/* Specs Chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(language === 'en' ? currentFacility.specsEn : currentFacility.specsAm).map((spec, i) => (
              <span 
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-light border border-gray-150 text-[10px] font-bold text-brand-dark/80 uppercase tracking-wider"
              >
                <Sparkles size={11} className="text-brand-blue" />
                {spec}
              </span>
            ))}
          </div>

          {/* Carousel Selector Thumbnails */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100">
            {FACILITIES.map((facility, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={facility.id}
                  onClick={() => goToSlide(idx)}
                  className={`group relative rounded-2xl p-1.5 text-left transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50/80 border-2 border-brand-blue shadow-sm ring-2 ring-brand-blue/10' 
                      : 'bg-brand-light border border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="aspect-video w-full rounded-lg overflow-hidden mb-1.5 relative">
                    <img 
                      src={facility.image} 
                      alt={`${facility.titleEn} - Chemicals Hub Ethiopia facility in ${facility.locationEn}`} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      width="120"
                      height="68"
                      className="w-full h-full object-cover" 
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-brand-blue/20" />
                    )}
                  </div>
                  <div className="truncate text-[9px] font-bold uppercase tracking-wider text-brand-dark/80 group-hover:text-brand-blue">
                    {language === 'en' 
                      ? (idx === 0 ? 'Lab Hub' : idx === 1 ? 'Plant' : idx === 2 ? 'Logistics' : 'R&D')
                      : (idx === 0 ? 'ላቦራቶሪ' : idx === 1 ? 'ፋብሪካ' : idx === 2 ? 'መጋዘን' : 'ቀመር')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded Modal Preview */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-brand-dark/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-12 max-h-[85vh] overflow-y-auto">
                <div className="md:col-span-7 bg-brand-dark relative aspect-video md:aspect-auto min-h-[280px]">
                  <img
                    src={currentFacility.image}
                    alt={`${language === 'en' ? currentFacility.titleEn : currentFacility.titleAm} - Chemical facility infrastructure in ${language === 'en' ? currentFacility.locationEn : currentFacility.locationAm}, Ethiopia`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                </div>

                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[10px] font-bold uppercase tracking-wider mb-4">
                      <IconComponent size={13} />
                      {language === 'en' ? currentFacility.badgeEn : currentFacility.badgeAm}
                    </div>

                    <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">
                      {language === 'en' ? currentFacility.titleEn : currentFacility.titleAm}
                    </h3>

                    <p className="text-xs text-brand-dark/50 font-bold uppercase tracking-wider mb-4">
                      📍 {language === 'en' ? currentFacility.locationEn : currentFacility.locationAm}
                    </p>

                    <p className="text-sm text-brand-dark/70 leading-relaxed mb-6">
                      {language === 'en' ? currentFacility.descEn : currentFacility.descAm}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 block">
                        {language === 'en' ? 'Quality & Tech Standards' : 'የቴክኒክና የጥራት ደረጃዎች'}
                      </span>
                      {(language === 'en' ? currentFacility.specsEn : currentFacility.specsAm).map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-brand-dark font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href="#products"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex items-center justify-center w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-dark text-white text-[11px] font-bold uppercase tracking-widest transition-colors shadow-lg shadow-brand-blue/20"
                    >
                      {language === 'en' ? 'Explore Compatible Raw Materials' : 'ተዛማጅ ጥሬ ዕቃዎችን ያስሱ'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
