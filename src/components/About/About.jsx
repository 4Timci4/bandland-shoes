import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <section id="about-home" className="about-home-section section-padding">
      <div className="container">
        <div className="about-home__grid">
          <div className="about-home__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop"
              alt="Konforlu ve şık ayakkabı"
              className="about-home__image"
            />
          </div>
          <div className="about-home__content">
            <h2 className="about-home__title">Adımlarınıza Değer Katıyoruz</h2>
            <p className="about-home__text">
              Badland Shoes olarak, her adımda konforu ve zarafeti hissetmeniz
              için yola çıktık. Modern tasarımlarımızı, en kaliteli
              materyallerle ve usta işçilikle birleştirerek zamansız ayakkabılar
              üretiyoruz. Amacımız, sadece bir ayakkabı değil, gün boyu size eşlik edecek bir stil ve güven sunmaktır.
            </p>
            <div className="about-home__features">
              <span>✓ Kaliteli Malzeme</span>
              <span>✓ Usta İşçilik</span>
              <span>✓ Modern Tasarım</span>
            </div>
            <Link to="/about" className="btn btn-secondary">
              Hikayemizi Keşfedin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
