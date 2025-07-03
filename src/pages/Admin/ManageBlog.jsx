import React from 'react';
import { FaBlog } from 'react-icons/fa';
import { useCrud } from '../../hooks/useCrud';
import { blogService } from '../../services/supabaseBlogService';
import AdminPage from '../../components/admin/common/AdminPage';
import AdminTable from '../../components/admin/common/AdminTable';
import AdminModalForm from '../../components/admin/common/AdminModalForm';
import { formatDate } from '../../utils/date';

const ManageBlog = () => {
  const {
    items: blogs,
    isLoading,
    error,
    isModalOpen,
    editingItem,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
    handleStatusToggle,
  } = useCrud(blogService, {}, 'Blog');

  const columns = [
    {
      key: 'image_url',
      header: 'Görsel',
      render: (item) => <img src={item.image_url} alt={item.title} className="slider-thumbnail" />,
    },
    {
      key: 'title',
      header: 'Başlık',
    },
    {
      key: 'is_published',
      header: 'Durum',
      render: (item) => (
        <span className={`status-badge ${item.is_published ? 'active' : 'inactive'}`}>
          {item.is_published ? 'Yayında' : 'Taslak'}
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
    { name: 'title', label: 'Başlık', required: true },
    { name: 'excerpt', label: 'Özet', type: 'textarea', rows: 3 },
    { name: 'content', label: 'İçerik', type: 'textarea', rows: 10, required: true },
    { name: 'image_url', label: 'Görsel', type: 'file', required: true },
    { name: 'is_published', label: 'Yayınla', type: 'checkbox' },
  ];

  return (
    <AdminPage
      title="Blog Yönetimi"
      subtitle="Blog yazılarını ekleyin, düzenleyin veya silin."
      icon={FaBlog}
      onAddNew={() => openModal()}
      isLoading={isLoading}
    >
      <AdminTable
        columns={columns}
        items={blogs}
        isLoading={isLoading}
        error={error}
        resourceName="blog yazısı"
        onEdit={(item) => openModal(item)}
        onDelete={handleDelete}
        onStatusToggle={handleStatusToggle}
      />
      <AdminModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingItem}
        fields={formFields}
        title={editingItem ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}
      />
    </AdminPage>
  );
};

export default ManageBlog;