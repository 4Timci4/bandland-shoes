import { supabase } from '../lib/supabase';

// Tüm slider'ları getir
export const getAllSlides = async () => {
  try {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Slider verileri alınırken hata oluştu:', error);
    throw error;
  }
};

// Belirli bir slider'ı getir
export const getSlideById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    // Frontend için alan adlarını dönüştür
    return {
      id: data.id,
      imageUrl: data.image_url,
      order: data.order,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Slider verisi alınırken hata oluştu:', error);
    throw error;
  }
};

// Yeni slider ekle
export const createSlide = async (slideData) => {
  try {
    // Artık dönüşüme gerek yok, form doğrudan doğru formatı gönderiyor.
    const { data, error } = await supabase
      .from('slides')
      .insert([slideData])
      .select()
      .single();

    if (error) throw error;

    // Frontend için alan adlarını dönüştür
    return {
      id: data.id,
      imageUrl: data.image_url,
      order: data.order,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Slider eklenirken hata oluştu:', error);
    throw error;
  }
};

// Slider güncelle
export const updateSlide = async (id, slideData) => {
  try {
    // Artık dönüşüme gerek yok.
    const { data, error } = await supabase
      .from('slides')
      .update(slideData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Frontend için alan adlarını dönüştür
    return {
      id: data.id,
      imageUrl: data.image_url,
      order: data.order,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Slider güncellenirken hata oluştu:', error);
    throw error;
  }
};

// Slider sil
export const deleteSlide = async (id) => {
  try {
    const { error } = await supabase.from('slides').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Slider silinirken hata oluştu:', error);
    throw error;
  }
};

// Aktif slider'ları getir (frontend için)
export const getActiveSlides = async () => {
  try {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true });

    if (error) throw error;
    // Frontend için alan adlarını dönüştür
    return data.map((slide) => ({
      id: slide.id,
      imageUrl: slide.image_url,
      order: slide.order,
      isActive: slide.is_active,
      createdAt: slide.created_at,
      updatedAt: slide.updated_at,
    }));
  } catch (error) {
    console.error('Aktif slider verileri alınırken hata oluştu:', error);
    throw error;
  }
};

// Service objesi
export const sliderService = {
  getAll: getAllSlides,
  getById: getSlideById,
  create: createSlide,
  update: updateSlide,
  delete: deleteSlide,
  getActive: getActiveSlides,
};
