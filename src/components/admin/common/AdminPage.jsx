import React from 'react';
import { FaPlus } from 'react-icons/fa';

function AdminPage({
  title,
  subtitle,
  icon,
  children,
  onAddNew,
  isLoading,
}) {
  return (
    <div>
      <div className="admin-page-title">
        <h1>
          {icon} {title}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="admin-card">
        {onAddNew ? (
          <div className="admin-card__header">
            <div className="admin-card__title-group">
              {icon}
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
        ) : (
          <div className="admin-card__content">{children}</div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
