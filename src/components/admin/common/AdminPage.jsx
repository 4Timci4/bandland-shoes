import React from 'react';
import { FaPlus } from 'react-icons/fa';

function AdminPage({
  title,
  subtitle,
  icon: Icon,
  children,
  onAddNew,
  isLoading,
}) {
  return (
    <div>
      <div className="admin-page-title">
        <h1>
          {Icon && <Icon className="title-icon" />} {title}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="admin-card">
        {onAddNew && (
          <div className="admin-card__header">
            <div className="admin-card__title-group">
              {Icon && <Icon className="admin-card__title-icon" />}
              <h2 className="admin-card__title">{title} Listesi</h2>
            </div>
            <button
              className="admin-btn admin-btn-primary add-button"
              onClick={onAddNew}
              disabled={isLoading}
            >
              <FaPlus /> <span>Yeni Ekle</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default AdminPage;
