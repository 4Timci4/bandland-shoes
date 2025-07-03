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
  // Gelen 'Icon' prop'unun bir JSX elementi mi yoksa bir bileşen mi olduğunu kontrol et
  const iconElement =
    Icon && React.isValidElement(Icon) ? (
      Icon
    ) : Icon ? (
      <Icon className="title-icon" />
    ) : null;

  return (
    <div>
      <div className="admin-page-title">
        <h1>
          {iconElement} {title}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="admin-card">
        {onAddNew && (
          <div className="admin-card__header">
            <div className="admin-card__title-group">
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
        <div className="admin-card__content">{children}</div>
      </div>
    </div>
  );
}

export default AdminPage;
