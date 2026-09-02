import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am';

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.getQuote": "Get Quote",

    // Hero
    "hero.badge": "Premium Chemical Raw Materials in Ethiopia",
    "hero.title": "Sourcing Excellence for Ethiopian Industries",
    "hero.desc": "Chemicals Hub is Ethiopia's dedicated industrial raw materials sourcing platform. We bridge international chemical producers with local manufacturers to empower local production in detergent, cosmetics, foods, and industrial sectors.",
    "hero.btnExplore": "Explore Catalog",
    "hero.btnContact": "Request Quote",

    // About
    "about.badge": "About Us",
    "about.title": "Connecting Ethiopian Manufacturers with Global Excellence",
    "about.desc": "Chemicals Hub Ethiopia is a premier raw material sourcing and supply platform based in Addis Ababa. We bridge the gap between local manufacturers and reliable global chemical producers.",
    "about.role1.title": "Chemical Engineer",
    "about.role1.desc": "Expert technical guidance for your formulations.",
    "about.role2.title": "Sourcing Specialist",
    "about.role2.desc": "Finding the best raw materials globally.",
    "about.role3.title": "Industrial Consultant",
    "about.role3.desc": "Optimizing your production processes.",
    "about.leadership": "Years of Industry Leadership",

    // Industries
    "industries.badge": "Industries We Support",
    "industries.title": "Specialized Raw Material Supply for Key Sectors",
    "industries.desc": "We supply high-grade raw materials tailored to the specific formulations of various production lines in Addis Ababa and across Ethiopia.",
    "ind.soap": "Soap & Detergent",
    "ind.soap.desc": "Supplying raw materials for household and industrial cleaning products.",
    "ind.cosm": "Cosmetics & Personal Care",
    "ind.cosm.desc": "Ingredients for skin, hair, and beauty formulations.",
    "ind.food": "Food Processing",
    "ind.food.desc": "Food-grade additives and preservatives for the food industry.",
    "ind.paint": "Paint & Construction",
    "ind.paint.desc": "Chemicals for coatings, plastics, and building materials.",
    "ind.mining": "Mining & Industrial",
    "ind.mining.desc": "Specialized chemicals for gold mining and heavy industrial operations.",
    "ind.lab": "Laboratory & QC Testing",
    "ind.lab.desc": "Analytical grade reagents for research, university laboratories, and industrial QC testing.",

    // Product Catalog
    "cat.badge": "Catalog",
    "cat.title": "Explore Our Products",
    "cat.desc": "Browse our extensive range of high-quality chemical raw materials in Ethiopia and build a custom Request for Quote (RFQ) list.",
    "cat.search": "Search chemicals...",
    "cat.all": "All Products",
    "cat.detergent": "Detergent Chemicals",
    "cat.cosmetic": "Cosmetic Ingredients",
    "cat.industrial": "Industrial Chemicals",
    "cat.food": "Food Additives",
    "cat.laboratory": "Laboratory Chemicals",
    "cat.requestQuote": "Request Quote",
    "cat.inRfq": "In RFQ List",
    "cat.buildRfq": "Build RFQ Request",
    "cat.noProducts": "No products found matching your criteria.",

    // RFQ Drawer
    "rfq.title": "Request for Quote (RFQ)",
    "rfq.subtitle": "chemical(s) in your list",
    "rfq.review": "Review Chemicals List",
    "rfq.clearAll": "Clear All",
    "rfq.empty": "Your quote basket is empty.",
    "rfq.emptyDesc": "Select products from the catalog to add them to your procurement list.",
    "rfq.advisory": "Industrial Sourcing Advisory: Minimum Order Quantities (MOQ) might apply dynamically depending on international container logistics and local duty classifications.",
    "rfq.contactHeader": "Corporate Contact Information",
    "rfq.formName": "Your Full Name *",
    "rfq.formCompany": "Company Name *",
    "rfq.formEmail": "Business Email *",
    "rfq.formPhone": "Telephone No *",
    "rfq.formLocation": "Delivery Location (e.g. Addis Ababa / Adama)",
    "rfq.formTimeline": "Target Delivery Timeline (e.g. In 2 Weeks / Urgent)",
    "rfq.formNotes": "Additional Specifications (customized concentrations, packaging requests, or target price)",
    "rfq.btnProceed": "Proceed to Contact Details",
    "rfq.btnBack": "Back",
    "rfq.btnSend": "Send Quote Request",
    "rfq.success": "RFQ Compiled Successfully!",
    "rfq.successDesc": "We have formulated your official quote request. Your local email program (Outlook, Gmail, Apple Mail, etc.) should have opened automatically to send this to our inbox.",
    "rfq.draftReview": "Official Draft Review",
    "rfq.copy": "Copy RFQ",
    "rfq.copied": "Copied!",
    "rfq.warning": "If your mail program didn't launch, click the clipboard copy button above and send to info@chemicalshubethiopia.com manually.",
    "rfq.btnRetry": "Retry Email Launch",
    "rfq.btnFinish": "Clear & Finish",

    // Product Quote Modal
    "modal.quoteTitle": "Request a Quote",
    "modal.quoteSubtitle": "Specify your required quantity, grade, packaging & delivery destination",
    "modal.specs": "Standard Specifications",
    "modal.qty": "Estimated Quantity Required",
    "modal.unit": "Unit",
    "modal.packaging": "Preferred Packaging Format",
    "modal.packaging.drums": "200L Sealed Steel/Plastic Drums",
    "modal.packaging.bags": "25kg Multi-layer Kraft Bags",
    "modal.packaging.ibc": "1,000L Standard IBC Tote Container",
    "modal.packaging.tanker": "Bulk ISO Liquid Tanker",
    "modal.packaging.custom": "Custom / Manufacturer Standard",
    "modal.grade": "Target Application / Grade",
    "modal.grade.industrial": "Industrial / Technical Grade",
    "modal.grade.cosmetic": "Cosmetic & Personal Care Grade",
    "modal.grade.detergent": "Detergent & Cleanser Formulation",
    "modal.grade.food": "Food & Beverage Additive Grade",
    "modal.grade.pharma": "High Purity / Pharmaceutical Grade",
    "modal.location": "Delivery Destination in Ethiopia",
    "modal.timeline": "Target Delivery Timeline",
    "modal.timeline.urgent": "Immediate (Ex-Stock Addis Ababa)",
    "modal.timeline.weeks": "Within 1 - 2 Weeks",
    "modal.timeline.month": "Within 30 Days (Scheduled Import)",
    "modal.timeline.recurring": "Monthly Recurring Contract Supply",
    "modal.docs": "Technical Documents & Sampling",
    "modal.docCoa": "Certificate of Analysis (COA) required",
    "modal.docMsds": "Material Safety Data Sheet (MSDS) required",
    "modal.docSample": "Request Laboratory Sample (100g - 500ml)",
    "modal.contact": "Corporate Contact Information",
    "modal.name": "Full Name *",
    "modal.company": "Company / Factory Name *",
    "modal.email": "Business Email *",
    "modal.phone": "Phone / WhatsApp (+251) *",
    "modal.notes": "Additional Specifications or Notes",
    "modal.notesPlaceholder": "Specify active matter %, target viscosity, target price, or specific industrial requirements...",
    "modal.submit": "Submit Quotation Request",
    "modal.whatsapp": "Send via WhatsApp",
    "modal.telegram": "Send via Telegram",
    "modal.successTitle": "Quote Request Ready!",
    "modal.successSubtitle": "Your requirement specifications have been compiled. Our sourcing specialists will respond with pricing within 24 hours.",
    "modal.refNo": "RFQ Reference",
    "modal.copyBrief": "Copy Requirements Brief",
    "modal.copied": "Copied to Clipboard!",
    "modal.close": "Close Window",
    "modal.addToCart": "Add to Multi-Product RFQ List",
    "modal.addedToCart": "Added to Multi-Product List",

    // Loader
    "loader.loadingFacilities": "Loading Facilities in Ethiopia...",
    "loader.loadingCatalog": "Loading Chemical Raw Materials Catalog...",
    "loader.fetchingProducts": "Fetching verified raw material inventory...",

    // Services
    "services.badge": "Our Services",
    "services.title": "Comprehensive Solutions for Chemical Sourcing",
    "services.supply": "Chemical Supply",
    "services.supply.desc": "Reliable sourcing of local and imported chemical raw materials.",
    "services.pack": "Packaging Solutions",
    "services.pack.desc": "Supplying bottles, pumps, triggers, and other packaging materials.",
    "services.sourcing": "Sourcing & Logistics",
    "services.sourcing.desc": "End-to-end sourcing and order handling for your specific needs.",
    "services.training": "Production Training",
    "services.training.desc": "Expert training in soap and detergent production techniques.",
    "services.consult": "Industrial Consultation",
    "services.consult.desc": "Professional advice on chemical processes and industrial setups.",

    // Why Choose Us
    "why.badge": "Why Us",
    "why.title": "Why Choose Chemicals Hub Ethiopia?",
    "why.reason1.title": "Reliable Supply Chain",
    "why.reason1.desc": "Consistent availability of essential raw materials.",
    "why.reason2.title": "Competitive Pricing",
    "why.reason2.desc": "Direct sourcing to ensure the best value for your business.",
    "why.reason3.title": "Industry Expertise",
    "why.reason3.desc": "Technical support from experienced chemical engineers.",
    "why.reason4.title": "Fast Delivery",
    "why.reason4.desc": "Efficient logistics across Addis Ababa and beyond.",
    "why.reason5.title": "Global Sourcing",
    "why.reason5.desc": "Access to premium chemicals from international markets.",

    // Contact
    "contact.badge": "Contact Us",
    "contact.title": "Get in Touch with Our Chemical Sourcing Team",
    "contact.visit": "Visit Our Office",
    "contact.phone": "Give Us a Call",
    "contact.email": "Send an Email",
    "contact.hours": "Working Hours",
    "contact.hours.detail": "Mon - Sat: 8:00 AM - 6:00 PM",
    "contact.chat": "Chat with Sourcing Engineers",
    "contact.chatDesc": "Get instant expert advice on raw material classifications, chemical formulations, and container-level import procedures via WhatsApp.",
    "contact.chatBtn": "Chat on WhatsApp",
    "contact.telegramBtn": "Chat on Telegram",
    "contact.formHeader": "Send Us a Message",
    "contact.formName": "Full Name",
    "contact.formPhone": "Phone Number",
    "contact.formMsg": "Message",
    "contact.formSend": "Send Message",

    // Footer
    "footer.desc": "Your reliable partner for high-quality chemical raw materials sourcing and supply in Ethiopia.",
    "footer.links": "Quick Links",
    "footer.industries": "Industries",
    "footer.contact": "Contact Info",
    "footer.rights": "Chemicals Hub Ethiopia. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // 404 & Product Detail
    "notFound.title": "Page Not Found",
    "notFound.desc": "The chemical resource or page you requested could not be found or has moved.",
    "notFound.searchPlaceholder": "Search chemicals by name, grade, or CAS...",
    "notFound.popular": "Browse Key Chemical Sectors in Ethiopia",
    "notFound.homeBtn": "Return to Homepage",
    "notFound.catalogBtn": "Browse Product Catalog",
    "productDetail.title": "Chemical Specifications & Sourcing",
    "productDetail.cas": "CAS Number",
    "productDetail.grade": "Chemical Grade",
    "productDetail.purity": "Purity Standard",
    "productDetail.formula": "Formula",
    "productDetail.packaging": "Standard Packaging",
    "productDetail.usage": "Industrial Applications in Ethiopia",
    "productDetail.benefits": "Key Advantages & Sourcing Profile",
    "productDetail.specs": "Verified Specifications (COA)",
    "productDetail.related": "Related & Complementary Raw Materials",
    "productDetail.requestRfq": "Request Quotation (RFQ)",
    "productDetail.inquireWhatsapp": "WhatsApp Inquiry",
    "productDetail.back": "Back to Catalog",
    "breadcrumb.home": "Home",
    "breadcrumb.products": "Products",
    "breadcrumb.categories": "Categories"
  },
  am: {
    // Nav
    "nav.home": "መነሻ",
    "nav.about": "ስለ እኛ",
    "nav.products": "ምርቶች",
    "nav.services": "አገልግሎቶች",
    "nav.contact": "ያግኙን",
    "nav.getQuote": "ዋጋ ይጠይቁ",

    // Hero
    "hero.badge": "ጥራት ያላቸው የኬሚካል ጥሬ ዕቃዎች በኢትዮጵያ",
    "hero.title": "ለኢትዮጵያ ኢንዱስትሪዎች አስተማማኝ የኬሚካል አቅራቢ",
    "hero.desc": "ኬሚካልስ ሐብ የሀገር ውስጥ ምርትን ለማጠናከር ከአለም አቀፍ አምራቾች ጋር በማገናኘት በሳሙና፣ በኮስሞቲክስ፣ በምግብ እና በኢንዱስትሪ ዘርፎች ጥራት ያላቸውን የኬሚካል ጥሬ እቃዎች ያቀርባል።",
    "hero.btnExplore": "ካታሎግ ያስሱ",
    "hero.btnContact": "ዋጋ ይጠይቁ",

    // About
    "about.badge": "ስለ እኛ",
    "about.title": "የኢትዮጵያን አምራቾች ከዓለም አቀፍ ጥራት ጋር ማገናኘት",
    "about.desc": "ኬሚካልስ ሐብ በኢትዮጵያ የሚገኝ ግንባር ቀደም የኬሚካል ጥሬ ዕቃዎች አቅራቢ ሲሆን በአገር ውስጥ አምራቾችና በዓለም አቀፍ የኬሚካል አምራቾች መካከል ያለውን ክፍተት ያጠባል።",
    "about.role1.title": "የኬሚካል መሃንዲስ",
    "about.role1.desc": "ለቀመሮችዎ ሙያዊ ቴክኒካዊ መመሪያ እንሰጣለን።",
    "about.role2.title": "የግዥ ባለሙያ",
    "about.role2.desc": "ምርጥ የኬሚካል ጥሬ ዕቃዎችን ከዓለም አቀፍ ገበያ እናመጣለን።",
    "about.role3.title": "የኢንዱስትሪ አማካሪ",
    "about.role3.desc": "የምርት ሂደቶን በማሻሻል ወጪዎን እንቀንሳለን።",
    "about.leadership": "የዓመታት የኢንዱስትሪ ልምድና አስተማማኝነት",

    // Industries
    "industries.badge": "የምንደግፋቸው ኢንዱስትሪዎች",
    "industries.title": "ለዋና ዋና ዘርፎች የኬሚካል ጥሬ ዕቃዎች አቅርቦት",
    "industries.desc": "በኢትዮጵያ ውስጥ ለተለያዩ የማምረቻ ዘርፎች ተስማሚ የሆኑ ከፍተኛ ጥራት ያላቸውን የኬሚካል ጥሬ ዕቃዎችን እናቀርባለን።",
    "ind.soap": "ሳሙናና ዲተርጀንት",
    "ind.soap.desc": "ለቤት ውስጥ እና ለኢንዱስትሪ ማጽጃ ምርቶች የሚሆኑ ጥሬ እቃዎችን ማቅረብ።",
    "ind.cosm": "ኮስሞቲክስና የግል ንጽህና",
    "ind.cosm.desc": "ለቆዳ፣ ለፀጉር እና ለውበት ምርቶች የሚሆኑ ጥሬ እቃዎች።",
    "ind.food": "የምግብ ማቀነባበሪያ",
    "ind.food.desc": "ለነዚህ ኢንዱስትሪዎች የሚሆኑ የምግብ ደረጃ ተጨማሪዎችና መከላከያዎች።",
    "ind.paint": "ቀለምና ኮንስትራክሽን",
    "ind.paint.desc": "ለቀለም፣ ለላስቲክስ እና ለግንባታ እቃዎች የሚሆኑ ኬሚካሎች።",
    "ind.mining": "ማዕድንና ኢንዱስትሪያል",
    "ind.mining.desc": "ለወርቅ ማውጣትና ለከባድ ኢንዱስትሪ ስራዎች የሚሆኑ ልዩ ኬሚካሎች።",
    "ind.lab": "ላቦራቶሪና የጥራት ፍተሻ",
    "ind.lab.desc": "ለዩኒቨርሲቲዎች፣ ለፋብሪካዎች የጥራት ቁጥጥርና ለምርመራ ማዕከላት የሚያገለግሉ ኬሚካሎች።",

    // Product Catalog
    "cat.badge": "ካታሎግ",
    "cat.title": "ምርቶቻችንን ያስሱ",
    "cat.desc": "በኢትዮጵያ የሚገኙትን ሰፊ የኬሚካል ጥሬ ዕቃዎች ይፈልጉና የራስዎን የዋጋ መጠየቂያ ዝርዝር (RFQ) ያዘጋጁ።",
    "cat.search": "ኬሚካሎችን ይፈልጉ...",
    "cat.all": "ሁሉም ምርቶች",
    "cat.detergent": "የሳሙና ኬሚካሎች",
    "cat.cosmetic": "የኮስሞቲክስ ጥሬ ዕቃዎች",
    "cat.industrial": "የኢንዱስትሪ ኬሚካሎች",
    "cat.food": "የምግብ ተጨማሪዎች",
    "cat.laboratory": "የላቦራቶሪ ኬሚካሎች",
    "cat.requestQuote": "ዋጋ ይጠይቁ",
    "cat.inRfq": "በመጠየቂያ ዝርዝር ውስጥ",
    "cat.buildRfq": "የዋጋ መጠየቂያ ያዘጋጁ",
    "cat.noProducts": "ከፍለጋዎ ጋር የሚዛመድ ምርት አልተገኘም።",

    // RFQ Drawer
    "rfq.title": "የዋጋ መጠየቂያ ዝርዝር (RFQ)",
    "rfq.subtitle": "ኬሚካሎች በመጠየቂያ ዝርዝርዎ ውስጥ ይገኛሉ",
    "rfq.review": "የኬሚካል ዝርዝርን ይገምግሙ",
    "rfq.clearAll": "ሁሉንም አጽዳ",
    "rfq.empty": "የመጠየቂያ ቅርጫትዎ ባዶ ነው።",
    "rfq.emptyDesc": "ወደ መጠየቂያ ዝርዝርዎ ለማካተት ምርቶችን ከካታሎጉ ውስጥ ይምረጡ።",
    "rfq.advisory": "ኢንዱስትሪያል ማሳሰቢያ፡ እንደ ዓለም አቀፍ ትራንስፖርት እና የጉምሩክ ምደባዎች በመነሳት አነስተኛ የግዢ መጠን (MOQ) ሊተገበር ይችላል።",
    "rfq.contactHeader": "የኩባንያ መረጃ መሙያ",
    "rfq.formName": "የእርስዎ ሙሉ ስም *",
    "rfq.formCompany": "የድርጅት ስም *",
    "rfq.formEmail": "የድርጅት ኢሜይል *",
    "rfq.formPhone": "የስልክ ቁጥር *",
    "rfq.formLocation": "የማረፊያ ቦታ (ለምሳሌ አዲስ አበባ / አዳማ)",
    "rfq.formTimeline": "የማድረሻ ጊዜ (ለምሳሌ በ2 ሳምንት ውስጥ / በአስቸኳይ)",
    "rfq.formNotes": "ተጨማሪ ዝርዝሮች (ለምሳሌ የምርቱን ትኩረት መጠን፣ ማሸጊያ ወይም የታለመለትን ዋጋ)",
    "rfq.btnProceed": "ወደ መገናኛ መረጃ ይቀጥሉ",
    "rfq.btnBack": "ተመለስ",
    "rfq.btnSend": "የዋጋ ጥያቄውን ይላኩ",
    "rfq.success": "የዋጋ ጥያቄዎ በተሳካ ሁኔታ ተዘጋጅቷል!",
    "rfq.successDesc": "ኦፊሴላዊ የዋጋ መጠየቂያዎን አዘጋጅተናል። ወደ እኛ ለመላክ የኢሜይል መተግበሪያዎ (Outlook, Gmail, etc.) በራሱ መከፈት ነበረበት።",
    "rfq.draftReview": "የተዘጋጀው ጥያቄ ረቂቅ",
    "rfq.copy": "ኮፒ አድርግ",
    "rfq.copied": "ኮፒ ተደርጓል!",
    "rfq.warning": "የኢሜይል መተግበሪያዎ ካልተከፈተ ከላይ ያለውን 'ኮፒ አድርግ' ቁልፍ በመጫን በ info@chemicalshubethiopia.com በኩል ይላኩልን።",
    "rfq.btnRetry": "ኢሜይሉን ለመላክ እንደገና ይሞክሩ",
    "rfq.btnFinish": "ሁሉንም አጽዳና ጨርስ",

    // Product Quote Modal
    "modal.quoteTitle": "የዋጋ መጠየቂያ ቅጽ",
    "modal.quoteSubtitle": "የሚፈልጉትን የኬሚካል መጠን፣ ደረጃ፣ ማሸጊያ እና የማድረሻ ቦታ ይግለጹ",
    "modal.specs": "መደበኛ የጥራት መለኪያዎች",
    "modal.qty": "የሚፈለገው መጠን",
    "modal.unit": "መለኪያ",
    "modal.packaging": "የተመረጠ የማሸጊያ አይነት",
    "modal.packaging.drums": "200 ሊትር ብረት/ፕላስቲክ በርሜል",
    "modal.packaging.bags": "25 ኪ.ግ ባለብዙ ንብርብር ጆንያ",
    "modal.packaging.ibc": "1,000 ሊትር ስታንዳርድ IBC ኮንቴነር",
    "modal.packaging.tanker": "የፈሳሽ ኬሚካል ቦቴ (ISO Tanker)",
    "modal.packaging.custom": "እንደ አምራቹ መደበኛ ማሸጊያ",
    "modal.grade": "የጥራት ደረጃ / አገልግሎት",
    "modal.grade.industrial": "የኢንዱስትሪ / ቴክኒካል ደረጃ",
    "modal.grade.cosmetic": "የኮስሞቲክስና የግል ንጽህና ደረጃ",
    "modal.grade.detergent": "የሳሙናና ማጽጃ ቀመር ደረጃ",
    "modal.grade.food": "የምግብ ተጨማሪ ደረጃ",
    "modal.grade.pharma": "ከፍተኛ ንጽህና / የፋርማሲዩቲካል ደረጃ",
    "modal.location": "የማድረሻ ቦታ በኢትዮጵያ",
    "modal.timeline": "የማድረሻ የጊዜ ሰሌዳ",
    "modal.timeline.urgent": "በአስቸኳይ (አዲስ አበባ ካለ ክምችት)",
    "modal.timeline.weeks": "በ1 - 2 ሳምንታት ውስጥ",
    "modal.timeline.month": "በ30 ቀናት ውስጥ (በቀጥታ ከውጭ ሀገር)",
    "modal.timeline.recurring": "ወርሃዊ ተከታታይ የኮንትራት አቅርቦት",
    "modal.docs": "ቴክኒካዊ ሰነዶችና የላቦራቶሪ ናሙና",
    "modal.docCoa": "የባች የጥራት ሰርተፊኬት (COA) ይፈለጋል",
    "modal.docMsds": "የደህንነት ዝርዝር መግለጫ (MSDS) ይፈለጋል",
    "modal.docSample": "የላቦራቶሪ ናሙና (100g - 500ml) እፈልጋለሁ",
    "modal.contact": "የድርጅት መገናኛ መረጃ",
    "modal.name": "ሙሉ ስም *",
    "modal.company": "የድርጅት / ፋብሪካ ስም *",
    "modal.email": "የድርጅት ኢሜይል *",
    "modal.phone": "ስልክ / ዋትስአፕ (+251) *",
    "modal.notes": "ተጨማሪ የቀመር ዝርዝር ወይም ማስታወሻ",
    "modal.notesPlaceholder": "የምርቱ ትኩረት መጠን (Active Matter %)، የውፍረት ልኬት ወይም ሌላ የቴክኒክ ፍላጎት...",
    "modal.submit": "የዋጋ ጥያቄውን ላክ",
    "modal.whatsapp": "በዋትስአፕ ላክ",
    "modal.telegram": "በቴሌግራም ላክ",
    "modal.successTitle": "የዋጋ ጥያቄዎ ዝግጁ ሆኗል!",
    "modal.successSubtitle": "የፍላጎት ዝርዝርዎ ተጠናቅሯል። የኬሚካል ግዢ ባለሙያዎቻችን በ24 ሰዓታት ውስጥ ምላሽ ይሰጡዎታል።",
    "modal.refNo": "የመጠየቂያ መለያ ቁጥር",
    "modal.copyBrief": "የጥያቄውን ማጠቃለያ ኮፒ አድርግ",
    "modal.copied": "ኮፒ ተደርጓል!",
    "modal.close": "መስኮቱን ዝጋ",
    "modal.addToCart": "ወደ አጠቃላይ መጠየቂያ ዝርዝር ጨምር",
    "modal.addedToCart": "ወደ መጠየቂያ ዝርዝር ተጨምሯል",

    // Loader
    "loader.loadingFacilities": "የኢትዮጵያ የኬሚካል ተቋማት በመጫን ላይ ናቸው...",
    "loader.loadingCatalog": "የኬሚካል ጥሬ ዕቃዎች ዝርዝር በመጫን ላይ ነው...",
    "loader.fetchingProducts": "የተረጋገጡ የኬሚካል ክምችቶች በመጫን ላይ...",

    // Services
    "services.badge": "አገልግሎቶቻችን",
    "services.title": "ለኬሚካል ግዢ የተሟሉ መፍትሄዎች",
    "services.supply": "የኬሚካል አቅርቦት",
    "services.supply.desc": "አስተማማኝ የሀገር ውስጥ እና የውጭ ሀገር የኬሚካል ጥሬ እቃዎች አቅርቦት።",
    "services.pack": "የማሸጊያ መፍትሄዎች",
    "services.pack.desc": "የኬሚካል ማጠራቀሚያዎች፣ ጥርሙሶች፣ መርጫዎችና ሌሎች ማሸጊያዎችን ማቅረብ።",
    "services.sourcing": "ፈልጎ ማግኘትና ሎጂስቲክስ",
    "services.sourcing.desc": "ለፍላጎቶችዎ ከጫፍ እስከ ጫፍ አስተማማኝ ግዢ እና ሎጂስቲክስ።",
    "services.training": "የማምረት ስልጠና",
    "services.training.desc": "በሳሙናና ማጽጃ ምርቶች የምርት ቴክኒኮች ላይ የባለሙያ ስልጠና።",
    "services.consult": "የኢንዱስትሪ ምክር",
    "services.consult.desc": "ስለ ኬሚካል ሂደቶች እና ስለ ፋብሪካ አወቃቀር ሙያዊ ምክር።",

    // Why Choose Us
    "why.badge": "ለምን እኛ",
    "why.title": "ለምን ኬሚካልስ ሐብ ኢትዮጵያን ይመርጣሉ?",
    "why.reason1.title": "አስተማማኝ የአቅርቦት ሰንሰለት",
    "why.reason1.desc": "አስፈላጊ የሆኑ ጥሬ እቃዎች ሁልጊዜ ዘላቂ መገኘት።",
    "why.reason2.title": "ተወዳዳሪ ዋጋ",
    "why.reason2.desc": "ለድርጅትዎ ምርጥ ዋጋ ለማረጋገጥ በቀጥታ ከምንጩ እናመጣለን።",
    "why.reason3.title": "የኢንዱስትሪ እውቀት",
    "why.reason3.desc": "ልምድ ካላቸው የኬሚካል መሐንዲሶች ቴክኒካዊ ድጋፍ ማግኘት።",
    "why.reason4.title": "ፈጣን ማድረስ",
    "why.reason4.desc": "በአዲስ አበባና በሌሎች ከተሞች ፈጣንና አስተማማኝ ሎጂስቲክስ።",
    "why.reason5.title": "ዓለም አቀፍ ትስስር",
    "why.reason5.desc": "ከከፍተኛ ዓለም አቀፍ ላኪዎች ጋር ያለንን ትስስር መጠቀም።",

    // Contact
    "contact.badge": "ያግኙን",
    "contact.title": "ከእኛ የኬሚካል ግዢ ቡድን ጋር ይገናኙ",
    "contact.visit": "ቢሮአችንን ይጎብኙ",
    "contact.phone": "ስልክ ይደውሉልን",
    "contact.email": "ኢሜይል ይላኩልን",
    "contact.hours": "የስራ ሰዓት",
    "contact.hours.detail": "ሰኞ - ቅዳሜ፡ ከጠዋቱ 2:00 ሰዓት እስከ ምሽቱ 12:00 ሰዓት",
    "contact.chat": "ከኬሚካል መሃንዲሶች ጋር በቀጥታ ይወያዩ",
    "contact.chatDesc": "ስለ ጥሬ እቃዎች፣ ኬሚካላዊ ቀመሮች እና ኮንቴነር-ደረጃ የማስገባት ሂደቶች በዋትስአፕ በኩል ፈጣን ምክር ያግኙ።",
    "contact.chatBtn": "በዋትስአፕ ያግኙን",
    "contact.telegramBtn": "በቴሌግራም ያግኙን",
    "contact.formHeader": "መልዕክት ይላኩልን",
    "contact.formName": "ሙሉ ስም",
    "contact.formPhone": "የስልክ ቁጥር",
    "contact.formMsg": "መልዕክት",
    "contact.formSend": "መልዕክት ይላኩ",

    // Footer
    "footer.desc": "በኢትዮጵያ ውስጥ ከፍተኛ ጥራት ያላቸውን የኬሚካል ጥሬ ዕቃዎችን ለማቅረብ የእርስዎ ታማኝ አጋር።",
    "footer.links": "ፈጣን ሊንኮች",
    "footer.industries": "ኢንዱስትሪዎች",
    "footer.contact": "የመገናኛ መረጃ",
    "footer.rights": "ኬሚካልስ ሐብ ኢትዮጵያ። መብቱ በህግ የተጠበቀ ነው።",
    "footer.privacy": "የግላዊነት ፖሊሲ",
    "footer.terms": "የአገልግሎት ውሎች",

    // 404 & Product Detail
    "notFound.title": "ገጹ አልተገኘም (404)",
    "notFound.desc": "የፈለጉት የኬሚካል መረጃ ወይም ገጽ አልተገኘም ወይም ተዘዋውሯል።",
    "notFound.searchPlaceholder": "ኬሚካሎችን በስም ወይም በደረጃ ይፈልጉ...",
    "notFound.popular": "በኢትዮጵያ ተፈላጊ የኬሚካል ዘርፎችን ያስሱ",
    "notFound.homeBtn": "ወደ መነሻ ገጽ ተመለስ",
    "notFound.catalogBtn": "የኬሚካል ካታሎግ ይመልከቱ",
    "productDetail.title": "የኬሚካል ዝርዝር መረጃና ግዢ",
    "productDetail.cas": "የሲኤኤስ ቁጥር (CAS No)",
    "productDetail.grade": "የኬሚካል ደረጃ (Grade)",
    "productDetail.purity": "የይዘት ንጽህና (Purity)",
    "productDetail.formula": "ኬሚካል ፎርሙላ",
    "productDetail.packaging": "የማሸጊያ አይነት",
    "productDetail.usage": "በኢትዮጵያ ውስጥ ዋና ዋና ጥቅሞች",
    "productDetail.benefits": "ልዩ ጠቀሜታዎች",
    "productDetail.specs": "የጥራት ማረጋገጫ ዝርዝሮች (COA)",
    "productDetail.related": "ተዛማጅ የኬሚካል ጥሬ ዕቃዎች",
    "productDetail.requestRfq": "ኦፊሴላዊ የዋጋ ዝርዝር ይጠይቁ (RFQ)",
    "productDetail.inquireWhatsapp": "በዋትስአፕ በቀጥታ ያነጋግሩን",
    "productDetail.back": "ወደ ካታሎግ ተመለስ",
    "breadcrumb.home": "መነሻ",
    "breadcrumb.products": "ምርቶች",
    "breadcrumb.categories": "ምድቦች"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'am') ? saved : 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
