import { supabase } from '../lib/supabase';
import { productService } from './productService';
import { categoryService } from './categoryService';

const STOCK_THRESHOLD = 10;

export const dashboardService = {
  async getDashboardStats() {
    // Tüm verileri paralel olarak çek
    const [
      allProducts, 
      baseProductsCount, 
      categoryCount
    ] = await Promise.all([
      productService.getAll(),
      supabase.from('base_products').select('*', { count: 'exact', head: true }),
      categoryService.getCategoryCount()
    ]);

    // Ürün bazlı istatistikleri hesapla
    const totalVariantCount = allProducts.length;
    const totalStock = allProducts.reduce((sum, product) => sum + product.stock_quantity, 0);
    const lowStockProducts = allProducts
      .filter(p => p.stock_quantity < STOCK_THRESHOLD)
      .sort((a,b) => a.stock_quantity - b.stock_quantity); // En düşük stoklu en üstte

    // Son eklenen 5 ürün
    const recentProducts = allProducts.slice(0, 5);

    return {
      totalVariantCount,
      totalBaseProductCount: baseProductsCount.count,
      totalCategoryCount: categoryCount,
      totalStock,
      lowStockProducts,
      recentProducts,
    };
  }
};