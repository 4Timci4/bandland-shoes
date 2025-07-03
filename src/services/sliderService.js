import { fetchData, postData, updateData, deleteData } from './api';

// Tüm slider'ları getir
export const getAllSlides = async () => {
  try {
    const response = await fetchData('slides');
    return response.data;
  } catch (error) {
    console.error('Slider verileri alınırken hata oluştu:', error);
    throw error;
  }
};

// Belirli bir slider'ı getir
export const getSlideById = async (id) => {
  try {
    const response = await fetchData(`slides/${id}`);
    return response.data;
  } catch (error) {
    console.error('Slider verisi alınırken hata oluştu:', error);
    throw error;
  }
};

// Yeni slider ekle
export const createSlide = async (slideData) => {
  try {
    const response = await postData('slides', slideData);
    return response.data;
  } catch (error) {
    console.error('Slider eklenirken hata oluştu:', error);
    throw error;
  }
};

// Slider güncelle
export const updateSlide = async (id, slideData) => {
  try {
    const response = await updateData('slides', id, slideData);
    return response.data;
  } catch (error) {
    console.error('Slider güncellenirken hata oluştu:', error);
    throw error;
  }
};

// Slider sil
export const deleteSlide = async (id) => {
  try {
    const response = await deleteData('slides', id);
    return response.data;
  } catch (error) {
    console.error('Slider silinirken hata oluştu:', error);
    throw error;
  }
};