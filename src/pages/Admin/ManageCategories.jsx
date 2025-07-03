import React, { useState, useEffect } from 'react';
import { FaSitemap, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { categoryService } from '../../services/categoryService';
import AdminPage from '../../components/admin/common/AdminPage';
import AdminModalForm from '../../components/admin/common/AdminModalForm';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState('category'); // 'category' or 'subCategory'

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await categoryService.getCategoriesWithSubCategories();
      setCategories(data);
    } catch (err) {
      setError('Kategoriler yüklenirken hata oluştu: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalType === 'category') {
        if (editingItem) {
          await categoryService.updateCategory(editingItem.id, formData);
        } else {
          await categoryService.createCategory(formData);
        }
      } else { // subCategory
        const payload = { ...formData, category_id: editingItem.category_id };
        if (editingItem && editingItem.id) {
          await categoryService.updateSubCategory(editingItem.id, payload);
        } else {
          await categoryService.createSubCategory(payload);
        }
      }
      await loadCategories();
      closeModal();
    } catch (err) {
      setError(`İşlem sırasında hata oluştu: ${err.message}`);
    }
  };

  const handleDelete = async (type, id) => {
      const confirmationText = type === 'category' 
          ? "Bu ana kategoriyi silmek, bağlı tüm alt kategorileri ve ürünleri de etkileyebilir. Emin misiniz?"
          : "Bu alt kategoriyi silmek, bağlı ürünleri de etkileyebilir. Emin misiniz?";

      if (window.confirm(confirmationText)) {
          try {
              if (type === 'category') {
                  await categoryService.deleteCategory(id);
              } else {
                  await categoryService.deleteSubCategory(id);
              }
              await loadCategories();
          } catch(err) {
              setError(`Silme işlemi başarısız: ${err.message}`);
          }
      }
  };

  const categoryFormFields = [
    { name: 'name', label: 'Kategori Adı', required: true },
  ];
  const subCategoryFormFields = [
    { name: 'name', label: 'Alt Kategori Adı', required: true },
  ];
  
  return (
    <AdminPage
      title="Kategori Yönetimi"
      subtitle="Ana ve alt kategorileri yönetin."
      icon={FaSitemap}
      onAddNew={() => openModal('category')}
      isLoading={isLoading}
    >
      <div className="category-management">
        {isLoading && <div className="admin-loading">Yükleniyor...</div>}
        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        {categories.map(category => (
          <div key={category.id} className="category-group">
            <div className="category-group__header">
              <h3 className="category-group__title">{category.name}</h3>
              <div className="category-group__actions">
                <button onClick={() => openModal('category', category)} className="admin-btn admin-btn-action"><FaEdit/> Düzenle</button>
                <button onClick={() => handleDelete('category', category.id)} className="admin-btn admin-btn-action admin-btn-danger"><FaTrash/> Sil</button>
              </div>
            </div>
            <ul className="subcategory-list">
              {category.sub_categories.map(sub => (
                <li key={sub.id} className="subcategory-item">
                  <span>{sub.name}</span>
                  <div className="subcategory-item__actions">
                    <button onClick={() => openModal('subCategory', sub)} className="admin-btn admin-btn-action"><FaEdit/></button>
                    <button onClick={() => handleDelete('subCategory', sub.id)} className="admin-btn admin-btn-action admin-btn-danger"><FaTrash/></button>
                  </div>
                </li>
              ))}
              <li className="subcategory-item subcategory-item--add">
                 <button onClick={() => openModal('subCategory', { category_id: category.id })} className="admin-btn">
                     <FaPlus/> Yeni Alt Kategori Ekle
                 </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <AdminModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingItem}
        fields={modalType === 'category' ? categoryFormFields : subCategoryFormFields}
        title={
            editingItem 
                ? `${modalType === 'category' ? 'Kategori' : 'Alt Kategori'} Düzenle` 
                : `Yeni ${modalType === 'category' ? 'Kategori' : 'Alt Kategori'} Ekle`
        }
      />
    </AdminPage>
  );
};

export default ManageCategories;