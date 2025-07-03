import React, { useState, useEffect, useMemo } from 'react';
import { FaBoxes, FaSearch } from 'react-icons/fa';
import { useCrud } from '../../hooks/useCrud';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { colorService } from '../../services/colorService';
import AdminPage from '../../components/admin/common/AdminPage';
import AdminTable from '../../components/admin/common/AdminTable';
import AdminModalForm from '../../components/admin/common/AdminModalForm';

const ManageProducts = () => {
  const {
    items: products,
    isLoading,
    error,
    isModalOpen,
    editingItem,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = useCrud(productService, {}, 'Ürün');

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      const [cats, colorData] = await Promise.all([
        categoryService.getCategoriesWithSubCategories(),
        colorService.getAll(),
      ]);
      setCategories(cats);
      setColors(colorData);
    };
    loadInitialData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory === 'all') return true;
        const [catId, subCatId] = selectedCategory.split('-');
        if (subCatId) {
          return product.sub_category_id === parseInt(subCatId, 10);
        }
        const subCategoriesOfCat = categories
          .find((c) => c.id === parseInt(catId, 10))
          ?.sub_categories.map((sc) => sc.id);
        return subCategoriesOfCat?.includes(product.sub_category_id);
      })
      .filter((product) => {
        if (selectedColor === 'all') return true;
        return product.color_id === parseInt(selectedColor, 10);
      })
      .filter((product) => {
        const term = searchTerm.toLowerCase();
        // base_sku null veya undefined olabilir, bu yüzden kontrol ekliyoruz.
        const baseSkuMatch = product.base_sku
          ? product.base_sku.toLowerCase().includes(term)
          : false;
        return (
          product.name.toLowerCase().includes(term) ||
          product.sku.toLowerCase().includes(term) ||
          baseSkuMatch
        );
      });
  }, [products, selectedCategory, selectedColor, searchTerm, categories]);

  const columns = [
    { key: 'name', header: 'Ürün Adı', className: 'col-name' },
    {
      key: 'base_sku',
      header: 'Ana SKU',
      render: (item) => item.base_sku || 'N/A',
      className: 'col-base-sku',
    },
    { key: 'sku', header: 'Varyant SKU', className: 'col-sku' },
    {
      key: 'price',
      header: 'Fiyat',
      render: (item) => `${item.price} ₺`,
      className: 'col-price',
    },
    { key: 'stock_quantity', header: 'Stok', className: 'col-stock' },
    {
      key: 'category',
      header: 'Kategori',
      render: (item) => {
        const subCategory = categories
          .flatMap((c) => c.sub_categories)
          .find((sc) => sc.id === item.sub_category_id);
        const category = subCategory
          ? categories.find((c) => c.id === subCategory.category_id)
          : null;
        return category ? `${category.name} > ${subCategory.name}` : 'N/A';
      },
    },
    {
      key: 'color',
      header: 'Renk',
      render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: item.color_hex_code,
              border: '1px solid #ccc',
            }}
          ></span>
          {item.color_name || 'N/A'}
        </div>
      ),
      className: 'col-color',
    },
  ];

  const getSubCategoryOptions = () => {
    return categories.flatMap((cat) =>
      cat.sub_categories.map((sub) => ({
        value: sub.id,
        label: `${cat.name} > ${sub.name}`,
      }))
    );
  };

  const formFields = [
    {
      name: 'base_sku',
      label: 'Ana Ürün SKU',
      required: true,
      description: "Bu SKU'ya sahip bir ana ürün sistemde mevcut olmalı.",
    },
    { name: 'name', label: 'Ürün Adı', required: true, disabled: true },
    { name: 'sku', label: 'Varyant SKU (Stok Kodu)', required: true },
    { name: 'description', label: 'Açıklama', type: 'textarea', rows: 4 },
    {
      name: 'price',
      label: 'Fiyat (₺)',
      type: 'number',
      required: true,
      step: '0.01',
    },
    {
      name: 'stock_quantity',
      label: 'Stok Adedi',
      type: 'number',
      required: true,
    },
    { name: 'image_url', label: 'Görsel', type: 'file' },
    {
      name: 'sub_category_id',
      label: 'Kategori',
      type: 'select',
      options: getSubCategoryOptions(),
      required: true,
    },
    {
      name: 'color_id',
      label: 'Renk',
      type: 'select',
      options: colors.map((c) => ({ value: c.id, label: c.name })),
      required: true,
    },
  ];

  return (
    <AdminPage
      title="Ürün Yönetimi"
      subtitle="Ürünleri filtreleyin, arayın, ekleyin veya düzenleyin."
      icon={FaBoxes}
      onAddNew={() => openModal()}
      isLoading={isLoading}
    >
      <div className="product-filters">
        <div className="filter-group">
          <label htmlFor="category-filter">Kategoriye Göre Filtrele</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map((cat) => (
              <optgroup key={cat.id} label={cat.name}>
                <option value={`${cat.id}`}>{cat.name} (Tümü)</option>
                {cat.sub_categories.map((sub) => (
                  <option key={sub.id} value={`${cat.id}-${sub.id}`}>
                    {sub.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="color-filter">Renge Göre Filtrele</label>
          <select
            id="color-filter"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="all">Tüm Renkler</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group filter-group--search">
          <label htmlFor="search-filter">Ara (Ürün Adı, Ana/Varyant SKU)</label>
          <div className="search-input">
            <FaSearch />
            <input
              type="text"
              id="search-filter"
              placeholder="Arama yapın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <AdminTable
        columns={columns}
        items={filteredProducts}
        isLoading={isLoading}
        error={error}
        resourceName="ürün"
        onEdit={(item) => openModal(item)}
        onDelete={handleDelete}
      />
      <AdminModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingItem}
        fields={formFields}
        title={editingItem ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
      />
    </AdminPage>
  );
};

export default ManageProducts;
