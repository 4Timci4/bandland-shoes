import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/products/Pagination.css';

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Sayfa numaralarını oluşturmak için bir mantık (örneğin: 1 ... 4 5 6 ... 10)
  // Şimdilik basit tutuyoruz.
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  return (
    <nav className="pagination-container">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        <FaChevronLeft />
        <span>Önceki</span>
      </button>

      <ul className="pagination-list">
        {/* Daha karmaşık sayfalama mantığı buraya eklenebilir */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button 
              onClick={() => onPageChange(number)}
              className={`pagination-item ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        <span>Sonraki</span>
        <FaChevronRight />
      </button>
    </nav>
  );
}

export default Pagination;