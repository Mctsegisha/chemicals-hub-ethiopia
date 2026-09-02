import React, { useState, useEffect, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { SEO, buildMasterSchema, buildCategorySchema } from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Industries from './components/Industries';
import ProductCatalog from './components/ProductCatalog';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ProductDetailModal from './components/ProductDetailModal';
import ProductQuoteModal from './components/ProductQuoteModal';
import NotFound from './components/NotFound';
import { CATEGORIES, PRODUCTS } from './constants';
import { Product, Category } from './types';

type RouteState = 
  | { type: 'home' }
  | { type: 'section'; section: string }
  | { type: 'category'; slug: string }
  | { type: 'product'; slug: string }
  | { type: '404' };

function parsePath(pathname: string): RouteState {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/') return { type: 'home' };
  if (clean === '/about') return { type: 'section', section: 'about' };
  if (clean === '/services') return { type: 'section', section: 'services' };
  if (clean === '/contact') return { type: 'section', section: 'contact' };
  if (clean === '/faq') return { type: 'section', section: 'faq' };

  if (clean.startsWith('/category/')) {
    const slug = clean.replace('/category/', '').trim();
    return { type: 'category', slug };
  }

  if (clean.startsWith('/product/')) {
    const slug = clean.replace('/product/', '').trim();
    return { type: 'product', slug };
  }

  return { type: '404' };
}

function AppContent() {
  const { language } = useLanguage();
  const { products } = useProducts();
  const isEn = language === 'en';

  const [currentPath, setCurrentPath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Quote modal state
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Listen to popstate for URL history changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = useMemo(() => parsePath(currentPath), [currentPath]);

  // Combined product repository (state + fallback constants)
  const allProductsList = useMemo(() => {
    return products.length > 0 ? products : PRODUCTS;
  }, [products]);

  // Active Category resolution
  const activeCategoryObject = useMemo<Category | undefined>(() => {
    if (route.type === 'category') {
      return CATEGORIES.find(c => c.slug === route.slug || c.id === route.slug);
    }
    return undefined;
  }, [route]);

  // Active Product resolution
  const activeProductObject = useMemo<Product | undefined>(() => {
    if (route.type === 'product') {
      return allProductsList.find(p => p.slug === route.slug || p.id === route.slug);
    }
    return undefined;
  }, [route, allProductsList]);

  // Handle route scrolling
  useEffect(() => {
    if (route.type === 'section') {
      setTimeout(() => {
        const el = document.getElementById(route.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (route.type === 'category') {
      setTimeout(() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [route]);

  // Handle navigation helpers
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChangeExternal = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (cat && cat.slug && cat.id !== 'all') {
      window.history.pushState(null, '', `/category/${cat.slug}`);
      setCurrentPath(`/category/${cat.slug}`);
    } else {
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
    }
  };

  const handleSelectProduct = (product: Product) => {
    window.history.pushState(null, '', `/product/${product.slug}`);
    setCurrentPath(`/product/${product.slug}`);
  };

  const handleCloseProductDetail = () => {
    const target = activeCategoryObject ? `/category/${activeCategoryObject.slug}` : '/';
    window.history.pushState(null, '', target);
    setCurrentPath(target);
  };

  const handleOpenQuote = (product: Product) => {
    setQuoteProduct(product);
    setIsQuoteOpen(true);
  };

  // If 404 route
  if (route.type === '404' || (route.type === 'category' && !activeCategoryObject) || (route.type === 'product' && !activeProductObject)) {
    return (
      <div className="min-h-screen bg-white font-sans selection:bg-brand-blue selection:text-white">
        <Navbar />
        <main>
          <NotFound 
            onNavigateHome={() => navigateTo('/')}
            onSelectCategory={(catId) => {
              const cat = CATEGORIES.find(c => c.id === catId);
              navigateTo(cat && cat.slug ? `/category/${cat.slug}` : '/');
            }}
          />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  // Determine SEO metadata based on active route
  let pageTitle = isEn
    ? 'Chemical Supplier in Ethiopia | Industrial & Laboratory Raw Materials'
    : 'የኬሚካል ጥሬ ዕቃዎች አቅራቢ በኢትዮጵያ | የኢንዱስትሪና ላቦራቶሪ ግብዓቶች';

  let pageDescription = isEn
    ? 'Chemicals Hub Ethiopia is Addis Ababa’s premier chemical sourcing platform. Sourcing high-purity raw materials for detergent, cosmetics, food, industrial, and laboratory testing.'
    : 'ኬሚካልስ ሐብ ኢትዮጵያ በአዲስ አበባና በመላ አገሪቱ ለሚገኙ አምራቾች ከፍተኛ ጥራት ያላቸውን የሳሙና፣ ኮስሞቲክስ፣ ምግብ፣ ላቦራቶሪና ኢንዱስትሪ ኬሚካል ጥሬ ዕቃዎች ያቀርባል።';

  let canonicalUrl = '/';
  let schemaData: object = buildMasterSchema(language, allProductsList);

  if (route.type === 'category' && activeCategoryObject) {
    pageTitle = isEn
      ? `${activeCategoryObject.name} in Ethiopia - Sourcing & Price`
      : `${activeCategoryObject.name} በኢትዮጵያ - አቅርቦትና ዋጋ`;

    pageDescription = isEn
      ? `Source verified ${activeCategoryObject.name} in Addis Ababa, Ethiopia. Direct Kaliti warehouse delivery, Certificate of Analysis (COA), and competitive bulk pricing.`
      : `በአዲስ አበባ እና በመላው ኢትዮጵያ ጥራት ያላቸው ${activeCategoryObject.name} በታማኝነት ያግኙ። ፈጣን ስርጭት ከቃሊቲ መጋዘን።`;

    canonicalUrl = `/category/${activeCategoryObject.slug}`;
    const categoryProducts = allProductsList.filter(p => p.category === activeCategoryObject.id);
    schemaData = buildCategorySchema(activeCategoryObject, categoryProducts, language);
  } else if (route.type === 'section') {
    canonicalUrl = `/${route.section}`;
    if (route.section === 'about') {
      pageTitle = isEn ? 'About Our Chemical Sourcing Team in Ethiopia' : 'ስለ ኬሚካልስ ሐብ ኢትዮጵያ';
    } else if (route.section === 'services') {
      pageTitle = isEn ? 'Chemical Supply, Sourcing & Logistics Services' : 'የኬሚካል አቅርቦትና ሎጂስቲክስ አገልግሎቶች';
    } else if (route.section === 'contact') {
      pageTitle = isEn ? 'Request Chemical Quote & Contact Sourcing Desk' : 'የኬሚካል ዋጋ መጠየቂያና መገናኛ';
    } else if (route.section === 'faq') {
      pageTitle = isEn ? 'Chemical Sourcing & Supply Frequently Asked Questions' : 'ተደጋግመው የሚጠየቁ ጥያቄዎች';
    }
  }

  const initialCatId = activeCategoryObject ? activeCategoryObject.id : 'all';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-blue selection:text-white mt-12 sm:mt-0">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        schema={schemaData}
        language={language}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Industries />
        <ProductCatalog 
          initialCategory={initialCatId}
          onSelectProduct={handleSelectProduct}
          onCategoryChangeExternal={handleCategoryChangeExternal}
        />
        <Services />
        <WhyChooseUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />

      {/* Deep-Linked Product Detail Modal */}
      {route.type === 'product' && activeProductObject && (
        <ProductDetailModal 
          product={activeProductObject}
          category={CATEGORIES.find(c => c.id === activeProductObject.category)}
          allProducts={allProductsList}
          onClose={handleCloseProductDetail}
          onOpenQuoteModal={handleOpenQuote}
          onSelectRelatedProduct={(slug) => {
            window.history.pushState(null, '', `/product/${slug}`);
            setCurrentPath(`/product/${slug}`);
          }}
        />
      )}

      {/* Global Product Quote Modal */}
      <ProductQuoteModal 
        product={quoteProduct}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ProductProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ProductProvider>
    </HelmetProvider>
  );
}
