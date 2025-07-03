export const formatDate = (dateString) => {
  if (!dateString) return 'Tarih bilgisi yok';

  const date = new Date(dateString);

  if (isNaN(date)) {
    return 'Geçersiz tarih';
  }

  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
