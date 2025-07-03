import React, { useState, useEffect } from 'react';
import { FaImages, FaNewspaper, FaPlus, FaCheckCircle, FaTimesCircle, FaPen, FaEye, FaRegLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { sliderService } from '../../services/supabaseSliderService';
import { blogService } from '../../services/supabaseBlogService';
import { formatDate } from '../../utils/date';

const StatCard = ({ icon, title, value, isLoading }) => (
    <div className="dashboard-stat-card">
        <div className="dashboard-stat-card__icon">{icon}</div>
        <div className="dashboard-stat-card__content">
            <h3 className="dashboard-stat-card__title">{title}</h3>
            <p className="dashboard-stat-card__value">{isLoading ? '...' : value}</p>
        </div>
    </div>
);

const QuickActionButton = ({ icon, label, to }) => (
    <Link to={to} className="quick-action-button">
        {icon}
        <span>{label}</span>
    </Link>
);

const RecentItem = ({ item, type }) => (
    <div className="recent-item">
        <div className="recent-item__icon">
            {type === 'slider' ? <FaImages /> : <FaNewspaper />}
        </div>
        <div className="recent-item__content">
            <p className="recent-item__title">{type === 'slider' ? `Slider #${item.id}` : item.title}</p>
            <span className="recent-item__date">Oluşturulma: {formatDate(item.createdAt)}</span>
        </div>
        <Link to={`/admin/${type}s`} className="recent-item__link">
            <FaPen />
        </Link>
    </div>
);


function Dashboard() {
  const [stats, setStats] = useState({
    slides: { total: 0, active: 0, inactive: 0 },
    blogs: { total: 0, published: 0, drafts: 0 },
  });
  const [recentItems, setRecentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [slides, blogs] = await Promise.all([
          sliderService.getAll(),
          blogService.getAll(),
        ]);
        
        const slidesStats = {
            total: slides.length,
            active: slides.filter(s => s.isActive).length,
            inactive: slides.filter(s => !s.isActive).length,
        };

        const blogsStats = {
            total: blogs.length,
            published: blogs.filter(b => b.isPublished).length,
            drafts: blogs.filter(b => !b.isPublished).length,
        };

        setStats({ slides: slidesStats, blogs: blogsStats });

        const recentSliders = slides.slice(0, 2).map(s => ({...s, type: 'slider'}));
        const recentBlogs = blogs.slice(0, 2).map(b => ({...b, type: 'blog'}));
        setRecentItems([...recentSliders, ...recentBlogs].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));

      } catch (error) {
        console.error("Dashboard verileri yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
        <div className="dashboard-header">
            <div className="dashboard-header__content">
                <h1 className="dashboard-header__title">Admin Paneline Hoş Geldiniz!</h1>
                <p className="dashboard-header__subtitle">Sitenizin içeriklerini buradan kolayca yönetebilirsiniz.</p>
            </div>
        </div>

      <div className="dashboard-grid">
        <div className="dashboard-main-content">
            <div className="dashboard-section">
                <h2 className="dashboard-section__title">Genel Bakış</h2>
                <div className="dashboard-stats-grid">
                    <StatCard icon={<FaImages size={24} />} title="Toplam Slider" value={stats.slides.total} isLoading={isLoading} />
                    <StatCard icon={<FaCheckCircle size={24} color="#2ecc71"/>} title="Aktif Slider" value={stats.slides.active} isLoading={isLoading} />
                    <StatCard icon={<FaTimesCircle size={24} color="#e74c3c"/>} title="Pasif Slider" value={stats.slides.inactive} isLoading={isLoading} />
                    <StatCard icon={<FaNewspaper size={24} />} title="Toplam Blog" value={stats.blogs.total} isLoading={isLoading} />
                    <StatCard icon={<FaEye size={24} color="#2ecc71"/>} title="Yayınlanmış Blog" value={stats.blogs.published} isLoading={isLoading} />
                    <StatCard icon={<FaRegLightbulb size={24} color="#f1c40f"/>} title="Taslak Blog" value={stats.blogs.drafts} isLoading={isLoading} />
                </div>
            </div>

             <div className="dashboard-section">
                <h2 className="dashboard-section__title">Son Eklenenler</h2>
                <div className="recent-items-list">
                    {isLoading ? (
                        <p>Yükleniyor...</p>
                    ) : recentItems.length > 0 ? (
                        recentItems.map(item => <RecentItem key={`${item.type}-${item.id}`} item={item} type={item.type}/>)
                    ) : (
                        <p>Henüz içerik eklenmemiş.</p>
                    )}
                </div>
            </div>
        </div>
        <div className="dashboard-sidebar">
            <div className="dashboard-section">
                <h2 className="dashboard-section__title">Hızlı Eylemler</h2>
                <div className="quick-actions-grid">
                    <QuickActionButton icon={<FaPlus />} label="Yeni Slider Ekle" to="/admin/sliders" />
                    <QuickActionButton icon={<FaPlus />} label="Yeni Blog Ekle" to="/admin/blogs" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;