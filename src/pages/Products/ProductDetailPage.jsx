import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { productService } from '../../services/productService';
import '../../styles/products/ProductDetailPage.css';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetailPage() {
  const query = useQuery();
  const productId = query.get('id'); // Tıklanan varyantın ID'si

  const [productGroup, setProductGroup] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductData() {
      if (!productId) {
        setLoading(false);
        setError("Ürün ID'si bulunamadı.");
        return;
      }

      try {
        setLoading(true);
        // Servisten artık ana ürün ve tüm varyantları geliyor
        const fetchedProductGroup = await productService.getById(productId);
        setProductGroup(fetchedProductGroup);
        // Başlangıçta aktif olan varyantı URL'den gelen ID ile belirle
        const initialVariant = fetchedProductGroup.variants.find(
          (v) => v.id === parseInt(productId, 10)
        );
        setActiveVariant(initialVariant || fetchedProductGroup.variants[0]);
        setError(null);
      } catch (err) {
        setError('Ürün yüklenirken bir hata oluştu.');
        console.error(
          `Error fetching product group for variant ID ${productId}:`,
          err
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [productId]);

  if (loading) return <div className="detail-page-message">Yükleniyor...</div>;
  if (error) return <div className="detail-page-message error">{error}</div>;
  if (!productGroup || !activeVariant)
    return <div className="detail-page-message">Ürün bulunamadı.</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-gallery">
          <LazyLoadImage
            key={activeVariant.id} // Renk değişince resmin güncellenmesi için
            alt={productGroup.name}
            src={
              activeVariant.imageUrl ||
              'https://via.placeholder.com/600x600?text=No+Image'
            }
            effect="blur"
            wrapperClassName="product-detail-image-wrapper"
            className="product-detail-image"
          />
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{productGroup.name}</h1>
          <p className="product-price">₺{activeVariant.price}</p>

          <div className="variant-selection">
            <span className="selection-label">
              Renk: <strong>{activeVariant.color_name}</strong>
            </span>
            <div className="color-options">
              {productGroup.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`color-option-wrapper ${activeVariant.id === variant.id ? 'active' : ''}`}
                  onClick={() => setActiveVariant(variant)}
                >
                  <span
                    className="color-swatch-detail"
                    style={{ backgroundColor: variant.color_hex_code }}
                    title={variant.color_name}
                  ></span>
                </div>
              ))}
            </div>
          </div>

          <p className="product-description">{productGroup.description}</p>
          <div className="product-actions">
            <button className="add-to-cart-btn">Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
