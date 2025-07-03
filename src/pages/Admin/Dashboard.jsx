import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBoxes,
  FaSitemap,
  FaWarehouse,
  FaLayerGroup,
  FaExclamationTriangle,
  FaPlus,
} from 'react-icons/fa';
import { dashboardService } from '../../services/dashboardService';
import { formatDate } from '../../utils/date';
import AdminPage from '../../components/admin/common/AdminPage';

// --- Sub-Components ---

const StatCard = ({ icon, value, title, isLoading }) => (
  <div className="stat-card-v2">
    <div className="stat-card-v2__icon">{icon}</div>
    <div className="stat-card-v2__info">
      <span className="stat-card-v2__value">{isLoading ? '...' : value}</span>
      <p className="stat-card-v2__title">{title}</p>
    </div>
  </div>
);

const InfoList = ({ title, items, isLoading, type }) => (
  <div className="info-list-card">
    <h3 className="info-list-card__title">{title}</h3>
    <div className="info-list-card__list">
      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="info-list-card__empty">Veri bulunamadı.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="info-list-card__item">
            <Link to={`/admin/products`} className="item-details">
              <span className="item-name">{item.name}</span>
              <span className={`item-value ${type === 'stock' ? 'low' : ''}`}>
                {type === 'stock' ? `${item.stock_quantity} adet` : formatDate(item.createdAt)}
              </span>
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
);

// --- Main Dashboard Component ---

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await dashboardService.getDashboardStats();
        setDashboardData(data);
      } catch (err) {
        setError('Dashboard verileri yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <AdminPage
      title="Dashboard"
      subtitle="Mağazanızın genel durumuna bir bakış."
      icon={<FaBoxes />}
      isLoading={isLoading}
    >
      {error && <p className="admin-alert admin-alert-error">{error}</p>}
      
      {/* Üst Kısım İstatistik Kartları */}
      <div className="dashboard-stats-grid-v2">
        <StatCard
          icon={<FaLayerGroup />}
          value={dashboardData?.totalBaseProductCount}
          title="Toplam Ana Ürün"
          isLoading={isLoading}
        />
        <StatCard
          icon={<FaBoxes />}
          value={dashboardData?.totalVariantCount}
          title="Toplam Ürün Varyantı"
          isLoading={isLoading}
        />
        <StatCard
          icon={<FaSitemap />}
          value={dashboardData?.totalCategoryCount}
          title="Toplam Kategori"
          isLoading={isLoading}
        />
        <StatCard
          icon={<FaWarehouse />}
          value={dashboardData?.totalStock}
          title="Toplam Stok Adedi"
          isLoading={isLoading}
        />
      </div>

      {/* Alt Kısım Listeler */}
      <div className="dashboard-lists-grid">
        <InfoList
          title="Stoku Azalan Ürünler"
          items={dashboardData?.lowStockProducts || []}
          isLoading={isLoading}
          type="stock"
        />
        <InfoList
          title="Son Eklenenler"
          items={dashboardData?.recentProducts || []}
          isLoading={isLoading}
          type="recent"
        />
      </div>
    </AdminPage>
  );
}

export default Dashboard;
