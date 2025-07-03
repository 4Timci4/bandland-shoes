import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/images/mt-logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <img src={logo} alt="Badland Shoes" className="footer__logo" />
            <p>Kalite, konfor ve şıklığı her adımda hissedin.</p>
            <div className="footer__socials">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
          <div className="footer__links">
            <h4>Hızlı Bağlantılar</h4>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/about">Hakkımızda</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">İletişim</Link></li>
            </ul>
          </div>
          <div className="footer__links">
            <h4>Müşteri Hizmetleri</h4>
            <ul>
              <li><a href="#">S.S.S.</a></li>
              <li><a href="#">İade ve Değişim</a></li>
              <li><a href="#">Gizlilik Politikası</a></li>
              <li><a href="#">Kullanım Şartları</a></li>
            </ul>
          </div>
          <div className="footer__newsletter">
            <h4>E-Bülten</h4>
            <p>Yeniliklerden ve kampanyalardan haberdar olun.</p>
            <form className="footer__form">
              <input type="email" placeholder="E-posta adresiniz" />
              <button type="submit" className="btn btn-secondary">Abone Ol</button>
            </form>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Badland Shoes. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;