import { supabase } from '../lib/supabase';

export const categoryService = {
  async getCategoriesWithSubCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        created_at,
        sub_categories (
          id,
          name,
          category_id,
          created_at
        )
      `)
      .order('name', { ascending: true });

    if (error) {
      console.error('Kategoriler ve alt kategoriler alınırken hata oluştu:', error);
      throw error;
    }

    return data;
  },

  // Ana Kategori CRUD
  async createCategory(categoryData) {
    const { data, error } = await supabase.from('categories').insert(categoryData).select().single();
    if (error) throw error;
    return data;
  },
  async updateCategory(id, categoryData) {
    const { data, error } = await supabase.from('categories').update(categoryData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteCategory(id) {
    const { data, error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return data;
  },

  // Alt Kategori CRUD
  async createSubCategory(subCategoryData) {
    const { data, error } = await supabase.from('sub_categories').insert(subCategoryData).select().single();
    if (error) throw error;
    return data;
  },
  async updateSubCategory(id, subCategoryData) {
    const { data, error } = await supabase.from('sub_categories').update(subCategoryData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteSubCategory(id) {
    const { data, error } = await supabase.from('sub_categories').delete().eq('id', id);
    if (error) throw error;
    return data;
  },
};