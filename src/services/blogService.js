import { fetchData, postData, updateData, deleteData } from './api';

// Tüm blog yazılarını getir
export const getAllBlogs = async () => {
  try {
    const response = await fetchData('blogs');
    return response.data;
  } catch (error) {
    console.error('Blog verileri alınırken hata oluştu:', error);
    throw error;
  }
};

// Belirli bir blog yazısını getir
export const getBlogById = async (id) => {
  try {
    const response = await fetchData(`blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Blog verisi alınırken hata oluştu:', error);
    throw error;
  }
};

// Yeni blog yazısı ekle
export const createBlog = async (blogData) => {
  try {
    const response = await postData('blogs', blogData);
    return response.data;
  } catch (error) {
    console.error('Blog eklenirken hata oluştu:', error);
    throw error;
  }
};

// Blog yazısı güncelle
export const updateBlog = async (id, blogData) => {
  try {
    const response = await updateData('blogs', id, blogData);
    return response.data;
  } catch (error) {
    console.error('Blog güncellenirken hata oluştu:', error);
    throw error;
  }
};

// Blog yazısı sil
export const deleteBlog = async (id) => {
  try {
    const response = await deleteData('blogs', id);
    return response.data;
  } catch (error) {
    console.error('Blog silinirken hata oluştu:', error);
    throw error;
  }
};
