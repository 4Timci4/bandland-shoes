import React, { useState, useEffect } from 'react';
import { blogService } from '../../services/supabaseBlogService';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getPublished();
      // En fazla 3 blog yazısı göster
      setBlogPosts(data.slice(0, 3));
      setError(null);
    } catch (err) {
      setError('Blog verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      console.error('Blog yükleme hatası:', err);
      setBlogPosts([]); // Hata durumunda blog listesini boşalt
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <section id="blog" className="blog section-padding">
        <div className="container">
          <h2 className="text-center">Blog'dan Son Yazılar</h2>
          <div className="blog-loading">
            <p>Blog yazıları yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section id="blog" className="blog section-padding">
        <div className="container">
          <h2 className="text-center">Blog'dan Son Yazılar</h2>
          <div className="blog-empty">
            <p>Henüz blog yazısı yayınlanmamış.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog section-padding">
      <div className="container">
        <h2 className="text-center">Blog'dan Son Yazılar</h2>
        {error && (
          <div className="blog-error">
            <p>{error}</p>
          </div>
        )}
        <div className="blog__grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-card__image-container">
                <img 
                  src={post.imageUrl}
                  alt={post.title}
                  className="blog-card__image"
                />
              </div>
              <div className="blog-card__content">
                <p className="blog-card__date">{formatDate(post.createdAt)}</p>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">
                  {truncateText(post.excerpt || post.content)}
                </p>
                <a href="#" className="blog-card__read-more">Devamını Oku</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;