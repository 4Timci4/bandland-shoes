import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">SAYFA BULUNAMADI!</h2>
        <p className="not-found-text">
          Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-back-home">
            ANA SAYFAYA DÖN
          </Link>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;