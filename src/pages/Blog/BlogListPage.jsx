import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaCommentAlt, FaTag, FaSearch } from 'react-icons/fa';
import { getPublishedBlogs } from '../../services/supabaseBlogService';
import { formatDate } from '../../utils/date';
import '../../styles/Blog/BlogListPage.css';

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setIsLoading(true);
        const data = await getPublishedBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError('Blog verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        console.error('Blog yükleme hatası:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  // Metni kısaltma
  const truncateText = (text, maxLength = 250) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Tarih formatlama - gün olarak
  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  // Tarih formatlama - ay olarak
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return months[date.getMonth()];
  };

  // Arama filtreleme
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Arama değişikliği işleyici
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="blog-list-page">
        <div className="blog-list-header">
          <h1>BLOG LİSTESİ</h1>
        </div>
        <div className="blog-list-loading">
          <div className="loader"></div>
          <p>Blog yazıları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-list-page">
        <div className="blog-list-header">
          <h1>BLOG LİSTESİ</h1>
        </div>
        <div className="blog-list-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-page">
      {/* Üst başlık alanı */}
      <div className="blog-list-header">
        <h1>BLOG LİSTESİ</h1>
      </div>

      {/* Navigasyon ve arama alanı */}
      <div className="blog-list-navigation">
        <div className="blog-breadcrumb">
          <Link to="/">Ana Sayfa</Link> &gt; <span>Blog</span>
        </div>
        <div className="blog-list-controls">
          <div className="blog-search">
            <input
              type="text"
              placeholder="Blog yazılarında ara..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button>
              <FaSearch />
            </button>
          </div>
          <div className="blog-categories-toggle">
            <span>Kategoriler</span>
            <i className="toggle-icon"></i>
          </div>
        </div>
      </div>

      {/* Blog içerik alanı */}
      <div className="blog-list-content">
        {filteredBlogs.length === 0 ? (
          <div className="blog-list-empty">
            <p>Aramanızla eşleşen blog yazısı bulunamadı.</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-list-item">
                <Link to={`/blog/${blog.id}`} className="blog-item-image">
                  <img src={blog.imageUrl} alt={blog.title} loading="lazy" />
                  <div className="blog-item-date">
                    <span className="day">{formatDay(blog.createdAt)}</span>
                    <span className="month">{formatMonth(blog.createdAt)}</span>
                  </div>
                </Link>
                <div className="blog-item-content">
                  <h2 className="blog-item-title">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h2>
                  <div className="blog-item-meta">
                    <span className="blog-item-category">
                      <FaTag /> <span>Design</span>
                    </span>
                  </div>
                  <div className="blog-item-excerpt">
                    <p>{truncateText(blog.excerpt || blog.content)}</p>
                  </div>
                  <Link to={`/blog/${blog.id}`} className="blog-item-read-more">
                    DEVAMINI OKU
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogListPage;