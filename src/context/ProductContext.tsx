import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface ProductContextProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  // Aliases for compatibility
  isLoading: boolean;
  dbError: string | null;
  isDbConnected: boolean;
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<Product>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  importProducts: (newProducts: Product[]) => boolean;
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const STORAGE_KEY = 'chemical_catalog_products';

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Helper to normalize any category string from database to category IDs used across the UI
function normalizeCategory(rawCat?: string): string {
  if (!rawCat) return 'industrial';
  const c = String(rawCat).toLowerCase().trim();
  if (c.includes('detergent') || c.includes('soap') || c.includes('cleaning') || c.includes('sles') || c.includes('labsa')) return 'detergent';
  if (c.includes('cosmetic') || c.includes('beauty') || c.includes('personal') || c.includes('skincare')) return 'cosmetic';
  if (c.includes('food') || c.includes('beverage') || c.includes('additive') || c.includes('preservative')) return 'food';
  if (c.includes('lab') || c.includes('reagent') || c.includes('analytical')) return 'laboratory';
  if (c.includes('water')) return 'watertreatment';
  if (c.includes('agri') || c.includes('agro')) return 'agriculture';
  if (c.includes('industrial') || c.includes('chemical')) return 'industrial';
  return c;
}

// Helper to get fallback category-matched chemical imagery if not specified
function getProductImage(row: any, slug: string, name: string, category: string): string {
  if (row.image && typeof row.image === 'string' && row.image.trim().length > 5) {
    return row.image;
  }
  if (row.image_url && typeof row.image_url === 'string' && row.image_url.trim().length > 5) {
    return row.image_url;
  }
  if (row.photo && typeof row.photo === 'string' && row.photo.trim().length > 5) {
    return row.photo;
  }
  
  // High quality curated chemical industry imagery
  const n = name.toLowerCase();
  if (n.includes('labsa') || n.includes('sulfonic')) {
    return 'https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&w=800&q=80';
  }
  if (n.includes('sles') || n.includes('ether sulfate') || n.includes('lauryl sulfate') || n.includes('sls')) {
    return 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80';
  }
  if (n.includes('glycerin') || n.includes('glycerol')) {
    return 'https://images.unsplash.com/photo-1608248597359-598d9cb63ca5?auto=format&fit=crop&w=800&q=80';
  }
  if (n.includes('stearic') || n.includes('acid')) {
    return 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80';
  }
  if (n.includes('caustic') || n.includes('hydroxide') || n.includes('flakes')) {
    return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
  }
  if (n.includes('citric') || n.includes('benzoate')) {
    return 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80';
  }
  if (n.includes('peroxide') || n.includes('bleach')) {
    return 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=80';
  }

  // Fallback by category
  if (category === 'detergent') {
    return 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80';
  }
  if (category === 'cosmetic') {
    return 'https://images.unsplash.com/photo-1608248597359-598d9cb63ca5?auto=format&fit=crop&w=800&q=80';
  }
  if (category === 'food') {
    return 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80';
  }
  return 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80';
}

// Helper to normalize Supabase DB row to application Product interface
function mapRowToProduct(row: any): Product {
  const name = row.name || row.title || row.product_name || row.chemical_name || 'Unnamed Product';
  const rawCategory = row.category || row.short_category || row.type || row.chemical_type || 'industrial';
  const category = normalizeCategory(rawCategory);
  const id = String(row.id || row._id || Math.random().toString(36).substring(2, 9));
  const slug = row.slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : id);
  const image = getProductImage(row, slug, name, category);
  
  let specifications: string[] = [];
  if (Array.isArray(row.specifications)) {
    specifications = row.specifications.map((s: any) => {
      if (typeof s === 'string') return s;
      if (s && typeof s === 'object') {
        if (s.label && s.value) return `${s.label}: ${s.value}`;
        return JSON.stringify(s);
      }
      return String(s);
    });
  } else if (typeof row.specifications === 'string') {
    try {
      const parsed = JSON.parse(row.specifications);
      if (Array.isArray(parsed)) {
        specifications = parsed.map((s: any) => typeof s === 'string' ? s : `${s.label || ''}: ${s.value || ''}`);
      } else if (parsed && typeof parsed === 'object') {
        specifications = Object.entries(parsed).map(([k, v]) => `${k}: ${v}`);
      }
    } catch {
      specifications = row.specifications ? [row.specifications] : [];
    }
  } else if (row.specifications && typeof row.specifications === 'object') {
    specifications = Object.entries(row.specifications).map(([label, value]) => `${label}: ${value}`);
  }

  // Supplement specifications with grade, purity, CAS number if present and not already in specs
  if (row.purity && !specifications.some(s => s.toLowerCase().includes('purity') || s.toLowerCase().includes('assay'))) {
    specifications.unshift(`Purity: ${row.purity}`);
  }
  if (row.grade && !specifications.some(s => s.toLowerCase().includes('grade'))) {
    specifications.push(`Grade: ${row.grade}`);
  }
  if (row.cas_number && !specifications.some(s => s.toLowerCase().includes('cas'))) {
    specifications.push(`CAS No: ${row.cas_number}`);
  }

  let usage = row.usage;
  if (!usage && Array.isArray(row.applications) && row.applications.length > 0) {
    usage = row.applications.join(', ');
  } else if (!usage && typeof row.applications === 'string') {
    usage = row.applications;
  }

  return {
    id,
    name,
    category,
    description: row.description || row.desc || row.details || '',
    slug,
    image,
    specifications,
    usage: usage || undefined,
    benefits: row.benefits || row.features || undefined,
    packaging: row.packaging || row.package || undefined,
    casNumber: row.cas_number || row.casNumber || undefined,
    grade: row.grade || undefined,
    purity: row.purity || undefined,
    formula: row.formula || undefined,
    relatedProductSlugs: row.related_product_slugs || row.relatedProductSlugs || undefined,
    isCustom: Boolean(row.is_custom ?? row.is_custom_added ?? false),
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  };
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Replace hardcoded initial products with dynamic state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from supabase 'products' table
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (supabase && isSupabaseConfigured) {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          const formatted = data.map(mapRowToProduct);
          setProducts(formatted);
        }
      } else {
        // Fallback only when Supabase credentials are missing completely
        setProducts([]);
      }
    } catch (err: any) {
      console.error('Error fetching products from Supabase:', err);
      const errMsg = err?.message || 'Failed to fetch products from the database';
      setError(errMsg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect hook to fetch products on mount and subscribe to realtime updates
  useEffect(() => {
    fetchProducts();

    if (supabase && isSupabaseConfigured) {
      const channel = supabase
        .channel('public:products')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          () => {
            fetchProducts();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [fetchProducts]);

  // Sync to local cache whenever products change
  useEffect(() => {
    if (products.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (e) {
        console.error('Failed to persist products to cache', e);
      }
    }
  }, [products]);

  const addProduct = async (productData: Omit<Product, 'id'> & { id?: string }): Promise<Product> => {
    const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...productData,
      id: productData.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      slug,
      isCustom: true,
      createdAt: productData.createdAt || new Date().toISOString()
    };

    setProducts(prev => [newProduct, ...prev]);

    if (supabase && isSupabaseConfigured) {
      try {
        const { error: insertError } = await supabase.from('products').insert([
          {
            id: newProduct.id.startsWith('prod_') ? undefined : newProduct.id,
            name: newProduct.name,
            category: newProduct.category,
            description: newProduct.description,
            slug: newProduct.slug,
            image: newProduct.image,
            specifications: newProduct.specifications,
            usage: newProduct.usage,
            benefits: newProduct.benefits,
            packaging: newProduct.packaging,
            is_custom: true
          }
        ]);
        if (insertError) {
          console.warn('Could not insert to remote DB:', insertError.message);
        }
      } catch (e) {
        console.error('Remote DB insert failed', e);
      }
    }

    return newProduct;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    let targetProduct: Product | undefined;

    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.name && (!updatedFields.slug || updatedFields.slug === p.slug)) {
            updated.slug = updatedFields.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          targetProduct = updated;
          return updated;
        }
        return p;
      })
    );

    if (supabase && isSupabaseConfigured && targetProduct) {
      try {
        const updatePayload: Record<string, any> = {};
        if (updatedFields.name !== undefined) updatePayload.name = updatedFields.name;
        if (updatedFields.category !== undefined) updatePayload.category = updatedFields.category;
        if (updatedFields.description !== undefined) updatePayload.description = updatedFields.description;
        if (updatedFields.slug !== undefined) updatePayload.slug = updatedFields.slug;
        if (updatedFields.image !== undefined) updatePayload.image = updatedFields.image;
        if (updatedFields.specifications !== undefined) updatePayload.specifications = updatedFields.specifications;
        if (updatedFields.usage !== undefined) updatePayload.usage = updatedFields.usage;
        if (updatedFields.benefits !== undefined) updatePayload.benefits = updatedFields.benefits;
        if (updatedFields.packaging !== undefined) updatePayload.packaging = updatedFields.packaging;

        const { data, error: updateError } = await supabase
          .from('products')
          .update(updatePayload)
          .eq('id', id)
          .select();

        // If row not found in remote DB, insert it with full details
        if (!updateError && (!data || data.length === 0)) {
          await supabase.from('products').upsert([
            {
              id: targetProduct.id,
              name: targetProduct.name,
              category: targetProduct.category,
              description: targetProduct.description,
              slug: targetProduct.slug,
              image: targetProduct.image,
              specifications: targetProduct.specifications,
              usage: targetProduct.usage,
              benefits: targetProduct.benefits,
              packaging: targetProduct.packaging,
              is_custom: true
            }
          ]);
        }
      } catch (e) {
        console.error('Remote DB update failed', e);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (e) {
        console.error('Remote DB delete failed', e);
      }
    }
  };

  const resetToDefaults = async () => {
    setProducts(PRODUCTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
    } catch (e) {
      console.error('Failed to reset products in localStorage', e);
    }
  };

  const importProducts = (newProducts: Product[]): boolean => {
    if (!Array.isArray(newProducts) || newProducts.length === 0) {
      return false;
    }
    const valid = newProducts.every(p => p && typeof p.name === 'string' && typeof p.category === 'string');
    if (!valid) return false;

    setProducts(newProducts);
    return true;
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        isLoading: loading,
        dbError: error,
        isDbConnected: isSupabaseConfigured,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
        importProducts,
        getProductById,
        refreshProducts: fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
