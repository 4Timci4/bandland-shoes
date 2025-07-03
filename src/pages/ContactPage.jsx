import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { contactService } from '../services/contactService';
import '../styles/ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ sending: false, sent: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, sent: false, error: null });
    try {
      await contactService.submitMessage(formData);
      setStatus({ sending: false, sent: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Formu sıfırla
    } catch (error) {
      setStatus({ sending: false, sent: false, error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info-section">
          <h2>Bize Ulaşın</h2>
          <p className="info-subtext">Sorularınız, önerileriniz veya işbirliği talepleriniz için bize aşağıdaki kanallardan ulaşabilirsiniz.</p>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <strong>Adres:</strong>
              <p>Ayakkabıcılar Sitesi, No:123, 34000, İstanbul, Türkiye</p>
            </div>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <strong>Telefon:</strong>
              <p>+90 (212) 123 45 67</p>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <strong>Email:</strong>
              <p>info@badlandshoes.com.tr</p>
            </div>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.236894056291!2d28.9748623153839!3d41.0191759792997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e570b6b27b%3A0x44c76f6b5b5b5b5b!2sSultanahmet%20Meydan%C4%B1!5e0!3m2!1str!2str!4v1678886369527!5m2!1str!2str"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Konumumuz"
            ></iframe>
          </div>
        </div>
        <div className="contact-form-section">
          <h3>Mesaj Gönderin</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Adınız Soyadınız</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Adresiniz</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Konu</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mesajınız</label>
              <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={status.sending}>
              <FaPaperPlane /> {status.sending ? 'Gönderiliyor...' : 'Gönder'}
            </button>
            {status.sent && <p className="status-message success">Mesajınız başarıyla gönderildi. Teşekkür ederiz!</p>}
            {status.error && <p className="status-message error">{status.error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
