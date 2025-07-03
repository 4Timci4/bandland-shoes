import React from 'react';
import { FaImages, FaBlog } from 'react-icons/fa';
import { useCrud } from '../../hooks/useCrud';
import { sliderService } from '../../services/supabaseSliderService';
import AdminPage from '../../components/admin/common/AdminPage';
import AdminTable from '../../components/admin/common/AdminTable';
import AdminModalForm from '../../components/admin/common/AdminModalForm';
import { formatDate } from '../../utils/date';

const ManageSlider = () => {
  const {
    items: slides,
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
  } = useCrud(sliderService, {}, 'Slider');

  const handleMove = async (id, direction) => {
    const currentIndex = slides.findIndex(s => s.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= slides.length) {
      return;
    }

    const currentItem = slides[currentIndex];
    const targetItem = slides[targetIndex];

    try {
      await sliderService.update(currentItem.id, { ...currentItem, order: targetItem.order });
      await sliderService.update(targetItem.id, { ...targetItem, order: currentItem.order });
      await loadItems();
    } catch (err) {
        // setError'u burada kullanabilirsiniz
        console.error('Sıralama hatası:', err);
    }
  };

  const columns = [
    {
      key: 'image_url',
      header: 'Görsel',
      render: (item) => <img src={item.image_url} alt={`Slider ${item.id}`} className="slider-thumbnail" />,
    },
    { key: 'order', header: 'Sıra', className: 'col-order' },
    {
      key: 'is_active',
      header: 'Durum',
      render: (item) => (
        <span className={`status-badge ${item.is_active ? 'active' : 'inactive'}`}>
          {item.is_active ? 'Aktif' : 'Pasif'}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Oluşturulma',
      render: (item) => formatDate(item.created_at),
    },
  ];

  const formFields = [
    { name: 'image_url', label: 'Görsel', type: 'file', required: true },
    { name: 'order', label: 'Sıra', type: 'number', required: true },
    { name: 'is_active', label: 'Aktif', type: 'checkbox' },
  ];

  return (
    <AdminPage
      title="Slider Yönetimi"
      subtitle="Slider içeriklerini ekleyin, düzenleyin veya silin."
      icon={FaImages}
      onAddNew={() => openModal()}
      isLoading={isLoading}
    >
      <AdminTable
        columns={columns}
        items={slides}
        isLoading={isLoading}
        error={error}
        resourceName="slider"
        onEdit={(item) => openModal(item)}
        onDelete={handleDelete}
        onStatusToggle={handleStatusToggle}
        onMove={handleMove}
      />
      <AdminModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingItem}
        fields={formFields}
        title={editingItem ? 'Slider Düzenle' : 'Yeni Slider Ekle'}
      />
    </AdminPage>
  );
};

export default ManageSlider;