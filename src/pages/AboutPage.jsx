import React from 'react';
import {
  FaLeaf,
  FaUsers,
  FaLightbulb,
  FaAward,
  FaHandsHelping,
  FaRegHeart,
} from 'react-icons/fa';
import '../components/About/About.css';

const StatCard = ({ icon, value, label }) => (
  <div className="stat-card">
    {icon}
    <span className="stat-card__value">{value}</span>
    <span className="stat-card__label">{label}</span>
  </div>
);

const ValueCard = ({ icon, title, children }) => (
  <div className="value-card">
    {icon}
    <h3 className="value-card__title">{title}</h3>
    <p className="value-card__text">{children}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">
            Adımlarınıza Değer Katan Yolculuk
          </h1>
          <p className="about-hero__subtitle">
            2024'ten beri kalite, konfor ve şıklığı her bir çiftte
            birleştiriyoruz.
          </p>
        </div>
      </section>

      <section className="about-story section-padding">
        <div className="container about-story__grid">
          <div className="about-story__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop"
              alt="Badland Shoes Atölye"
            />
          </div>
          <div className="about-story__content">
            <h2 className="section-title">Tutkuyla Başlayan Bir Macera</h2>
            <p>
              Badland Shoes, sadece bir giyim eşyası değil, bir stil ifadesi ve
              bir yol arkadaşı yaratma vizyonuyla doğdu. Misyonumuz, en kaliteli
              materyalleri modern ve yenilikçi tasarımlarla buluşturarak, her
              adımda kendinizi özel hissetmenizi sağlamaktır.
            </p>
            <p>
              Ayakkabılarımızın her detayı, uzun süren AR-GE çalışmaları ve usta
              zanaatkarların el emeği ile şekillenir. Sizin için sadece bir
              ayakkabı değil, bir deneyim tasarlıyoruz.
            </p>
            <div className="about-story__stats">
              <StatCard
                icon={<FaAward size={32} />}
                value="100+"
                label="Özgün Tasarım"
              />
              <StatCard
                icon={<FaUsers size={32} />}
                value="5,000+"
                label="Mutlu Müşteri"
              />
              <StatCard
                icon={<FaHandsHelping size={32} />}
                value="10+"
                label="Sosyal Sorumluluk Projesi"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-values section-padding bg-light">
        <div className="container">
          <h2 className="section-title text-center">Değerlerimiz</h2>
          <p className="section-subtitle text-center">
            Bize ilham veren ve yol gösteren temel ilkelerimiz.
          </p>
          <div className="values-grid">
            <ValueCard
              icon={<FaLightbulb size={40} />}
              title="Yenilikçi Tasarım"
            >
              Klasik çizgileri modern dokunuşlarla birleştirerek zamansız ve
              özgün tasarımlar yaratıyoruz.
            </ValueCard>
            <ValueCard icon={<FaRegHeart size={40} />} title="Usta İşçilik">
              Her bir ayakkabı, yılların deneyimine sahip zanaatkarlarımızın
              ellerinde özenle şekillenir.
            </ValueCard>
            <ValueCard icon={<FaLeaf size={40} />} title="Sürdürülebilirlik">
              Doğaya saygılı, etik ve sürdürülebilir kaynaklardan elde edilen
              materyalleri tercih ediyoruz.
            </ValueCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
