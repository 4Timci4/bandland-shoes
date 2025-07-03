import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

export function useCrud(service, initialFormState, resourceName) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await service.getAll();
      setItems(data);
      setError(null);
    } catch (err) {
      const errorMessage = `${resourceName} verileri yüklenirken hata oluştu: ${err.message}`;
      setError(errorMessage);
      console.error(`${resourceName} yükleme hatası:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [service, resourceName]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await service.update(editingItem.id, formData);
      } else {
        await service.create(formData);
      }
      await loadItems();
      closeModal();
    } catch (err) {
      const errorMessage = `İşlem sırasında hata oluştu: ${err.message}`;
      setError(errorMessage);
      console.error('Submit hatası:', err);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Bu ${resourceName} öğesini silmek istediğinizden emin misiniz?`
      )
    ) {
      try {
        // Silmeden önce item'ı bulup resim URL'ini al
        const itemToDelete = items.find((item) => item.id === id);
        const imageUrlToDelete = itemToDelete?.image_url;

        // 1. Veritabanından kaydı sil
        await service.delete(id);

        // 2. Eğer varsa, resmi Storage'dan sil
        if (imageUrlToDelete) {
          await storageService.deleteFile(imageUrlToDelete);
        }

        await loadItems();
      } catch (err) {
        const errorMessage = `Silme işlemi sırasında hata oluştu: ${err.message}`;
        setError(errorMessage);
        console.error('Silme hatası:', err);
      }
    }
  };

  const handleStatusToggle = async (item) => {
    try {
      const key = item.isActive !== undefined ? 'isActive' : 'isPublished';
      const newStatus = !item[key];
      await service.update(item.id, { ...item, [key]: newStatus });
      await loadItems();
    } catch (err) {
      setError(`Durum güncellenirken bir hata oluştu: ${err.message}`);
      console.error('Durum güncelleme hatası:', err);
    }
  };

  return {
    items,
    isLoading,
    error,
    isModalOpen,
    editingItem,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
    handleStatusToggle,
    loadItems,
  };
}
