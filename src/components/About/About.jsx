import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div className="about__content">
          <h2>Hakkımızda</h2>
          <p>
            Badland Shoes, kalite ve şıklığı bir araya getiren ayakkabı
            markasıdır.
          </p>
          <Link to="/about" className="btn btn-primary">
            Daha Fazla Bilgi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
