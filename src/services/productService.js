import { supabase } from '../lib/supabase';

const from = 'products';

const mapProductToFE = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  sku: product.sku,
  stock_quantity: product.stock_quantity,
  imageUrl: product.image_url, // 'image_url' -> 'imageUrl' dönüşümü
  sub_category_id: product.sub_category_id,
  color_id: product.color_id,
  base_product_id: product.base_product_id,
  base_sku: product.base_products?.base_sku,
  color_name: product.colors?.name,
  color_hex_code: product.colors?.hex_code,
  createdAt: product.created_at,
});

const mapProductToBE = (product) => ({
  name: product.name,
  description: product.description,
  price: product.price,
  sku: product.sku,
  stock_quantity: product.stock_quantity,
  image_url: product.image_url,
  sub_category_id: product.sub_category_id,
  color_id: product.color_id,
  base_product_id: product.base_product_id,
});

export const productService = {
  async getBaseProductBySku(baseSku) {
    if (!baseSku) return null;
    const { data, error } = await supabase
      .from('base_products')
      .select('*')
      .eq('base_sku', baseSku)
      .single();
    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found
      console.error('Error fetching base product by SKU:', error);
      throw error;
    }
    return data;
  },

  // === VİTRİN İÇİN GRUPLAMA FONKSİYONLARI ===

  groupProducts(products) {
    if (!products || products.length === 0) return [];

    const grouped = products.reduce((acc, product) => {
      const baseId = product.base_product_id;
      if (!acc[baseId]) {
        acc[baseId] = {
          base_product_id: baseId,
          name: product.name,
          description: product.description,
          base_sku: product.base_products.base_sku,
          // İlk varyantı ana varyant olarak ata
          ...mapProductToFE(product),
          variants: [],
        };
      }
      acc[baseId].variants.push(mapProductToFE(product));
      return acc;
    }, {});

    return Object.values(grouped);
  },

  async getGroupedProducts(categoryId, subCategoryId) {
    let query = supabase.from(from).select(`
      *,
      colors(name, hex_code),
      base_products(base_sku)
    `);

    if (subCategoryId) {
      query = query.eq('sub_category_id', subCategoryId);
    } else if (categoryId) {
      const { data: subCategories, error: subCategoriesError } = await supabase
        .from('sub_categories')
        .select('id')
        .eq('category_id', categoryId);

      if (subCategoriesError) throw subCategoriesError;

      const subCategoryIds = subCategories.map((sc) => sc.id);
      if (subCategoryIds.length === 0) return [];
      query = query.in('sub_category_id', subCategoryIds);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    return this.groupProducts(data);
  },

  // === ADMİN PANELİ İÇİN STANDART FONKSİYONLAR ===

  async getAll() {
    const { data, error } = await supabase
      .from(from)
      .select('*, colors(name, hex_code), base_products(base_sku)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(mapProductToFE);
  },

  async getById(id) {
    const { data, error } = await supabase
      .from(from)
      .select('*, colors(name, hex_code), base_products(*)')
      .eq('id', id)
      .single();
    if (error) throw error;

    // Bu ürünün diğer varyantlarını da getir
    const { data: variantsData, error: variantsError } = await supabase
      .from(from)
      .select('*, colors(name, hex_code)')
      .eq('base_product_id', data.base_product_id);

    if (variantsError) throw variantsError;

    const groupedProduct = {
      base_product_id: data.base_product_id,
      name: data.base_products.name,
      description: data.base_products.description,
      base_sku: data.base_products.base_sku,
      variants: variantsData.map(mapProductToFE),
    };

    return groupedProduct;
  },

  async create(productData) {
    const { data, error } = await supabase
      .from(from)
      .insert(mapProductToBE(productData))
      .select('*, colors(name, hex_code), base_products(base_sku)')
      .single();
    if (error) throw error;
    return mapProductToFE(data);
  },

  async update(id, productData) {
    const { data, error } = await supabase
      .from(from)
      .update(mapProductToBE(productData))
      .eq('id', id)
      .select('*, colors(name, hex_code), base_products(base_sku)')
      .single();
    if (error) throw error;
    return mapProductToFE(data);
  },

  async delete(id) {
    const { data, error } = await supabase.from(from).delete().eq('id', id);
    if (error) throw error;
    return data;
  },
};
