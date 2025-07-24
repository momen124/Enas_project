import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { products, categories } from '../data/mockData';
import { useStore } from '../store/useStore';
import ProductCard from '../components/Product/ProductCard';
import ProductListItem from '../components/Product/ProductListItem';

const Shop: React.FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { language } = useStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    colors: [] as string[],
    sizes: [] as string[],
    materials: [] as string[],
    inStock: false,
    onSale: false,
  });

  const isRTL = language === 'ar';

  // Get current category
  const currentCategory = categories.find(cat => cat.slug === slug);
  
  // Filter products based on category and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (currentCategory) {
      filtered = filtered.filter(product => 
        isRTL 
          ? product.categoryAr === currentCategory.nameAr
          : product.category === currentCategory.name
      );
    }

    // Apply search filter
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        (isRTL ? product.nameAr : product.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (isRTL ? product.descriptionAr : product.description)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => 
          filters.colors.includes(isRTL ? color.nameAr : color.name)
        )
      );
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Apply sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.originalPrice);
    }

    return filtered;
  }, [currentCategory, searchParams, filters, isRTL]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Get unique filter values
  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(product => {
      product.colors.forEach(color => {
        colors.add(isRTL ? color.nameAr : color.name);
      });
    });
    return Array.from(colors);
  }, [isRTL]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(product => {
      product.sizes.forEach(size => sizes.add(size));
    });
    return Array.from(sizes);
  }, []);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      colors: [],
      sizes: [],
      materials: [],
      inStock: false,
      onSale: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className={`flex items-center space-x-2 text-sm text-gray-500 ${isRTL ? 'space-x-reverse' : ''}`}>
          <a href="/" className="hover:text-egyptian-blue-900">{t('home')}</a>
          <span>/</span>
          {currentCategory ? (
            <span className="text-gray-900">
              {isRTL ? currentCategory.nameAr : currentCategory.name}
            </span>
          ) : (
            <span className="text-gray-900">{t('shop')}</span>
          )}
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {currentCategory 
            ? (isRTL ? currentCategory.nameAr : currentCategory.name)
            : t('shop')
          }
        </h1>
        <p className="text-gray-600">
          {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-egyptian-blue-600 hover:text-egyptian-blue-800"
              >
                Clear All
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0 EGP</span>
                  <span>{filters.priceRange[1]} EGP</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Colors</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableColors.map(color => (
                  <label key={color} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('colors', [...filters.colors, color]);
                        } else {
                          handleFilterChange('colors', filters.colors.filter(c => c !== color));
                        }
                      }}
                      className="rounded border-gray-300 text-egyptian-blue-600 focus:ring-egyptian-blue-500"
                    />
                    <span className={`text-sm ${isRTL ? 'mr-2' : 'ml-2'}`}>{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Sizes</h4>
              <div className="grid grid-cols-2 gap-2">
                {availableSizes.map(size => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('sizes', [...filters.sizes, size]);
                        } else {
                          handleFilterChange('sizes', filters.sizes.filter(s => s !== size));
                        }
                      }}
                      className="rounded border-gray-300 text-egyptian-blue-600 focus:ring-egyptian-blue-500"
                    />
                    <span className={`text-sm ${isRTL ? 'mr-2' : 'ml-2'}`}>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="rounded border-gray-300 text-egyptian-blue-600 focus:ring-egyptian-blue-500"
                  />
                  <span className={`text-sm ${isRTL ? 'mr-2' : 'ml-2'}`}>In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                    className="rounded border-gray-300 text-egyptian-blue-600 focus:ring-egyptian-blue-500"
                  />
                  <span className={`text-sm ${isRTL ? 'mr-2' : 'ml-2'}`}>On Sale</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:w-3/4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-white rounded-lg shadow-sm border p-4">
            <div className={`flex items-center space-x-4 mb-4 sm:mb-0 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Filters</span>
              </button>
              
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-egyptian-blue-100 text-egyptian-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-egyptian-blue-100 text-egyptian-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-gray-300 rounded-lg text-sm focus:ring-egyptian-blue-500 focus:border-egyptian-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Products Grid/List */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <AdjustmentsHorizontalIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="bg-egyptian-blue-600 text-white px-6 py-2 rounded-lg hover:bg-egyptian-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {sortedProducts.map(product => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
                )
              ))}
            </div>
          )}

          {/* Pagination */}
          {sortedProducts.length > 12 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Previous</button>
                <button className="px-3 py-2 text-sm bg-egyptian-blue-600 text-white rounded">1</button>
                <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900">2</button>
                <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900">3</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Next</button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;