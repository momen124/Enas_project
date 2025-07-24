import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { t } = useTranslation();
  const { language, currency, wishlist, addToWishlist, removeFromWishlist, addToCart } = useStore();
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
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      toast.success('Added to cart!');
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
      <div className="flex p-6">
        {/* Product Image */}
        <div className="flex-shrink-0 w-48 h-48 relative overflow-hidden rounded-lg">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images[0]}
              alt={isRTL ? product.nameAr : product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
          </div>
        </div>

        {/* Product Details */}
        <div className={`flex-1 flex flex-col justify-between ${isRTL ? 'mr-6' : 'ml-6'}`}>
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-sm text-gray-500">
                  {isRTL ? product.categoryAr : product.category}
                </span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-egyptian-blue-900 transition-colors mb-2">
                    {isRTL ? product.nameAr : product.name}
                  </h3>
                </Link>
              </div>
              <button
                onClick={handleWishlistToggle}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                {isInWishlist ? (
                  <HeartIconSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-400 hover:text-red-500" />
                )}
              </button>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {isRTL ? product.descriptionAr : product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-500">Material:</span>
                <span className={`font-medium ${isRTL ? 'mr-2' : 'ml-2'}`}>
                  {isRTL ? product.materialAr : product.material}
                </span>
              </div>
              {product.threadCount && (
                <div>
                  <span className="text-gray-500">Thread Count:</span>
                  <span className={`font-medium ${isRTL ? 'mr-2' : 'ml-2'}`}>
                    {product.threadCount}
                  </span>
                </div>
              )}
            </div>

            {/* Color Options */}
            <div className={`flex items-center space-x-2 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className="text-sm text-gray-500">Colors:</span>
              <div className={`flex space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                {product.colors.slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                    title={isRTL ? color.nameAr : color.name}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-sm text-gray-500">+{product.colors.length - 5}</span>
                )}
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              {product.stock > 0 ? (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
              
              <button
                onClick={handleQuickAdd}
                disabled={product.stock === 0}
                className="bg-egyptian-blue-600 text-white px-4 py-2 rounded-lg hover:bg-egyptian-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;