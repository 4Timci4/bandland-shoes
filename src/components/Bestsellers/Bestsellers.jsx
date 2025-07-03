import React from 'react';
import './Bestsellers.css';

const bestsellers = [
  {
    id: 1,
    name: 'Şehirli Kaşif',
    price: '1.899 TL',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Performans Lideri',
    price: '2.499 TL',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Klasik Zarafet',
    price: '2.999 TL',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Sokak Stili',
    price: '1.699 TL',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcdda9?q=80&w=2070&auto=format&fit=crop',
  },
];

const Bestsellers = () => {
  return (
    <section id="bestsellers" className="bestsellers section-padding">
      <div className="container">
        <h2 className="text-center">En Çok Satılanlar</h2>
        <div className="bestsellers__grid">
          {bestsellers.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card__image-container">
                <img src={product.image} alt={product.name} className="product-card__image" />
              </div>
              <div className="product-card__info">
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__price">{product.price}</p>
                <button className="btn btn-primary">Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;