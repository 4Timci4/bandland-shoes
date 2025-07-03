import React from 'react';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

function AdminTable({
  columns,
  items,
  isLoading,
  error,
  resourceName,
  onEdit,
  onDelete,
  onStatusToggle,
  onMove,
  customActions,
}) {
  if (isLoading) {
    return (
      <div className="admin-loading">
        <p>{resourceName} verileri yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return <div className="admin-alert admin-alert-error">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="admin-empty">
        <p>Henüz {resourceName} eklenmemiş.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className}>
                {col.header}
              </th>
            ))}
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={`${item.id}-${col.key}`} className={col.className}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              <td key={`actions-${item.id}`} className="action-buttons">
                <div className="action-buttons-row">
                  {onStatusToggle && (
                    <button
                      className="admin-btn admin-btn-action admin-btn-visibility"
                      onClick={() => onStatusToggle(item)}
                      title={
                        item.isActive || item.isPublished
                          ? 'Pasif Yap'
                          : 'Aktif Yap'
                      }
                    >
                      {item.isActive || item.isPublished ? (
                        <FaEyeSlash className="action-icon" />
                      ) : (
                        <FaEye className="action-icon" />
                      )}
                      <span className="action-text">
                        {item.isActive || item.isPublished ? 'Pasif' : 'Aktif'}
                      </span>
                    </button>
                  )}
                  {/* onEdit varsa ve customActions yoksa Düzenle butonunu göster */}
                  {onEdit && !customActions && (
                    <button
                      className="admin-btn admin-btn-action admin-btn-edit"
                      onClick={() => onEdit(item)}
                      title="Düzenle"
                    >
                      <FaEdit className="action-icon" />
                      <span className="action-text">Düzenle</span>
                    </button>
                  )}
                  {/* customActions varsa onları göster */}
                  {customActions && customActions(item)}
                  {onMove && (
                    <>
                      <button
                        className="admin-btn admin-btn-action admin-btn-order"
                        onClick={() => onMove(item.id, 'up')}
                        disabled={index === 0}
                        title="Yukarı Taşı"
                      >
                        <FaArrowUp className="action-icon" />
                      </button>
                      <button
                        className="admin-btn admin-btn-action admin-btn-order"
                        onClick={() => onMove(item.id, 'down')}
                        disabled={index === items.length - 1}
                        title="Aşağı Taşı"
                      >
                        <FaArrowDown className="action-icon" />
                      </button>
                    </>
                  )}
                  <button
                    className="admin-btn admin-btn-action admin-btn-danger"
                    onClick={() => onDelete(item.id)}
                    title="Sil"
                  >
                    <FaTrash className="action-icon" />
                    <span className="action-text">Sil</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
