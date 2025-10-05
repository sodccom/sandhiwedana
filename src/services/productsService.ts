import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const productsService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data.map(product => ({
      id: product.id,
      name_si: product.name_si,
      name_en: product.name_en,
      slug: product.slug,
      description_si: product.description_si,
      description_en: product.description_en,
      price_lkr: Number(product.price_lkr),
      stock: product.stock,
      images: Array.isArray(product.images) ? product.images as string[] : [],
      created_at: product.created_at,
      updated_at: product.updated_at,
      featured: product.featured,
    }));
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name_si: data.name_si,
      name_en: data.name_en,
      slug: data.slug,
      description_si: data.description_si,
      description_en: data.description_en,
      price_lkr: Number(data.price_lkr),
      stock: data.stock,
      images: Array.isArray(data.images) ? data.images as string[] : [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      featured: data.featured,
    };
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .or(`name_en.ilike.%${query}%,name_si.ilike.%${query}%,description_en.ilike.%${query}%`)
      .order('featured', { ascending: false });

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data.map(product => ({
      id: product.id,
      name_si: product.name_si,
      name_en: product.name_en,
      slug: product.slug,
      description_si: product.description_si,
      description_en: product.description_en,
      price_lkr: Number(product.price_lkr),
      stock: product.stock,
      images: Array.isArray(product.images) ? product.images as string[] : [],
      created_at: product.created_at,
      updated_at: product.updated_at,
      featured: product.featured,
    }));
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name_en: product.name_en,
        name_si: product.name_si,
        slug: product.slug,
        description_en: product.description_en,
        description_si: product.description_si,
        price_lkr: product.price_lkr,
        stock: product.stock,
        images: product.images,
        featured: product.featured,
        active: true,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating product:', error);
      return null;
    }

    return {
      id: data.id,
      name_si: data.name_si,
      name_en: data.name_en,
      slug: data.slug,
      description_si: data.description_si,
      description_en: data.description_en,
      price_lkr: Number(data.price_lkr),
      stock: data.stock,
      images: Array.isArray(data.images) ? data.images as string[] : [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      featured: data.featured,
    };
  },

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...(updates.name_en && { name_en: updates.name_en }),
        ...(updates.name_si && { name_si: updates.name_si }),
        ...(updates.slug && { slug: updates.slug }),
        ...(updates.description_en && { description_en: updates.description_en }),
        ...(updates.description_si && { description_si: updates.description_si }),
        ...(updates.price_lkr !== undefined && { price_lkr: updates.price_lkr }),
        ...(updates.stock !== undefined && { stock: updates.stock }),
        ...(updates.images && { images: updates.images }),
        ...(updates.featured !== undefined && { featured: updates.featured }),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating product:', error);
      return null;
    }

    return {
      id: data.id,
      name_si: data.name_si,
      name_en: data.name_en,
      slug: data.slug,
      description_si: data.description_si,
      description_en: data.description_en,
      price_lkr: Number(data.price_lkr),
      stock: data.stock,
      images: Array.isArray(data.images) ? data.images as string[] : [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      featured: data.featured,
    };
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }

    return true;
  },
};
