
import { Product, Industry, Service, Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Products',
    slug: 'all-chemicals-ethiopia'
  },
  {
    id: 'industrial',
    name: 'Industrial Chemicals',
    icon: 'Factory',
    description: 'Essential industrial chemicals for Ethiopia\'s manufacturing sector, including paint, textile, and mining industries. Reliable sourcing and supply in Addis Ababa.',
    slug: 'industrial-chemicals-supplier-ethiopia',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    keyChemicals: ['Hydrogen Peroxide 50%', 'Activated Carbon', 'Soda Ash Dense']
  },
  {
    id: 'detergent',
    name: 'Detergent Chemicals',
    icon: 'Droplets',
    description: 'High-quality detergent chemicals in Ethiopia for soap, liquid soap, and detergent powder production. We supply SLES, LABSA, Caustic Soda, and more in Addis Ababa.',
    slug: 'detergent-chemicals-ethiopia',
    image: 'https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&w=800&q=80',
    keyChemicals: ['LABSA 96%', 'SLES 70%', 'Caustic Soda Flakes']
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Ingredients',
    icon: 'Sparkles',
    description: 'Premium cosmetic raw materials in Addis Ababa for skincare, haircare, and beauty products. Sourcing the best ingredients for Ethiopian cosmetic manufacturers.',
    slug: 'cosmetic-ingredients-addis-ababa',
    image: 'https://images.unsplash.com/photo-1608248597359-598d9cb63ca5?auto=format&fit=crop&w=800&q=80',
    keyChemicals: ['Glycerin USP 99.5%', 'Carbomer 940', 'Vitamin E Oil']
  },
  {
    id: 'food',
    name: 'Food Additives',
    icon: 'Utensils',
    description: 'Food-grade additives and ingredients for the Ethiopian food and beverage industry. Citric acid, preservatives, and flavor enhancers supplied in Addis Ababa.',
    slug: 'food-additives-supplier-ethiopia',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    keyChemicals: ['Citric Acid Anhydrous', 'Sodium Benzoate', 'Corn Starch']
  },
  {
    id: 'laboratory',
    name: 'Laboratory Chemicals',
    icon: 'FlaskConical',
    description: 'High-purity analytical reagent (AR) grade and laboratory chemicals in Addis Ababa for university research, testing laboratories, and quality control.',
    slug: 'laboratory-chemicals-supplier-ethiopia',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    keyChemicals: ['Hydrochloric Acid 37% AR', 'Ethanol 96% AR', 'Buffer Solutions']
  }
];

export const PRODUCTS: Product[] = [
  // Detergent Chemicals
  {
    id: '1',
    name: 'LABSA 96% (Linear Alkyl Benzene Sulfonic Acid)',
    category: 'detergent',
    description: 'LABSA 96% is the primary anionic surfactant for synthetic detergent powder, liquid dishwash, and industrial degreasers in Ethiopia. High biodegradability and active matter.',
    image: 'https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&w=800&q=80',
    specifications: ['Active Matter: Min 96.0%', 'Free Oil: Max 2.0%', 'Free Sulfuric Acid: Max 1.5%', 'Color (Klett): Max 50'],
    usage: 'Primary surfactant in laundry powders, liquid hand soaps, heavy-duty vehicle cleaners, and industrial scouring agents.',
    benefits: 'Outstanding detergency, rapid foam development, complete biodegradability, and cost-efficient saponification in Addis Ababa manufacturing plants.',
    slug: 'labsa-96-supplier-addis-ababa',
    casNumber: '27176-87-0',
    grade: 'Industrial / Detergent Grade',
    purity: '96.0% Active Matter',
    formula: 'C18H30O3S',
    packaging: '215kg HDPE drums or 1,000kg IBC totes',
    relatedProductSlugs: ['sles-70-price-ethiopia', 'caustic-soda-flakes-price-ethiopia', 'cdea-foam-booster-ethiopia']
  },
  {
    id: '2',
    name: 'SLES 70% (Sodium Lauryl Ether Sulfate)',
    category: 'detergent',
    description: 'SLES 70% is a premium high-foaming anionic surfactant widely used across Ethiopian factories for liquid soaps, shampoos, bubble baths, and hand sanitizers.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    specifications: ['Active Matter: 70% ± 2%', 'Appearance: White to Light Yellow Gel', 'pH (1% aqueous): 7.0 - 9.5', 'Unsulfated Matter: Max 2.5%'],
    usage: 'Liquid soaps, shampoos, body washes, carpet cleaners, and domestic dishwashing formulations.',
    benefits: 'High lather volume even in hard water, superior emulsification profile, and mild skin compatibility.',
    slug: 'sles-70-price-ethiopia',
    casNumber: '68585-34-2',
    grade: 'Cosmetic & Detergent Grade',
    purity: '70% Active Matter',
    formula: 'C12H25O(CH2CH2O)2SO3Na',
    packaging: '170kg / 220kg HDPE drums',
    relatedProductSlugs: ['labsa-96-supplier-addis-ababa', 'cdea-foam-booster-ethiopia', 'carbomer-940-thickener-ethiopia']
  },
  {
    id: '3',
    name: 'CDEA (Coconut Diethanolamide 85%)',
    category: 'detergent',
    description: 'CDEA (Cocamide DEA) is an essential non-ionic surfactant functioning as a foam booster, viscosity builder, and stabilizer for detergent and personal care production.',
    image: 'https://images.unsplash.com/photo-1608248597359-598d9cb63ca5?auto=format&fit=crop&w=800&q=80',
    specifications: ['Active Content: Min 85%', 'Appearance: Clear Amber Viscous Liquid', 'pH (1% sol): 9.0 - 10.5', 'Free Amine: Max 5%'],
    usage: 'Viscosity control and foam stability in liquid detergents, hand soaps, and shampoos.',
    benefits: 'Delivers luxurious dense foam, controls product thickness, and provides mild moisturizing feel.',
    slug: 'cdea-foam-booster-ethiopia',
    casNumber: '68603-42-9',
    grade: 'Technical / Detergent Grade',
    purity: 'Min 85% Amide Content',
    packaging: '200kg steel drums or HDPE containers',
    relatedProductSlugs: ['sles-70-price-ethiopia', 'labsa-96-supplier-addis-ababa']
  },
  {
    id: '4',
    name: 'Caustic Soda Flakes 99% (Sodium Hydroxide)',
    category: 'industrial',
    description: 'High-purity Caustic Soda Flakes 99% for soap saponification, water treatment, textile dyeing, and chemical synthesis in Ethiopia with Kaliti warehouse dispatch.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    specifications: ['NaOH Purity: Min 99.0%', 'Sodium Carbonate (Na2CO3): Max 0.4%', 'Sodium Chloride (NaCl): Max 0.03%', 'Iron (Fe): Max 0.005%'],
    usage: 'Laundry soap and bar soap saponification, textile mercerization, pH adjustment, industrial drain cleaning, and alumina refining.',
    benefits: 'High chemical reactivity, fast dissolving, dust-free flake format, and guaranteed bulk ex-stock availability in Addis Ababa.',
    slug: 'caustic-soda-flakes-price-ethiopia',
    casNumber: '1310-73-2',
    grade: 'Industrial / Technical Grade',
    purity: '99% Min NaOH',
    formula: 'NaOH',
    packaging: '25kg multi-wall polypropylene bags with inner PE liner',
    relatedProductSlugs: ['labsa-96-supplier-addis-ababa', 'soda-ash-dense-supplier-ethiopia', 'hydrogen-peroxide-50-price-ethiopia']
  },
  {
    id: '5',
    name: 'Soda Ash Dense / Light (Sodium Carbonate)',
    category: 'industrial',
    description: 'Premium Sodium Carbonate (Soda Ash Dense & Light) for Ethiopian glass manufacturing, detergent powder formulating, textile processing, and municipal water treatment.',
    image: 'https://images.unsplash.com/photo-1589792907548-cf94f57fa950?auto=format&fit=crop&w=800&q=80',
    specifications: ['Total Alkalinity (Na2CO3): Min 99.2%', 'Sodium Chloride (NaCl): Max 0.7%', 'Iron (Fe): Max 0.003%', 'Water Insoluble: Max 0.04%'],
    usage: 'Builder in powdered laundry detergents, fluxing agent in glass production, and water softener.',
    benefits: 'Consistent bulk density, rapid dissolution, and neutralizes acidic effluents cost-effectively.',
    slug: 'soda-ash-dense-supplier-ethiopia',
    casNumber: '497-19-8',
    grade: 'Technical / Industrial Grade',
    purity: '99.2% Min Na2CO3',
    formula: 'Na2CO3',
    packaging: '25kg / 50kg bags or 1,000kg jumbo bags',
    relatedProductSlugs: ['caustic-soda-flakes-price-ethiopia', 'labsa-96-supplier-addis-ababa']
  },

  // Cosmetic & Personal Care Ingredients
  {
    id: '6',
    name: 'Carbomer 940 (Cross-Linked Polyacrylate Polymer)',
    category: 'cosmetic',
    description: 'High-clarity Carbomer 940 thickening polymer for crystal-clear hand sanitizers, styling gels, and luxury skincare creams in Addis Ababa.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    specifications: ['Viscosity (0.5% mucilage): 40,000 - 60,000 cps', 'Loss on Drying: Max 2.0%', 'Heavy Metals: Max 10 ppm', 'Residual Solvent: Benzene-free'],
    usage: 'Sanitizing hydroalcoholic gels, moisturizing skin lotions, hair gels, and pharmaceutical suspensions.',
    benefits: 'Exceptional visual clarity, short-flow rheology, rapid thickening at low dosage (0.2% - 0.5%), and suspension stability.',
    slug: 'carbomer-940-thickener-ethiopia',
    casNumber: '9003-01-4',
    grade: 'Cosmetic / Pharmaceutical Grade',
    purity: '100% Polymer Solid',
    packaging: '20kg cardboard drums with PE liner',
    relatedProductSlugs: ['glycerin-usp-995-ethiopia', 'vitamin-e-oil-skincare-addis-ababa']
  },
  {
    id: '7',
    name: 'Glycerin USP 99.5% (Refined Vegetable Grade)',
    category: 'cosmetic',
    description: 'Pure pharmaceutical-grade vegetable Glycerin USP 99.5% for cosmetics, skin ointments, food moisture retention, and oral care products across Ethiopia.',
    image: 'https://images.unsplash.com/photo-1608248597359-598d9cb63ca5?auto=format&fit=crop&w=800&q=80',
    specifications: ['Purity (Glycerol Content): Min 99.5%', 'Specific Gravity (25°C): Min 1.261', 'Chlorides: Max 10 ppm', 'Heavy Metals: Max 5 ppm'],
    usage: 'Humectant in skin care creams, lotions, hair conditioning oils, soaps, toothpastes, and food flavorings.',
    benefits: 'Non-GMO vegetable origin, ultra-pure odorless profile, intense skin hydration, and Halal/Kosher certified.',
    slug: 'glycerin-usp-995-ethiopia',
    casNumber: '56-81-5',
    grade: 'USP / EP / Food Grade',
    purity: '99.5% Min Vegetable Purity',
    formula: 'C3H8O3',
    packaging: '250kg steel drums or 1,250kg IBC totes',
    relatedProductSlugs: ['vitamin-e-oil-skincare-addis-ababa', 'carbomer-940-thickener-ethiopia', 'stearic-acid-triple-pressed-ethiopia']
  },
  {
    id: '8',
    name: 'Vitamin E Oil (dl-Alpha Tocopheryl Acetate 98%)',
    category: 'cosmetic',
    description: 'Cosmetic-grade Vitamin E Oil for anti-aging skincare, body butters, hair serums, and natural product stabilization in Ethiopian personal care brands.',
    image: 'https://images.unsplash.com/photo-1608248597359-598d9cb63ca5?auto=format&fit=crop&w=800&q=80',
    specifications: ['Assay: Min 98.0%', 'Appearance: Clear Pale Yellow Viscous Liquid', 'Refractive Index (20°C): 1.494 - 1.498', 'Free Tocopherol: Max 1.0%'],
    usage: 'Antioxidant in skin creams, stretch mark oils, lip balms, and hair vitality treatments.',
    benefits: 'Neutralizes free radicals, accelerates skin barrier repair, and prolongs formula shelf life against lipid oxidation.',
    slug: 'vitamin-e-oil-skincare-addis-ababa',
    casNumber: '7695-91-2',
    grade: 'Cosmetic Grade USP',
    purity: '98.0% Min Active Assay',
    formula: 'C31H52O3',
    packaging: '25kg & 200kg drums',
    relatedProductSlugs: ['glycerin-usp-995-ethiopia', 'carbomer-940-thickener-ethiopia']
  },

  // Industrial & Manufacturing Chemicals
  {
    id: '9',
    name: 'Hydrogen Peroxide 50% (H2O2 Industrial Grade)',
    category: 'industrial',
    description: 'Technical Hydrogen Peroxide 50% aqueous solution for eco-friendly textile bleaching, water purification, paper pulp whitening, and industrial effluent oxidation.',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=80',
    specifications: ['Concentration (H2O2): Min 50.0%', 'Stability (Gas evolution): Max 0.3 ml/min', 'Free Acidity (as H2SO4): Max 0.03%', 'Residue on Evaporation: Max 0.08%'],
    usage: 'Textile fabric bleaching in Hawassa and Dukem industrial parks, wastewater disinfection, and chemical processing.',
    benefits: 'Breaks down into pure water and oxygen leaving zero harmful toxic residues; highly reactive oxidizing efficiency.',
    slug: 'hydrogen-peroxide-50-price-ethiopia',
    casNumber: '7722-84-1',
    grade: 'Industrial Grade 50%',
    purity: '50.0% H2O2 Solution',
    formula: 'H2O2',
    packaging: '30kg vented canisters, 220kg vented drums, or 1,000L IBC totes',
    relatedProductSlugs: ['caustic-soda-flakes-price-ethiopia', 'activated-carbon-gold-mining-ethiopia']
  },
  {
    id: '10',
    name: 'Activated Carbon (Granular & Powdered for Gold Mining & Water)',
    category: 'industrial',
    description: 'Coconut-shell activated carbon with superior iodine value for CIP/CIL gold extraction in Ethiopian mines, drinking water purification, and industrial air filtration.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    specifications: ['Iodine Number: 950 - 1100 mg/g', 'Hardness Number: Min 98%', 'Moisture Content: Max 5%', 'Ash Content: Max 4%'],
    usage: 'Gold CIP/CIL recovery circuits in Southern/Western Ethiopia, municipal water filtration, and industrial decolorization.',
    benefits: 'Exceptional mechanical hardness resistant to attrition loss, ultra-high microporous adsorption rate, and easily re-activated.',
    slug: 'activated-carbon-gold-mining-ethiopia',
    casNumber: '7440-44-0',
    grade: 'Mining & Water Treatment Grade',
    purity: 'High-activity Coconut Shell Base',
    formula: 'C',
    packaging: '25kg bags or 500kg bulk woven sacks',
    relatedProductSlugs: ['caustic-soda-flakes-price-ethiopia', 'hydrochloric-acid-37-ar-ethiopia']
  },
  {
    id: '11',
    name: 'Titanium Dioxide Rutile (R-996 Paint & Coating Grade)',
    category: 'industrial',
    description: 'Chloride/Sulfate process Rutile Titanium Dioxide for Ethiopian paint, plastics, rubber, and architectural coatings requiring extreme opacity and whiteness.',
    image: 'https://images.unsplash.com/photo-1589792907548-cf94f57fa950?auto=format&fit=crop&w=800&q=80',
    specifications: ['TiO2 Content: Min 93.0%', 'Rutile Crystal Content: Min 98.0%', 'Oil Absorption: 18 - 22 g/100g', 'Tinting Strength: Min 105%'],
    usage: 'Decorative architectural paints, industrial primers, masterbatches, PVC piping, and paper coatings.',
    benefits: 'Supreme hiding power, brilliant whiteness, superior weatherability against harsh UV exposure, and rapid dispersion.',
    slug: 'titanium-dioxide-rutile-paint-ethiopia',
    casNumber: '13463-67-7',
    grade: 'Industrial Paint & Coatings Grade',
    purity: 'Min 93% TiO2',
    formula: 'TiO2',
    packaging: '25kg paper valve bags with moisture barrier',
    relatedProductSlugs: ['caustic-soda-flakes-price-ethiopia', 'soda-ash-dense-supplier-ethiopia']
  },

  // Food Additives & Ingredients
  {
    id: '12',
    name: 'Citric Acid Anhydrous (Food Grade FCC)',
    category: 'food',
    description: 'High-purity Food Grade Citric Acid Anhydrous for Ethiopian beverage bottlers, confectionery, dairy processing, and pharmaceutical pH buffering.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    specifications: ['Purity: 99.5% - 100.5%', 'Water (Moisture): Max 0.5%', 'Sulfated Ash: Max 0.05%', 'Heavy Metals: Max 5 ppm'],
    usage: 'Acidulant and preservative in carbonated soft drinks, juices, jams, candies, and pharmaceutical effervescent powders.',
    benefits: 'Clean tart taste, non-GMO natural fermentation origin, prevents microbial spoilage, and fully compliant with ECAE / international food safety standards.',
    slug: 'citric-acid-anhydrous-supplier-ethiopia',
    casNumber: '77-92-9',
    grade: 'Food Grade FCC / USP',
    purity: '99.5% Min Assay',
    formula: 'C6H8O7',
    packaging: '25kg multi-wall paper bags with PE inner liner',
    relatedProductSlugs: ['sodium-benzoate-food-preservative-ethiopia', 'corn-starch-food-grade-ethiopia']
  },
  {
    id: '13',
    name: 'Sodium Benzoate (Food Preservative FCC)',
    category: 'food',
    description: 'Food Grade Sodium Benzoate powder/prill for microbial growth inhibition in soft drinks, fruit juices, condiments, and pharmaceutical liquid syrups in Ethiopia.',
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
    specifications: ['Assay (C7H5NaO2): Min 99.0%', 'Loss on Drying: Max 1.5%', 'Heavy Metals (as Pb): Max 10 ppm', 'Arsenic: Max 2 ppm'],
    usage: 'Preservative against yeasts, molds, and bacteria in acidic foods and beverages (pH < 4.5).',
    benefits: 'High aqueous solubility, odorless profile, reliable preservation efficacy, and prolongs product commercial shelf life.',
    slug: 'sodium-benzoate-food-preservative-ethiopia',
    casNumber: '532-32-1',
    grade: 'Food Grade FCC / BP',
    purity: '99.0% Min Active Assay',
    formula: 'C7H5NaO2',
    packaging: '25kg kraft paper bags',
    relatedProductSlugs: ['citric-acid-anhydrous-supplier-ethiopia', 'corn-starch-food-grade-ethiopia']
  },
  {
    id: '14',
    name: 'Corn Starch (Food Grade Powder)',
    category: 'food',
    description: 'Refined Food Grade Corn Starch for sauce thickening, confectionery dusting, baking texture enhancement, and corrugated paper box bonding in Ethiopia.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    specifications: ['Moisture Content: Max 13.5%', 'Protein: Max 0.45%', 'Ash: Max 0.15%', 'pH (aqueous): 4.5 - 7.0'],
    usage: 'Food texturizer in soups, sauces, confectionery, processed meats, and paper box adhesive.',
    benefits: 'Pure neutral taste, superior gelatinization stability, consistent viscosity, and economical supply in Addis Ababa.',
    slug: 'corn-starch-food-grade-ethiopia',
    casNumber: '9005-25-8',
    grade: 'Food Grade FCC',
    purity: 'Min 99% Pure Starch',
    formula: '(C6H10O5)n',
    packaging: '25kg woven polypropylene bags',
    relatedProductSlugs: ['citric-acid-anhydrous-supplier-ethiopia', 'sodium-benzoate-food-preservative-ethiopia']
  },

  // Laboratory & Analytical Chemicals (AR Grade)
  {
    id: '15',
    name: 'Hydrochloric Acid 37% AR Grade (Analytical Reagent)',
    category: 'laboratory',
    description: 'High-purity Hydrochloric Acid 37% Analytical Reagent (AR) grade for university laboratories, industrial QC departments, and water testing across Addis Ababa, Ethiopia.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    specifications: ['Assay (HCl): 36.5 - 38.0%', 'Residue after ignition: Max 0.0005%', 'Heavy Metals (as Pb): Max 0.0001%', 'Iron (Fe): Max 0.00005%'],
    usage: 'Laboratory analytical titration, chemical synthesis, pH calibration, and metallurgical sample preparation.',
    benefits: 'Ultra-low trace metal impurities, verified COA with each bottle, glass/HDPE safety packaging, and compliant with academic and industrial lab protocols.',
    slug: 'hydrochloric-acid-37-ar-ethiopia',
    casNumber: '7647-01-0',
    grade: 'AR / ACS Analytical Reagent Grade',
    purity: '37.0% Pure Analytical Reagent',
    formula: 'HCl',
    packaging: '2.5L Winchester glass bottles or 25L HDPE carboys',
    relatedProductSlugs: ['ethanol-96-ar-reagent-ethiopia', 'caustic-soda-flakes-price-ethiopia']
  },
  {
    id: '16',
    name: 'Ethanol 96% AR / ACS (Analytical Reagent Absolute Solvent)',
    category: 'laboratory',
    description: 'Analytical Reagent (AR) Ethanol 96% v/v for chromatographic extraction, laboratory sterilization, microbiology culture preparation, and chemical analytical protocols.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    specifications: ['Assay (Alcohol v/v): Min 96.0%', 'Density (20°C): 0.805 - 0.812 g/ml', 'Non-volatile residue: Max 0.002%', 'Acidity (as CH3COOH): Max 0.002%'],
    usage: 'General analytical chemistry solvent, histological sample preservation, and pharmaceutical quality control testing.',
    benefits: 'Controlled residue content, ultra-pure volatile profile, batch-certified for analytical reproducibility in Ethiopian research institutions.',
    slug: 'ethanol-96-ar-reagent-ethiopia',
    casNumber: '64-17-5',
    grade: 'AR / Analytical Reagent Grade',
    purity: 'Min 96.0% v/v',
    formula: 'C2H5OH',
    packaging: '2.5L and 5L amber glass/fluorinated containers',
    relatedProductSlugs: ['hydrochloric-acid-37-ar-ethiopia', 'carbomer-940-thickener-ethiopia']
  }
];

export const INDUSTRIES: Industry[] = [
  { title: 'Soap & Detergent', icon: 'Droplets', description: 'Supplying raw materials for household and industrial cleaning products.' },
  { title: 'Cosmetics & Personal Care', icon: 'Sparkles', description: 'Ingredients for skin, hair, and beauty formulations.' },
  { title: 'Food Processing', icon: 'Utensils', description: 'Food-grade additives and preservatives for the food industry.' },
  { title: 'Paint & Construction', icon: 'Paintbrush', description: 'Chemicals for coatings, plastics, and building materials.' },
  { title: 'Mining & Industrial', icon: 'Pickaxe', description: 'Specialized chemicals for gold mining and heavy industrial operations.' },
  { title: 'Laboratory & QC Testing', icon: 'FlaskConical', description: 'Analytical grade reagents for research, universities, and industrial QC testing.' },
];

export const SERVICES: Service[] = [
  { title: 'Chemical Supply', icon: 'Truck', description: 'Reliable sourcing of local and imported chemical raw materials.' },
  { title: 'Packaging Solutions', icon: 'Package', description: 'Supplying bottles, pumps, triggers, and other packaging materials.' },
  { title: 'Sourcing & Logistics', icon: 'Globe', description: 'End-to-end sourcing and order handling for your specific needs.' },
  { title: 'Production Training', icon: 'GraduationCap', description: 'Expert training in soap and detergent production techniques.' },
  { title: 'Industrial Consultation', icon: 'UserCheck', description: 'Professional advice on chemical processes and industrial setups.' },
];

export const CONTACT_INFO = {
  phone: '+251 972 691 911',
  phoneRaw: '+251972691911',
  whatsappNumber: '251972691911',
  telegramNumber: '+251972691911',
  email: 'info@chemicalshubethiopia.com',
  addressEn: 'Addis Ababa, Ethiopia',
  addressAm: 'አዲስ አበባ፣ ኢትዮጵያ',
  getWhatsAppUrl: (message?: string) => {
    const baseUrl = 'https://wa.me/251972691911';
    return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
  },
  getTelegramUrl: (message?: string) => {
    const phone = '251972691911';
    return message 
      ? `https://t.me/+${phone}?text=${encodeURIComponent(message)}`
      : `https://t.me/+${phone}`;
  },
  getTelegramDeepLink: (message?: string) => {
    // Encoded '+' sign (%2B) prevents query string parser from treating it as a space
    const phone = '%2B251972691911';
    return message 
      ? `tg://resolve?phone=${phone}&text=${encodeURIComponent(message)}`
      : `tg://resolve?phone=${phone}`;
  }
};

/**
 * Launches the installed Telegram desktop or mobile application.
 * 
 * Strategy:
 * 1. Sandboxed Iframe (e.g. AI Studio preview):
 *    Direct navigation to custom URI schemes (tg://) is blocked by browser iframe sandboxing.
 *    Opening the official Telegram link (https://t.me/+251972691911) in a top-level tab
 *    bypasses the sandbox and triggers the browser's native "Open Telegram Desktop?" prompt.
 * 2. Top-Level Context (standalone browser tab or mobile):
 *    Directly navigates to the tg:// scheme to immediately invoke the installed Telegram app.
 *    If the window doesn't blur within 1.2s (e.g. app not installed or protocol blocked),
 *    it gracefully falls back to the official t.me universal link.
 */
export const openTelegramApp = (message?: string) => {
  if (typeof window === 'undefined') return;

  const phoneDigits = '251972691911';
  const encodedPhone = '%2B' + phoneDigits;
  const encodedText = message ? encodeURIComponent(message) : '';

  // Direct native Telegram URI scheme for desktop and mobile apps
  const tgScheme = encodedText
    ? `tg://resolve?phone=${encodedPhone}&text=${encodedText}`
    : `tg://resolve?phone=${encodedPhone}`;

  // Official Telegram Universal Link that prompts the OS to launch Telegram app
  const tmeUrl = encodedText
    ? `https://t.me/+${phoneDigits}?text=${encodedText}`
    : `https://t.me/+${phoneDigits}`;

  // Detect if running inside an iframe
  let isInIframe = false;
  try {
    isInIframe = window.self !== window.top;
  } catch {
    isInIframe = true;
  }

  if (isInIframe) {
    window.open(tmeUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Top-level browser context (standalone tab or mobile device)
  let appOpened = false;
  const handleBlur = () => {
    appOpened = true;
  };
  window.addEventListener('blur', handleBlur, { once: true });

  try {
    window.location.href = tgScheme;
  } catch {
    window.open(tmeUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Fallback: If Telegram app didn't open and document is still focused after 1200ms
  setTimeout(() => {
    window.removeEventListener('blur', handleBlur);
    if (!appOpened && document.hasFocus()) {
      window.open(tmeUrl, '_blank', 'noopener,noreferrer');
    }
  }, 1200);
};
