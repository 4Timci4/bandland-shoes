import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { productService } from '../../services/productService';
import { FaShieldAlt, FaShippingFast, FaMinus, FaPlus } from 'react-icons/fa';

import '../../styles/products/ProductDetailPage.css';

// --- Yardımcı Kancalar ve Bileşenler ---

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="accordion-item">
    <button className="accordion-header" onClick={onClick}>
      <span className="accordion-title">{title}</span>
      <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>›</span>
    </button>
    {isOpen && <div className="accordion-content">{children}</div>}
  </div>
);


// --- Ana Bileşen ---

function ProductDetailPage() {
  const query = useQuery();
  const productId = query.get('id');

  const [productGroup, setProductGroup] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');

  const handleAccordionClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  useEffect(() => {
    async function fetchProductData() {
      if (!productId) {
        setLoading(false);
        setError("Ürün ID'si bulunamadı.");
        return;
      }
      try {
        setLoading(true);
        const fetchedProductGroup = await productService.getById(productId);
        setProductGroup(fetchedProductGroup);
        const initialVariant = fetchedProductGroup.variants.find(
          (v) => v.id === parseInt(productId, 10)
        );
        setActiveVariant(initialVariant || fetchedProductGroup.variants[0]);
        setError(null);
      } catch (err) {
        setError('Ürün yüklenirken bir hata oluştu.');
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
    <div className="product-detail-page-v2">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Ana Sayfa</Link>
          <span>›</span>
          <Link to={`/category/${productGroup.category.slug || 'kategori'}`}>
            {productGroup.category.name}
          </Link>
          <span>›</span>
          <span>{productGroup.name}</span>
        </nav>

        <div className="product-detail-layout">
          <div className="product-image-gallery-v2">
            <LazyLoadImage
              key={activeVariant.id}
              alt={productGroup.name}
              src={activeVariant.imageUrl || 'https://via.placeholder.com/600x600'}
              effect="blur"
              wrapperClassName="product-detail-image-wrapper-v2"
              className="product-detail-image-v2"
            />
          </div>

          <div className="product-info-section-v2">
            <span className="product-category-tag">{productGroup.category.name}</span>
            <h1 className="product-title-v2">{productGroup.name}</h1>
            <p className="product-price-v2">₺{activeVariant.price}</p>
            
            <div className="variant-selection-v2">
              <span className="selection-label">
                Renk: <strong>{activeVariant.color_name}</strong>
              </span>
              <div className="color-options-v2">
                {productGroup.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`color-option-wrapper-v2 ${activeVariant.id === variant.id ? 'active' : ''}`}
                    onClick={() => setActiveVariant(variant)}
                  >
                    <span
                      className="color-swatch-detail-v2"
                      style={{ backgroundColor: variant.color_hex_code }}
                      title={variant.color_name}
                    ></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-actions-v2">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FaMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><FaPlus /></button>
              </div>
              <button className="add-to-cart-btn-v2">Sepete Ekle</button>
            </div>

            <div className="product-meta-accordion">
              <AccordionItem title="Ürün Açıklaması" isOpen={openAccordion === 'description'} onClick={() => handleAccordionClick('description')}>
                <p>{productGroup.description}</p>
              </AccordionItem>
              <AccordionItem title="Malzeme & Bakım" isOpen={openAccordion === 'care'} onClick={() => handleAccordionClick('care')}>
                <p>Üstün kaliteli deri ve dayanıklı taban malzemesinden üretilmiştir. Kuru bir bezle temizlemeniz önerilir.</p>
              </AccordionItem>
            </div>
            
            <div className="trust-signals">
              <div className="signal">
                <FaShieldAlt /> <span>Güvenli Ödeme</span>
              </div>
              <div className="signal">
                <FaShippingFast /> <span>Hızlı Kargo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
