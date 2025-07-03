import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../../styles/products/ProductCard.css';

function ProductCard({ groupedProduct, categoryName }) {
  // groupedProduct'ın veya variants'ın boş/tanımsız olma durumunu kontrol et
  if (!groupedProduct || !groupedProduct.variants || groupedProduct.variants.length === 0) {
    return null;
  }

  // Varsayılan olarak gösterilecek varyantı state ile yönet
  // Başlangıçta ilk varyantı gösteriyoruz.
  const [activeVariant, setActiveVariant] = useState(groupedProduct.variants[0]);

  // Ürün adından slug oluştur
  const slug = groupedProduct.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div className="product-card-wrapper">
        <Link to={`/product/${slug}?id=${activeVariant.id}`} className="product-card">
            <div className="product-card-image-container">
                <LazyLoadImage
                    alt={groupedProduct.name}
                    src={activeVariant.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}
                    effect="blur"
                    className="product-card-image"
                    key={activeVariant.id} // Renk değiştiğinde resmin yeniden render olması için key
                />
            </div>
            <div className="product-card-info">
                <span className="product-card-category">{categoryName || 'Kategori'}</span>
                <h3 className="product-card-name">{groupedProduct.name}</h3>
                 <div className="product-card-bottom">
                    <p className="product-card-price">₺{activeVariant.price}</p>
                 </div>
            </div>
        </Link>
        <div className="product-card-color-selector">
            {groupedProduct.variants.map(variant => (
                <span
                    key={variant.id}
                    className={`product-card-color-swatch ${activeVariant.id === variant.id ? 'active' : ''}`}
                    style={{ backgroundColor: variant.color_hex_code }}
                    title={variant.color_name}
                    onMouseEnter={() => setActiveVariant(variant)} // Mouse üzerine gelince aktif varyantı değiştir
                ></span>
            ))}
        </div>
    </div>
  );
}

export default ProductCard;