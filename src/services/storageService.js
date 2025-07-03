import { supabase } from '../lib/supabase';
import imageCompression from 'browser-image-compression';

const BUCKET_NAME = 'images';

export const storageService = {
  /**
   * Bir dosyayı sıkıştırıp Supabase Storage'a yükler.
   * @param {File} file - Yüklenecek dosya nesnesi.
   * @returns {Promise<string>} Yüklenen dosyanın genel erişilebilir URL'i.
   */
  async uploadFile(file) {
    if (!file) {
      throw new Error('Yüklenecek dosya seçilmedi.');
    }

    console.log(
      `Orijinal dosya boyutu: ${(file.size / 1024 / 1024).toFixed(2)} MB`
    );

    const options = {
      maxSizeMB: 1, // Maksimum 1MB
      maxWidthOrHeight: 1920, // Maksimum genişlik veya yükseklik
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    console.log(
      `Sıkıştırılmış dosya boyutu: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
    );

    const fileExt = compressedFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, compressedFile);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    if (!publicUrl) {
      throw new Error('Dosya yüklendi ancak genel URL alınamadı.');
    }

    return publicUrl;
  },

  /**
   * Bir dosyayı URL'inden Supabase Storage'dan siler.
   * @param {string} fileUrl - Silinecek dosyanın URL'i.
   * @returns {Promise<void>}
   */
  async deleteFile(fileUrl) {
    if (!fileUrl) return;

    try {
      const filePath = new URL(fileUrl).pathname.split(`/${BUCKET_NAME}/`)[1];
      if (!filePath) return;

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting file:', error);
        // Hata fırlatmak yerine sadece loglayabiliriz, çünkü ana işlem (kaydı silme)
        // devam etmeli, storage'da artık dosya kalması kritik bir sorun değil.
      }
    } catch (e) {
      console.error('Could not parse file URL to delete:', e);
    }
  },
};
