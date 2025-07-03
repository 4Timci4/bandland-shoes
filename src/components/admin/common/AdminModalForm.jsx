import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import { storageService } from '../../../services/storageService';
import { productService } from '../../../services/productService';
import TipTapEditor from '../../common/TipTapEditor';

function AdminModalForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  fields,
  title,
}) {
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [baseProduct, setBaseProduct] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const initialFormData = initialData || {};
    setFormData(initialFormData);
    setBaseProduct(null);
    if (initialData && initialData.image_url) {
      setPreview(initialData.image_url);
    } else {
      setPreview(null);
    }
    setSelectedFile(null);
  }, [initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setSelectedFile(file);
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleBaseSkuBlur = async (e) => {
    const baseSku = e.target.value;
    if (!baseSku) {
      setFormData((prev) => ({ ...prev, name: '', description: '' }));
      setBaseProduct(null);
      return;
    }

    try {
      const foundBaseProduct = await productService.getBaseProductBySku(baseSku);
      if (foundBaseProduct) {
        setBaseProduct(foundBaseProduct);
        setFormData((prev) => ({
          ...prev,
          name: foundBaseProduct.name,
          description: foundBaseProduct.description || '',
        }));
      } else {
        alert('Bu SKU ile bir ana ürün bulunamadı.');
        setFormData((prev) => ({ ...prev, name: '', description: '' }));
        setBaseProduct(null);
      }
    } catch (error) {
      console.error('Ana ürün getirilirken hata:', error);
      alert('Ana ürün getirilirken bir hata oluştu.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fields.some(f => f.name === 'base_sku') && !baseProduct && !initialData) {
      alert("Lütfen geçerli bir Ana Ürün SKU'su girerek bir ana ürün seçin.");
      return;
    }

    const imageField = fields.find((f) => f.name === 'image_url');
    if (!initialData && imageField?.required && !selectedFile) {
      alert('Lütfen bir resim dosyası seçin.');
      return;
    }

    setIsUploading(true);
    let finalData = { ...formData };

    if (baseProduct && !initialData) {
      finalData.base_product_id = baseProduct.id;
    }

    try {
      if (selectedFile) {
        const imageUrl = await storageService.uploadFile(selectedFile);
        finalData = { ...finalData, image_url: imageUrl };
      }

      await onSubmit(finalData);
    } catch (error) {
      console.error('Form submit error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="admin-modal">
      <div className="admin-modal__content">
        <div className="admin-modal__header">
          <h2>{title}</h2>
          <button className="admin-modal__close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {fields.map(({ name, label, type = 'text', ...props }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              {name === 'content' ? (
                <div className="tiptap-container" style={{ minHeight: '300px' }}>
                  <TipTapEditor
                    value={formData[name] || ''}
                    onChange={handleContentChange}
                    placeholder="İçerik yazın..."
                  />
                </div>
              ) : type === 'textarea' ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  {...props}
                />
              ) : type === 'checkbox' ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={!!formData[name]}
                    onChange={handleChange}
                    {...props}
                  />
                  {props.checkboxLabel || 'Aktif'}
                </label>
              ) : type === 'file' ? (
                <div className="file-input-group">
                  <input
                    type="file"
                    id={name}
                    name={name}
                    accept="image/*"
                    onChange={handleChange}
                    {...props}
                  />
                  {preview && (
                    <div className="image-preview">
                      <img src={preview} alt="Önizleme" />
                    </div>
                  )}
                </div>
              ) : type === 'select' ? (
                <select
                  id={name}
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  {...props}
                >
                  <option value="" disabled>
                    Seçiniz...
                  </option>
                  {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  onBlur={name === 'base_sku' ? handleBaseSkuBlur : null}
                  {...props}
                />
              )}
              {props.description && (
                <p className="form-group-description">{props.description}</p>
              )}
            </div>
          ))}
          <div className="form-actions">
            <button
              type="button"
              className="admin-btn admin-btn-cancel"
              onClick={onClose}
            >
              <FaTimes /> İptal
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isUploading}
            >
              {isUploading ? <FaSpinner className="spinner" /> : <FaSave />}
              {isUploading
                ? 'Yükleniyor...'
                : initialData
                  ? 'Güncelle'
                  : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminModalForm;
