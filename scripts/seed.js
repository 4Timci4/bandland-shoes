const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or SERVICE_KEY not found in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

// --- VERİ SETLERİ ---

const slidesData = [
    { source_url: "https://placehold.co/1920x1080/E91E63/FFFFFF/png?text=Slider+1", order: 1, is_active: true },
    { source_url: "https://placehold.co/1920x1080/3F51B5/FFFFFF/png?text=Slider+2", order: 2, is_active: true },
    { source_url: "https://placehold.co/1920x1080/4CAF50/FFFFFF/png?text=Slider+3", order: 3, is_active: true },
];

const blogsData = [
    { title: 'Doğru Koşu Ayakkabısı Nasıl Seçilir?', content: 'Koşu performansınızı en üst düzeye çıkarmak için doğru ayakkabıyı seçmek hayati önem taşır...', excerpt: 'Performansınızı en üst düzeye çıkaracak koşu ayakkabısını seçmenin püf noktaları.', source_url: 'https://placehold.co/800x600/FFC107/000000/png?text=Blog+1', is_published: true },
    { title: 'Yeni Sezon Sneaker Trendleri', content: '2025 Sonbahar/Kış koleksiyonu, retro esintileri modern çizgilerle buluşturuyor...', excerpt: '2025 Sonbahar/Kış sneaker modasında öne çıkanlar: Retro esintiler ve modern çizgiler.', source_url: 'https://placehold.co/800x600/00BCD4/FFFFFF/png?text=Blog+2', is_published: true },
];

const categoriesData = [
    { name: 'Spor Ayakkabı', subCategories: ['Erkek', 'Kadın', 'Unisex', 'Çocuk'] },
    { name: 'Klasik Ayakkabı', subCategories: ['Erkek', 'Kadın'] },
];

const colorsData = [
    { name: 'Siyah', hex_code: '#000000' }, { name: 'Beyaz', hex_code: '#FFFFFF' }, { name: 'Kırmızı', hex_code: '#FF0000' },
    { name: 'Mavi', hex_code: '#0000FF' }, { name: 'Gri', hex_code: '#808080' }, { name: 'Kahverengi', hex_code: '#A52A2A' },
];

const baseProductsData = [
  { base_sku: 'AR-PRO', name: 'Air Runner Pro', description: 'Gün boyu konfor ve performans sunan, hafif ve esnek model.' },
  { base_sku: 'TB-XT', name: 'Trail Blazer XT', description: 'En zorlu arazilerde bile maksimum zemin tutuşu sağlayan dayanıklı outdoor ayakkabı.' },
  { base_sku: 'FL-LITE', name: 'Flex-Lite 2.0', description: 'Ultra hafif ve nefes alabilen yapısıyla ayağınızda yokmuş gibi hissettirir.' },
  { base_sku: 'OX-CENT', name: 'Oxford Centurion', description: 'Gerçek İtalyan derisinden el işçiliğiyle üretilmiş, zamansız ve şık bir klasik.' },
  { base_sku: 'CL-STEP', name: 'Cloud Stepper', description: 'Bulutların üzerinde yürüme hissi veren, günlük kullanıma uygun modern tasarım.' },
];

const productVariantsData = [
  // Air Runner Pro Variants (4)
  { base_sku: 'AR-PRO', sku_suffix: 'ER-RD', price: 3499.90, stock_quantity: 50, color: 'Kırmızı', category: 'Spor Ayakkabı', subCategory: 'Erkek', image_text: 'Air+Runner+Red' },
  { base_sku: 'AR-PRO', sku_suffix: 'ER-BK', price: 3499.90, stock_quantity: 45, color: 'Siyah', category: 'Spor Ayakkabı', subCategory: 'Erkek', image_text: 'Air+Runner+Black' },
  { base_sku: 'AR-PRO', sku_suffix: 'KD-WH', price: 3599.90, stock_quantity: 60, color: 'Beyaz', category: 'Spor Ayakkabı', subCategory: 'Kadın', image_text: 'Air+Runner+White' },
  { base_sku: 'AR-PRO', sku_suffix: 'KD-BL', price: 3599.90, stock_quantity: 55, color: 'Mavi', category: 'Spor Ayakkabı', subCategory: 'Kadın', image_text: 'Air+Runner+Blue' },
  // Trail Blazer XT Variants (4)
  { base_sku: 'TB-XT', sku_suffix: 'ER-BR', price: 3899.90, stock_quantity: 35, color: 'Kahverengi', category: 'Spor Ayakkabı', subCategory: 'Erkek', image_text: 'Trail+Blazer+Brown' },
  { base_sku: 'TB-XT', sku_suffix: 'ER-BK', price: 3899.90, stock_quantity: 30, color: 'Siyah', category: 'Spor Ayakkabı', subCategory: 'Erkek', image_text: 'Trail+Blazer+Black' },
  { base_sku: 'TB-XT', sku_suffix: 'UN-GR', price: 3999.90, stock_quantity: 40, color: 'Gri', category: 'Spor Ayakkabı', subCategory: 'Unisex', image_text: 'Trail+Blazer+Grey' },
  { base_sku: 'TB-XT', sku_suffix: 'UN-BL', price: 3999.90, stock_quantity: 25, color: 'Mavi', category: 'Spor Ayakkabı', subCategory: 'Unisex', image_text: 'Trail+Blazer+Blue' },
  // Flex-Lite 2.0 Variants (4)
  { base_sku: 'FL-LITE', sku_suffix: 'KD-WH', price: 2799.90, stock_quantity: 75, color: 'Beyaz', category: 'Spor Ayakkabı', subCategory: 'Kadın', image_text: 'Flex-Lite+White' },
  { base_sku: 'FL-LITE', sku_suffix: 'KD-BK', price: 2799.90, stock_quantity: 80, color: 'Siyah', category: 'Spor Ayakkabı', subCategory: 'Kadın', image_text: 'Flex-Lite+Black' },
  { base_sku: 'FL-LITE', sku_suffix: 'CK-RD', price: 2499.90, stock_quantity: 100, color: 'Kırmızı', category: 'Spor Ayakkabı', subCategory: 'Çocuk', image_text: 'Flex-Lite+Red' },
  { base_sku: 'FL-LITE', sku_suffix: 'CK-GR', price: 2499.90, stock_quantity: 90, color: 'Gri', category: 'Spor Ayakkabı', subCategory: 'Çocuk', image_text: 'Flex-Lite+Grey' },
  // Oxford Centurion Variants (4)
  { base_sku: 'OX-CENT', sku_suffix: 'ER-BK', price: 4250.00, stock_quantity: 30, color: 'Siyah', category: 'Klasik Ayakkabı', subCategory: 'Erkek', image_text: 'Oxford+Black' },
  { base_sku: 'OX-CENT', sku_suffix: 'ER-BR', price: 4350.00, stock_quantity: 25, color: 'Kahverengi', category: 'Klasik Ayakkabı', subCategory: 'Erkek', image_text: 'Oxford+Brown' },
  { base_sku: 'OX-CENT', sku_suffix: 'ER-BL', price: 4350.00, stock_quantity: 20, color: 'Mavi', category: 'Klasik Ayakkabı', subCategory: 'Erkek', image_text: 'Oxford+Blue' },
  { base_sku: 'OX-CENT', sku_suffix: 'ER-RD', price: 4450.00, stock_quantity: 15, color: 'Kırmızı', category: 'Klasik Ayakkabı', subCategory: 'Erkek', image_text: 'Oxford+Red' },
  // Cloud Stepper Variants (4)
  { base_sku: 'CL-STEP', sku_suffix: 'UN-WH', price: 3199.90, stock_quantity: 65, color: 'Beyaz', category: 'Spor Ayakkabı', subCategory: 'Unisex', image_text: 'Cloud+Stepper+White' },
  { base_sku: 'CL-STEP', sku_suffix: 'UN-BK', price: 3199.90, stock_quantity: 70, color: 'Siyah', category: 'Spor Ayakkabı', subCategory: 'Unisex', image_text: 'Cloud+Stepper+Black' },
  { base_sku: 'CL-STEP', sku_suffix: 'UN-GR', price: 3299.90, stock_quantity: 85, color: 'Gri', category: 'Spor Ayakkabı', subCategory: 'Unisex', image_text: 'Cloud+Stepper+Grey' },
  { base_sku: 'CL-STEP', sku_suffix: 'UN-BL', price: 3299.90, stock_quantity: 50, color: 'Mavi', category: 'Spor Ayakkabı', subCategory: 'Unisex', image_text: 'Cloud+Stepper+Blue' },
];


async function uploadImageFromUrl(url, resourceName) {
  if (!url) return null;
  
  try {
    console.log(`- ${resourceName} için resim indiriliyor: ${url.substring(0, 50)}...`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Resim indirilemedi: ${response.statusText}`);
    
    const buffer = await response.buffer();
    const contentType = response.headers.get('content-type');
    const fileExt = contentType ? contentType.split('/')[1] : 'png';
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, buffer, { contentType, upsert: true });

    if (uploadError) throw new Error(`Supabase Storage: Dosya yüklenemedi. ${uploadError.message}`);
    
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    
    if (!publicUrl) throw new Error('Supabase Storage: Genel URL alınamadı.');

    return publicUrl;
    
  } catch (error) {
    console.error(`\n--- HATA OLUŞTU: "${resourceName}" ---`);
    console.error(`- URL: ${url}`);
    console.error(`- Mesaj: ${error.message}\n`);
    return null;
  }
}

async function seedDatabase() {
  console.log('--- VERİTABANI TEMİZLENİYOR ---');
  await supabase.from('products').delete().neq('id', 0);
  await supabase.from('base_products').delete().neq('id', 0);
  await supabase.from('blogs').delete().neq('id', 0);
  await supabase.from('slides').delete().neq('id', 0);
  await supabase.from('sub_categories').delete().neq('id', 0);
  await supabase.from('categories').delete().neq('id', 0);
  await supabase.from('colors').delete().neq('id', 0);
  console.log('Tüm eski veriler silindi.');
  
  console.log('\n--- SLIDER VERİLERİ EKLENİYOR ---');
  for (const slide of slidesData) {
    const imageUrl = await uploadImageFromUrl(slide.source_url, `Slider ${slide.order}`);
    await supabase.from('slides').insert({ order: slide.order, is_active: slide.is_active, image_url: imageUrl });
  }
  console.log(`${slidesData.length} adet slide eklendi.`);

  console.log('\n--- BLOG VERİLERİ EKLENİYOR ---');
  for (const blog of blogsData) {
      const imageUrl = await uploadImageFromUrl(blog.source_url, `Blog: ${blog.title}`);
      await supabase.from('blogs').insert({ ...blog, image_url: imageUrl, source_url: undefined });
  }
  console.log(`${blogsData.length} adet blog eklendi.`);
  
  console.log('\n--- RENK VE KATEGORİLER EKLENİYOR ---');
  const { data: createdColors } = await supabase.from('colors').insert(colorsData).select();
  const createdCategories = [];
  for (const cat of categoriesData) {
      const { data } = await supabase.from('categories').insert({ name: cat.name }).select().single();
      const createdSubCategories = [];
      for(const sub of cat.subCategories) {
          const { data: subData } = await supabase.from('sub_categories').insert({ name: sub, category_id: data.id }).select().single();
          createdSubCategories.push(subData);
      }
      createdCategories.push({...data, sub_categories: createdSubCategories});
  }
  console.log(`${createdColors.length} renk, ${createdCategories.length} kategori ve alt kategorileri eklendi.`);

  console.log('\n--- ANA ÜRÜNLER EKLENİYOR ---');
  const { data: createdBaseProducts, error: baseProductError } = await supabase.from('base_products').insert(baseProductsData).select();
  if (baseProductError) throw new Error(`Ana ürünler eklenirken hata: ${baseProductError.message}`);
  console.log(`${createdBaseProducts.length} adet ana ürün eklendi.`);

  console.log('\n--- ÜRÜN VARYANTLARI EKLENİYOR ---');
  let variantsCount = 0;
  for (const p of productVariantsData) {
      const baseProduct = createdBaseProducts.find(bp => bp.base_sku === p.base_sku);
      const parentCategory = createdCategories.find(c => c.name === p.category);
      const parentSubCategory = parentCategory?.sub_categories.find(sc => sc.name === p.subCategory);
      const productColor = createdColors.find(c => c.name === p.color);

      if(!baseProduct || !parentSubCategory || !productColor) {
          console.warn(`Uyarı: ${p.base_sku}-${p.sku_suffix} için temel veri bulunamadı, ürün atlanıyor.`);
          continue;
      }

      const imageUrl = await uploadImageFromUrl(`https://placehold.co/600x600/FFFFFF/000000/png?text=${p.image_text}`, `Ürün: ${baseProduct.name} - ${p.color}`);
      
      const productToInsert = {
          base_product_id: baseProduct.id,
          name: baseProduct.name, // Ana üründen adı al
          description: baseProduct.description, // Ana üründen açıklamayı al
          price: p.price,
          sku: `${p.base_sku}-${p.sku_suffix}`, // SKU'yu birleştir
          stock_quantity: p.stock_quantity,
          sub_category_id: parentSubCategory.id,
          color_id: productColor.id,
          image_url: imageUrl
      };
      const { error: variantError } = await supabase.from('products').insert(productToInsert);
      if (variantError) console.error(`Varyant ekleme hatası (${productToInsert.sku}): ${variantError.message}`);
      else variantsCount++;
  }
  console.log(`${variantsCount} adet ürün varyantı eklendi.`);

  console.log('\n--- VERİ EKLEME İŞLEMİ TAMAMLANDI ---');
}

seedDatabase().catch(error => {
    console.error("\n\nScript'in çalışması sırasında bir hata meydana geldi:", error);
    process.exit(1);
});
