
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  specifications?: string[];
  usage?: string;
  benefits?: string;
  slug: string;
  isCustom?: boolean;
  packaging?: string;
  casNumber?: string;
  grade?: string;
  purity?: string;
  formula?: string;
  relatedProductSlugs?: string[];
  createdAt?: string;
}

export interface Industry {
  title: string;
  icon: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  slug?: string;
}
