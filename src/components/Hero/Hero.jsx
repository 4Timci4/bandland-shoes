import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Adımınızı
              <span className="hero__title-highlight"> Badland</span>
              <br />
              ile Atın
            </motion.h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Spor, casual ve formal ayakkabılarda kalite, konfor ve şıklığın
              mükemmel birleşimi. Her adımda farkı hissedin.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                className="btn btn-primary hero__cta"
                onClick={scrollToProducts}
              >
                Ürünleri Keşfet
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  document
                    .getElementById('about')
                    .scrollIntoView({ behavior: 'smooth' })
                }
              >
                Hikayemizi Öğren
              </button>
            </motion.div>
          </div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="hero__image-container">
              <div className="hero__image-placeholder">
                <div className="hero__shoe-silhouette">
                  <svg viewBox="0 0 200 100" className="hero__shoe-svg">
                    <path
                      d="M20 70 Q30 50, 60 45 Q100 40, 140 45 Q170 50, 180 60 Q175 75, 160 80 Q120 85, 80 85 Q40 85, 20 70"
                      fill="var(--primary-color)"
                    />
                    <path
                      d="M25 72 Q35 55, 65 50 Q105 45, 145 50 Q170 55, 175 65 Q170 75, 155 78 Q115 80, 75 80 Q35 80, 25 72"
                      fill="var(--secondary-color)"
                      opacity="0.8"
                    />
                  </svg>
                </div>
                <div className="hero__accent-elements">
                  <div className="hero__accent hero__accent--1"></div>
                  <div className="hero__accent hero__accent--2"></div>
                  <div className="hero__accent hero__accent--3"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hero__background-elements">
        <div className="hero__bg-circle hero__bg-circle--1"></div>
        <div className="hero__bg-circle hero__bg-circle--2"></div>
        <div className="hero__bg-line"></div>
      </div>
    </section>
  );
};

export default Hero;
