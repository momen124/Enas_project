import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { products } from '../data/mockData';
import { useStore } from '../store/useStore';
import ProductCard from '../components/Product/ProductCard';

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useStore();
  const isRTL = language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');

  // Search products
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product => {
      const name = isRTL ? product.nameAr : product.name;
      const description = isRTL ? product.descriptionAr : product.description;
      const category = isRTL ? product.categoryAr : product.category;
      const material = isRTL ? product.materialAr : product.material;

      return (
        name.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query) ||
        material.toLowerCase().includes(query) ||
        product.colors.some(color => 
          (isRTL ? color.nameAr : color.name).toLowerCase().includes(query)
        )
      );
    });

    // Sort results
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        // Relevance - products with name matches first
        return filtered.sort((a, b) => {
          const aName = isRTL ? a.nameAr : a.name;
          const bName = isRTL ? b.nameAr : b.name;
          const aNameMatch = aName.toLowerCase().includes(query);
          const bNameMatch = bName.toLowerCase().includes(query);
          
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return 0;
        });
    }
  }, [searchQuery, sortBy, isRTL]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Products'}
        </h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? 'ابحث عن المنتجات...' : 'Search for products...'}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg ${isRTL ? 'pr-12' : 'pl-12'}`}
            />
            <MagnifyingGlassIcon className={`absolute top-3.5 w-6 h-6 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <button
              type="submit"
              className={`absolute top-2 bottom-2 px-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${isRTL ? 'left-2' : 'right-2'}`}
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Stats & Controls */}
        {searchQuery && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg shadow-sm border p-4">
            <div>
              <p className="text-gray-600">
                {searchResults.length === 0 
                  ? 'No products found'
                  : `${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'} found`
                }
              </p>
            </div>
            
            {searchResults.length > 0 && (
              <div className={`flex items-center space-x-4 mt-4 sm:mt-0 ${isRTL ? 'space-x-reverse' : ''}`}>
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Results */}
      {!searchQuery ? (
        // No search query - show popular searches or categories
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <MagnifyingGlassIcon className="w-24 h-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {isRTL ? 'ابحث عن المنتجات' : 'Search for Products'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {isRTL 
              ? 'اكتشف مجموعتنا الواسعة من منتجات القطن المصري الفاخرة'
              : 'Discover our extensive collection of premium Egyptian cotton products'
            }
          </p>
          
          {/* Popular Search Terms */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isRTL ? 'عمليات البحث الشائعة' : 'Popular Searches'}
            </h3>
            <div className={`flex flex-wrap gap-2 justify-center ${isRTL ? 'space-x-reverse' : ''}`}>
              {['bed sheets', 'duvet', 'towels', 'cotton', 'pillows', 'queen size'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setSearchParams({ q: term });
                  }}
                  className="bg-gray-100 hover:bg-primary-100 hover:text-primary-700 px-4 py-2 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : searchResults.length === 0 ? (
        // No results found
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <AdjustmentsHorizontalIcon className="w-24 h-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {isRTL ? 'لا توجد نتائج' : 'No Results Found'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {isRTL 
              ? `لم نجد أي منتجات تطابق "${searchQuery}". جرب البحث بكلمات أخرى أو تصفح فئاتنا.`
              : `We couldn't find any products matching "${searchQuery}". Try different keywords or browse our categories.`
            }
          </p>
          
          {/* Search Suggestions */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isRTL ? 'اقتراحات البحث' : 'Search Suggestions'}
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{isRTL ? '• تأكد من الإملاء الصحيح' : '• Check your spelling'}</li>
              <li>{isRTL ? '• جرب كلمات أكثر عمومية' : '• Try more general keywords'}</li>
              <li>{isRTL ? '• استخدم كلمات مفتاحية مختلفة' : '• Use different keywords'}</li>
              <li>{isRTL ? '• تصفح فئات المنتجات' : '• Browse product categories'}</li>
            </ul>
          </div>
        </div>
      ) : (
        // Search results
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              {/* Search highlighting overlay could be added here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;