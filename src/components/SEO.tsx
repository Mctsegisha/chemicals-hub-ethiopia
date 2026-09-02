import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Product, Category } from '../types';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  schema?: object;
  language?: 'en' | 'am';
  keywords?: string;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical = '/',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  schema,
  language = 'en',
  keywords,
  noIndex = false,
}) => {
  const siteName = 'Chemicals Hub Ethiopia';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const cleanCanonical = canonical.startsWith('/') ? canonical : `/${canonical}`;
  const url = `https://chemicalshubethiopia.com${cleanCanonical === '/' ? '' : cleanCanonical}`;

  const currentLocale = language === 'en' ? 'en_US' : 'am_ET';
  const alternateLocale = language === 'en' ? 'am_ET' : 'en_US';

  const defaultKeywords = language === 'en'
    ? 'chemical supplier ethiopia, industrial chemicals addis ababa, raw materials ethiopia, detergent chemicals labsa sles, cosmetic ingredients addis ababa, food additives ethiopia, laboratory chemicals ethiopia, caustic soda flakes ethiopia, bulk chemicals supply ethiopia, chemicals hub ethiopia'
    : 'የኬሚካል አቅራቢ ኢትዮጵያ, የኢንዱስትሪ ኬሚካሎች አዲስ አበባ, የሳሙና ጥሬ ዕቃዎች LABSA SLES, የኮስሞቲክስ ግብዓቶች, የምግብ ኬሚካሎች, የላቦራቶሪ ኬሚካሎች, ካስቲክ ሶዳ, ኬሚካልስ ሐብ ኢትዮጵያ';

  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <meta 
        name="robots" 
        content={noIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
      />
      <meta name="author" content="Chemicals Hub Ethiopia" />
      <link rel="canonical" href={url} />

      {/* Multilingual Alternate Links */}
      <link rel="alternate" hrefLang="en" href={`https://chemicalshubethiopia.com${cleanCanonical === '/' ? '' : cleanCanonical}`} />
      <link rel="alternate" hrefLang="am" href={`https://chemicalshubethiopia.com${cleanCanonical === '/' ? '' : cleanCanonical}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://chemicalshubethiopia.com${cleanCanonical === '/' ? '' : cleanCanonical}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Chemicals Hub Ethiopia`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - Chemicals Hub Ethiopia`} />

      {/* Local & Geographic SEO for Ethiopia */}
      <meta name="geo.region" content="ET-AA" />
      <meta name="geo.placename" content="Addis Ababa, Ethiopia" />
      <meta name="geo.position" content="9.0108;38.7613" />
      <meta name="ICBM" content="9.0108, 38.7613" />

      {/* Structured Data / Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export const buildMasterSchema = (language: 'en' | 'am' = 'en', products: Product[] = []) => {
  const isEn = language === 'en';

  const productItems = products.slice(0, 10).map((p, idx) => ({
    "@type": "Product",
    "position": idx + 1,
    "name": p.name,
    "description": p.description,
    "image": p.image,
    "url": `https://chemicalshubethiopia.com/product/${p.slug}`,
    "category": p.category,
    "sku": `CHE-${p.id}`,
    "mpn": p.casNumber || `CAS-${p.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Chemicals Hub Ethiopia"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://chemicalshubethiopia.com/product/${p.slug}`,
      "priceCurrency": "ETB",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@id": "https://chemicalshubethiopia.com/#organization"
      }
    }
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chemicalshubethiopia.com/#organization",
        "name": "Chemicals Hub Ethiopia",
        "alternateName": [
          "Chemicals Hub",
          "Chemical HUB Ethiopia",
          "ኬሚካልስ ሐብ ኢትዮጵያ"
        ],
        "url": "https://chemicalshubethiopia.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://chemicalshubethiopia.com/favicon.svg",
          "caption": "Chemicals Hub Ethiopia Logo"
        },
        "description": isEn
          ? "Premier industrial and laboratory chemical raw materials sourcing and supply platform connecting global chemical manufacturers with producers across Ethiopia."
          : "በኢትዮጵያ ውስጥ ለሚገኙ አምራቾች ከፍተኛ ጥራት ያላቸውን የኢንዱስትሪና የላቦራቶሪ ኬሚካል ጥሬ ዕቃዎች የሚያቀርብ ማዕከል",
        "telephone": "+251972691911",
        "email": "info@chemicalshubethiopia.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kaliti Logistics Corridor, Addis Ababa",
          "addressLocality": "Addis Ababa",
          "addressRegion": "Addis Ababa",
          "postalCode": "1000",
          "addressCountry": "ET"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+251972691911",
            "contactType": "sales",
            "areaServed": "ET",
            "availableLanguage": ["English", "Amharic"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+251972691911",
            "contactType": "customer service",
            "areaServed": "ET",
            "availableLanguage": ["English", "Amharic"]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/chemicalshubethiopia",
          "https://www.linkedin.com/company/chemicalshubethiopia",
          "https://t.me/chemicalshubethiopia"
        ]
      },
      {
        "@type": ["LocalBusiness", "WholesaleStore"],
        "@id": "https://chemicalshubethiopia.com/#localbusiness",
        "name": "Chemicals Hub Ethiopia",
        "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        "url": "https://chemicalshubethiopia.com",
        "telephone": "+251972691911",
        "priceRange": "$$",
        "currenciesAccepted": "ETB, USD",
        "paymentAccepted": "Cash, Bank Transfer, Letter of Credit (LC)",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kaliti Logistics Corridor",
          "addressLocality": "Addis Ababa",
          "addressRegion": "Addis Ababa",
          "postalCode": "1000",
          "addressCountry": "ET"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 9.0108,
          "longitude": 38.7613
        },
        "areaServed": [
          "Addis Ababa",
          "Ethiopia",
          "Oromia",
          "Hawassa",
          "Dukem Industrial Park",
          "Bole Lemi Industrial Park",
          "Kilinto Industrial Park",
          "Adama",
          "Dire Dawa",
          "Bahir Dar"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:30",
            "closes": "18:00"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://chemicalshubethiopia.com/#website",
        "url": "https://chemicalshubethiopia.com",
        "name": "Chemicals Hub Ethiopia",
        "publisher": {
          "@id": "https://chemicalshubethiopia.com/#organization"
        },
        "inLanguage": ["en-US", "am-ET"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://chemicalshubethiopia.com/?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://chemicalshubethiopia.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isEn ? "Home" : "መነሻ",
            "item": "https://chemicalshubethiopia.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isEn ? "Chemical Raw Materials Catalog" : "የኬሚካል ካታሎግ",
            "item": "https://chemicalshubethiopia.com/#products"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": isEn ? "Industries Supported" : "የኢንዱስትሪ ዘርፎች",
            "item": "https://chemicalshubethiopia.com/#industries"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": isEn ? "Chemical Sourcing Services" : "አገልግሎቶች",
            "item": "https://chemicalshubethiopia.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": isEn ? "Request Quote & Contact" : "አግኙን",
            "item": "https://chemicalshubethiopia.com/#contact"
          }
        ]
      },
      ...(productItems.length > 0 ? [{
        "@type": "ItemList",
        "@id": "https://chemicalshubethiopia.com/#product-list",
        "name": isEn ? "Featured Industrial & Laboratory Chemical Raw Materials in Ethiopia" : "በኢትዮጵያ የሚቀርቡ ዋና ዋና የኬሚካል ጥሬ ዕቃዎች",
        "numberOfItems": productItems.length,
        "itemListElement": productItems
      }] : []),
      {
        "@type": "FAQPage",
        "@id": "https://chemicalshubethiopia.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": isEn 
              ? "Where can I buy industrial and laboratory chemical raw materials in Addis Ababa, Ethiopia?"
              : "በአዲስ አበባ እና በኢትዮጵያ የኢንዱስትሪና ላቦራቶሪ ኬሚካል ጥሬ ዕቃዎችን ከየት መግዛት እችላለሁ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isEn
                ? "Chemicals Hub Ethiopia supplies verified, laboratory-tested chemical raw materials directly in Addis Ababa. We provide bulk sourcing for detergent manufacturers (LABSA, SLES, Caustic Soda), cosmetics producers (Glycerin USP, Stearic Acid), food processors (Citric Acid, Sodium Benzoate), laboratory testing facilities (Hydrochloric Acid AR, Ethanol 96%), and industrial operations with warehouse dispatch in Kaliti and direct delivery across Ethiopia."
                : "ኬሚካልስ ሐብ ኢትዮጵያ በአዲስ አበባና በመላው አገሪቱ ለሚገኙ አምራቾች የላቦራቶሪ ምርመራ የተደረገባቸውን የሳሙና፣ ኮስሞቲክስ፣ የምግብ፣ የላቦራቶሪ እና የኢንዱስትሪ ኬሚካሎችን በታማኝነት ያቀርባል። በቃሊቲ ከሚገኘው ማዕከላዊ መጋዘን ፈጣን ስርጭት ይከናወናል።"
            }
          },
          {
            "@type": "Question",
            "name": isEn
              ? "Do you provide Certificate of Analysis (COA) and MSDS for chemical shipments?"
              : "ለሚቀርቡት ኬሚካሎች የጥራት ማረጋገጫ (COA) እና MSDS ይሰጣሉ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isEn
                ? "Yes. Every chemical batch supplied by Chemicals Hub Ethiopia is accompanied by an authentic Manufacturer Certificate of Analysis (COA) and Material Safety Data Sheet (MSDS). Purity and active matter specifications are pre-verified to meet Ethiopian Conformity Assessment Enterprise (ECAE) and international industrial standards."
                : "አዎ፤ በኬሚካልስ ሐብ ኢትዮጵያ የሚቀርብ እያንዳንዱ ባች ትክክለኛ የፋብሪካ የትንተና ሰርተፊኬት (COA) እና የደህንነት መረጃ (MSDS) አብሮት ይቀርባል፤ የይዘት ንጽህናቸውም አስቀድሞ በላቦራቶሪ ይረጋገጣል።"
            }
          },
          {
            "@type": "Question",
            "name": isEn
              ? "What are the minimum order quantities (MOQ) and packaging formats available?"
              : "ዝቅተኛው የትዕዛዝ መጠን (MOQ) እና የማሸጊያ ዓይነቶች ምን ምን ናቸው?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isEn
                ? "We accommodate both small-to-medium manufacturing enterprises (SMEs) starting from 25kg multi-wall paper bags or 210kg/215kg HDPE drums, up to industrial-scale orders in 1,000kg IBC totes and full container loads (FCL 20ft/40ft) with flexible delivery across regional industrial parks (Bole Lemi, Dukem, Kilinto, Hawassa, Adama)."
                : "ከ25 ኪ.ግ ከረጢትና 215 ኪ.ግ በርሜል ጀምሮ እስከ 1000 ኪ.ግ አይቢሲ ታንከሮች እና ሙሉ ኮንቴይነር (FCL) ድረስ ለትናንሽም ሆኑ ለትላልቅ አምራች ፋብሪካዎች በተመጣጣኝ ዋጋ እናቀርባለን።"
            }
          },
          {
            "@type": "Question",
            "name": isEn
              ? "How can I request a quote for chemical supplies in Ethiopia?"
              : "በኢትዮጵያ ውስጥ የኬሚካል ዋጋ ዝርዝር (Quotation) እንዴት መጠየቅ እችላለሁ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isEn
                ? "You can request an instant formal Request for Quote (RFQ) directly through our online catalog by clicking 'Request Quote', contacting our Addis Ababa sourcing desk on Phone/WhatsApp at +251 972 691 911, or emailing info@chemicalshubethiopia.com."
                : "በድረ-ገጻችን ካታሎግ ላይ 'Request Quote' የሚለውን በመጫን፣ ወይም በቀጥታ በስልክና በዋትስአፕ በ +251 972 691 911 በመደወል ፈጣን የዋጋ ዝርዝር ማግኘት ይችላሉ።"
            }
          }
        ]
      }
    ]
  };
};

export const buildProductSchema = (product: Product, category?: Category, language: 'en' | 'am' = 'en') => {
  const isEn = language === 'en';
  const catSlug = category?.slug || `${product.category}-chemicals-ethiopia`;
  const catName = category?.name || product.category;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://chemicalshubethiopia.com/product/${product.slug}#product`,
        "name": product.name,
        "description": product.description,
        "image": product.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        "sku": `CHE-${product.id}`,
        "mpn": product.casNumber || product.id,
        "category": catName,
        "brand": {
          "@type": "Brand",
          "name": "Chemicals Hub Ethiopia"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Chemicals Hub Ethiopia",
          "url": "https://chemicalshubethiopia.com"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://chemicalshubethiopia.com/product/${product.slug}`,
          "priceCurrency": "ETB",
          "price": "1",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Chemicals Hub Ethiopia",
            "url": "https://chemicalshubethiopia.com"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://chemicalshubethiopia.com/product/${product.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isEn ? "Home" : "መነሻ",
            "item": "https://chemicalshubethiopia.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isEn ? "Products" : "ምርቶች",
            "item": "https://chemicalshubethiopia.com/#products"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": catName,
            "item": `https://chemicalshubethiopia.com/category/${catSlug}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.name,
            "item": `https://chemicalshubethiopia.com/product/${product.slug}`
          }
        ]
      }
    ]
  };
};

export const buildCategorySchema = (category: Category, categoryProducts: Product[], language: 'en' | 'am' = 'en') => {
  const isEn = language === 'en';
  const catSlug = category.slug || `${category.id}-chemicals-ethiopia`;

  const items = categoryProducts.map((p, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "url": `https://chemicalshubethiopia.com/product/${p.slug}`,
    "name": p.name
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://chemicalshubethiopia.com/category/${catSlug}#webpage`,
        "name": `${category.name} in Ethiopia - Sourcing & Supply | Chemicals Hub`,
        "description": category.description || `Browse verified ${category.name} in Addis Ababa, Ethiopia with bulk pricing and Certificate of Analysis.`,
        "url": `https://chemicalshubethiopia.com/category/${catSlug}`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://chemicalshubethiopia.com/#website"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://chemicalshubethiopia.com/category/${catSlug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isEn ? "Home" : "መነሻ",
            "item": "https://chemicalshubethiopia.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isEn ? "Products" : "ምርቶች",
            "item": "https://chemicalshubethiopia.com/#products"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": category.name,
            "item": `https://chemicalshubethiopia.com/category/${catSlug}`
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `https://chemicalshubethiopia.com/category/${catSlug}#itemlist`,
        "name": `${category.name} Catalog Ethiopia`,
        "numberOfItems": items.length,
        "itemListElement": items
      }
    ]
  };
};

export const defaultSchema = buildMasterSchema('en');
