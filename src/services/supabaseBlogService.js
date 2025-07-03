import { supabase } from '../lib/supabase';

// Tüm blog yazılarını getir
export const getAllBlogs = async () => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Blog verileri alınırken hata oluştu:', error);
    throw error;
  }
};

// Belirli bir blog yazısını getir
export const getBlogById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    // Frontend için alan adlarını dönüştür
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      imageUrl: data.image_url,
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Blog verisi alınırken hata oluştu:', error);
    throw error;
  }
};

// Yeni blog yazısı ekle
export const createBlog = async (blogData) => {
  try {
    // Artık dönüşüme gerek yok.
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;

    // Frontend için alan adlarını dönüştür
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      imageUrl: data.image_url,
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Blog eklenirken hata oluştu:', error);
    throw error;
  }
};

// Blog yazısını güncelle
export const updateBlog = async (id, blogData) => {
  try {
    // Artık dönüşüme gerek yok.
    const { data, error } = await supabase
      .from('blogs')
      .update(blogData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Frontend için alan adlarını dönüştür
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      imageUrl: data.image_url,
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Blog güncellenirken hata oluştu:', error);
    throw error;
  }
};

// Blog yazısını sil
export const deleteBlog = async (id) => {
  try {
    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Blog silinirken hata oluştu:', error);
    throw error;
  }
};

// Yayınlanmış blog yazılarını getir (frontend için)
export const getPublishedBlogs = async () => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    // Frontend için alan adlarını dönüştür
    return data.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      imageUrl: blog.image_url,
      isPublished: blog.is_published,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
    }));
  } catch (error) {
    console.error('Yayınlanmış blog verileri alınırken hata oluştu:', error);
    throw error;
  }
};

// Service objesi
export const blogService = {
  getAll: getAllBlogs,
  getById: getBlogById,
  create: createBlog,
  update: updateBlog,
  delete: deleteBlog,
  getPublished: getPublishedBlogs,
};
