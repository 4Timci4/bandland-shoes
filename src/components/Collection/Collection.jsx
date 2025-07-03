import React from 'react';
import './Collection.css';

const collections = [
  {
    id: 1,
    title: 'İlkbahar/Yaz 2025',
    description:
      'Doğanın uyanışından ilham alan, canlı renkler ve nefes alan materyallerle tasarlanmış koleksiyonumuzla adımlarınıza enerji katın.',
    image:
      'https://images.unsplash.com/photo-1551107696-a4b99683e9a2?q=80&w=1974&auto=format&fit=crop',
    align: 'left',
  },
  {
    id: 2,
    title: 'Sonbahar/Kış 2025',
    description:
      'Şehrin ritmine ayak uyduran, su geçirmez ve sıcak tutan botlarımızla soğuk havalarda bile stilinizden ödün vermeyin.',
    image:
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1975&auto=format&fit=crop',
    align: 'right',
  },
];

const Collection = () => {
  return (
    <section id="collection" className="collection section-padding">
      <div className="container">
        <h2 className="text-center">Sezonluk Koleksiyonlar</h2>
        <div className="collection__list">
          {collections.map((item) => (
            <div
              key={item.id}
              className={`collection-item collection-item--${item.align}`}
            >
              <div className="collection-item__text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="btn btn-secondary">Koleksiyonu Gör</button>
              </div>
              <div className="collection-item__image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
