import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, currency, wishlist, addToWishlist, removeFromWishlist } = useStore();
  const isRTL = language === 'ar';
  const isInWishlist = wishlist.includes(product.id);

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={isRTL ? product.nameAr : product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className={`absolute top-2 flex flex-col space-y-1 ${isRTL ? 'right-2' : 'left-2'}`}>
          {product.newArrival && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {product.bestseller && (
            <span className="bg-gold-accent text-gray-900 text-xs px-2 py-1 rounded-full">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${isRTL ? 'left-2' : 'right-2'}`}
        >
          {isInWishlist ? (
            <HeartIconSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {isRTL ? product.categoryAr : product.category}
          </span>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-egyptian-blue transition-colors line-clamp-2">
            {isRTL ? product.nameAr : product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.stock > 0 ? (
            <span className="text-sm text-green-600">In Stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>

        {/* Color Options Preview */}
        <div className={`flex space-x-2 mt-3 ${isRTL ? 'space-x-reverse' : ''}`}>
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: color.hex }}
              title={isRTL ? color.nameAr : color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;