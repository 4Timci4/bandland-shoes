import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaSave, FaSpinner } from 'react-icons/fa';
import { contactDetailsService } from '../../services/contactDetailsService';
import AdminPage from '../../components/admin/common/AdminPage';

function ManageContactDetails() {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        const data = await contactDetailsService.getContactDetails();
        setDetails(data);
      } catch (err) {
        setError('İletişim bilgileri yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await contactDetailsService.updateContactDetails(details);
      alert('İletişim bilgileri başarıyla güncellendi!');
    } catch (err) {
      setError('Güncelleme sırasında bir hata oluştu.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminPage
      title="İletişim Bilgileri Yönetimi"
      subtitle="Sitenin iletişim sayfasında görünecek bilgileri buradan düzenleyin."
      icon={FaInfoCircle}
      isLoading={isLoading}
    >
      {error && <p className="admin-alert admin-alert-error">{error}</p>}
      {details && (
        <form onSubmit={handleSubmit} className="admin-card">
          <div className="form-group">
            <label htmlFor="address">Adres</label>
            <textarea
              id="address"
              name="address"
              value={details.address || ''}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={details.phone || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={details.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="map_embed_url">
              Google Harita Gömme (Embed) URL
            </label>
            <textarea
              id="map_embed_url"
              name="map_embed_url"
              value={details.map_embed_url || ''}
              onChange={handleChange}
              rows="5"
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isSaving}
            >
              {isSaving ? <FaSpinner className="spinner" /> : <FaSave />}
              {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </form>
      )}
    </AdminPage>
  );
}

export default ManageContactDetails;
