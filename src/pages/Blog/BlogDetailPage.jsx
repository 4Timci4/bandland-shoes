import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaShareAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebookF, 
  FaClock, 
  FaCalendarAlt, 
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { getBlogById, getAllBlogs } from '../../services/supabaseBlogService';
import { formatDate } from '../../utils/date';
import '../../styles/Blog/BlogDetailPage.css';

function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareButtons, setShowShareButtons] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getBlogById(id);
        if (!postData) {
          throw new Error('Blog gönderisi bulunamadı.');
        }
        setPost(postData);

        const allPosts = await getAllBlogs();
        setRelatedPosts(
          allPosts
            .filter((p) => p.isPublished && p.id !== postData.id)
            .slice(0, 4)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="blog-loading">Yükleniyor<span>.</span><span>.</span><span>.</span></div>;
  if (error) return <div className="blog-error">{error}</div>;
  if (!post) return null;

  const shareUrl = window.location.href;
  
  // Tahmini okuma süresi hesaplama (ortalama 200 kelime/dakika)
  const calculateReadingTime = (content) => {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readingTime = calculateReadingTime(post.content);
  
  // Sosyal medya butonlarını göster/gizle
  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className="blog-detail-container">
      {/* Üst bilgi çubuğu */}
      <div className="blog-detail-header">
        <Link to="/blog" className="back-to-blog">
          <FaChevronLeft /> Tüm Yazılar
        </Link>
        <div className="blog-meta-info">
          <span className="blog-date">
            <FaCalendarAlt /> {formatDate(post.createdAt)}
          </span>
          <span className="blog-reading-time">
            <FaClock /> {readingTime} dk okuma
          </span>
        </div>
      </div>

      {/* Ana içerik */}
      <div className="blog-detail-content">
        <h1 className="blog-title">{post.title}</h1>
        
        {post.author && (
          <div className="blog-author">
            <div className="author-avatar">
              {post.authorImage ? (
                <img src={post.authorImage} alt={post.author} />
              ) : (
                <div className="author-initials">
                  {post.author.split(' ').map(name => name[0]).join('')}
                </div>
              )}
            </div>
            <div className="author-name">{post.author}</div>
          </div>
        )}
        
        <div className="blog-hero-image">
          <img src={post.imageUrl} alt={post.title} />
          
          <div className={`share-container ${showShareButtons ? 'active' : ''}`}>
            <button className="share-toggle" onClick={toggleShareButtons}>
              <FaShareAlt />
            </button>
            <div className="share-buttons">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook'ta paylaş">
                <FaFacebookF />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter'da paylaş">
                <FaTwitter />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn'de paylaş">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        {post.excerpt && (
          <div className="blog-excerpt">
            {post.excerpt}
          </div>
        )}
        
        <div className="blog-body">
          {post.content && 
            post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index}>{paragraph}</p>
              ) : (
                <br key={index} />
              )
            ))
          }
        </div>
      </div>
      
      {/* İlgili yazılar */}
      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <div className="related-posts-header">
            <h3>İlgili Yazılar</h3>
            <Link to="/blog" className="view-all-link">
              Tüm Yazılar <FaChevronRight />
            </Link>
          </div>
          
          <div className="related-posts-grid">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                to={`/blog/${relatedPost.id}`} 
                className="related-post-card"
              >
                <div className="related-post-image">
                  <img src={relatedPost.imageUrl} alt={relatedPost.title} loading="lazy" />
                </div>
                <div className="related-post-details">
                  <h4 className="related-post-title">{relatedPost.title}</h4>
                  <div className="related-post-meta">
                    <span className="related-post-date">
                      {formatDate(relatedPost.createdAt)}
                    </span>
                    <span className="related-post-separator">•</span>
                    <span className="related-post-reading-time">
                      {calculateReadingTime(relatedPost.content)} dk
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetailPage;