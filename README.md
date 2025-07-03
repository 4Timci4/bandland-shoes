# Badland Shoes - E-Ticaret Platformu

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, zengin özelliklere sahip bir e-ticaret web sitesi ve yönetim panelidir. Kullanıcıların ürünleri inceleyebileceği bir vitrin ve yöneticilerin site içeriğini (slider, blog, ürünler, kategoriler, iletişim vb.) kolayca yönetebileceği bir admin paneli içerir.

## 🚀 Projeye Genel Bakış

- **Vitrin Arayüzü:** Müşterilerin ürünleri görüntüleyebileceği, kategori ve renge göre filtreleyebileceği, fiyata ve isme göre sıralayabileceği modern bir e-ticaret arayüzü.
- **Yönetim Paneli:** Site yöneticileri için geliştirilmiş, tüm dinamik içeriğin yönetilebildiği, güvenli ve kullanıcı dostu bir kontrol paneli.
- **Veritabanı ve Depolama:** Güçlü ve ölçeklenebilir bir altyapı için **Supabase** kullanılmıştır (PostgreSQL veritabanı, Supabase Storage ve Auth).

---

## 🛠️ Kullanılan Teknolojiler

### Ön Uç (Frontend)
- **React:** Kullanıcı arayüzünü oluşturmak için kullanılan temel JavaScript kütüphanesi.
- **Vite:** Hızlı ve modern bir geliştirme ortamı sağlayan build aracı.
- **React Router:** Sayfalar arası navigasyon ve yönlendirme işlemleri için.
- **CSS Modülleri & Standart CSS:** Bileşen bazlı ve genel stil yönetimi için modern CSS yaklaşımları.
- **React Icons:** İkon setleri için.
- **React Lazy Load Image Component:** Performans optimizasyonu için resimlerin tembel yüklenmesini (lazy loading) sağlar.

### Arka Uç (Backend) & Veritabanı
- **Supabase:**
  - **PostgreSQL Veritabanı:** Tüm verilerin (ürünler, kategoriler, blog yazıları, mesajlar vb.) saklandığı ana veritabanı.
  - **Supabase Storage:** Ürün, slider ve blog görselleri gibi statik dosyaların depolanması ve sunulması için.
  - **Row Level Security (RLS):** Veri güvenliğini sağlamak için kullanılan politika.
- **Node.js:** Veritabanını başlangıç verileriyle doldurmak için kullanılan `seed.js` script'i için.

---

## 🌟 Öne Çıkan Özellikler

### Vitrin
- **Dinamik Ürün Listeleme:** Ürünler veritabanından dinamik olarak çekilir.
- **Gelişmiş Filtreleme ve Sıralama:** Ürünler renge ve kategoriye göre filtrelenebilir, fiyata veya isme göre sıralanabilir.
- **Ürün Varyant Gruplaması:** Aynı ana ürüne ait farklı renkler, ürün listeleme sayfasında tek bir kart üzerinde birleştirilir ve renk seçenekleri sunulur.
- **Detaylı Ürün Sayfası:** Her ürün için, tüm varyantların seçilebildiği ve detaylı bilgilerin yer aldığı bir sayfa.
- **Modern İletişim Formu:** Kullanıcıların mesaj gönderebileceği ve bu mesajların veritabanına kaydedildiği fonksiyonel bir iletişim sayfası.

### Admin Paneli
- **Dashboard:** Genel bir bakış sayfası.
- **Slider Yönetimi:** Anasayfadaki slider görsellerini ekleme, silme ve sıralama.
- **Blog Yönetimi:** Blog yazılarını oluşturma, düzenleme ve silme.
- **Kategori Yönetimi:** Çok seviyeli ana kategori ve alt kategori oluşturma ve yönetme.
- **Ürün Yönetimi:**
  - Ana ürün ve varyant bazlı ürün ekleme/yönetme.
  - SKU girildiğinde ürün adının otomatik gelmesi.
  - Gelişmiş filtreleme ve arama (Ürün Adı, Ana SKU, Varyant SKU).
- **İletişim Yönetimi:**
  - Sitenin iletişim bilgilerini (adres, telefon vb.) düzenleme.
  - Kullanıcılardan gelen mesajları görüntüleme, okundu olarak işaretleme ve silme.

---

## 📦 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone https://github.com/4Timci4/bandland-shoes.git
    cd bandland-shoes
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Ortam Değişkenlerini Ayarlayın:**
    - Proje kök dizininde `.env` adında bir dosya oluşturun.
    - Supabase projenizden aldığınız `URL` ve `ANON_KEY` bilgilerini bu dosyaya ekleyin.
    - `seed.js` ve diğer admin işlemleri için `SERVICE_KEY`'i de eklemeniz gerekebilir.
      ```
      VITE_SUPABASE_URL=https://proje-id.supabase.co
      VITE_SUPABASE_ANON_KEY=anon-key-buraya
      VITE_SUPABASE_SERVICE_KEY=service-key-buraya
      ```

4.  **Veritabanını Hazırlayın (Opsiyonel):**
    - Eğer veritabanını başlangıç verileriyle doldurmak isterseniz, önce Supabase projenizdeki **SQL Editor**'de `contact_details` ve `contact_submissions` tablolarını oluşturan SQL komutlarını çalıştırın.
    - Ardından, `seed.js` script'ini çalıştırın:
      ```bash
      node scripts/seed.js
      ```

5.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
    Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır. Admin paneline `http://localhost:5173/admin` adresinden erişebilirsiniz.