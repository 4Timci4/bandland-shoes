import React, { useState, useEffect } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { contactService } from '../../services/contactService';
import AdminPage from '../../components/admin/common/AdminPage';
import AdminTable from '../../components/admin/common/AdminTable';
import { formatDate } from '../../utils/date';

function ViewContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await contactService.getAllSubmissions();
      setSubmissions(data);
    } catch (err) {
      setError('Mesajlar yüklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReadMessage = async (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (!message.is_read) {
      await contactService.markAsRead(message.id);
      // Mesajı lokal state'de de güncelle
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === message.id ? { ...sub, is_read: true } : sub
        )
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      try {
        await contactService.deleteSubmission(id);
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      } catch (err) {
        alert('Mesaj silinirken bir hata oluştu.');
      }
    }
  };

  const columns = [
    {
      key: 'is_read',
      header: 'Durum',
      render: (item) => (
        <span className={`status-badge ${item.is_read ? 'read' : 'unread'}`}>
          {item.is_read ? 'Okundu' : 'Yeni'}
        </span>
      ),
    },
    { key: 'name', header: 'Gönderen' },
    { key: 'email', header: 'Email' },
    { key: 'subject', header: 'Konu' },
    {
      key: 'submitted_at',
      header: 'Tarih',
      render: (item) => formatDate(item.submitted_at),
    },
  ];

  // Custom action butonu ekliyoruz
  const customActions = (item) => (
    <>
      <button
        className="admin-btn admin-btn-action"
        onClick={() => handleReadMessage(item)}
      >
        Oku
      </button>
    </>
  );

  return (
    <AdminPage
      title="Gelen Mesajlar"
      subtitle="İletişim formundan gönderilen mesajları burada görüntüleyebilirsiniz."
      icon={FaEnvelopeOpenText}
      isLoading={isLoading}
    >
      <AdminTable
        columns={columns}
        items={submissions}
        isLoading={isLoading}
        error={error}
        resourceName="mesaj"
        onDelete={handleDelete}
        customActions={customActions} // onEdit yerine customActions kullanıyoruz
      />

      {isModalOpen && selectedMessage && (
        <div className="admin-modal">
          <div className="admin-modal__content">
            <div className="admin-modal__header">
              <h2>{selectedMessage.subject || 'Konusuz Mesaj'}</h2>
              <button
                className="admin-modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="message-modal-body">
              <p>
                <strong>Gönderen:</strong> {selectedMessage.name} (
                {selectedMessage.email})
              </p>
              <p>
                <strong>Tarih:</strong>{' '}
                {formatDate(selectedMessage.submitted_at)}
              </p>
              <hr />
              <div className="message-content">{selectedMessage.message}</div>
            </div>
          </div>
        </div>
      )}
    </AdminPage>
  );
}

export default ViewContactSubmissions;
