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
  const { language, currency, wishlist, addToWishlist, removeFromWishlist } = useStore();
  const isRTL = language === 'ar';
  const isInWishlist = wishlist.includes(product.id);

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'EGP' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success(t('removedFromWishlist'));
    } else {
      addToWishlist(product.id);
      toast.success(t('addedToWishlist'));
    }
  };

  // const handleQuickAdd = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (product.stock <= 0) {
  //     toast.error(t('outOfStock'));
  //     return;
  //   }
  //   if (!product.sizes || product.sizes.length === 0) {
  //     toast.error(t('selectSize'));
  //     return;
  //   }
  //   if (!product.colors || product.colors.length === 0) {
  //     toast.error(t('selectColor'));
  //     return;
  //   }
  //   try {
  //     addToCart(product, product.sizes[0], product.colors[0], 1);
  //     toast.success(t('addedToCart'));
  //   } catch (error) {
  //     toast.error(t('cartError') || 'Failed to add to cart');
  //     console.error('Add to cart error:', error);
  //   }
  // };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border">
      <div className="flex p-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-48 h-48 relative overflow-hidden rounded-lg">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={isRTL ? product.nameAr : product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Badges */}
          <div className={`absolute top-3 flex flex-col gap-2 ${isRTL ? 'right-3' : 'left-3'}`}>
            {product.newArrival && (
              <span className="bg-gold-accent-500 text-deep-navy-900 text-xs px-2 py-1 rounded-full">
                {t('new')}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {discountPercentage}% {t('off')}
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className={`flex-1 flex flex-col justify-between ${isRTL ? 'mr-4' : 'ml-4'}`}>
          <div>
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="text-sm text-gray-500 mb-2">
                  {(isRTL ? product.categoryAr : product.category)?.replace("-", " ").toUpperCase()}
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gold-accent-500 transition-colors">
                    {isRTL ? product.nameAr : product.name}
                  </h3>
                </Link>
              </div>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isRTL ? 'ml-2' : 'mr-2'}`}
              >
                {isInWishlist ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {isRTL ? product.descriptionAr : product.description}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} {t('reviews')})
                </span>
              </div>
            )}

            {/* Specifications */}
            <div className={`space-y-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('material')}</span>
                <span className="font-medium">{isRTL ? product.materialAr : product.material}</span>
              </div>
              {product.threadCount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('threadCount')}</span>
                  <span className="font-medium">{product.threadCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? t('inStock') : t('outOfStock')}
              </span>
              <button
                
                disabled={product.stock === 0}
                className="bg-gold-accent-500 text-deep-navy-900 py-3 px-6 rounded-lg hover:bg-gold-accent-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>{t('quickAdd')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;