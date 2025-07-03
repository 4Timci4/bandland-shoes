import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

import { sliderService } from '../../services/supabaseSliderService';
import './Slider.css';

function Slider() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setIsLoading(true);
      const data = await sliderService.getActive();
      setSlides(data);
      setError(null);
    } catch (err) {
      setError('Slider verileri yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.');
      console.error('Slider yükleme hatası:', err);
      setSlides([]); // Hata durumunda slider listesini boşalt
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="slider-loading">
        <div className="slider-loading-content">
          <p>Slider yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="slider-empty">
        <div className="slider-empty-content">
          <p>Henüz slider eklenmemiş.</p>
        </div>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      grabCursor={true}
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      className="swiper_container"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
            <img
              src={slide.imageUrl}
              alt={`Slider ${slide.id}`}
            />
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
}

export default Slider;