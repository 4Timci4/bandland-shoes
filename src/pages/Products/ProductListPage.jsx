import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaUndo, FaList, FaTh } from 'react-icons/fa';
import { productService } from '../../services/productService';
import { colorService } from '../../services/colorService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../../components/products/ProductCard';
import Pagination from '../../components/products/Pagination';
import '../../styles/products/ProductListPage.css';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const ITEMS_PER_PAGE = 9;

function ProductListPage() {
  const { categoryName, subCategoryName } = useParams();
  const query = useQuery();
  const categoryId = query.get('category_id');
  const subCategoryId = query.get('subcategory_id');

  const [initialProducts, setInitialProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtre, sıralama ve sayfalama state'leri
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [fetchedProducts, fetchedColors, fetchedCategories] = await Promise.all([
          productService.getGroupedProducts(categoryId, subCategoryId),
          colorService.getAll(),
          categoryService.getCategoriesWithSubCategories()
        ]);
        setInitialProducts(fetchedProducts);
        setColors(fetchedColors);
        setCategories(fetchedCategories);
        setError(null);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryId, subCategoryId]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts]; // initialProducts artık gruplanmış.

    // Renk filtresi: Ana ürünün varyantlarından herhangi biri seçili renkle eşleşiyorsa tut.
    if (selectedColors.length > 0) {
      result = result.filter(group =>
        group.variants.some(variant => selectedColors.includes(variant.color_id))
      );
    }

    // Arama filtresi: Ana ürün adına göre ara
    if (searchTerm) {
      result = result.filter(group => group.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sıralama
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = Math.min(...a.variants.map(v => v.price));
          const priceB = Math.min(...b.variants.map(v => v.price));
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = Math.min(...a.variants.map(v => v.price));
          const priceB = Math.min(...b.variants.map(v => v.price));
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: break;
    }
    return result;
  }, [initialProducts, selectedColors, searchTerm, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const handleColorChange = (colorId) => {
    setSelectedColors(prev => prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]);
    setCurrentPage(1);
  };
  
  const resetFilters = () => {
    setSelectedColors([]);
    setSearchTerm('');
    setSortBy('default');
    setCurrentPage(1);
  };

  const pageTitle = subCategoryName ? `${categoryName} > ${subCategoryName}` : (categoryName || 'Tüm Ürünler');
  
  return (
    <div className="product-list-page">
      <div className="page-content-wrapper">
        <aside className="filters-sidebar">
          <h3>Filtrele & Sırala</h3>
          <div className="filter-group">
            <h4>Arama</h4>
            <input type="text" placeholder="Ürün adı ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-group">
            <h4>Renk</h4>
            <ul className="color-filter-list">
              {colors.map(color => (
                <li key={color.id} onClick={() => handleColorChange(color.id)} className={selectedColors.includes(color.id) ? 'active' : ''}>
                  <span className="color-swatch" style={{ backgroundColor: color.hexCode }}></span>
                  {color.name}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={resetFilters} className="reset-filters-btn">
            <FaUndo /> Filtreleri Temizle
          </button>
        </aside>

        <main className="product-list-main">
          <header className="list-header">
            <div className="header-left">
              <h1>{pageTitle}</h1>
              <span className="product-count">({filteredAndSortedProducts.length} ürün)</span>
            </div>
            <div className="header-right">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-by-select">
                <option value="default">Önerilen Sıralama</option>
                <option value="price-asc">Fiyat: Artan</option>
                <option value="price-desc">Fiyat: Azalan</option>
                <option value="name-asc">İsim: A-Z</option>
              </select>
              <div className="view-mode-toggle">
                 <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}><FaTh /></button>
              </div>
            </div>
          </header>

          {loading && <p className="loading-message">Ürünler yükleniyor...</p>}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && (
            <>
              {paginatedProducts.length > 0 ? (
                <div className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {paginatedProducts.map((groupedProduct) => {
                     // Kategori adını bulmak için ilk varyantı kullanabiliriz.
                    const firstVariant = groupedProduct.variants[0];
                    const subCategory = categories.flatMap(c => c.sub_categories).find(sc => sc.id === firstVariant.sub_category_id);
                    const category = subCategory ? categories.find(c => c.id === subCategory.category_id) : null;
                    return (
                       <ProductCard key={groupedProduct.base_product_id} groupedProduct={groupedProduct} categoryName={category?.name}/>
                    )
                  })}
                </div>
              ) : (
                <p className="no-products-message">Filtre kriterlerine uygun ürün bulunamadı.</p>
              )}
              <Pagination
                currentPage={currentPage}
                totalItems={filteredAndSortedProducts.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductListPage;